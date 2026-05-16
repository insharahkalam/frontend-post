import React from 'react'
import Routing from './router/Routing'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routing />
    </>
  )
}

export default App