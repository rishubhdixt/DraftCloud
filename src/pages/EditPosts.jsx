import React,{useState,useEffect} from 'react'
import { Container ,PostForm } from '../components'
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'

 
function EditPosts() {
    const [post,setPosts]=useState(null)
    const navigate=useNavigate()
    const {slug}=useParams()

    useEffect(()=>{
   if(slug){
    service.getPost().then((post)=>{
        setPosts(post)
    })
   }
    else
     navigate('/')

    },[slug,navigate])

  return post?(
    <div className='py-8'>
    <Container>
    <PostForm  post={post}/>
    
    </Container>
    </div>
  ) :null
    
}

export default EditPosts