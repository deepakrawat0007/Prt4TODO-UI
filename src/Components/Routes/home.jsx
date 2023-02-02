import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import Header from "./Header/header"
import "./file.css"
const API = "https://todo-api-sttz.onrender.com"
const Home = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [status, setStatus] = useState("Ongoing")
    const [loading, setLoading] = useState(true)
    const [clicked, setClick] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        } else {
            axios.get(API + "/events", {
                headers: {
                    'authorization': localStorage.getItem("token")
                }
            })
                .then((res) => {
                    console.log(res.data)
                    setData(res.data)
                    setLoading(false)
                })
                .catch((e) => {
                    alert(e.message)
                })
        }
    }, [])
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    const handleAddActivity = () => {
        navigate("/AddActPage")
    }

    const handleToggle = (id) => {

        setClick(true)
        const Filterdata = data.filter(item => item._id === id)
        console.log(Filterdata)
        if (Filterdata.Status === "Pending") {
            setStatus("Ongoing")
        } else {
            setStatus("Completed")
        }
        // console.log(status)
        axios.put(API + `/events/updateStatus/${id}`, {
            Status: status,
            start_time: new Date("2022-12-31T10:00:00")
        }, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        }
        )
            .then((res) => {
                console.log(res.data)
                // setData(res.data)

            })
            .catch((e) => {

                alert(e.response.data)
            })

    }

    const filterpost = data.filter(items => items.Status === "Completed")

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="side-bar">
                    <div>
                        <h2>To DO List</h2>
                        <h3>History</h3>
                        <div className="history">{filterpost.map((items, idx) => (
                            <li>{items.Activity}</li>
                        ))}</div>
                        <button className="btns" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="table">
                    <button className="btn" onClick={handleAddActivity}>Add New Activity+</button>
                    <div>
                        <table>
                            <tr>
                                <th>Activity</th>
                                <th>Status</th>
                                <th>TimeTaken</th>
                                <th>Action</th>
                            </tr>
                            {!loading?data.map((items, idx) => (
                                <tr key={idx}>
                                    <td>{items.Activity}</td>
                                    <td>{items.Status}</td>
                                    <td></td>
                                    <td>{items.Status === "Pending" ? (<button onClick={() => { handleToggle(items._id) }}>Start</button>) : items.Status === "Ongoing" ? (<div><button onClick={() => { handleToggle(items._id) }}>End</button><button >Pause</button></div>) : ""}</td>
                                </tr>
                            )):''}
                        </table>

                    </div>
                </div>

            </div>
        </>
    )
}
export default Home;

