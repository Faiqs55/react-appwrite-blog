import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/services';
import PostForm from '../Components/PostForm/PostForm';
import Container from '../Components/Container';

const EditPost = () => {
  const [post, setPost] = useState();
  const {slug} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      if(slug){
        service.getSinglePost(slug).then(data => {
          if(data) setPost(data);
          else navigate('/');
        })
      }else navigate('/');
  }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost