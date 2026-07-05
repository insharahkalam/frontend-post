import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'
import Post from '../pages/Post'
import MyPost from '../pages/MyPost'
import ErrorPage from '../pages/ErrorPage'
import PostDetail from '../pages/PostDetails'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/create' element={<CreatePost />} />
                    <Route path='/' element={<Post />} />
                    <Route path='/myPost' element={<MyPost />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing