import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header_top from './Components/Header_top';
import Tags from './Components/Tags';
import img1 from './Components/img/Снимок экрана 2023-11-30 132256.png'
const Post = () => {
    axios.interceptors.request.use(function (config) {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization =  token;     
        return config;
    });
    const [post, setpost] = useState({
        comments:[]
    })
    const [postrating, setpostraiting]=useState()
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const time = hours+':'+minutes
    const [val, setval]= useState({
        comment:'',
        star:'',
        date:time
    })
    const [postid, setpostid] = useState({
        korzina:''
    })
    useEffect(()=>{
        try{
            const a = async()=>{
                await axios.get('https://regan-snowboardstore.onrender.com'+window.location.pathname)
                .then(({data})=>{
                    setpost(data)
                    setpostid({korzina: data._id})
                })
            }
            a()
            console.log(post)
        }catch(err){
            console.log(err)
        }
    },[])
    const getval = (el)=>{
        setval((x)=>({...x, [el.target.name]:el.target.value}))
        console.log(val)
    }
    const sendcom = async()=>{
        await axios.post('https://regan-snowboardstore.onrender.com/post/65688c91becc6eda626d8624', val)
        window.location.reload()
    }
    const sendkor = async()=>{
        await axios.patch('https://regan-snowboardstore.onrender.com/korzina', postid)
    }
    return (
        <div>
            <Header_top></Header_top>
            <Tags></Tags>
            <div className='post-all'>
                <div className='post-left'>
                    <img style={{width:'80%', marginLeft:'10%', maxWidth:'600px'}} src={post.img}></img>
                    <h2>Характеристики</h2>
                    <p style={{paddingRight:'10px'}}>The Old Skool has never been lacking in attitude. It brought the dawn of the classic Vans side stripe that has developed into a status symbol of tradition and skate stature. Aside from all that personality, they have lasted as long as they have because of their ability to perform on a skateboard, and to last, and last. Though they now share the ranks with many new Vans styles with their own innovations, the Old Skools aren't going anywhere.</p>
                    <img style={{width:'80%', marginTop:'20px'}} src={img1}></img>
                </div>
                <div className='post-right'>
                    <h3>{post.title}</h3>
                    <h2 className='post-price'>{post.price} &#8381; </h2>
                    <p>Таблица размеров</p>
                    <div style={{display:'flex'}}>
                        <button className='post-size'>32,5</button>
                        <button className='post-size'>155</button>
                        <button className='post-size'>32,5</button>
                        <button className='post-size'>32</button>
                        <button className='post-size'>32,5</button>
                        <button className='post-size'>32,5</button>
                    </div>
                    <button onClick={sendkor} value={post._id} className='post-korzina'>ДОБАВИТЬ В КОРЗИНУ</button>
                </div>
            </div>
            <div className='post-coments'>
                <h3>Отзывы о товаре</h3>
                <div className='post-input'>
                    <input onChange={getval} name='comment' className='post-input-input' placeholder='Оставьте отзыв'></input>
                    <button onClick={getval} name='star' value={1} className='post-input-btn-1'>&#9733;</button>
                    <button onClick={getval} name='star' value={2} className='post-input-btn-2'>&#9733;</button>
                    <button onClick={getval} name='star' value={3} className='post-input-btn-3'>&#9733;</button>
                    <button onClick={getval} name='star' value={4} className='post-input-btn-4'>&#9733;</button>
                    <button onClick={getval} name='star' value={5} className='post-input-btn-5'>&#9733;</button>
                    <div style={{background:'#f9f9f9', border:'1px solid #CED4D7', borderLeft:'none'}}>
                        <button onClick={sendcom} className='post-input-btn2'>Отправить</button>
                    </div>
                </div>
                <div style={{width:'94%', marginLeft:'3%'}}>
                    
                    {post.comments.map((x)=>(
                    <div style={{width:'100%'}}>
                    <div style={{marginTop:'30px', display:'inline-block', minWidth:'100px'}}>
                      <div>
                        {x.star=='1'&&<button className='post-coment-btn'>&#9733;</button>}
                        {x.star=='2'&&<>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        </>}
                        {x.star=='3'&&<>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        </>}
                        {x.star=='4'&&<>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        </>}
                        {x.star=='5'&&<>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        <button className='post-coment-btn'>&#9733;</button>
                        </>}
                      </div>
                      <p style={{color:'#e2e2e2', fontSize:'14px', marginLeft:'7px'}}>{x.date}</p>
                    </div>
                    <div style={{marginLeft:'40px', marginTop:'24px', display:'inline-block'}}>
                        <strong><p>{x.user}</p></strong>
                        <p>{x.comment}</p>
                    </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
};

export default Post;