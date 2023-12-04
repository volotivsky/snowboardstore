import React from 'react';
import img from './img/469c6f7badd2745729fc122782c19ff9.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const Header_top = (props) => {
    const val = props.data
    console.log(val)
    const token = window.localStorage.getItem('token')
    const logout = ()=>{
        if(token){
            window.localStorage.removeItem('token')
            window.location.reload()
        }
    }
    return (
        <div style={{width:'80%', marginLeft:'10%', display: 'flex', height:'130px'}}>
            <div style={{width:'25%', height:'10px'}}></div>
            <Link to={'/'} style={{width:'50%',textDecoration:'none',color:'black', height:'10px', textAlign:'center', lineHeight:'130px', fontSize:'34px', fontWeight:'600'}}>
                BOARDRIDERS
            </Link>
            <div style={{width: '25%', height:'10px', display:'flex', textAlign:'center', lineHeight:'30px'}}>
                <Link to={'/favorite'}>
                    <img src={img} style={{width:'50px', marginTop:'30px'}} alt='qw'></img>
                    <p className='header-btn'>избранное</p>
                </Link>
                <Link to={'/korzina'}>
                    <img src={img} style={{width:'50px', marginTop:'30px'}} alt='qw'></img>
                    <p className='header-btn'>корзина</p>
                </Link>
                {!token?<Link to={'/login'}>
                    <img src={img} style={{width:'50px', marginTop:'30px'}} alt='qw'/>
                    <p className='header-btn'>войти</p>
                </Link>:<button onClick={logout} className='header-logout'>выйти</button>}
            </div>
        </div>
    );
};

export default Header_top;