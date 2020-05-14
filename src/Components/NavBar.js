import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Link to='/'>Home</Link>
                <Link to='/users'>Users</Link>
                <Link to='/' onClick={this.props.logOut}>Log Out</Link>
            </React.Fragment>
        )
    }
}
