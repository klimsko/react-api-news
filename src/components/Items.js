import React from 'react'
import PropTypes from 'prop-types'

const Items = (props) => {
	const imgStyle = {
		maxWidth: 190,
		width: "100%",
		height: "auto",
		display: "block",
    margin: "19px auto"
	}
	const date = new Date(props.pubDate).toDateString();
	return (
		
			<div className="col-sm-4" id={props.id}>
	      <div className="well">
	        <h4>{props.title}</h4>
	        <img src={props.image} style={imgStyle} alt={props.imgAlt} />
	        <p>{props.text}</p>
	        <b>{date}</b>
	      </div>
	    </div>
    
	)
}

Items.propTypes = {
	pubDate: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export default Items;