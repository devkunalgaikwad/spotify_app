'use client'
import { PlayerContentProps } from '@/types'
import React,{useEffect, useState} from 'react'
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import { LikeButton, PlayListItem, Seekbar, Slider } from './index'
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'
import ReactAudioPlayer from 'react-audio-player';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'

const PlayerContent = ({song, songUrl}:PlayerContentProps) => {
    const player = usePlayer()
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
    const [audioDuration, setAudioDuration] = useState<number>(0);

    // const handleLoadMetadata = (event: React.SyntheticEvent<HTMLAudioElement> | Event) => {
    //     const audio = event.target;
    //     setAudioDuration(audio.duration);
    // };
    console.log(audioDuration)

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
    const [play, { pause, sound }] = useSound(
        songUrl,
        { 
          volume: volume,
          onplay: () => setIsPlaying(true),
          onend: () => {
            setIsPlaying(false);
            onPlayNext();
          },
          onpause: () => setIsPlaying(false),
          format: ['mp3']
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
    // const [currentPosition, setCurrentPosition] = useState<number>(0);

    // Update the current position state as the audio progresses
    // useEffect(() => {
    //     if (sound) {
    //         sound.setPosition((position) => {
    //             setCurrentPosition(position / 1000); // Position is in milliseconds, converting to seconds
    //         });
    //     }
    // }, [sound]);

    // // Function to handle Seekbar changes
    // const handleSeekChange = (newValue) => {
    //     if (sound) {
    //         const newPosition = newValue * 1000; // Convert seconds to milliseconds
    //         sound.stop(); // Stop the current playback
    //         sound.play({ position: newPosition }); // Start playback from the new position
    //         setCurrentPosition(newPosition / 1000); // Update the current position in seconds
    //     }
    // };
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-auto'>
        <div className='flex w-full justify-start'>
            <div className='flex items-center gap-x-4'>
                <PlayListItem data={song }/>
                <LikeButton songId={song.id}/>
            </div>
        </div>
        <div className='flex md:hidden col-auto w-full justify-end items-center'>
            <div className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer' onClick={handlePlay}>
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
            <div className='flex flex-1 items-center justify-center'>
            {/* <ReactAudioPlayer
    src={songUrl}
    onLoadedMetadata={handleLoadMetadata}
/> */}
                {/* <Seekbar value={currentPosition} max={song.duration} onChange={handleSeekChange} /> */}
            </div>
        </div>
        <div className='hidden md:flex w-full justify-end pr-2'>
            <div className='flex items-center gap-x-2 w-[120px]'>
                <VolumeIcon size={35} onClick={toggleMute} className='cursor-pointer'/>
                <Slider value={volume} onChange={(value)=> setVolume(value)}/>
            </div>
        </div>
    </div>
  )
}

export default PlayerContent