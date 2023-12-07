import CreateStickerSheet from '@/components/CreateNewStickerSheet';
import { BackendHost } from '@/constants/backend';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import axios from 'axios'
import { Trash } from 'lucide-react';
import React from 'react'

type Props = {}

export type Sheet = {
    _id: string;
    name: string;
    description: string;
    snapshot: string;
    __v: number;
};

export default function StickersSheets({}: Props) {
    const [sheets, setSheets] = React.useState<Sheet[]>([])

    React.useEffect(() => {
        axios.get<Sheet[]>(BackendHost+"/sticker-sheet/all").then((res) => {
            setSheets(res.data)
            console.log(res.data)
        })
    }, [])
    
    const createNew = () => {
        alert("hello world")
    }
  return (
    <div className='container relative h-screen overflow-y-auto'>
        <div className='mt-8 z-10 flex gap-2 justify-between py-4 sticky top-0 bg-white px-4 rounded-xl'> 
            <h1 className='text-4xl font-medium'>Stickers</h1>
            <CreateStickerSheet/>
        </div>
        <div className='grid py-8 px-8 gap-4 grid-cols-4'>
            {
                sheets.map((sheet, index) => (
                    <SheetComp key={index} index={index} sheet={sheet}/>
                ))
            }
        </div>
    </div>
  )
}


export const SheetComp = ({index,sheet}:{index:number,sheet:Sheet}) => {
    const deleteSheet = () => {
        const confirm = window.confirm("Are you sure you want to delete this sheet?")
        if(!confirm) return
        axios.delete(BackendHost+"/sticker-sheet/"+sheet._id).then(() => {
            window.location.reload()
        })
    }
    return(
        <Card className='relative'>
            <Button onClick={deleteSheet} size={"icon"} variant={"secondary"} className='absolute top-3 right-3'><Trash/></Button>
            <CardContent className='px-2  py-2'>
            <img src={sheet.snapshot} alt={sheet.name} className='w-full rounded-lg'></img>
            </CardContent>
            <CardFooter>
                <CardTitle>{sheet.name}</CardTitle>
            </CardFooter>
        </Card>
    )   
}