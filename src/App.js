import React, { Component } from 'react';

import Articles from './components/Articles';
import Datepicker from './components/Datepicker';
import Loader from './components/Loader';
import fetch from 'isomorphic-fetch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isLoading: true,
      btnActive: true,
      day: '',
      month: '',
      year: ''
    }
  }

  componentDidMount() {
    const date = new Date(),
          day = date.getDate()-1,
          month = date.getMonth()+1,
          year = date.getFullYear();

    this.setState({ day: day.toString(), month: month.toString(), year: year.toString() },
      this.sendRequest
    )
  }

  sendRequest() {
    const year = +this.state.year,
          month = +this.state.month;

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
          isLoading: false
        });
        }
      );
  }

  pickDate(e) {
    e.preventDefault();
    
    this.setState({ isLoading: true }, this.sendRequest);
  }

  onChangeField(field, event) {
    this.setState({
      [field]: event.target.value
    }, this.validateDatePicker)
  }

  validateDatePicker() {
    const day = this.state.day,
          month = this.state.month,
          year = this.state.year;

    this.setState ({
      btnActive: 
        day >= 1 && day <= 31 &&
        month >= 1 && month <= 12 &&
        year >= 1851 && year <= 2017
    })
  }

  render() {
    return (
      <div>
        
        <nav className="navbar navbar-inverse visible-xs">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
              </button>
              <a className="navbar-brand" href="">NYT Archive</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <Datepicker 
                day={this.state.day}
                month={this.state.month}
                year={this.state.year}
                onChangeField={this.onChangeField.bind(this)}
                pickDate={this.pickDate.bind(this)}
                btnActive={this.state.btnActive}
              />
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-3 sidenav hidden-xs">
              <h2>The New York Times Archive</h2>
              <Datepicker 
                day={this.state.day}
                month={this.state.month}
                year={this.state.year}
                onChangeField={this.onChangeField.bind(this)}
                pickDate={this.pickDate.bind(this)}
                btnActive={this.state.btnActive}
              />
            </div>
            <br />
            <div className="col-sm-9">
              <Loader isLoading={this.state.isLoading}>
                <Articles
                  articles={this.state.articles}
                  day={this.state.day}
                />
              </Loader>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
