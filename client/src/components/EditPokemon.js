import React from 'react'
import Auth from '../services/Auth'
import Joi from 'joi-browser'

class EditPokemon extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon: {
                _id: 0,
                name: "",
                description: "",
                img: ""
            },
            errors: []
        }
    }

    schema = {
        _id: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        img: Joi.string().required(),
    }

    validate = () => {
        const {error} = Joi.validate(this.state.pokemon, this.schema, {abortEarly: false})

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
        let succesfulEdit = false

        // Check for errors
        const errors = this.validate();
        this.setState({ errors: errors || [] }) 

        // Abort if errors
        if(errors) return

        fetch(`${process.env.REACT_APP_API_URI}pokemon/${this.state.pokemon._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': Auth.getToken()
            },
            body: JSON.stringify(this.state.pokemon)
        })
        .then(res => {
            console.log(res)
            if(res.status === 200){
                succesfulEdit = true
            }
            return res.json()
        })
        .then(json => {
            if(!succesfulEdit){
                this.setState({
                    errors: [json.message]
                })
            }else{
                this.props.setFlash("Succefully Edited " + this.state.pokemon.name)
                return this.props.history.push('/')
            }
        })
    }

    onChange = (e) => {
        const { name, value } = e.target
        const clone = {...this.state.pokemon}
        clone[name] = value
        this.setState({
            pokemon: clone
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id
        fetch(`${process.env.REACT_APP_API_URI}pokemon/${id}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
            pokemon: {
                _id: json._id,
                name: json.name,
                description: json.description,
                img: json.img
            }
            })
        })
    }

    render(){
        return ( 
            <div>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Edit Pokemon</h1>
                    <div className="form-group">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Name" name="name" onChange={this.onChange} value={this.state.pokemon.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="sr-only">Description</label>
                        <textarea id="description" className="form-control" rows="5" placeholder="Description" name="description" onChange={this.onChange} value={this.state.pokemon.description}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="img" className="sr-only">Image URL</label>
                        <input type="text" id="img" className="form-control" placeholder="Image" name="img" onChange={this.onChange} value={this.state.pokemon.img}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
                    </div>
                </form>
                {Object.keys(this.state.errors).length > 0 && 
                <ul className="alert alert-danger">{this.state.errors}</ul>
                }
            </div>
        );
    }
}

export default EditPokemon