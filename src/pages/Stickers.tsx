import CreateNewSticker from '@/components/CreateNewSticker'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { useCurrentContainer } from '@/store/currentContainer'
import axios from 'axios'
import { Heart, Search } from 'lucide-react'
import React from 'react'

type Props = {}
interface Sticker {
  _id: string;
  name: string;
  imageURL: string;
  keywords: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
function Stickers({}: Props) {
  const [search, setSearch] = React.useState("")
  const {reload} = useCurrentContainer()

  const [stickers, setStickers] = React.useState<Sticker[]|[]>([])
  React.useEffect(() => {
    axios.post<Sticker[]>("http://localhost:3001/sticker/get-by-category", {
      category: "test category"
    }).then(res => {
      setStickers(res.data)
    })
  },[reload])

  return (
    <div className='min-h-screen w-full flex-1'>
        <div className='container mx-auto'>
            <div className='flex w-full gap-2 justify-between items-center'>
                <h1 className='text-4xl py-10'>Name of packet</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
                <CreateNewSticker/>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                {
                    stickers.map((item, index) => (
                        <Card key={item._id} className='w-full rounded-xl overflow-hidden relative'>
                            <img src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" className='aspect-square drop-shadow-md w-full object-cover p-4'/>
                            <div className='p-3 text-center'>
                                <h3 className='text-center font-semibold'>{item.name}</h3>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Stickers