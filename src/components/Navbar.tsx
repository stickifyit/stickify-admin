import { Button } from '@/src/components/ui/button'
import { Home , Users2 ,Box, PencilRuler, Library } from 'lucide-react'
import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import logo from "@/public/logos/logo.png"
type Props = {}


const iconsSize = 16

const links = [
    {
        label: "Dashboard",
        icon: <Home size={iconsSize}/>,
        link: "/"
    },
    {
        label: "Orders",
        icon: <Box size={iconsSize}/>,
        link: "/orders"
    },
    // {
    //     label: "Users",
    //     icon: <Users2 size={iconsSize}/>,
    //     link: "/users"
    // },
    {
        label: "Packs",
        icon: <PencilRuler size={iconsSize}/>,
        link: "/packs"
    },
    {
        label: "Sticker sheets",
        icon: <Library size={iconsSize}/>,
        link: "/sticker-sheets"
    }
]





function Navbar({}: Props) {
  return (
    <div className='w-full max-w-[300px] bg-white h-full'>
        <div className='p-6 flex gap-2 items-center'>
            <img src={logo} className='w-[50px] h-[50px]' height={80} width={80} alt="" />
            <h1 className='text-2xl font-bold text-gray-700 flex items-center gap-2'>Stickify <span className='text-sm uppercase '>| admin</span></h1>
        </div>
        <div className='flex gap-2 flex-col p-2'>
        {
            links.map((link) => {
                return (
                <NavLink to={link.link} className={({isActive})=>'items-center  w-full pl-8 py-3 rounded-xl justify-start flex gap-2 '+ (isActive?"bg-primary text-primary-foreground border border-primary-foreground":"bg-secondary")} key={link.label}>
                    {link.icon}
                    {link.label}
                </NavLink>
                )   
            })
        }
        </div>
    </div>
  )
}




export default Navbar