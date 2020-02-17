import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import SearchPokemon from './SearchPokemon'
// import queryString from 'query-string'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pokemon: [],
      search: {}
    }
    this.url = `${process.env.REACT_APP_API_URI}pokemon`
  }
  
  
  componentDidMount(){
    this.getPokemon(this.url)
    
  }

  getPokemon = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        pokemon: json
      })
    })
  }

  render(){
    let i = 0;
    return ( 
      <React.Fragment>
        
          <SearchPokemon getPokemon={this.getPokemon} url={this.url}/>

          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {this.state.pokemon.map((pokemon, index) => {
                  // i++;
                  // if(i <= 20){
                    return <Card pokemon={pokemon} key={index}/>
                  // }
                })}
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }

}
 
export default Main;