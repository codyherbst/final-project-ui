import React, { Component } from 'react'
import Axios from 'axios'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Reorder, { reorder, reorderImmutable, reorderFromTo, reorderFromToImmutable } from 'react-reorder';

class JobsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            machineList: [],
            currentJobList: [],
            currentMachine: 1
        }
    }

    async componentDidMount() {
        await Axios.get('http://127.0.0.1:8000/api/jobs/' + this.state.currentMachine, { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                this.setState({
                    jobList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })

        await Axios.get('http://127.0.0.1:8000/api/machines', { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => (
                this.setState({
                    machineList: response.data
                })
            ))
            .catch(response => (
                console.log(response)
            ))
    }

    onReorder(event, previousIndex, nextIndex, fromId, toId) {
        this.setState({
            jobList: reorder(this.state.jobList, previousIndex, nextIndex)
        });
    }

    async handleChange(e) {
        e.preventDefault();

        await this.setState({
            currentMachine: e.target.value,
        })

        await Axios.get('http://127.0.0.1:8000/api/jobs/' + this.state.currentMachine, { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                this.setState({
                    jobList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    updateJobOrder() {
        let data = {
            data: this.state.jobList
        }

        Axios.put('http://127.0.0.1:8000/api/jobs/updateJobsOrder/', data, { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => (
                console.log(response)
            ))
            .catch(response => (
                console.log(response)
            ))
    }

    render() {
        return (
            <div className='container'>
                <Link to='/newJob'>
                    <Button>New Job</Button>
                </Link>
                <Button onClick={this.updateJobOrder.bind(this)}>Update Job Order</Button>
                <Form>
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
                </Form>
                <Reorder reorderId='jobList' onReorder={this.onReorder.bind(this)} holdTime={100}>
                    {
                        this.state.jobList.map(item => (
                            <Row className='border my-3'>
                                <Col xs='3'>
                                    <div className='text-center'>
                                        Job Number:
                                        <Link to={
                                            {
                                                pathname: '/job',
                                                state:
                                                {
                                                    jobID: item.id,
                                                    material_type: item.material_type.name,
                                                    machineName: item.machine.name,
                                                    jobStatus: item.job_status
                                                }
                                            }
                                        }>
                                            {item.id}
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs='3'>
                                    <div className='text-center'>
                                        Material: {item.material_type.name}
                                    </div>
                                </Col>
                                <Col xs='3'>
                                    <div className='text-center'>
                                        Machine: {item.machine.name}
                                    </div>
                                </Col>
                                <Col xs='3'>
                                    <div className='text-center'>
                                        Job Start: NA
                                </div>
                                </Col>
                            </Row>
                        ))
                    }
                </Reorder>
            </div>
        )
    }
}

export default withRouter(JobsList);
