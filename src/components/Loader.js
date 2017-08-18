import React from 'react'
import PropTypes from 'prop-types'

const Loader = (props) => {
	const img_url = 'https://cdn.shopify.com/s/files/1/0811/5009/t/6/assets/no-image.svg';
	if (props.isLoading) {

		return (
			<div className="row">
				<div className="col-sm-12">
		      <div className="well">
		        <h4>Title is loading...</h4>
		        <img src={img_url} style={{display: "block", margin: "auto"}} alt="Here should be something" />
		        <p>Here you will see a short description</p>
		      </div>
		    </div>
			</div>
		)
	} else {
		return props.children;
	}
};

Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

export default Loader;