import React, { useEffect, useState } from 'react';
import Header_top from './Components/Header_top';
import axios from 'axios';
const Favorite = () => {
    const [posts, setposts] = useState([])
    axios.interceptors.request.use(function (config) {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization =  token;     
        return config;
    });
    useEffect(()=>{
        const func = async ()=>{
            await axios.get('https://regan-snowboardstore.onrender.com/favorite')
            .then(({data})=>{
                setposts(data)
                console.log(data)
            })
        }
        func()
        
    },[])
    const favorite = async (el)=>{
        try{
            const obj = {
                favorite: el.target.name
            }
            await axios.patch("https://regan-snowboardstore.onrender.com/favorite", obj)
            .then(({data})=>{
                console.log(data)
                el.target.style.backgroundColor=data
            })
            window.location.reload()
        } catch(err){
            alert(err)
        }
    }
    console.log(posts)
    return (
        <div>
            <Header_top></Header_top>
            <div className='list_snow'>
            <h2 style={{marginTop:'0px', textAlign:'center'}}>Избранное</h2>
            <div className='list'>
                {posts.map((x)=>(
                    <div className='element' key={x._id}>
                      <img style={{width:'100%', height:'300px'}} src={x.img} alt='fagga'></img>
                      <button onClick={favorite} name={x._id} className='el-btn'>&#9733;</button>
                      <h4 className='el-text'>{x.title}</h4>
                      <p className='el-text'>{x.description}</p>
                      <h3 className='el-text-h4'>{x.price} &#8381;</h3>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Favorite;