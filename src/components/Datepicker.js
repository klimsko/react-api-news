import React from 'react'
import PropTypes from 'prop-types'

const Datepicker = (props) => {
	return (
		<form className="form-inline text-center" onSubmit={props.pickDate}>
		  <div className="form-group">
		    <label htmlFor="day" className="sr-only">Day</label>
		      <input 
		      	className="form-control" 
		      	type="number" 
		      	id="day" 
		      	placeholder="DD"
		      	min="1" max="31"
		      	value={props.day}
						onChange={props.onChangeField.bind(this, "day")}
		      />
		    <label htmlFor="month" className="sr-only">Month</label>
		      <input 
		      	className="form-control" 
		      	id="month"
						type="number" placeholder="mm"
						min="1" max="12"
						value={props.month}
						onChange={props.onChangeField.bind(this, "month")}
		      />
		    <label htmlFor="year" className="sr-only">Year</label>
		      <input 
		      	className="form-control" 
		      	id="year"
						type="number" placeholder="yyyy"
						min="1851" max="2017"
						value={props.year}
						onChange={props.onChangeField.bind(this, "year")}
		      />
		    <button 
		    	type="submit" 
		    	className="btn btn-default btn-block" 
		    	disabled={!props.btnActive}
		    > Submit 
		    </button>
		  </div>
	  </form>
	)
}

Datepicker.propTypes = {
	pickDate: PropTypes.func.isRequired,
	btnActive: PropTypes.bool.isRequired,
	onChangeField: PropTypes.func.isRequired,
	day: PropTypes.string.isRequired,
	month: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired
}

export default Datepicker;