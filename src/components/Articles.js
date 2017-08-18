import React, {Component} from 'react'

import Items from './Items'

export default class Articles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			items: [],
			row: []
		}

		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.getArticles(6);
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
      this.addRow();
    }
  }

	getArticles(num) {
		let articles = this.props.articles;
		const url = 'https://www.nytimes.com/';
		let imgLink = '';
		let items = [];
		
		articles.map((item, index) => {
			const day = new Date(item.pub_date).getDate();
			
			if (item.multimedia.length > 0) {
				item.multimedia.map(value => {
					if (value.subtype === 'wide') {
						imgLink = url + value.url;
					}
					return imgLink;
				})
			} else {
					imgLink = "https://cdn.shopify.com/s/files/1/0811/5009/t/6/assets/no-image.svg";
				}
				
			if (day === this.props.day) {
				items.push(
					<Items
						key={index}
						id={item._id}
						title={item.headline.main}
						image={imgLink}
						imgAlt={item.headline.print_headline || item.headline.main}
						text={item.snippet}
						pubDate={item.pub_date}
					/>
				)
			}
			return items;
		})

		this.setState({ items }, this.addRow);
	}

	addRow() {
		let items = this.state.items,
				i = this.state.count,
				row = this.state.row,
				step = 0;

		i === 0 ? step = 9 : step = 3;

		if (i < items.length){
		items = items.slice(i, i+step);

			if (items.length > 3){
				for (let j = 0; j < items.length; j += 3){
					let newItems = items.slice(j, j+3);
					row.push(<div className="row" key={Date.now() + j}>{newItems}</div>);
				}
			} else {
				row.push(<div className="row" key={Date.now()}>{items}</div>);
				}

		}
		
		i += step;
		
		this.setState({ row, count: i });
	}	
	
	render() {
		return (
			<div>
				{this.state.row.length > 0 ? this.state.row : <p>There is no news for this date</p>}
			</div>	
		)
	}
}