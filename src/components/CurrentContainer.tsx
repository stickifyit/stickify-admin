import { Card, CardHeader, CardTitle } from '@/src/components/ui/card'
import React, { useEffect } from 'react'
import sheet from "@/public/4x4 - (50 sticker).png"
import sheet2 from "@/public/5x5 - (32 sticker).png"
import { Progress } from '@/src/components/ui/progress'
import { Button } from '@/src/components/ui/button'
import { RotateCcw } from 'lucide-react'
import axios from 'axios'

type Props = {}

type TimeObject = 
 { hours: number, minutes: number, seconds: number }

function convertMillisecondsToTime(milliseconds: number):TimeObject {
    // Convert milliseconds to seconds
    const totalSeconds = milliseconds / 1000;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return { hours, minutes, seconds };
}

const maxTime = 1000*60*1
function CurrentContainer({}: Props) {

    const [fill, setFill] = React.useState(0)
    const [time, setTime] = React.useState<TimeObject|null>(null)

    const [current, setCurrent] = React.useState<Container|null>(null)
    const [reload, setReload] = React.useState(0)


    useEffect(()=>{

        // Send a message to the main process to show a notification
        setCurrent(null)
        axios.get<Container>("http://localhost:3001/containers/current").then((res)=>{
            setCurrent(res.data)
            console.log(res.data)
            setFill((res.data?.sheets??0)*25)
        })
        
    },[reload])


    useEffect(() => {
        const { ipcRenderer } = window.require('electron');
        const interval = setInterval(() => {
            if (current) {
                setTime(convertMillisecondsToTime(new Date().getTime() - new Date(current.serverTime).getTime()));
                if (new Date().getTime() - new Date(current.serverTime).getTime() > maxTime) {
                    setCurrent(null)
                    setReload(p=>p+1)
                    ipcRenderer.send('show-notification', {
                    title: 'Container Timeout',
                    body: 'the container is ready for processing',
                    });
                }
            }else{
                setTime(null)
            }
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [current]); // Fix: use 'current' instead of 'time'
    
    
  return (
    <div className='space-y-4 flex flex-col h-screen '>
        <div className='flex items-center justify-between'>
            <h1 className='text-4xl py-6'>Current Container</h1>
            <div>
                <Button onClick={()=>setReload(p=>p+1)} variant={"outline"}  size="icon" ><RotateCcw size={18}/></Button>
            </div>
        </div>

        <div
        className='flex gap-4'
        >
        
        <Card className='max-w-sm flex-1'>
            <CardHeader>
                <CardTitle>
                    Container progress
                </CardTitle>
            </CardHeader>
            <div className='w-full px-4 space-y-4 pb-4'>
                <div className='flex justify-between'>
                    <span>fill container</span>
                    <span>{fill}%</span>
                </div>
                <Progress  value ={fill} />
                <div className='flex justify-between'>
                    <span>time left</span>
                    <span>{time?.hours??0} : {time?.minutes??0} : {Math.floor(time?.seconds??0)}</span>
                </div>
                <Progress value ={((new Date().getTime() - new Date(current?.serverTime ?? new Date()).getTime())*100/(maxTime))}  />
            </div>
        </Card>
        <Card className='max-w-xs flex-1'>
            <CardHeader>
                <CardTitle>
                    Containers state 
                </CardTitle>
            </CardHeader>
            <div className='px-4 py-2 flex items-end justify-between'>
                <div>Ready</div>
                <div className='text-3xl'>3</div>
            </div>
            <div className='px-4 py-2 flex items-end justify-between'>
                <div>Printed</div>
                <div className='text-3xl'>1</div>
            </div>
        </Card>
        </div>
        <Card className=' max-w-5xl'>
            <CardHeader>
                <CardTitle>
                    <div>
                        Container snapshot
                    </div>
                </CardTitle>
            </CardHeader>
                <div className='p-4 border'>
                <div className=' w-full aspect-[9/4] border bg-slate-100 grid grid-cols-4 gap-x-[2px]'>
                    {
                        current?.sheetsIds.map((s, i)=>{
                            return <img key={i} src={"https://storage.googleapis.com/stickify-storage/sheetsSnapshots/"+s+".png"} className='w-full border h-full ' alt="" />
                        })
                    }
                </div>
                </div>
        </Card>
        </div>
  )
}

export default CurrentContainer