import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Axios from 'axios';

// const [jobStatus, setjobStatus] = useState('')


export default function TestFunc(props) {
    const location = useLocation();
    const [jobStatus, setjobStatus] = useState(location.state.jobStatus)
    const [description, setdescription] = useState('')
    const [amount, setamount] = useState(null)
    const [displayNewDTForm, setdisplayNewDTForm] = useState(false)
    const [displayUpdateDTForm, setdisplayUpdateDTForm] = useState(false)
    const [downtimeList, setdowntimeList] = useState([])
    const [componentDidMount, setcomponentDidMount] = useState(false)
    const [currentDTUpdate, setcurrentDTUpdate] = useState(null)

    let downtimeTotal = 0

    downtimeList.map(item => {
        downtimeTotal += item.amount
    })

    useEffect(() => {
        if (!componentDidMount) {
            Axios.get('http://127.0.0.1:8000/api/downtime/' + location.state.jobID, { headers: { 'Authorization': 'Bearer ' + props.apitoken } })
                .then(response => (
                    setcomponentDidMount(true),
                    setdowntimeList(response.data)
                ))
                .catch(response => (
                    setcomponentDidMount(true)
                ))
        }
    })

    function startJob(jobID, apitoken) {
        Axios.put('http://127.0.0.1:8000/api/job/' + jobID + '/startJob', null, { headers: { 'Authorization': 'Bearer ' + apitoken } })
            .then(response => (
                setjobStatus('running')
                // console.log(response)
            ))
            .catch(response => (
                console.log(response)
            ))
    }

    function stopJob(jobID, apitoken) {
        Axios.put('http://127.0.0.1:8000/api/job/' + jobID + '/stopJob', null, { headers: { 'Authorization': 'Bearer ' + apitoken } })
            .then(response => (
                setjobStatus('stopped')
                // console.log(response)
            ))
            .catch(response => (
                console.log(response)
            ))
    }

    function handleDescriptionChange(e) {
        e.preventDefault();

        setdescription(e.target.value)
    }

    function handleAmountChange(e) {
        e.preventDefault();

        setamount(e.target.value)
    }

    function addDowntime(e) {
        e.preventDefault();

        const data = {
            user_id: props.userID,
            job_id: location.state.jobID,
            description: description,
            amount: amount
        }

        console.log(props)

        Axios.post('http://127.0.0.1:8000/api/job/addDowntime', data, { headers: { 'Authorization': 'Bearer ' + props.apitoken } })
            .then(response => {
                setdowntimeList(response.data)
                setdisplayNewDTForm(false)
            })
            .catch(response => (
                console.log(response)
            ))
    }

    function updateDowntime(e) {
        e.preventDefault();

        let data = {
            jobID: location.state.jobID,
            description: description,
            amount: amount
        }

        Axios.put('http://127.0.0.1:8000/api/updateDowntime/' + currentDTUpdate, data, { headers: { 'Authorization': 'Bearer ' + props.apitoken } })
            .then(response => {
                setdowntimeList(response.data);
                setdisplayUpdateDTForm(false)
            })
            .catch(response => (
                console.log(response)
            ))
    }

    function deleteDowntime(id, e) {
        e.preventDefault();

        let data = {
            jobID: location.state.jobID
        }

        Axios.delete('http://127.0.0.1:8000/api/deleteDowntime/' + id, { headers: { 'Authorization': 'Bearer ' + props.apitoken } })
            .then(response => (
                setdowntimeList(response.data)
            ))
            .catch(response => (
                console.log(response)
            ))

    }

    return (
        <div className='container'>
            {
                jobStatus === 'planned' ?
                    <div className='d-flex mb-3'>
                        <Button onClick={() => startJob(location.state.jobID, props.apitoken)}>Start Job</Button>
                    </div> :
                    jobStatus === 'running' ?
                        <div className='d-flex mb-3'>
                            <Button onClick={() => stopJob(location.state.jobID, props.apitoken)}>Stop Job</Button>
                        </div> :
                        null
            }
            <div className='container-fluid'>
                {
                    downtimeList.map(item => (
                        <Row>
                            <Col xs='10' >
                                <Row>
                                    <Col xs='7' className='border'>
                                        {item.description}
                                    </Col>
                                    <Col xs='3' className='border'>
                                        Created by {item.user.name} at {item.created_at}
                                    </Col>
                                    <Col xs='2' className='border text-center'>
                                        {(Math.round(item.amount * 100) / 100).toFixed(2)}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='2' className='mt-2'>
                                <Button
                                    onClick={() => {
                                        setdisplayUpdateDTForm(true);
                                        setcurrentDTUpdate(item.id);
                                        setdescription(item.description);
                                        setamount(item.amount)
                                    }}
                                    className='mr-1'
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        deleteDowntime(item.id, e);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    ))
                }
                <Row className='mt-1'>
                    <Col xs='10'>
                        <Row>
                            <Col xs='7' />
                            <Col xs='3' className='text-center border'>
                                Total Downtime
                            </Col>
                            <Col xs='2' className='text-center border'>
                                {downtimeTotal.toFixed(2)}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs='2' />
                </Row>
            </div>
            {
                displayNewDTForm ?
                    <Form onSubmit={(e) => addDowntime(e)} className='mt-3'>
                        <FormGroup>
                            <Label for='description'>Enter the description for downtime.</Label>
                            <Input type='text' name='description' id='description' onChange={(e) => handleDescriptionChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='amount'>Enter the amount of downtime.</Label>
                            <Input type='number' step='0.01' name='amount' id='amount' onChange={(e) => handleAmountChange(e)} />
                        </FormGroup>
                        <div className="d-flex justify-content-end mt-3">
                            <Button className='mr-1' type='submit'>Submit</Button>
                            <Button onClick={() => { setdisplayNewDTForm(false) }}>Cancel</Button>
                        </div>
                    </Form> :
                    displayUpdateDTForm ?
                        <Form onSubmit={(e) => updateDowntime(e)} className='mt-3'>
                            <FormGroup>
                                <Label for='description'>Enter the description for downtime.</Label>
                                <Input type='text' name='description' id='description' value={description} onChange={(e) => handleDescriptionChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='amount'>Enter the amount of downtime.</Label>
                                <Input type='number' step='0.01' name='amount' id='amount' value={amount} onChange={(e) => handleAmountChange(e)} />
                            </FormGroup>
                            <div className="d-flex justify-content-end mt-3">
                                <Button className='mr-1' type='submit'>Submit</Button>
                                <Button onClick={() => { setdisplayUpdateDTForm(false); setcurrentDTUpdate(null) }}>Cancel</Button>
                            </div>
                        </Form> :
                        <div className="d-flex justify-content-end mt-3 mr-4 pr-3">
                            <Button onClick={() => { setdisplayNewDTForm(true) }}>Add Downtime</Button>
                        </div>
            }
        </div>
    )
}

// export default class Job extends Component {

//     constructor(props) {
//         console.log(props);
//         super(props)
//     }

//     componentDidMount() {
//         // TestFunc();
//         console.log(this.props, this.state)
//     }

//     render() {
//         return (
//             <div>
//             </div>
//         )
//     }
// }
