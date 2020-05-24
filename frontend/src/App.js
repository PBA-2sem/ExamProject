import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
import Modal from './components/Modal';
import UserFacade from './facades/UserFacade'
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      password: "",
      age: 0,
      country: "",
      loggedIn: false,
      loadingSpinner: false
    }
  }

  handleInputChange = (event) => {
    let type = event.target.name
    let value = event.target.value
    this.setState({ [type]: value })
  }

  handleLogin = async (event) => {
    const { username, password } = this.state
    let credentials = { username: username, password: password }

    let response = await UserFacade.login(credentials)
    console.log(response)
    if (response.error) {
      alert(response.error)
    } else {
      this.setState({
        loggedIn: true,
        userId: response.user.id,
        username: "",
        password: "",
      })
    }
  }


  handleCreateUser = async (evt) => {
    const { username, password } = this.state
    let response = await UserFacade.createUser({ newUser: { username: username, password: password } })
    if (response.error) alert(response.error);
    else {
      alert(response.user);
      this.setState({
        loggedIn: true,
        role: response.user.role,
        username: "",
        password: ""
      })
    }
  }


  render() {
    if (!this.state.loggedIn) {
      return (
        <Router>
          <div>
            <header>
              <NavLink exact to="/">Sign In</NavLink>
              <NavLink exact to="/signUp">Sign Up</NavLink>
            </header>
            <hr />
            <Route exact path="/" render={() => <SignIn handleInputChange={this.handleInputChange} handleLogin={this.handleLogin} />} />
            <Route exact path="/signUp" render={() => <Signup handleInputChange={this.handleInputChange} handleCreateUser={this.handleCreateUser} />} />
          </div>
        </Router>
      )
    } else {
      return (
        <div>
          {this.state.loadingSpinner && (
            <div className='loading-spinner'>
              <CircularProgress size={60} />
            </div>
          )}
        </div>
      )
    }
  }
}

export default App;