import React from 'react';
import image from "../../assets/notdata_5.png"
function DataIsEmpty() {
    return (
        <div className="flex-display-one">
        <img src={image} alt="data is empty" />
        </div>
    );
}

export default DataIsEmpty;
