import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import { ReactMic } from 'react-mic';
import SpeechRecognition from "react-speech-recognition"
import PropTypes from "prop-types";

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

const WelcomePage = (props, transcript, resetTranscript, startListening, browserSupportsSpeechRecognition) => {
    const [ isBlocked, setIsBlocked ] = useState(false)
    const [ record, setRecord] = useState(false) 
    const recognition = new SpeechRecognition()
    console.log(recognition)

      // logout
    const logout = () => {
        localStorage.removeItem('mernToken')
        props.user.user = null
        props.user.token = ''
        window.location.reload()
    }

    // start recording
    const startRecording = () => {
        setRecord(true)
        props.resetTranscript()
        props.startListening()
        console.log(props)
    }
    
    // Stop Recording
    const stopRecording = () => {
        setRecord(false)
        props.stopListening()
    }

    // Real Time blob recording in process
    const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
 
    // If blob is done recording here it is
    const onStop = (recordedBlob) => {
        console.log(recordedBlob)
        axios.post('/api/speech', {
            blobURL: recordedBlob.blobURL
        }).then ( response => {
            console.log(response.data)
        })
    }

    // Check if the user is allowing use of the comuter mic
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then( (info) => {
            if (info.active) {
                setIsBlocked(true)
            } 
        })
        .catch(function(err) {
            console.log(err)
        });
    }, [])
    
    return (
        <>
            <nav className='navbar'>
                <Link to='/logout' onClick={logout} className='links'>Logout</Link>{' | '}
                <Link to='/link1' className='links'>link1</Link>{' | '}
                <Link to='/link2' className='links'>link2</Link>{' | '}
            </nav>
            <div >
                <h1>Welcome Home</h1>
                <div className='welcomePage'>
                    <ReactMic record={record} className="sound-wave" onStop={onStop} onData={onData}/>
                    <span>{props.transcript}</span>
                    <button onClick={startRecording}>
                        <h3>Record</h3>
                    </button>
                    <button onClick={stopRecording}>
                        <h3>Stop</h3>
                    </button>
                </div>
            </div>
        </>
    )
}

// options for the speech recognition api
const options = {
    autoStart: false
}

WelcomePage.prototype = propTypes

export default SpeechRecognition(options)(WelcomePage)