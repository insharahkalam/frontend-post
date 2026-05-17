import React from 'react'
import Routing from './router/Routing'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
      }} />
      <Routing />
    </>
  )
}

export default App