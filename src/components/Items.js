import React from 'react'

const Items = (props) => {
	const imgStyle = {
		width: 190,
		display: "block",
    margin: "19px auto"
	}
	const date = new Date(props.pubDate).toDateString();
	return (
		
			<div className="col-sm-4" id={props.id}>
	      <div className="well">
	        <h4>{props.title}</h4>
	        <img src={props.image} style={imgStyle} />
	        <p>{props.text}</p>
	        <b>{date}</b>
	      </div>
	    </div>
    
	)
}

export default Items;