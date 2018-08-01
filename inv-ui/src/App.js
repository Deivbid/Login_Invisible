import React, { Component }  from 'react';
import Profile 				       from './components/Profile';
import Login 				         from './components/Login';
import Banner                from 'assets/img/default.png';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
    	<Router>
      <div className="App">
        {/*<Login />*/}
          {/*<img src={Banner} className="banner"/>*/}
        	<Route exact path="/" component={Login} />
        	<Route path="/dashboard" component={Profile} />
      </div>
      </Router>
    );
  }
}

export default App;
