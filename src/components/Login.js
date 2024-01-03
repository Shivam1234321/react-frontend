import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken, setAuthUser } from "../auth/AuthData";
import checkAuth from "../auth/CheckAuth";

export const Login = () =>{
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate= useNavigate();

    useEffect(() =>{
        if(checkAuth()){
            navigate('/');
        }
    },[]);

    const handelLogin= async ()=>{
        let result= await fetch(`${process.env.REACT_APP_API_URL}login`, {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result= await result.json();
        if(result.auth){
            setAuthUser(JSON.stringify(result.user));
            setAuthToken(result.auth);
            navigate('/');
        }else{
            alert(result.result)
        }
        
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input type='text' placeholder='Enter Email' className='inputBox' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Enter Password' className='inputBox' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='submitButton' onClick={handelLogin} type='button'>Submit</button>
        </div>
    )
}