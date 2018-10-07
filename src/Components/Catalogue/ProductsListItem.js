import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class ProductsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: 0
    }
  }

  toggleImg = (e) => {
    e.preventDefault();
    const dir = e.currentTarget.classList.contains('arrow_right') ? 1 : -1;
    const imgs = this.props.product.images;
    let activeImg = this.state.activeImg;
    if (activeImg + dir < 0 ) {
      activeImg = imgs.length - 1;
    } else if (activeImg + dir > imgs.length - 1) {
      activeImg = 0;
    } else {
      activeImg += dir;
    }
    this.setState({
      activeImg: activeImg
    })
  };

  storageHandler = (e) => {
    e.preventDefault();
    this.props.storageHandler(this.props.product);
  };

  render() {
    const prod = this.props.product;
    const isChosen = this.props.favorites.includes(prod.id);
    const chosenClass = isChosen ? 'chosen' : '';
    return (
            <Link
          to={`/category/${prod.categoryId}/product/${prod.id}`}
          className="item-list__item-card item"
        >
          <div className="item-pic">
            <img className="item-pic-1" src={prod.images[this.state.activeImg]} alt={prod.title}/>
            <div className={`product-catalogue__product_favorite ${chosenClass}`}>
              <p onClick={this.storageHandler}/>
            </div>
            <div className="arrow arrow_left" onClick={this.toggleImg}/>
            <div className="arrow arrow_right" onClick={this.toggleImg}/>
          </div>
          <div className="item-desc">
            <h4 className="item-name">{prod.title}</h4>
            <p className="item-producer">Производитель: <span className="producer">{prod.brand}</span></p>
            <p className="item-price">{prod.price}</p>
          </div>
        </Link>
    )
  }
}
