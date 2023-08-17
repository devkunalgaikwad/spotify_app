import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import getSongs from "./getSongs.server";

const getSongsBySearch = async (title:string): Promise<Song[]> => {
  const supabase = createServerComponentClient({cookies})

  if(!title){
    const allSongs =await getSongs()
    return allSongs

  }

  const {data:sessionData, error : sessionError} = await supabase.auth.getSession()
  if (sessionError){
    console.log(sessionError.message)
    return[]
  }
  const {data, error} = await supabase.from('songs').select('*').ilike(`title`,`%${title}%`).order('created_at',{ascending:false})
  if (error) {
    console.log(error)
  }
  return (data as any) || []
};

export default getSongsBySearch;