import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Book from './components/bookComponent';
import InputBar from "./components/inputBar";
import BookContainer from "./components/bookContainer";
import SearchButton from "./components/SearchButton";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let B = {title: "Babel czyli o konieczności przemocy", price: 32.44, author: "R.F.Kuang", blink: "https://github.com/", btype: "hardcover", cover: "https://ecsmedia.pl/c/babel-czyli-o-koniecznosci-przemocy-w-iext126543318.jpg"};
console.log(B)

root.render(
    <React.StrictMode>
        <App>
            <InputBar>
                <SearchButton></SearchButton>
            </InputBar>
            <BookContainer>
                <Book bookObject={B}></Book>
            </BookContainer>
        </App>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
