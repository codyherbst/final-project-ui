import React, { Component } from 'react'
import Axios from 'axios';
import { Table } from 'reactstrap';
import TableRow from './TableRow';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/api/users', {headers: {'Authorization': 'Bearer ' + this.props.apitoken}})
            .then(response => {
                this.setState({
                    userList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map(item => (
                            <TableRow id={item.id} name={item.name} email={item.email} role={item.role} />
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
