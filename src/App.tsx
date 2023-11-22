import { useState } from 'react'
import { Button } from './src/components/ui/button'
import Dashboard from './pages/Dashboard'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)
  return (
    <Dashboard/>
  )
}

export default App