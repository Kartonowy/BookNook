function ProfileComponent() {

    function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("loggedIn");
        alert("Successfully logged out")
    }

    return (
        <div className="ProfileContainer">
            <h4 className="Username">{localStorage.getItem("username")}</h4>
            <span className="LogOut" onClick={logOut}>Log out</span>
        </div>
    )

}

export default ProfileComponent