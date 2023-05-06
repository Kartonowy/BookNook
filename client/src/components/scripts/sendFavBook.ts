import axios from 'axios';


async function sendFavBook(bookObject : any) {
    await axios.get("/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token")}})
        .then( async (data : any) => {
            if (data.data.isLoggedIn) {
                console.log("Logged in")
                await axios.post("/sendFavBook", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({bookObject : bookObject, username : localStorage.username})
                    }
                ).then((res) => {console.log(res)})
            }
        }
    )
}

export default sendFavBook