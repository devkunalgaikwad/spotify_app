'use client'
import { PlayerContentProps } from '@/types'
import React,{useEffect, useState} from 'react'
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import { LikeButton, PlayListItem, Slider } from './index'
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'

const PlayerContent = ({song, songUrl}:PlayerContentProps) => {
    const player = usePlayer()
    const [volume, setVolume] = useState(0.5)
    const [isPlaying, setIsPlaying] = useState(false)
    const [conduration, setConduration] = useState<number>()
    const Icon = isPlaying ? BsPauseFill : BsPlayFill 
    const VolumeIcon = volume ===0 ? HiSpeakerXMark : HiSpeakerWave
    const onPlayNext = ()=>{
        if(player.ids.length ===0){
            return
        }
        const currentIndex = player.ids.findIndex((id)=> id===player.activeId)
        const nextSong = player.ids[currentIndex +1]
        if (!nextSong){
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }
    const onPlayPrevious = ()=>{
        if(player.ids.length ===0){
            return
        }
        const currentIndex = player.ids.findIndex((id)=> id===player.activeId)
        const previousSong = player.ids[currentIndex -1]
        if (!previousSong){
            return player.setId(player.ids[player.ids.length -1])
        }
        player.setId(previousSong)
    }
    const [play, { pause, duration, sound }] = useSound(
        songUrl,
        { 
          volume: volume,
          onplay: () => setIsPlaying(true),
          onend: () => {
            setIsPlaying(false);
            onPlayNext();
          },
          onpause: () => setIsPlaying(false),
          format: ['mp3'],
        }
      );    
      useEffect(() => {
        sound?.play();
        
        return () => {
          sound?.unload();
        }
      }, [sound]);
    
    const handlePlay = ()=>{
        if(!isPlaying){
            play()
        } else {
            pause()
        }
    }
    const toggleMute = ()=>{
        if(volume===0){
            setVolume(1)
        }else{
            setVolume(0)
        }
    }
    const [currTime, setCurrTime]= useState({
        min: 0,
        sec: 0,
    })
    const [seconds, setSeconds] = useState(0)
    const [time, setTime] = useState({
        min : 0,
        sec : 0,
    })
    useEffect(()=>{
        if (duration !== null) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            const time = {
              min: min,
              sec: secRemain
            };
            setTime(time);
          }
        
    },[duration])
    useEffect(()=>{
        const interval = setInterval(()=>{
            if (sound){
                setSeconds(sound.seek([]))
                const min = Math.floor(sound.seek([])/60)
                const sec = Math.floor(sound.seek([])%60)
                setCurrTime({
                    min,
                    sec,
                })
            }
        },1000)
        return()=>clearInterval(interval)
    },[sound])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-auto items-center'>
        <div className='flex w-full justify-start'>
            <div className='flex items-center gap-x-4'>
                <PlayListItem data={song}/>
                <div className='hidden md:flex'>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
        </div>
        <div className='flex md:hidden col-auto w-full justify-end items-center'>
            <LikeButton songId={song.id}/>
            <div className='h-10 ml-2 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer' onClick={handlePlay}>
                <Icon size={30} className='text-black'/>
            </div>
        </div>
        <div className='hidden h-full md:flex justify-center items-center flex-col w-full max-w-[722px] gap-x-6'>
            <div className='flex flex-1 items-center justify-center'> 
                <AiFillStepBackward  size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onPlayPrevious}/>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer' onClick={handlePlay}>
                    <Icon size={30} className='text-black'/>
                </div>
                <AiFillStepForward onClick={onPlayNext} className='text-neutral-400 cursor-pointer hover:text-white transition' size={30}/>
            </div> 
            <div className='flex flex-1 justify-center items-center gap-3 text-xs'>
                <p>
                    {currTime.min}:{currTime.sec}
                </p>
                <input title='duration' className='cursor-pointer h-[5px] w-[20rem] bg-[#707070] rounded-md sliderthumb' type="range" min={'0'} max={duration !== null ? duration / 1000 : 0} value={seconds} onChange={(e)=>sound.seek([e.target.value])}/>
                <p>{time.min}:{time.sec}</p>
            </div>
        </div>
        <div className='hidden md:flex w-full justify-end pr-2'>
            <div className='flex items-center gap-x-2 w-[120px]'>
                <VolumeIcon size={35} onClick={toggleMute} className='cursor-pointer'/>
                <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
            />
            </div>
        </div>
    </div>

  )
}

export default PlayerContent