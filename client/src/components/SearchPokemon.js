import React from 'react'

class SearchPokemon extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: {
                _id: '',
                name: ''
            }
        }
    }

    handleSearch = (e) => {
        e.preventDefault();

        let url = this.props.url
        let search = this.state.search
        let searchKeys = Object.keys(search)
        let isEmpty = Object.values(search).every(value => value === "")
        // Add search params to url
        if(!isEmpty){
            let numParams = 0;
            // Add '?' to indicate beggining of params
            url += "?"

            searchKeys.forEach(key => {
                if(search[key] !== ''){
                    if(numParams > 0){
                        url += '&'
                    }
                    // Adds the param to the URL
                    url += `${[key]}=${search[key]}` 
                    numParams++
                }
            })
        }
        this.props.getPokemon(url)
    }
    
    onChange = (e) => {
        const { name, value } = e.target
        const clone = {...this.state.search}
        clone[name] = value
        this.setState({
            search: clone
        })
    }

    clearSearch = () =>{
        this.setState({
            search: {
                _id: '',
                name: ''
            }
        })
    }
    render(){
        return (
            <section className="jumbotron text-center">
                <div className="container">
                <form onSubmit={this.handleSearch}>
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="ID" name="_id" value={this.state.search._id} onChange={this.onChange}/>
                    <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.search.name} onChange={this.onChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="submit">
                        <i className="fa fa-search"></i>
                        </button>
                        <button className="btn btn-secondary" onClick={this.clearSearch}>
                        <i className="fa fa-times"></i>
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </section>
        )
    }
}

export default SearchPokemon