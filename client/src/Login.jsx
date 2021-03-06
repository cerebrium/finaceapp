import React from 'react';
import axios from 'axios';
import './App.css'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then( response => {
            if (response.data.type === 'error') {
                console.log('error: ', response.data.message)
            } else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
            }
        }).catch( err => {
            console.log(err)
        })
    }

    render () {
        return (
            <div >
                <h3>Login</h3>
                    <form onSubmit={this.handleSubmit} >
                        <input type="text" name='email' onChange={this.handleChange} value={this.state.email} placeholder='Email' className='inputsOther'/><br />
                        <input type="password" name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password' className='inputsOther'/><br />
                        <input type="submit" value="Login" id='submitButtonTwo'/>
                    </form>
            </div>
        )
    }
}

export default Login;