import React, { useState } from 'react';
import axios from 'axios';
const Create = () => {
    const [val, setval]= useState({
        title:'',
        description:'',
        price:'',
        img:'',
        size:'',
        type:''
    })
    const getInput = (x)=>{
        setval((el)=>({...el,[x.target.name]:x.target.value}))
        console.log(val)
    }
    const get_img = async(el)=>{
        try{
            const formData = new FormData()
            const file = el.target.files[0]
            formData.append('image', file)
            const {data}= await axios.post('https://regan-snowboardstore.onrender.com/upload', formData)
            setval((x)=>({...x, [el.target.name]:`https://regan-snowboardstore.onrender.com${data.url}`}))
        }catch(err){
            console.log(err)
        }
    }
    const sendPost = async()=>{
        try{
            await axios.post('https://regan-snowboardstore.onrender.com/posts', val)
        }catch(err){
            console.log(err.response)
        }
    }
    return (
        <div>
            <input onChange={get_img} name='img' type='file'></input>
            <input onChange={getInput} name='title' placeholder='title'></input>
            <input onChange={getInput} name='description' placeholder='desc'></input>
            <input onChange={getInput} name='price' placeholder='price'></input>
            <input onChange={getInput} name='type' placeholder='type'></input>
            <input onChange={getInput} name='size' placeholder='size'></input>
            <button onClick={sendPost}>Создать</button>
        </div>
    );
};

export default Create;