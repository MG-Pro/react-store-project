import React, {Component} from 'react';
import logo from '../../img/header-logo.png';
import {NavLink, Link} from "react-router-dom";
import HiddenPanel from './HiddenPanel';
import SearchBtn from './SearchBtn';

export default class Header extends Component {
  state = {
    comp: null,
    searchActive: false
  };

  componentDidMount() {
    if (this.props.cartId) {
      this.getCart(this.props.cartId);
    } else {
      this.props.setCartList([]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartId && nextProps.needCartUpdate) {
      this.getCart(nextProps.cartId);
    }
  }

  hiddenPanelHandler = (e) => {
    const comp = e.currentTarget.classList.contains('header-main__pic_profile') ? 'profile' : 'cart';
    let activeComp;
    if (this.state.comp === comp) {
      activeComp = null;
    } else if (!this.state.comp || this.state.comp !== comp) {
      activeComp = comp;
    }
    this.setState({
      comp: activeComp
    });
  };

  searchOpen = () => {
    this.setState({
      searchActive: !this.state.searchActive
    })
  };

  orderBtnHandler = () => {
    this.setState({
      comp: null
    })
  };

  getCart = (id) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${id}`)
      .then(res => res.json()).then(cart => {
      this.getCartList(cart.data.products);
    }).catch(err => console.log(err));
  };

  getCartList = (list) => {
    const idList = list.map(item => {
      return item.id;
    });
    let paramsStr = '?';
    idList.forEach(item => {
      paramsStr += `id[]=${item}&`;
    });
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${paramsStr}`)
      .then(res => res.json()).then(products => {
      if (!products.data.length) {
        return;
      }
      const cartList = list.map((item) => {
        const prod = products.data.find(prod => prod.id === item.id);
        return Object.assign(item, {
          prod: prod,
          countPrice: item.amount * prod.price
        });
      });
      this.props.setCartList(cartList);
    }).catch(err => console.log(err));
  };


  render() {
    return (
      <header className='header'>
        <div className="top-menu">
          <div className="wrapper">
            <ul className="top-menu__items">
              <li className="top-menu__item">
                <a href="">Возврат</a>
              </li>
              <li className="top-menu__item">
                <a href="">Доставка и оплата</a>
              </li>
              <li className="top-menu__item">
                <a href="">О магазине</a>
              </li>
              <li className="top-menu__item">
                <a href="">Контакты</a>
              </li>
              <li className="top-menu__item">
                <a href="">Новости</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-main">
          <div className="header-main__wrapper wrapper">
            <div className="header-main__phone">
              <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
              <p>Ежедневно: с 09-00 до 21-00</p>
            </div>
            <div className="header-main__logo">
              <Link to='/'>
                <h1>
                  <img src={logo} alt="logotype"/>
                </h1>
              </Link>
              <p>Обувь и аксессуары для всей семьи</p>
            </div>
            <div className="header-main__profile">
              <div className="header-main__pics">
                <div
                  className={`header-main__pic header-main__pic_search ${this.state.searchActive ? 'header-main__pic_search_is-hidden' : ''}`}
                  onClick={this.searchOpen}
                />
                <div className="header-main__pic_border"/>
                <div
                  className="header-main__pic header-main__pic_profile"
                  onClick={this.hiddenPanelHandler}
                >
                  <div
                    className={`header-main__pic_profile_menu ${this.state.comp === 'profile' ? 'header-main__pic_profile_menu_is-active' : ''}`}/>
                </div>
                <div className="header-main__pic_border"/>
                <div className="header-main__pic header-main__pic_basket" onClick={this.hiddenPanelHandler}>
                  <div
                    className={`header-main__pic_basket_full ${this.props.cartList.length ? 'active' : ''}`}>{this.props.cartList.length}</div>
                  <div
                    className={`header-main__pic_basket_menu ${this.state.comp === 'cart' ? 'header-main__pic_basket_menu_is-active' : ''}`}/>
                </div>
              </div>
              <SearchBtn
                active={this.state.searchActive}
                searchHandler={this.props.searchAction}
                history={this.props.history}
              />
            </div>
          </div>
          <HiddenPanel
            component={this.state.comp}
            cartAction={this.props.cartAction}
            orderBtnHandler={this.orderBtnHandler}
            setCartList={this.props.setCartList}
            cartList={this.props.cartList}
          />
        </div>
        <nav className="main-menu">
          <div className="wrapper">
            <ul className="main-menu__items">
              {this.props.categories.map(cat => {
                return (
                  <li key={cat.id} className={`main-menu__item`}>
                    <NavLink
                      to={`/category/${cat.id}`}
                      activeClassName='main-menu__item_active'
                    >
                      {cat.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
