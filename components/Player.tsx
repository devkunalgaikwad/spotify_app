'use client'

import useGetSongById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import FooterNav from "./FooterNav";

const Player = () => {
    const player = usePlayer()
    const {song} = useGetSongById(player.activeId)
    const songUrl = useLoadSongUrl(song!)
    if (!song || !songUrl || !player.activeId){
        return null
    }
    return ( 
        <div className="fixed bottom-[63px] bg-black w-full pb-2 h-[auto] px-4">
            <PlayerContent song={song} key={songUrl} songUrl={songUrl}/>
        </div>
     );
}
 
export default Player;