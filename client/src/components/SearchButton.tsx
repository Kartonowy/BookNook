import React from "react";
import searchicon from "../images/searchicon.png"

function Button() {
    return(
        <button className="Search" onClick={()=> generateResponse("Babel")}>
            <img src={searchicon} alt="search"/>
        </button>
    )
}
export default Button;