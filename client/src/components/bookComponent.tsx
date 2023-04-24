import React from "react";
import "../scss/bookComponent.scss";

function Book(bookObject : any) {

    // let booksArr = [];


    return (
        // {books}
        <div className="Book">
            <h3 className={"Title"}><a href={bookObject.bookObject.blink}>{bookObject.bookObject.title}</a></h3>
            <h1 className="Price">{bookObject.bookObject.price + " zł"}</h1>
            <button>Idź do oferty!</button>
        </div>
    )
}
export default Book;