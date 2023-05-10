import React, {useState} from "react";
import "../scss/bookContainer.scss";
import "../scss/inputBar.scss"
import "../scss/bookComponent.scss";
import {getBookObject} from "./scripts/getBookObject";
import searchicon from "../images/searchicon.png";
import LoginFormComponent from "./loginFormComponent";
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import sendFavBook from "./scripts/sendFavBook";
import retrieveFavBooks from "./scripts/retrieveFavBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProfileComponent from "./profileComponent";

function MainBookFinder() {
    const [inputValue, setInputValue] = useState('')
    const [booksList, setBooksList] = useState([<div></div>,<div></div>])
    const [loginFormVisibility, setLoginFormVisibility] = useState(false);
    let booksArr: any;

    //TODO: CLOSE WINDOW UPON LOGGING OUT
    // CLOSE WINDOW UPON LOGGING / REGISTERING
    // USER AVATAR??
    async function handleFav(bookObject : any) {
        await sendFavBook(bookObject)
    }

    async function handleRetrieveFav() {
        let booksArr =  await retrieveFavBooks()
        if (booksArr.length === 0) return;
        await updateBooksArr(booksArr)
    }

    async function handleSearch() {
        let response = await getBookObject(inputValue)
        booksArr = response.message.Empik
        booksArr = booksArr.concat(response.message.SK)
        booksArr = booksArr.filter((book: any) => book.price !== '')
            .sort((a : any,b : any)=>{
            return parseFloat(a.price) - parseFloat(b.price)
        })
        await updateBooksArr(booksArr)
    }
    async function updateBooksArr(booksArr : any) {
        let booksObjArr : JSX.Element[] = [];
        booksArr.forEach((bookObject : any, index : number) => {
            booksObjArr.push(<li className="Book" key={index}>
                <div className="baseInfo">
                    <h3 className={"Title"}>
                        <a href={bookObject.link}>{bookObject.title}</a>
                    </h3>
                    <h5>{bookObject.author.replaceAll("\n", "").replaceAll(" ,", ", ")}</h5>
                </div>
                <h1 className="Price">{bookObject.price}</h1>
                <div className="smartContainer">
                    <FontAwesomeIcon icon={faStar} onClick={()=>handleFav(bookObject)} className="starIcon"></FontAwesomeIcon>
                    <div className="buttonContainer">
                        <button onClick={() => {window.open(bookObject.link)}}>Idź do oferty!</button>
                    </div>
                </div>
            </li>)
        })
        await setBooksList(() => booksObjArr)
    }

    return (
        <div>
            <header className="inputbar">
                <h1 className="title">Book Nook</h1>
                <span className="input">
                    <div className="inputcontainer">
                        <input type="text" className="Searchbar" placeholder="What are you searching for?"
                               onChange={event => {
                                   setInputValue(event.target.value)
                               }}
                               onKeyDown={event => {
                                   if (event.key === "Enter") handleSearch()
                               }
                               }/>
                    </div>
                    <button className="Search" onClick={handleSearch}>
                        <img src={searchicon} alt="search"/>
                    </button>
                </span>
                <div className="menu">
                    <FontAwesomeIcon icon={faStar} className="favourites" onClick={handleRetrieveFav}></FontAwesomeIcon>
                    <div className="iconContainer">
                        <FontAwesomeIcon icon={faUser} className="userIcon" onClick={()=>{loginFormVisibility ? setLoginFormVisibility(false) : setLoginFormVisibility(true)}}/>
                    </div>
                </div>
            </header>
            <ul className="book-container">
                {booksList}
            </ul>
            {loginFormVisibility ? <div className="Login">{localStorage.getItem("loggedIn") ? <ProfileComponent></ProfileComponent> : <LoginFormComponent></LoginFormComponent>}</div>: null}
        </div>
    )
}
export default MainBookFinder;