import Header from "./Header/header";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
const API = "https://todo-api-sttz.onrender.com"

const AddActivity =()=>{
    const navigate = useNavigate("/")
    const [loading , setLoading] = useState(false)
    const [data , setData] = useState({
        Activity:"",
    })
    const handleChange = (e)=>{
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit =(e)=>{
        setLoading(true)
        e.preventDefault()
        axios.post(API+"/events" ,{
            Activity:data.Activity
        },{
            headers:{
                'authorization':localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res.data)
            setLoading(false)
            alert("Activity Created")
            navigate("/home")
        })
        .catch((e)=>{
            setLoading(false)
            alert(e.response.data)
        })

    }

    return (
        <>
        <Header/>
        {loading?(<div>Loading.....</div>):''}
        <div className="wrapper">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input type={"text"} value={data.Activity} id="Activity" onChange={(e)=>{handleChange(e)}} placeholder="Enter Activity"/>
                <button type="submit">Add+</button>

            </form>

        </div>
        </>
    )
}
export default AddActivity