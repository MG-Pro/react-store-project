import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Novelties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activeTab: 0,
      activeProd: 1,
    }
  }

  sortByCat = (prodList, categories) => {
    const sortingProd = [];
    categories.forEach(cat => {
      const list = prodList.filter(prod => {
        return cat.id === prod.categoryId;
      });
      if (list.length) {
        const sortingCat = {};
        sortingCat.id = cat.id;
        sortingCat.title = cat.title;
        sortingCat.products = list;
        sortingProd.push(sortingCat)
      }
    });
    this.setState({
      products: sortingProd
    })
  };

  componentDidMount() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/featured')
      .then(res => res.json())
      .then(data => {
        this.sortByCat(data.data, this.props.categories);
      })
  }

  tabClick = (e) => {
    e.preventDefault();
    this.setState({
      activeTab: +e.currentTarget.id
    })
  };

  arrClick = (e) => {
    const dir = e.currentTarget.classList.contains('new-deals__arrow_right') ? 1 : -1;
    let position = this.state.activeProd;
    const length = this.state.products[this.state.activeTab].products.length;
    if (position + dir > length - 1) {
      position = -1;
    } else if (position + dir < 0) {
      position = length;
    }
    this.setState({
      activeProd: position + dir
    })
  };

  favoriteHandler = () => {
    const activeList = this.state.products[this.state.activeTab].products;
    this.props.favHandler(activeList[this.state.activeProd]);
  };

  render() {
    if (!this.state.products.length) {
      return <h2 className='new-deals h2'>Loading data ...</h2>;
    }

    let activeProd = this.state.activeProd;
    let firstProd = activeProd - 1;
    let lastProd = activeProd + 1;
    const prodList = this.state.products[this.state.activeTab].products;
    if (!prodList[firstProd]) {
      firstProd = prodList.length - 1;
    } else if (!prodList[lastProd]) {
      lastProd = 0;
    }
    const isChosen = this.props.favorites.includes(prodList[activeProd].id);
    const chosenClass = isChosen ? 'new-deals__product_favorite-chosen' : '';
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {this.state.products.map((cat, i) => {
              return (
                <li key={cat.id} className={`new-deals__menu-item
                ${i === this.state.activeTab ? 'new-deals__menu-item_active' : ''}`}>
                  <a id={i} href="" onClick={this.tabClick}>{cat.title}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="new-deals__slider">
          <div
            className="new-deals__arrow new-deals__arrow_left arrow"
            onClick={this.arrClick}
          />
          <div
            className="new-deals__product new-deals__product_first"
            style={{backgroundImage: `url(${prodList[firstProd].images[0]})`}}
          >
            <Link to={`/category/${prodList[firstProd].categoryId}/product/${prodList[firstProd].id}`}/>
          </div>
          <div
            className="new-deals__product new-deals__product_active"
            style={{backgroundImage: `url(${prodList[activeProd].images[0]})`}}
          >
            <Link to={`/category/${prodList[activeProd].categoryId}/product/${prodList[activeProd].id}`}/>
            <div
              className={`new-deals__product_favorite ${chosenClass}`}
              onClick={this.favoriteHandler}
            />
          </div>
          <div
            className="new-deals__product new-deals__product_last"
            style={{backgroundImage: `url(${prodList[lastProd].images[0]})`}}
          >
            <Link to={`/category/${prodList[lastProd].categoryId}/product/${prodList[lastProd].id}`}/>
          </div>
          <div
            className="new-deals__arrow new-deals__arrow_right arrow"
            onClick={this.arrClick}
          />
        </div>
        <div className="new-deals__product-info">
          <a href="" className="h3">{prodList[activeProd].title}</a>
          <p>Производитель:
            <span>{prodList[activeProd].brand}</span>
          </p>
          <h3 className="h3">{prodList[activeProd].price + ' ₽'}</h3>
        </div>
      </section>
    );
  }
}
