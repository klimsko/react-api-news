import React, {Component} from 'react'

import Loader from './Loader';
import fetch from 'isomorphic-fetch';
import Items from './Items'

export default class Articles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			articles: [],
			row: [],
			count: 0,
			title: '',
			image: '',
			year: 2017,
			month: 4
		}

		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.sendRequest();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getArticles(3);
    }
  }

	sendRequest() {
		const year = this.state.year,
					month = this.state.month;

		let url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?`;
		const api = "api-key=1d4264cd34b74feda722da8bb27b8788";

		url += api;
		fetch(url)
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(news => {
				this.setState({ 
					articles: news.response.docs, 
					isLoading: false,
					row: [] 
				});
				this.getArticles(6);
				}
			);
	}

	getArticles(num) {
		let articles = this.state.articles;
		const url = 'https://www.nytimes.com/';
		let i = this.state.count;
		let imgLink = '';
		let items = [];
		let row = this.state.row;

		if (i <= articles.length - num){
			articles = articles.slice(i, i+num);

			articles.map((item, index) => {
				if (item.multimedia.length > 0) {
					item.multimedia.map(value => {
						if (value.subtype === 'wide') {
							imgLink = url + value.url;
						}
					})
				} else {
						imgLink = "https://cdn.shopify.com/s/files/1/0811/5009/t/6/assets/no-image.svg";
					}

				items.push(
					<Items
						key={index}
						id={item._id}
						title={item.headline.main}
						image={imgLink}
						text={item.snippet}
						pubDate={item.pub_date}
					/>
				)
				
			})

			if (items.length > 3){
				for (let j = 0; j < items.length; j += 3){
					let newItems = items.slice(j, j+3);
					row.push(<div className="row">{newItems}</div>);
				}
			} else {
				row.push(<div className="row">{items}</div>);
			}
		}
		
		i += num;
		
		this.setState({ row, count: i });
	}

	pickDate() {
		let year = prompt('Year');
		let month = prompt('Month');

		this.setState({year, month}, this.sendRequest);
	}
	
	render() {
		return (
			<Loader isLoading={this.state.isLoading}>
				<div>
					<button onClick={this.pickDate.bind(this)}>Pick the date</button>

						{this.state.row}
					
					<button onClick={this.getArticles.bind(this, 3)}>Next articles...</button>
				</div>
			</Loader>
		)
	}
}