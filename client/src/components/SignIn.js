import React from 'react';
import '../css/signin.css';
import Auth from '../services/Auth'
import { Redirect } from 'react-router-dom'
import Joi from 'joi-browser'

class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            login: {
                email: "",
                password: "",
            },
            errors: [],
        }
    }

    schema = {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }

    validate = () => {
        const {error} = Joi.validate(this.state.login, this.schema, {abortEarly: false})

        if(!error) return null

        const errors = [];

        error.details.forEach(err => {
            errors.push(
                <li key={err.path}>{err.message}</li>
            )
        })
        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // Check for errors
        const errors = this.validate();
        this.setState({ errors: errors || [] }) 

        // Abort if errors
        if(errors) return


        Auth.login(this.state.login, errors => {
            if(errors){
                this.setState({
                    errors: [errors]
                })
            }else{
                this.props.setFlash("Signed In!")
                return this.props.history.push('/')
            }
        })
    }

    onChange = (e) => {
        const { name, value } = e.target
        const clone = {...this.state.login}
        clone[name] = value
        this.setState({
            login: clone
        })
    }

    render(){
        if(Auth.isAuthenticated()){
            return <Redirect to="/"/>
        }
        return ( 
            <div>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="text" id="inputEmail" className="form-control" placeholder="Email address" name="email" onChange={this.onChange} autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" onChange={this.onChange}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                {Object.keys(this.state.errors).length > 0 && 
                <ul className="alert alert-danger">{this.state.errors}</ul>
                }
            </div>
        );
    }
}
 
export default SignIn;