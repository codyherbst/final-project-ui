import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import LoginPage from '../LoginPage.js';
import RegisterPage from '../RegisterPage';
import Navbar from '../NavBar';
import Home from '../Home';
import UserList from '../UserList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Row } from 'reactstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apitoken: '',
      isLoggedIn: false,
    }
    this.logIn = this.logIn.bind(this)
  }

  logIn(email, password) {
    const data = {
      email: email,
      password: password
    };

    axios.post('http://127.0.0.1:8000/api/login', data)
      .then(response => {
        if (response.data.loggedIn) {
          this.setState({
            apitoken: response.data.token,
            isLoggedIn: true,
          })
        } else {
          return (alert('Incorrect email or password'))
        }
      })
      .catch(response => {
        console.log(response);
      });
  }

  register(name, email, password) {
    const data = {
      name: name,
      email: email,
      password: password,
      role: 'operator'
    };

    let registerSuccess = false;

    axios.post('http://127.0.0.1:8000/api/register', data)
      .then(response => {
        if (response.data.registerSuccess) {
          registerSuccess = true;
        }
      })
      .catch(response => {
        console.log(response);
        registerSuccess = false;
      });

    return registerSuccess;
  }

  updatePage(newPage) {
    this.setState({
      currentPage: newPage
    })
  }

  logOut() {
    this.setState({
      apitoken: '',
      isLoggedIn: false,
    });
  }

  render() {

    return (
      <React.Fragment>
        {
          !this.state.isLoggedIn ?
            <Router>
              <Switch>
                <Route path='/register'>
                  <RegisterPage register={this.register.bind(this)} />
                </Route>
                <Route path='/'>
                  <LoginPage logIn={this.logIn.bind(this)} />
                </Route>
              </Switch>
            </Router>
            :
            <div>
              <Router>
                <Navbar logOut={this.logOut.bind(this)} />
                <Switch>
                  <Route path='/users'>
                    <UserList apitoken={this.state.apitoken}/>
                  </Route>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                </Switch>
              </Router>
            </div>
        }
      </React.Fragment>
    )
  }
}

export default App;
