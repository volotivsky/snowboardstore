import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const List_snowboars = () => {
    const [posts, setposts]=useState([])
    const [smalllist, setsmalllist] = useState([])
    const token = window.localStorage.getItem('token')
    useEffect(()=>{
        axios.get("https://regan-snowboardstore.onrender.com/posts")
        .then(({data})=>{
            setposts(data)
            const a = [data[1],data[2], data[3], data[0], data[4], data[5]]
            setsmalllist(a)
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
        <div className='list_snow'>
            <h2 style={{marginTop:'0px', textAlign:'center'}}>Новинки</h2>
            <div className='list'>
                {smalllist.map((x)=>(
                    <Link className='element' key={x._id}>
                      <Link to={`/post/${x._id}`}><img style={{width:'100%', height:'300px'}} src={x.img} alt='fagga'></img></Link>
                      {token&&<button value={'white'} onClick={favorite} name={x._id} className='el-btn'>&#9733;</button>}
                      <h4 className='el-text'>{x.title}</h4>
                      <p className='el-text'>{x.description}</p>
                      <h3 className='el-text-h4'>{x.price} &#8381;</h3>
                    </Link>
                ))}
            </div>
            <Link to={'/posts'}><button className='getAllPosts'>Показать больше</button></Link>
        </div>
    );
};

export default List_snowboars;