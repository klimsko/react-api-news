import React, { Component } from 'react';

import Articles from './components/Articles';

class App extends Component {
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
              <a className="navbar-brand" href="#">Logo</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Dashboard</a></li>
                <li><a href="#">Age</a></li>
                <li><a href="#">Gender</a></li>
                <li><a href="#">Geo</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-3 sidenav hidden-xs">
              <h2>Logo</h2>
              <ul className="nav nav-pills nav-stacked">
                <li className="active"><a href="#section1">Dashboard</a></li>
                <li><a href="#section2">Age</a></li>
                <li><a href="#section3">Gender</a></li>
                <li><a href="#section3">Geo</a></li>
              </ul><br />
            </div>
            <br />
            <div className="col-sm-9">
              
              <Articles />
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
