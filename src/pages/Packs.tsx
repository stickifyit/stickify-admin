import CreateNewSticker from '@/components/CreateNewSticker'
import { Input } from '@/src/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

type Props = {}

const Packs = (props: Props) => {
  return (
    <div className='min-h-screen w-full flex-1'>
        <div className='container mx-auto'>
            <div className='flex w-full gap-2 justify-between items-center'>
                <h1 className='text-4xl py-10'>List of packs</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search pack' className='max-w-md flex-1 pl-10'/>
                </div>
                <CreateNewSticker/>
            </div>
        </div>
    </div>
  )
}

export default Packs