import axios from 'axios';


async function sendFavBook(bookObject : any) {
    await axios.get("/api/auth/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token")}})
        .then( async (data : any) => {
            if (data.data.isLoggedIn) {
                console.log("Logged in")
                await axios.post("/api/userdata/handleFav", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({bookObject : bookObject, username : localStorage.username})
                    }
                ).then((res) => {console.log(res)})
            } else {
                alert("You need to login in order to save offers.")
            }
        }
    )
}

export default sendFavBook