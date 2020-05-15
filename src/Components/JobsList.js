import React, { Component } from 'react'
import Axios from 'axios'
import { Row, Col } from 'reactstrap';

export default class MachineOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobList: []
        }
    }

    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/api/jobs', { headers: { 'Authorization': 'Bearer ' + this.props.apitoken } })
            .then(response => {
                console.log(response);
                this.setState({
                    jobList: response.data
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    render() {
        return (
            <div className='container'>
                {
                    this.state.jobList.map(item => (
                        <Row className='border'>
                            <Col xs='3'>
                                <div className='text-center'>
                                    Job Number: {item.id}
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div className='text-center'>
                                    Material: {item.material_type_id}
                                </div>
                            </Col>
                            <Col xs='3'>
                                <div className='text-center'>
                                    Machine: {item.machine_id}
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
            </div>
        )
    }
}
