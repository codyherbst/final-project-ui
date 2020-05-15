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
                <Link to='/' className='px-2'>Home</Link>
                <Link to='/users' className='px-2'>Users</Link>
                <Link to='/machines' className='px-2'>Machines</Link>
                <Link to='/' onClick={this.props.logOut} className='px-2'>Log Out</Link>
            </React.Fragment>
        )
    }
}
