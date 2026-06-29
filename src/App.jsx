import React from 'react'
import Routing from './router/Routing'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f1e24",
            color: "#e2eef1",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            fontSize: "13px",
          },
        }}
      />
      <Routing />
    </>
  )
}

export default App