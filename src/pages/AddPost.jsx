import React from 'react'
import { Container, PostForm } from '../components/index'

function AddPost() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-r g-gradient-to-r from-gray-800 via-gray-900 to-black py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost;
