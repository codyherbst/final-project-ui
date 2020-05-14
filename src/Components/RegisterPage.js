import React, { Component, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";


export default class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        event.preventDefault();

        const target = event.target;
        let value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    register(name, email, password) {
        this.props.register(name, email, password)
    }

    render() {
        return (
            <div>
                <Form inline >
                    <FormGroup>
                        <Label for="exampleName" hidden>Name</Label>
                        <Input type="name" name="name" id="exampleName" placeholder="Name" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={this.handleInputChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={this.handleInputChange} />
                    </FormGroup>
                    {' '}
                    <Link to='/'>
                        <Button onClick={() => this.register(this.state.name, this.state.email, this.state.password)}>Submit</Button>
                    </Link>
                </Form>
            </div>
        )
    }
}