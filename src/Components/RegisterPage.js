import React, { Component, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
} from "react-router-dom";


class RegisterPage extends Component {
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

    register(e) {
        // let history = useHistory()
        e.preventDefault();
        this.props.register(this.state.name, this.state.email, this.state.password)
        this.props.history.push('/')
    }

    render() {
        return (
            <Row>
                <Col xs='4'></Col>
                <Col xs='4'>
                    <Form className='mb-2' onSubmit={this.register.bind(this)}>
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
                        <Button tpye='submit'>Submit</Button>
                    </Form>
                    <Link to='/'>Already have an account? Click here!</Link>
                </Col>
                <Col xs='4'></Col>
            </Row>
        )
    }
}

export default withRouter(RegisterPage);