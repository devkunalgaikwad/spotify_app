'use client'

import useGetSongById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer()
    const {song} = useGetSongById(player.activeId)
    const songUrl = useLoadSongUrl(song!)
    if (!song || !songUrl || !player.activeId){
        return null
    }
    return ( 
        <div className="fixed md:bottom-0 bottom-[57px] items-center bg-transparent md:pt-3 w-full pb-1 h-[80px] md:px-0 px-4">
            <PlayerContent song={song} key={songUrl} songUrl={songUrl}/>
        </div>
     );
}
 
export default Player;