import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register'
import Footer from './components/Footer';
import CreatePokemon from './components/CreatePokemon'
import ProtectedRoute from './components/ProtectedRoute'
import EditPokemon from './components/EditPokemon'
import DeletePokemon from './components/DeletePokemon'
import FlashMessage from './components/FlashMessage'
import { BrowserRouter , Switch, Route } from 'react-router-dom'


import './css/app.css';

class App extends React.Component {
  state = {
    flash: ""
  }

  setFlash = (message) => {
    this.setState({
      flash: message
    })
  }

  render(){
    return (
      <React.Fragment>
        <NavBar setFlash={this.setFlash}/>
        {this.state.flash === "" ? "" : <FlashMessage message={this.state.flash}/>}
        <div id="main-content">
          <BrowserRouter>
          <Switch>
            <Route exact path='/register' render={(props) => <Register {...props} setFlash={this.setFlash}/>}/>
            <Route exact path='/signin' render={(props) => <SignIn {...props} setFlash={this.setFlash}/>}/>
            <Route exact path='/' render={(props) => <Main {...props} setFlash={this.state.flash}/>}/>
            <ProtectedRoute exact path='/create' component={CreatePokemon} setFlash={this.setFlash}/>
            <ProtectedRoute exact path='/edit/:id' component={EditPokemon} setFlash={this.setFlash}/>
            <ProtectedRoute exact path='/delete/:id' component={DeletePokemon} setFlash={this.setFlash}/>
            <Route path="*"><h1>404 Not Found</h1></Route>
          </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
