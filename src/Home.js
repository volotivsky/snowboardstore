import React, { useEffect, useState } from 'react';
import Header_top from './Components/Header_top';
import Tags from './Components/Tags';
import List_snowboars from './Components/List_snowboars';
import './Home.css'
import axios from 'axios';
import img1 from './Components/img/Снимок экрана 2023-11-25 132402.png'
import img2 from './Components/img/Снимок экрана 2023-11-25 133034.png'

const Home = () => {
    const [data, setdata]= useState()
    axios.interceptors.request.use(function (config) {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization =  token;     
        return config;
    });
    useEffect(()=>{
        try{
            axios.get('https://regan-snowboardstore.onrender.com/auth')
            .then(({data})=>{
                setdata(data)
            })
            .catch(
                console.log('юзер не авторизован')
            )
        }catch(err){
            console.log(err.response)
        }
    },[])
    return (
        <div>
            <div className='header_top'>
              <Header_top data={data}></Header_top>
              <Tags></Tags>
              <img style={{width:'80%', marginLeft:'10%'}} src={img1} alt='fafa'/>
              <img style={{width:'80%', marginLeft:'10%'}} src={img2} alt='fafa'/>
              <List_snowboars></List_snowboars>
            </div>
        </div>
    );
};

export default Home;