import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import { toast } from "react-hot-toast";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({cookies})
  const {data:{session}}= await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('like_songs')
    .select('*,songs(*)')
    .eq('user_id',session?.user?.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
    return []
  }
  if (!data){
    toast.arguments('No liked songs by you')
    return []
  }
  return data.map((item)=>({
    ...item.songs
  }))

}

export default getLikedSongs;