import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
// import Modal from './components/Modal';
import UserFacade from './facades/UserFacade'
import ProductsFacade from './facades/ProductsFacade';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      password: "",
      user: null,
      age: undefined,
      country: "",
      loadingSpinner: false,
      shoppingCart: [],
    }

  }

  async componentDidMount() {

    let storedUser = localStorage.getItem('user');
    let data = null;
    if (storedUser) {
      //TODO: get redis data;
    }

    const res = await ProductsFacade.getAllProducts();
    this.setState({ products: res, user: storedUser, data: data });
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
        username: "",
        password: "",
        user: response.user,
      })
      localStorage.setItem('user', response.user);
      alert('Logged in go shop amok!')
    }
  }


  handleCreateUser = async (e) => {
    e.preventDefault();
    const { username, password, age, country } = this.state
    let response = await UserFacade.createUser({ username, password, age, country })
    if (response.error) alert(response.error);
    else {
      this.setState({
        loggedIn: false,
        username: "",
        password: "",
      })
      alert('User created! Please login')
    }
  }

  handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation();

    let shoppingCart = [...this.state.shoppingCart];
    if (shoppingCart.findIndex(p => p.productId === product.productId) !== -1) {
      shoppingCart = shoppingCart.map(p => {
        if (p.productId === product.productId) p.amount++;
        return p;
      })
    } else {
      shoppingCart.push({ ...product, amount: 1 });
    }

    this.setState({ shoppingCart: shoppingCart })
  }

  handleRemoveFromCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation();

    let shoppingCart = [...this.state.shoppingCart];
    const cartListing = shoppingCart.find(p => p.productId === product.productId);
    if (cartListing.amount > 1) {
      shoppingCart = shoppingCart.map(p => {
        if (p.productId === product.productId) p.amount--;
        return p;
      })
    } else {
      shoppingCart = shoppingCart.filter(p => p.productId !== product.productId);
    }

    this.setState({ shoppingCart: shoppingCart })
  }

  cartProductCount = (shoppingCart) => {
    if (shoppingCart.length === 0) return 0;
    return shoppingCart.reduce((p, c) => {
      return p + c.amount;
    }, 0)
  }

  render() {
    const { products, user, shoppingCart } = this.state;
    const cartSize = this.cartProductCount(shoppingCart);
    return (
      <Router >
        <div>
          <header>
            <NavLink exact to="/">Shop</NavLink>
            {!user && <>
              <NavLink exact to="/login">Sign In</NavLink>
              <NavLink exact to="/signUp">Sign Up</NavLink>
            </>
            }
            {user &&
              <NavLink exact to="/shoppingcart" >Shoppingcart {cartSize > 0 && cartSize}</NavLink>
            }
          </header>
          <hr />
          <Route exact path="/login" render={() =>
            <SignIn
              username={this.state.username}
              password={this.state.password}
              handleInputChange={this.handleInputChange}
              handleLogin={this.handleLogin}
            />} />
          <Route exact path="/signUp" render={() =>
            <Signup
              username={this.state.username}
              password={this.state.password}
              age={this.state.age}
              country={this.state.country}
              handleInputChange={this.handleInputChange}
              handleCreateUser={this.handleCreateUser}
            />} />
          <Route exact path="/"
            render={() => (<div>
              <Products
                products={products}
                addToCart={this.handleAddToCart}
              />
            </div>)}
          />
          <Route exact path="/shoppingcart"
            render={() => (<div>
              <ShoppingCart
                shoppingCart={shoppingCart}
                removeFromCart={this.handleRemoveFromCart}
              />
            </div>)}
          />
        </div>
      </Router>
    )
  }
}

export default App;