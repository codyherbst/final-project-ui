import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import Axios from 'axios'

export default class NewJob extends Component {

    constructor(props) {
        super(props)
        this.state = {
            machineList: [],
            materialList: [],
            machineSelect: 1,
            materialSelect: 1,
        }
    }

    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/api/machines', { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                console.log(response);
                this.setState({
                    machineList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })

        Axios.get('http://127.0.0.1:8000/api/material_types', { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                console.log(response);
                this.setState({
                    materialList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: Number(e.target.value) })
    }

    createJob(e) {
        e.preventDefault();

        let data = {
            machine_id: this.state.machineSelect,
            material_type_id: this.state.materialSelect
        }

        Axios.post('http://127.0.0.1:8000/api/newJob', data, { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.createJob.bind(this)}>
                    <FormGroup>
                        <Label for='machineSelect'>Select Machine</Label>
                        <Input type='select' defaultValue='Select' name='machineSelect' id='machineSelect' onChange={this.handleChange.bind(this)}>
                            {
                                this.state.machineList.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='materialSelect'>Select Material</Label>
                        <Input type='select' name='materialSelect' id='materialSelect' onChange={this.handleChange.bind(this)}>
                            {
                                this.state.materialList.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}
