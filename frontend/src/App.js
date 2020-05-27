import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
// import Modal from './components/Modal';
import UserFacade from './facades/UserFacade'
import OrderFacade from './facades/OrderFacade'
import ProductsFacade from './facades/ProductsFacade';
import Neo4jFacade from './facades/Neo4jFacade';
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
    let storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      await this.handleSessionRequest(storedUser);
    }
    const res = await ProductsFacade.getAllProducts();
    this.setState({ products: res });
  }

  handleSessionRequest = async (user) => {
    let userData = user;
    let data = null;
    let shoppingCart = [];

    data = await UserFacade.checkStoredSession(user);
    console.log('data', data)
    if (data.data && !data.error) {
      if (data.data.shoppingCart) shoppingCart = data.data.shoppingCart;
    } else {
      localStorage.removeItem('user');
      data = null;
      userData = null;
    }

    this.setState({ user: userData, data: data, shoppingCart: shoppingCart })
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
      localStorage.setItem('user', JSON.stringify(response.user));
      await this.handleSessionRequest(response.user);
      this.setState({
        loggedIn: true,
        username: "",
        password: "",
        user: response.user,
      })
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

  handleAddToCart = async (e, product) => {
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
    await OrderFacade.updateShoppingcart({ user: this.state.user, data: { shoppingCart: shoppingCart } })

    //NEO4J RECOMMENDATION ENGINE

    //Send age color to Neo4j 
    let registeredData = await Neo4jFacade.registerProductAddedToShoppingCart({ age: this.state.user.age, color: product.color })
    console.log(registeredData)

    //get top 3 color recommendations
    let top3ColorRecommendations = await Neo4jFacade.getTop3Products({ age: this.state.user.age });
    console.log(top3ColorRecommendations)


    this.setState({ shoppingCart: shoppingCart })


  }

  handleRemoveFromCart = async (e, product) => {
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

    await OrderFacade.updateShoppingcart({ user: this.state.user, data: { shoppingCart: shoppingCart } })
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
              <NavLink exact to="/signup">Sign Up</NavLink>
            </>
            }
            {user &&
              <NavLink exact to="/shoppingcart" >Shoppingcart {cartSize > 0 && cartSize}</NavLink>
            }
          </header>
          <hr />
          <Route exact path="/"
            render={() => (<div>
              <Products
                products={products}
                addToCart={this.handleAddToCart}
              />
            </div>)}
          />
          <Route exact path="/login" render={() =>
            <SignIn
              username={this.state.username}
              password={this.state.password}
              handleInputChange={this.handleInputChange}
              handleLogin={this.handleLogin}
            />} />
          <Route exact path="/signup" render={() =>
            <Signup
              username={this.state.username}
              password={this.state.password}
              age={this.state.age}
              country={this.state.country}
              handleInputChange={this.handleInputChange}
              handleCreateUser={this.handleCreateUser}
            />} />
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