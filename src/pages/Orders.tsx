import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import React from 'react'
import sheet from "@/public/4x4 - (50 sticker).png"
import sheet2 from "@/public/5x5 - (32 sticker).png"
type Props = {}

const Orders = (props: Props) => {
  return (
    <div className='flex-1 p-4'>
        <Card className='max-w-5xl'>
            <CardHeader>
                <CardTitle>Current Container</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='p-4 border'>
                <div className=' w-full aspect-[9/4] border bg-stone-50 grid grid-cols-4 gap-x-[2px]'>
                    <img src={sheet} className='w-full h-full bg-white' alt="" />
                    <img src={sheet2} className='w-full h-full bg-white' alt="" />
                </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default Orders