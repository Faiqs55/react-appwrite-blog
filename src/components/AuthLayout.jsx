import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({childern, authentication=true}) => {
    const navigate = useNavigate();
    const authStat = useSelector(state => state.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(()=> {
        if(authentication && authStat !== authentication){
            navigate('/login');
        }else if(!authentication && authStat !== authentication){
            navigate('/');
        }
        setLoader(false);
    }, [authStat, authentication, navigate])

  return loader ? <h1>Loading</h1> : <>{childern}</>
}

export default AuthLayout