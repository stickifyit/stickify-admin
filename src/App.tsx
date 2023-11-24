import { useState } from 'react'
import { Button } from './src/components/ui/button'
import Dashboard from './pages/Dashboard'

import React, {useEffect} from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Stickers from './pages/Stickers';
import Catagories from './pages/Catagories';
import axios from "axios";
import { useContainers } from './store/containers'
import { useCurrentContainer } from './store/currentContainer';
import socket from './lib/socket';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "orders",
    element:
    <>
      <Navbar />
      <Orders/>
    </>,
  },
  {
    path: "users",
    element:
    <>
      <Navbar />
      <Users/>
    </>,
  },
  {
    path: "stickers",
    element:
    <>
      <Navbar />
      <Stickers/>
    </>,
  },
  {
    path: "catagories",
    element:
    <>
      <Navbar />
      <Catagories/>
    </>,
  },
]);



console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
    const {setContainers} = useContainers()
    const {setCurrent,reload,setReload} = useCurrentContainer()
    useEffect(()=>{
        axios.get("http://localhost:3001/containers/containers").then((res)=>{
            console.log(res.data)
            setContainers(res.data)
        })
    },[reload])


    useEffect(()=>{

        // Send a message to the main process to show a notification
        setCurrent(null)
        axios.get<Container>("http://localhost:3001/containers/current").then((res)=>{
            setCurrent(res.data)
            console.log(res.data)
        })
        
    },[reload])

    useEffect(()=>{
        const { ipcRenderer } = window.require('electron');
        const pathIcon = "/public/logos/logo.png"
        const handelAddOrder = ()=>{
          setTimeout(() => {
            setReload(Math.random())
            ipcRenderer.send('show-notification', {
                title: 'New Order',
                body: 'a new order has been added',
                icon: pathIcon
            });
          }, 1000);
        }
        const handelContainerClosed = ()=>{
            setCurrent(null)
            setReload(Math.random())
            ipcRenderer.send('show-notification', {
                title: 'Container Timeout',
                body: 'the container is ready for processing',
                icon: pathIcon
            });
        }
        socket.on("add order",handelAddOrder)
        socket.on("container closed",handelContainerClosed)

        return ()=>{
            socket.off("add order",handelAddOrder)
            socket.off("container closed",handelContainerClosed)
        }
    },[socket])

  return (
    <div className='h-screen flex bg-slate-200'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App