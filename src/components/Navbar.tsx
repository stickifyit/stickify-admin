import { Button } from '@/src/components/ui/button'
import { Home , Users2 ,Box } from 'lucide-react'
import React from 'react'

type Props = {}


const iconsSize = 16

const links = [
    {
        label: "Dashboard",
        icon: <Home size={iconsSize}/>,
    },
    {
        label: "Orders",
        icon: <Box size={iconsSize}/>,
    },
    {
        label: "Users",
        icon: <Users2 size={iconsSize}/>,
    },
]




function Navbar({}: Props) {
  return (
    <div className='width-full max-w-[300px] bg-white h-full'>
        <div className='flex pt-24 gap-2 flex-col p-2'>
        {
            links.map((link) => {
                return (
                    <Button variant={link.label === 'Dashboard' ? 'default' : 'secondary'} className='w-full pl-8 py-6 justify-start flex gap-2' key={link.label}>
                        {link.icon}
                        {link.label}
                    </Button>
                )   
            })
        }
        </div>
    </div>
  )
}

export default Navbar