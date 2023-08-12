'use client'

import { SongItem } from "@/components/index";
import useOnPlay from "@/hooks/useOnPlay";
import { PageContentProps } from "@/types";

// import { SongItem } from '@/components/index'
// import supabase from '@/config/supabaseClient'
// import { Song } from '@/types'
// import React, { useState, useEffect, useClient } from 'react'

// const PageContent = () => {
//   const [songs, setSongs] = useState<Song[]>([])

//   useEffect(() => {
//     const fetchSongs = async () => {
//       const { data, error } = await supabase.from('songs').select('*')
//       if (error) {
//         setFetchError('Could not fetch the songs')
//         console.log(error)
//       }
//       if (data) {
//         setSongs(data)
//       }
//     }
//     fetchSongs()
//   }, [])

//   if (songs.length === 0) {
//     return (
//       <div className='mt-4 text-neutral-400'>
//         No Songs available.
//       </div>
//     )
//   }

//   return (
//     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
//       {songs.map((item: Song) => (
//         <SongItem key={item.id} onClick={() => {}} data={item} />
//       ))}
//     </div>
//   )
// }

// export default useClient(PageContent);

// export async function getServerSideProps() {
//   const { data, error } = await supabase.from('songs').select('*')
//   if (error) {
//     throw error
//   }
//   return {
//     props: {
//       songs: data,
//     },
//   }
// }

const PageContent =({songs}:PageContentProps)=>{
  const onPlay = useOnPlay(songs)
  if (songs.length===0){
    return(
      <div className="mt-4 text-neutral-400">
        No Song available ...!
      </div>
    )
  }
  return(
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 mt-4">
        {songs.map((item)=>(
          <SongItem key={item.id} onClick={(id:string)=>onPlay(id)} data={item}/>
        ))}
      </div>
    </>
  )
}

export default PageContent;