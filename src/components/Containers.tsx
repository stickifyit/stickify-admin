import React,{useEffect} from 'react'
import axios from "axios"
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { useContainers } from '@/store/containers'
type Props = {}

function Containers({}: Props) {
    const {containers,setContainers} = useContainers()
  return (
    <div className='grid grid-cols-2  gap-2'>
        {
            containers?.map((container)=>{
                
                return  <div key={container._id} className='p-2 flex gap-4 pb-2 border-b'>
                           <div className='w-[300px] grid grid-cols-2 grid-rows-2 rounded-md gap-0 aspect-[4/6] max-w-xl bg-slate-300'>
                            {
                                container?.sheetsIds?.map((sheet)=>{
                                    return <img key={sheet._id} src={sheet.image} className='w-full object-contain border h-full ' alt="" />
                                })
                            }
                           </div>
                           <div className='flex flex-1 flex-col'>
                               <div  className='text-2xl'>Ready</div>
                               <div className='text-md'>{container?.sheets} Sheets</div>
                               <p>it took 23 hours to be ready</p>
                               <p className='flex gap-2 text-sm'>{container._id}</p>
                               <div className='flex-1 flex justify-end items-end'>
                                    <Button>Process</Button>
                               </div>
                           </div>
                        </div>
            })
        }
    </div>
  )
}

export default Containers