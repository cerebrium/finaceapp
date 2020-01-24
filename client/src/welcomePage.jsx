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
    const [ amazonMovies, setAmazonMovies ] = useState([])
    const [ netflixMovies, setNetflixMovies ] = useState([])

    // Defining the outer speechrecognition container
    const recognition = new SpeechRecognition()

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
    }
    
    // Stop Recording
    const stopRecording = (ev) => {
        ev.preventDefault()
        setRecord(false)
        props.stopListening()
    }

    // Real Time blob recording in process
    const onData = (recordedBlob) => {
        console.log('');
    }
 
    // If blob is done recording here it is
    const onStop = (recordedBlob) => {
        console.log('')
    }

    // Check if the user is allowing use of the comuter mic
    useEffect(() => {
        setNetflixMovies(['netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', 'netflixMovie', ])
        setAmazonMovies(['amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', 'amazonMovie', ])
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


    // list all the movies that fit the criteria for netflix
    const handleNetflixClick = () => {
        let mappedNetflixMovies = netflixMovies.map((ele, index) => 
            <h3 key={index}>{ele}</h3>
        )

        movieList = (
            <>
                {mappedNetflixMovies}
            </>
        )
    }
    
    // list all the movies that fit the criteria for amazon
    const handleAmazonClick = () => {
        let mappedAmazonMovies = amazonMovies.map((ele, index) => 
        <h3 key={index}>{ele}</h3>
        )
        
        movieList = (
            <>
                {mappedAmazonMovies}
            </>
        )
    }

    console.log(movieList)
    return (
        <>
            <nav className='navbar'>
                <Link to='/logout' onClick={logout} className='links'>Logout</Link>{' | '}
                <Link to='/link1' className='links'>link1</Link>{' | '}
                <Link to='/link2' className='links'>link2</Link>{' | '}
            </nav>
            <div className='welcomePage'>
                <div className='positionThis'>
                    <h1>Speak to search movies</h1>
                    <ReactMic record={record} className="sound-wave" onStop={onStop} onData={onData} className='reactMic' opacity='.6' backgroundColor='rgb(235, 231, 231)'/>
                    <h2>{props.transcript}</h2>
                    <div className='nonColumn'>
                        <button onClick={startRecording}>
                            <h3>Record</h3>
                        </button>
                        <button onClick={stopRecording}>
                            <h3>Stop</h3>
                        </button>
                    </div>
                </div>
                <div className='positionThisTwo'>
                    <nav className='centerThis'><h2 onClick={handleNetflixClick}>Netflix</h2> <h2>|</h2> <h2 onClick={handleAmazonClick}>Amazon</h2></nav>
                        {movieList}
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