import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Axios from 'axios';

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        let data = {
            id: this.props.id,
            name: this.props.name,
            email: this.props.email,
            role: e.target.value,
        }

        Axios.put('http://127.0.0.1:8000/api/users/' + this.props.id, data, {headers: {'Authorization': 'Bearer ' + this.props.apitoken}})
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            })
    }

    handleDelete() {
        Axios.delete('http://127.0.0.1:8000/api/users/delete/' + this.props.id, {headers: {'Authorization': 'Bearer ' + this.props.apitoken}})
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        return (
            <tr>
                <th scope='row'>{this.props.id}</th>
                <th>{this.props.name}</th>
                <th>{this.props.email}</th>
                <th>
                    <Form>
                        <FormGroup>
                            <Input type="select" name="select" id="exampleSelect" defaultValue={this.props.role} onChange={this.onChange.bind(this)}>
                                <option>admin</option>
                                <option>manager</option>
                                <option>engineer</option>
                                <option>maintenance</option>
                                <option>operator</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </th>
                <th>
                    <Button onClick={this.handleDelete.bind(this)}>Delete</Button>
                </th>
            </tr>
        )
    }
}