import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
// import Modal from './components/Modal';
import UserFacade from './facades/UserFacade'
import ProductsFacade from './facades/ProductsFacade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Products from './components/Products';

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

  async componentDidMount() {
    const res = await ProductsFacade.getAllProducts();
    this.setState({ products: res });
  }
  handleInputChange = (event) => {
    let type = event.target.name
    let value = event.target.value
    this.setState({ [type]: value })
  }

  handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state
    let credentials = { username: username, password: password }

    let response = await UserFacade.login(credentials)
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


  handleCreateUser = async (e) => {
    e.preventDefault();
    const { username, password, age, country } = this.state
    let response = await UserFacade.createUser({ username, password, age, country })
    if (response.error) alert(response.error);
    else {
      alert(response.user);
      this.setState({
        loggedIn: false,
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
          <Products products={this.state.products} />
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