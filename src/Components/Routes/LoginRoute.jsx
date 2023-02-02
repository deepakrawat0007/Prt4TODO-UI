
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./file.css"
const API = "https://todo-api-sttz.onrender.com"

const Login = ()=>{
     const navigate = useNavigate("/")
     const [loading , setLoading] = useState(false)
    const [data , setData] = useState({
        username:"",
        password:"",
    })
    const handleChange = (e)=>{
       
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit =(e)=>{
        setLoading(true)
        e.preventDefault()
        axios.post(API+"/login" ,{
            username:data.username,
            password:data.password,
        })
        .then((res)=>{
            setLoading(false)
            console.log(res.data)
            alert(`Hello ${res.data.Name}`)
            localStorage.setItem("token" , res.data.token)
            localStorage.setItem("name" , res.data.Name)
            navigate("/home")
        })
        .catch((e)=>{
            setLoading(false)
            alert(e.response.data)
            navigate('/register')
            // console.log(e.message)
            // console.log(e.response.data)
        })

    }
    return (
    <>
        {loading?<div>Loading....</div>:''}
        <div className="pageview"><div className="wrapper">
            
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <h1>Member Login</h1>
            <input type="text" placeholder="USER-NAME" id="username" value={data.username} onChange={(e)=>{handleChange(e)}}/>
            <input type="password" placeholder="PASSWORD" id="password" value={data.password} onChange={(e)=>{handleChange(e)}}/>
            <button type="submit">LOGIN</button>
            <p onClick={()=>{navigate("/register")}}>Member Register</p>
        </form>
        
        </div>
        </div>
        </>
    )
}

export default Login