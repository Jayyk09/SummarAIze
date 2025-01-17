import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from '@mui/material'

function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
