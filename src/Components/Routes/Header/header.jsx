import "../file.css"
const Header = ()=>{
    return(
        <>
        <div className="head-wrapper">
            <h2>Todo_Tasks_App</h2>
            <h3>UserName:{localStorage.getItem("name")}</h3>
        </div>
        
        </>
    )
}
export default Header;
