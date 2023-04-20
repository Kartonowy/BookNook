import React, {PropsWithChildren} from 'react';
import "../scss/bookContainer.scss";

function BookContainer(props : PropsWithChildren) {
    return(
        <div className="book-container">
            {props.children}
        </div>
    )
}

export default BookContainer;