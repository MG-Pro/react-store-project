import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Catalogue from './Catalogue/Catalogue';
import ProductCard from './Catalogue/ProductCard/ProductCard';
import Favorites from './Favorites/Favorites';
import Header from './Header/HeaderComponent';
import Order from './Order/Order';

class App extends Component {
  state = {
    categories: [],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    viewed: JSON.parse(localStorage.getItem('viewed') || '[]'),
    products: null,
    cartList: [],
    needCartUpdate: true,
    cartId: localStorage.getItem('cartId'),
    searchValue: '',
  };

  setCartList = (list, reset) => {
    let state = {
      needCartUpdate: false,
      cartList: list,
    };
    if (reset) {
      localStorage.removeItem('cartId');
      state = Object.assign(state, {cartId: null});
    }
    this.setState(state);
  };

  cartAction = (order) => {
    const cartId = this.state.cartId;
    const sameOrder = this.state.cartList.find(item => item.id === order.prod.id && item.size === order.size);
    const cart = {
      id: order.prod.id,
      size: order.size,
    };
    if (sameOrder && order.quantity) {
      cart.amount = sameOrder.amount + order.quantity;
    } else {
      cart.amount = order.quantity;
    }

    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartId || ''}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cart)
    })
      .then(res => res.json()).then(cartData => {
      if (cartData.status === 'error') {
        localStorage.removeItem('cartId');
        this.setState({
          cartId: null,
          cartList: []
        });
        return;
      }
      if (cartId) {
        this.setState({
          needCartUpdate: true,
        });
      } else {
        localStorage.setItem('cartId', cartData.data.id);
        this.setState({
          cartId: cartData.data.id,
          needCartUpdate: true,
        });
      }
    })
  };

  getProducts = (params = {}) => {
    let paramsStr = '?';
    for (let param in params) {
      if (Array.isArray(params[param])) {
        params[param].forEach(item => {
          paramsStr += `${param}[]=${item}&`
        });

      } else {
        paramsStr += `${param}=${params[param]}&`;
      }
    }
    console.log(paramsStr);
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${paramsStr}`)
      .then(res => res.json()).then(products => {
        console.log(products);
      this.setState({
        products: products
      })
    }).catch(err => console.log(err));
  };

  storageAction = (prod, storage) => {
    const store = this.state[storage];
    const indx = store.findIndex((item) => (item.id || item) === prod.id);
    if (storage === 'viewed') {
      if (indx !== -1) {
        return;
      } else {
        store.push(prod);
      }
      if (store.length >= 10) {
        store.shift();
      }
    } else if (storage === 'favorites') {
      if (indx !== -1) {
        store.splice(indx, 1);
      } else {
        store.push(prod.id);
      }
    }
    localStorage.setItem(storage, JSON.stringify(store));
    const param = {};
    param[storage] = store;
    this.setState(param);
  };

  searchAction = (value) => {
    this.setState({
      searchValue: value
    })
  };

  WrappedMain = (props) => {
    return <Main {...props}
      categories={this.state.categories}
      favorites={this.state.favorites}
      storageHandler={this.storageAction}
    />;
  };

  WrappedCatalogue = (props) => {
    return <Catalogue {...props}
      storageHandler={this.storageAction}
      favorites={this.state.favorites}
      getProdList={this.getProducts}
      products={this.state.products}
      categories={this.state.categories}
      viewed={this.state.viewed}
    />;
  };

  WrappedProductCard = (props) => {
    return <ProductCard {...props}
      storageHandler={this.storageAction}
      favorites={this.state.favorites}
      viewed={this.state.viewed}
      categories={this.state.categories}
      cartAction={this.cartAction}
    />;
  };

  WrappedFavorites = (props) => {
    return <Favorites {...props}
      storageHandler={this.storageAction}
      favorites={this.state.favorites}
    />;
  };

  WrappedOrder = (props) => {
    return <Order {...props}
      cartList={this.state.cartList}
      setCartList={this.setCartList}
      cartId={this.state.cartId}
      cartAction={this.cartAction}
    />;
  };

  componentDidMount() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/categories')
      .then(res => res.json())
      .then(categories => {
        this.setState({
          categories: categories.data
        });
      }).catch(err => console.log(err));

    setInterval(() => {
      fetch('https://api-neto.herokuapp.com/bosa-noga/categories')
        .then(res => res.json())
        .then(categories => {
          console.log('do not sleep!');
        })
    }, 60000)
  }

  render() {
    if (!this.state.categories.length) {
      return <h2>Loading data ...</h2>;
    }
    const {WrappedCatalogue} = this;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Header
            categories={this.state.categories}
            cartId={this.state.cartId}
            cartList={this.state.cartList}
            needCartUpdate={this.state.needCartUpdate}
            searchAction={this.searchAction}
            cartAction={this.cartAction}
            setCartList={this.setCartList}
          />
          <Route exact path='/' component={this.WrappedMain}/>
          <Route exact path='/category/:cid' component={this.WrappedCatalogue}/>
          <Route path='/category/:cid/product/:pid' component={this.WrappedProductCard}/>
          <Route path='/favorites' component={this.WrappedFavorites}/>
          <Route path='/search' render={props => (
            <WrappedCatalogue {...props}
              currentCategory={{id: 0, title: 'Результаты поиска'}}
              searchValue={this.state.searchValue}
            />
          )}/>
          <Route path='/order' component={this.WrappedOrder}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
