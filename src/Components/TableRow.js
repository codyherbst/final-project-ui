import React, { Component } from 'react'

export default class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <tr>
                    <th scope='row'>{this.props.id}</th>
                    <th>{this.props.name}</th>
                    <th>{this.props.email}</th>
                    <th>{this.props.role}</th>
                    <th>Edit</th>
                </tr>
        )
    }
}
