import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import { Button } from 'reactstrap';
import Axios from 'axios';

// const [jobStatus, setjobStatus] = useState('')


export default function TestFunc(props) {
    const location = useLocation();
    const [jobStatus, setjobStatus] = useState(location.state.jobStatus)

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

    return (
        <div>
        {
            jobStatus === 'planned' ?
                <Button onClick={() => startJob(location.state.jobID, props.apitoken)}>Start Job</Button> :
                jobStatus === 'running' ?
                    <Button onClick={() => stopJob(location.state.jobID, props.apitoken)}>Stop Job</Button> :
                    null
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
