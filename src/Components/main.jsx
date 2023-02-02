import {BrowserRouter , Routes , Route} from "react-router-dom"
import Login from "./Routes/LoginRoute"
import Registration from "./Routes/Registration"
import Home from "./Routes/home"
import AddActivity from "./Routes/AddPage"

const Main = ()=>{
    return (
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/AddActPage" element={<AddActivity/>}/>
       </Routes>
       </BrowserRouter>
    )
}

export default Main