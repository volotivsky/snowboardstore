import React, { useState } from 'react';
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const[val, setval] = useState({
        email:'',
        password:''
    })
    const[val2, setval2] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const getlogin = (el)=>{
        setval((x)=>({...x, [el.target.name]:el.target.value}))
    }
    const login = async()=>{
        try{
            await axios.post('https://regan-snowboardstore.onrender.com/login', val)
            .then(({data})=>{
                console.log(data)
                window.localStorage.setItem('token', data)
                navigate('/')

            })
        }catch(err){
            alert(err.response.data)
            window.location.reload()
        }
    }
    const getregister = (el)=>{
        setval2((x)=>({...x, [el.target.name]:el.target.value}))
    }
    const register = async()=>{
        try{
            await axios.post('https://regan-snowboardstore.onrender.com/register', val2)
            .then(({data})=>{
                console.log(data)
                alert('регистрация успешна, а теперь войдите')
                window.location.reload()
            })
        }catch(err){
            alert(err.response.data)
            window.location.reload()
        }
    }
    return (
        <div className='login-all' style={{backgroundColor:'black'}}>
            <div className='login' style={{backgroundColor:'white'}}>
                <h3 style={{textAlign:'center', marginBottom:'50px', paddingTop:'30px'}}>Чтобы полностью воспользоваться сайтом выполните вход или зарегистрируйтесь на сайте</h3>
                <div style={{display:'flex'}}>
                    <div style={{width:'50%',paddingLeft:'30px'}}>
                        <h2>Вход</h2>
                        <input className='login-input' onChange={getlogin} name='email' placeholder='email'></input>
                        <input className='login-input' onChange={getlogin} name='password' placeholder='Пароль'></input>
                        <button onClick={login} className='login-btn1'>Войти</button>
                    </div>
                    <div style={{width:'50%', backgroundColor: 'rgb(245,245,245)',paddingLeft:'30px', paddingBottom:'20px'}}>
                        <h2>Регистрация</h2>
                        <input onChange={getregister} name='name' className='login-input' placeholder='Имя*'></input>
                        <input onChange={getregister} name='email' className='login-input' placeholder='email*'></input>
                        <input onChange={getregister} name='password' className='login-input' placeholder='Пароль*'></input>
                        <button onClick={register} className='login-btn2'>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;