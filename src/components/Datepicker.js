import React from 'react'

const Datepicker = (props) => {

	return (
		<form onSubmit={props.pickDate}>
			<input
				id="day"
				type="number" placeholder="dd"
				min="1" max="31"
				value={props.day}
				onChange={props.onChangeField.bind(this, "day")}
			/>
			<input
				id="month"
				type="number" placeholder="mm"
				min="1" max="12"
				value={props.month}
				onChange={props.onChangeField.bind(this, "month")}
			/>
			<input
				id="year"
				type="number" placeholder="yyyy"
				min="1851" max="2017"
				value={props.year}
				onChange={props.onChangeField.bind(this, "year")}
			/>
			<button type="submit">Submit</button>
		</form>
	)
}

export default Datepicker;