import React from 'react';

const Like = ({ liked, onClick }) => {
    let classes = "fa fa-heart"
    if(!liked) classes += "-o"
    return (
        <>
        <i style={{ cursor: "pointer", marginRight: "7px" }} className={classes} aria-hidden="true" onClick={onClick} />
        </>
    )
}

export default Like;  