import React, { Component } from 'react'
import Axios from 'axios'
import { Row, Col } from 'reactstrap';

export default class MachineOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            machineList: []
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
    }

    render() {
        return (
            <div className='container'>
                <Row>
                    {
                        this.state.machineList.map(item => (
                            <Col xs='12' md='6' className='border'>
                                <div className='text-center'>
                                    <h1>{item.name}</h1>
                                </div>
                                <Row>
                                    <Col xs='6'>
                                        <div className='text-center'>
                                            Current Job:
                                        </div>
                                    </Col>
                                    <Col xs='6'>
                                        <div className='text-center'>
                                            Material:
                                        </div>
                                    </Col>
                                    <Col xs='6'>
                                        <div className='text-center'>
                                            Job Start:
                                        </div>
                                    </Col>
                                    <Col xs='6'>
                                        <div className='text-center'>
                                            Job End:
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}
