import React, { useState, useEffect } from 'react';
import Header_top from './Components/Header_top';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from './Components/img/Снимок экрана 2023-11-28 170823.png'
const Allposts = () => {
    const token = window.localStorage.getItem('token')
    const [posts, setposts] = useState([])
    const [constpost, setconstpost] = useState([])
    const [red, setred]=useState('black')
    const [black, setblack]=useState('rgb(191, 191, 191);')
    const a = (el)=>{
        el.target.checked==true?setred('rgb(255, 77, 77)'):setred('black')
        el.target.checked==true?setblack('black'):setblack('rgb(191, 191, 191)')
        el.target.checked==true?setposts(posts.filter((x)=>x.size==el.target.name)):setposts(constpost)
    }
    useEffect(()=>{
        axios.get('https://regan-snowboardstore.onrender.com/posts')
        .then(({data})=>{
            setposts(data)
            setconstpost(data)
        })
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
        } catch(err){
            alert(err)
        }
    }
    return (
        <div>
            <Header_top></Header_top>
            <img style={{width:'100%'}} src={img} alt='agg'></img>
            <div style={{width:'80%', marginLeft:'10%'}}>
                <h2>Наши товары ({posts.length})</h2>
            </div>
            <div>
                <button>Скрыть фильтры</button>
            </div>
            <div style={{width:'80%', marginLeft:'10%', display:'flex'}}>
                <div style={{width:'25%'}}>
                    <h4>Категории товаров</h4>
                    <div className='filter-1' style={{display:'flex'}}>
                        <input name='Сноуборд' className='filter-1-inp' onClick={a} type='checkbox'></input>
                        <p style={{color:red}} className='filter-1-p'>Сноуборды</p>
                        <p style={{color:black}} className='filter-1-num'>30</p>
                    </div>
                    <h4>Размер</h4>
                    <div className='filter-1' style={{display:'flex'}}>
                        <input name='XS' className='filter-1-inp' onClick={a} type='checkbox'></input>
                        <p style={{color:red}} className='filter-1-p'>XS</p>
                        <p style={{color:black}} className='filter-1-num'>{posts.filter((x)=>x.size=='XS').length}</p>
                    </div>
                    <div className='filter-1' style={{display:'flex'}}>
                        <input name='S' className='filter-1-inp' onClick={a} type='checkbox'></input>
                        <p style={{color:red}} className='filter-1-p'>S</p>
                        <p style={{color:black}} className='filter-1-num'>{posts.filter((x)=>x.size=='S').length}</p>
                    </div>
                    <div className='filter-1' style={{display:'flex'}}>
                        <input name='M' className='filter-1-inp' onClick={a} type='checkbox'></input>
                        <p style={{color:red}} className='filter-1-p'>M</p>
                        <p style={{color:black}} className='filter-1-num'>{posts.filter((x)=>x.size=='M').length}</p>
                    </div>
                </div>
                <div style={{display:'flex', flexFlow:'wrap', width:'75%'}}>
                {posts.map((x)=>(
                    <Link className='element' key={x._id}>
                      <Link to={`/post/${x._id}`}><img style={{width:'100%', height:'300px'}} src={x.img} alt='fagga'></img></Link>
                      <button value={'white'} onClick={favorite} name={x._id} className='el-btn'>&#9733;</button>
                      <h4 className='el-text'>{x.title}</h4>
                      <p className='el-text'>{x.description}</p>
                      <h3 className='el-text-h4'>{x.price} &#8381;</h3>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Allposts;