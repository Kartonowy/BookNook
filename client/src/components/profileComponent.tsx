import {useEffect, useState} from "react";
import axios from "axios";

function ProfileComponent() {
    const [userStats, setUserStats] = useState({searchAmount : 0, favbooksAmount : 0})

    function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("searchAmount")
        alert("Successfully logged out")
    }

    async function handleGetData() {
        await axios.post("/getUserStats", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username : localStorage.getItem("username")})
        }).then((res : any)=> {
            console.log(res)
            setUserStats(res.data)
        })
    }

    useEffect(()=> {
        handleGetData();
    }, [])

    return (
        <div className="ProfileContainer">
            <span className="welcomeMessage">Welcome, <span className="username">{localStorage.getItem("username")}</span></span>
            <span className="favBookCount">{userStats.favbooksAmount}</span>
            <span className="searchAmount">{userStats.searchAmount}</span>
            <span className="LogOut" onClick={logOut}>Log out</span>
        </div>
    )

}

export default ProfileComponent