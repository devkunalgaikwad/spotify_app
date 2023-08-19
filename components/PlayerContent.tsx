'use client'
import { PlayerContentProps } from '@/types'
import React,{useEffect, useState , useCallback} from 'react'
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import { LikeButton, PlayListItem, Slider } from './index'
import {HiMiniBarsArrowUp, HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'
import {Box, Drawer, Typography} from '@mui/material'
import { IoIosArrowDown, IoIosArrowUp, IoMdMusicalNote } from 'react-icons/io'
import Image from 'next/image'
import useLoadImage from '@/hooks/useLoadImage'

const PlayerContent = ({song, songUrl}:PlayerContentProps) => {
    const player = usePlayer()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [isPlaying, setIsPlaying] = useState(false)
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
    const handlePlay = useCallback(() => {
        if (!isPlaying) {
          play();
        } else {
          pause();
        }
      }, [isPlaying, play, pause]);
    
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
        if (duration != null) {
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
                    min:min,
                    sec:sec,
                })
            }
        },1000)
        return()=>clearInterval(interval)
    },[sound])
    const drawerSongImage = useLoadImage(song)
    useEffect(() => {
        const handleSpaceKeyPress = (event: KeyboardEvent) => {
          if (event.key === ' ') {
            console.log(event)
            event.preventDefault();
            handlePlay();
          }
        };
        window.addEventListener('keydown', handleSpaceKeyPress);    
        return () => {
          window.removeEventListener('keydown', handleSpaceKeyPress);
        };
      }, [handlePlay]);
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 bg-black md:rounded-none rounded-md h-auto items-center'>
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
            <div className='h-10 ml-2 w-10 flex items-center justify-center rounded-full bg-black text-white p-1 cursor-pointer' onClick={()=> setIsDrawerOpen(true)}>
                <IoIosArrowUp  size={27}/>
            </div>
        </div>
        <div className='md:hidden flex'>


        <Drawer anchor='bottom' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
            <Box width={'full'} p={2} height={'100vh'} textAlign={'center'} className={'bg-gradient-to-b from-red-800 bg-black overflow-y-auto'}>
                <div className='flex flex-row justify-between w-full overflow-auto overflow-y-auto items-center'>
                    <div className='flex start-0' onClick={()=> setIsDrawerOpen(false)}>
                        <IoIosArrowDown size={28}/>
                    </div>
                    <div className='flex flex-col justify-center text-center'>
                        <p className='text-[14px] text-neutral-100'>Now Playing</p>
                        <h1 className='font-semibold text-[26px] text-white capitalize'>
                            {song.title}
                        </h1>
                    </div>
                    <div className='flex end-0'>
                        <IoMdMusicalNote size={28}/>
                    </div>
                </div>
                <div className='w-full max-w-[370px] max-h-[370px] flex justify-center overflow-hidden relative rounded-md pt-[4.5rem]'>
                    <Image src={drawerSongImage|| '/image/liked.png'} className={' object-cover rounded-lg'}alt={`${song.title}`} width={275} height={275}/>
                </div>
                <div className='px-[25px] mt-[4rem]'>
                    <div className='flex flex-row items-center justify-between w-full py-[31px]'>
                        <div className='flex flex-col text-white text-left'>
                            <h1 className='font-semibold text-xl capitalize'>{song.title}</h1>
                            <p className='text-ld text-neutral-400'>{song.author}</p>
                        </div>
                        <div>
                            <LikeButton drawer={true} songId={song.id}/>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='justify-center gap-3 text-xs'>
                            <input title='duration'  className='cursor-pointer h-[5px] w-[100%] bg-[#707070] rounded-md' type="range" min={'0'} max={duration !== null ? duration / 1000 : 0} value={seconds} onChange={(e)=>sound.seek([e.target.value])}/>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-white font-sm'>
                                {currTime.min}:{currTime.sec}
                            </p>
                            <p className='text-white font-sm'>
                                {time.min}:{time.sec}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='bg-transparent text-white'>
                            <IoMdMusicalNote size={35}/>
                        </div>
                        <div className='flex items-center justify-center flex-row'>
                            <AiFillStepBackward  size={50} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onPlayPrevious}/>
                            <div className='flex items-center justify-center h-[60px] w-[60px] rounded-full bg-white p-1 cursor-pointer' onClick={handlePlay}>
                                <Icon size={70} className='text-black'/>
                            </div>
                            <AiFillStepForward onClick={onPlayNext} className='text-neutral-400 cursor-pointer hover:text-white transition' size={50}/>
                        </div>
                        <div>
                            <VolumeIcon size={35} onClick={toggleMute} className='cursor-pointer bg-transparent text-white'/>
                        </div>
                    </div>
                </div>
            </Box>
        </Drawer>


        </div>
        <div className='hidden h-full md:flex justify-center items-center flex-col w-full max-w-[722px] gap-x-6'>
            <div className='flex flex-1 items-center justify-center'> 
                <AiFillStepBackward  size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onPlayPrevious}/>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer' tabIndex={0} onClick={handlePlay}>
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