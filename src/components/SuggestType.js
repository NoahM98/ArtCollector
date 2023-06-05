import React from "react";

const SuggestType = ({ title, setFeaturedResult, record, setSuggest }) => {
    return (
        <li onClick={() => {
            setFeaturedResult(record);
            setSuggest({})
        }}>{title}</li>
    )
}

export default SuggestType;
