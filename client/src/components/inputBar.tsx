import React, {useState} from "react";
import {createPortal} from "react-dom";
import "../scss/inputBar.scss"
import {getBookObject} from "./scripts/getBookObject";
import searchicon from "../images/searchicon.png";
import ReactDOM from "react-dom/client";
import Book from "./bookComponent";

function InputBar() {
    const [inputValue, setInputValue] = useState('')

    async function handleSearch() {
        let response = await getBookObject(inputValue)
        console.log(response)
    }

    return(
        <header className="inputbar">
            <h1 className="title">Book Nook</h1>
            <span className="input">
                <input type="text" className="Searchbar" placeholder="What you are searching for?" onChange={event => {setInputValue(event.target.value)}}/>
                <button className="Search" onClick={handleSearch}>
                    <img src={searchicon} alt="search"/>
                </button>
            </span>
        </header>
    );
}
export default InputBar;