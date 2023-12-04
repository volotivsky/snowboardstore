import React, { useEffect, useState } from 'react';
import Header_top from './Components/Header_top';
import List_snowboars from './Components/List_snowboars';
import axios from 'axios';
const Korzina = () => {
    const [posts, setposts] = useState([])
    axios.interceptors.request.use(function (config) {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization =  token;     
        return config;
    });
    useEffect(()=>{
        const func = async ()=>{
            await axios.get('https://regan-snowboardstore.onrender.com/korzina')
            .then(({data})=>{
                setposts(data)
            })
        }
        func()
        console.log(posts)
    },[])
    let price = 0
    for(let i=0; i<posts.length;i+=1){
        price+=posts[i].price
    }
    console.log(price)
    return (
        <div>
            <Header_top></Header_top>
            <div className='list_snow'>
            <h2 style={{marginTop:'0px', textAlign:'center'}}>Корзина</h2>
            <div className='list'>
                {posts.map((x)=>(
                    <div className='element' key={x._id}>
                      <img style={{width:'100%', height:'300px'}} src={x.img} alt='fagga'></img>
                      <button className='el-btn'>&#9733;</button>
                      <h4 className='el-text'>{x.title}</h4>
                      <p className='el-text'>{x.description}</p>
                      <h3 className='el-text-h4'>{x.price} &#8381;</h3>
                    </div>
                ))}
            </div>
            <p style={{width:'80%', marginLeft:'10%', fontSize:'20px'}}>Итого: {price} &#8381;</p>
            <button style={{marginLeft:'50%', transform: 'translateX(-50%)', border:'none', backgroundColor:'#99ff99', padding:'10px', lineHeight:'20px', fontWeight:'600', marginBottom:'20px'}}>ПЕРЕЙТИ К ОПЛАТЕ</button>
        </div>
        </div>
    );
};

export default Korzina;