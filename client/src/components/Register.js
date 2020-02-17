import React from 'react';
import '../css/signin.css';
import Auth from '../services/Auth'
import { Redirect } from 'react-router-dom'
import Joi from 'joi-browser'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            register: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            errors: [],
        }
    }

    schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().required(),
    }

    validate = () => {
        const {error} = Joi.validate(this.state.register, this.schema, {abortEarly: false})

        if(!error) return null

        const errors = [];

        error.details.forEach(err => {
            errors.push(
                <li key={err.path}>{err.message}</li>
            )
        })

        return errors
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Check for errors
        const errors = this.validate();
        this.setState({ errors: errors || [] }) 

        // Abort if errors
        if(errors) return

        Auth.register(this.state.register, errors => {
            if(errors){
                this.setState({
                    errors: [errors]
                })
            }else{
                this.props.setFlash("Succesfully Registered!")
                return this.props.history.push('/')
            }
        })
    }

    onChange = (e) => {
        const { name, value } = e.target
        const clone = {...this.state.register}
        clone[name] = value
        this.setState({
            register: clone
        })
    }

    render(){
        if(Auth.isAuthenticated()){
            return <Redirect to="/"/>
        }
        return ( 
            <React.Fragment>
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Sign Up</h1>
                <label htmlFor="fName"  className="sr-only">First Name</label>
                <input type="text" id="fName" name="firstName" className="form-control" placeholder="First Name" onChange={this.onChange} autoFocus />
                <label htmlFor="lName" className="sr-only">Last Name</label>
                <input type="text" id="lName" name="lastName" className="form-control" placeholder="Last Name" onChange={this.onChange}/>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="text" id="inputEmail" name="email" className="form-control" placeholder="Email address" onChange={this.onChange}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" onChange={this.onChange}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
            {Object.keys(this.state.errors).length > 0 && 
                <ul className="alert alert-danger">{this.state.errors}</ul>
                }
            </React.Fragment>
        );
    }
}
 
export default Register;