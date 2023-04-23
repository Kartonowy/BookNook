import React, {PropsWithChildren} from "react";
import "../scss/inputBar.scss"

function InputBar(props : PropsWithChildren) {
    return(
        <header className="inputbar">
            <h1 className="title">Book Nook</h1>
            <span className="input">
                <input type="text" className="Searchbar" placeholder="What you are searching for?"/>
                {props.children}
            </span>
        </header>
    );
}
export default InputBar;