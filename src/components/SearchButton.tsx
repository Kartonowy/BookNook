import React from "react";
import searchicon from "../images/searchicon.png"
import generateResponse from "../scripts/generateResponse"

function Button() {
    return(
        <button className="Search" onClick={()=> generateResponse("Babel")}>
            <img src={searchicon} alt="search"/>
        </button>
    )
}
export default Button;