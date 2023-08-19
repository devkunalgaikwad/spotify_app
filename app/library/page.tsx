import Header from '@/components/Header';
import { Box } from '@/components/support_components';
import Library from './components/Library';
import getSongsById from '@/actions/getSongsById';

export const revalidate = 0
const LibraryPage = async () =>{
  const userSongs = await getSongsById()
    return(
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto '>
            <Header className='from-bg-neutral-900'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-white text-3xl font-semibold'>
                        Library
                    </h1>
                    <Box className='overflow-y-auto h-full'>
                      <Library songs={userSongs}/>
                    </Box>
                </div>
            </Header>
        </div>
    )
}

export default LibraryPage