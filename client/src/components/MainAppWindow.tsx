import React, {useState} from "react";
import "../scss/bookContainer.scss";
import "../scss/inputBar.scss"
import "../scss/bookComponent.scss";
import {getBookObject} from "./scripts/getBookObject";
import searchicon from "../images/searchicon.png";

function MainBookFinder() {
    const [inputValue, setInputValue] = useState('')
    const [booksList, setBooksList] = useState([<div></div>,<div></div>])
    let booksArr: any;

    async function handleSearch() {
        let response = await getBookObject(inputValue)
        let booksObjArr : JSX.Element[] = [];
        booksArr = response.book.Empik
        booksArr = booksArr.concat(response.book.SK)
        booksArr.sort((a : any,b : any)=>{
            return parseFloat(a.price) - parseFloat(b.price)
        })
        booksArr.forEach((bookObject : any) => {
            console.log(booksObjArr)
            booksObjArr.push(<div className="Book">
                <h3 className={"Title"}><a href={bookObject.link}>{bookObject.title}</a></h3>
                <h1 className="Price">{bookObject.price}</h1>
                <button>Idź do oferty!</button>
            </div>)
        })
        await setBooksList(prevState => booksObjArr)
    }


    return(
        <div>
            <header className="inputbar">
                <h1 className="title">Book Nook</h1>
                <span className="input">
                    <input type="text" className="Searchbar" placeholder="What you are searching for?" onChange={event => {setInputValue(event.target.value)}}/>
                    <button className="Search" onClick={handleSearch}>
                        <img src={searchicon} alt="search"/>
                    </button>
                </span>
            </header>
            <div className="book-container">
                {booksList}
            </div>
        </div>
            );
}
export default MainBookFinder;