import React from 'react'
import Auth from '../services/Auth'

class DeletePokemon extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pokemon: {
                _id: 0,
                name: '',
                img: ''
            },
            errors: []
        }
    }
    

    delete = () => {
        let succesfulDelete = false;
        console.log(this.props)
        fetch(`${process.env.REACT_APP_API_URI}pokemon/${this.state.pokemon._id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': Auth.getToken()
            },
        })
        .then(res => {
            console.log(res)
            if(res.status === 200){
                succesfulDelete = true
            }
            return res.json()
        })
        .then(json => {
            if(!succesfulDelete){
                this.setState({
                    errors: [json.message]
                })
            }else{
                this.props.setFlash(`${this.state.pokemon.name} succesfully deleted`)
                return this.props.history.push('/')
            }
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
                img: json.img
            }
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="album py-5 bg-light">
                    <div className="container text-center h-100">
                        <h3>Are you sure you would like to delete {this.state.pokemon.name}?</h3>
                            <div className="d-inline-block">
                                    <div className="card mb-4 box-shadow">
                                        <img 
                                        className="card-img-top" 
                                        alt="Thumbnail [100%x225]" 
                                        style={{height: 225, objectFit: 'contain', display: 'block'}}
                                        src={this.state.pokemon.img} 
                                        />
                                    </div>
                            </div>
                        <div className="form-group">
                            <button className="btn btn-danger" onClick={this.delete}>Delete</button>    
                        </div>
                    </div>  
                    {Object.keys(this.state.errors).length > 0 && 
                    <ul className="alert alert-danger">{this.state.errors}</ul>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default DeletePokemon
