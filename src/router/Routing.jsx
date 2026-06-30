import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'
import Post from '../pages/Post'
import ErrorPage from '../pages/ErrorPage'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/create' element={<CreatePost />} />
                    <Route path='/' element={<Post />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing