import { useState } from 'react'
import { Button } from './src/components/ui/button'
import Dashboard from './pages/Dashboard'

import * as React from "react";
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
  const [count, setCount] = useState(0)
  return (
    <div className='h-screen flex bg-slate-200'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App