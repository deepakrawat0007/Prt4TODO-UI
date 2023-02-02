import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./file.css"
const API = "https://todo-api-sttz.onrender.com"

const Registration = ()=>{
     const navigate = useNavigate("/")
     const [loading , setLoading] = useState(false)
    const [data , setData] = useState({
        username:"",
        password:"",
        Cpassword:""
    })
    const handleChange = (e)=>{
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit =(e)=>{
        setLoading(true)
        e.preventDefault()
        axios.post(API+"/register" ,{
            username:data.username,
            password:data.password,
            Cpassword:data.Cpassword
        })
        .then((res)=>{
            // console.log(res.data)
            setLoading(false)
            alert("User Created Successfully")
            navigate("/")
        })
        .catch((e)=>{
            alert(e.response.data)
            setLoading(false)
            // console.log(e.message)
            // console.log(e.response.data)
        })

    }
    return (
        <>
        {loading?<div>Loading....</div>:''}
        <div className="pageview"><div className="wrapper">
            
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <h1>REGISTER</h1>
            <input type="text" placeholder="USER-NAME" id="username" value={data.username} onChange={(e)=>{handleChange(e)}}/>
            <input type="password" placeholder="PASSWORD" id="password" value={data.password} onChange={(e)=>{handleChange(e)}}/>
            <input type="password" placeholder="CONFIRM-PASSWORD" id="Cpassword" value={data.Cpassword} onChange={(e)=>{handleChange(e)}}/>
            <button type="submit">REGISTER</button>
            <p onClick={()=>{navigate("/")}}>Member Login</p>
        </form>
        
        </div>
        </div>
        </>
    )
}

export default Registration