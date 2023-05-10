import axios from "axios";

async function retrieveFavBooks()  {
    let booksObjArr : JSX.Element[] = [];
    await axios.get("/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token")}})
        .then( async (data : any) => {
                if (data.data.isLoggedIn) {
                    console.log("Logged in")
                    await axios.post("/retrieveFavBooks", {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({username : localStorage.username})
                        }
                    ).then((res : any) => {
                        console.log(res)
                        booksObjArr = res.data.favbooks
                    })
                } else {
                    alert("Log in to see saved offers.")

                }
            }
        ).catch(err=>console.log(err))
    return booksObjArr
}
export default retrieveFavBooks