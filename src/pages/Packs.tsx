import CreateNewPack from '@/components/CreateNewPack'
import CreateNewSticker from '@/components/CreateNewSticker'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { useCurrentContainer } from '@/store/currentContainer'
import axios from 'axios'
import { Search, Trash } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}
interface PackItem {
    _id: string;
    name: string;
    imageURL: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
const Packs = (props: Props) => {

  const {reload} = useCurrentContainer()
  
  const [packs, setPacks] = React.useState<PackItem[]|[]>([])
  React.useEffect(() => {
    axios.get<PackItem[]>("http://localhost:3001/packs/all").then(res => {
      setPacks(res.data)
    })
  },[reload])


  const deletePack = async(id:string,e:React.MouseEvent) => {
    e.stopPropagation()
    const confirm = window.confirm("Are you sure you want to delete this pack?")
    if(!confirm) return
    await axios.delete("http://localhost:3001/packs/"+id).then(() => {
      window.location.reload()
    })
  }
  return (
    <div className='min-h-screen w-full flex-1'>
        <div className='container mx-auto'>
            <div className='flex w-full gap-2 justify-between items-center'>
                <h1 className='text-4xl py-10'>List of packs</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search pack' className='max-w-md flex-1 pl-10'/>
                </div>
                <CreateNewPack/>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                {
                    packs.map((item, index) => (
                        <div className='relative'>
                        <Button className='z-10 absolute top-3 right-3' size={"icon"} variant={"secondary"} onClick={(e)=>deletePack(item._id,e)}><Trash/></Button>
                        <Link to={"/stickers/"+item._id}  key={item._id} className="">
                            <Card key={item._id} className='w-full  rounded-xl overflow-hidden relative'>
                                <img src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" className='aspect-square drop-shadow-md w-full object-cover p-4'/>
                                <div className='p-3 text-center'>
                                    <h3 className='text-center font-semibold'>{item.name}</h3>
                                </div>
                            </Card>
                        </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Packs