import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'
import Post from '../pages/Post'
import ErrorPage from '../pages/ErrorPage'
import Signup from '../pages/Signup'
import Login from '../pages/Login'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/create' element={<CreatePost />} />
                    <Route path='/post' element={<Post />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing