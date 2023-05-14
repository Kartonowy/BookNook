import axios from "axios";

function updateSearchAmount() {
    let searchAmount: any = localStorage.getItem("searchAmount");
    localStorage.setItem("searchAmount", JSON.stringify(parseInt(searchAmount) + 1))
    axios.post("/updateSearchAmount", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username : localStorage.getItem("username")})
    })
}

export default updateSearchAmount