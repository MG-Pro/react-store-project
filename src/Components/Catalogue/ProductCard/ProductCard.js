import React, {Component} from 'react';
import SitePath from '../SitePath';
import ImagesSlider from './ImagesSlider'
import ViewedProducts from '../ViewedProducts';
import SimilarProducts from '../SimilarProducts';

export default class ProductCard extends Component {
  state = {
    prod: null,
    size: null,
    quantity: 1,
    activeImg: 0
  };

  componentDidMount() {
    this.getData(+this.props.match.params.pid);
  }

  getData = (id) => {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id}`)
      .then(res => res.json())
      .then(prod => {
        this.setState({
          prod: prod.data,
          size: null,
        });
        this.props.storageHandler(prod.data, 'viewed');
      });
  };

  shouldComponentUpdate(nextProps) {
    if (+nextProps.match.params.pid !== +this.props.match.params.pid) {
      this.getData(+nextProps.match.params.pid);
      return false;
    } else {
      return true;
    }
  }

  changeQuantity = (e) => {
    const dir = e.currentTarget.classList.contains('basket-item-list__quantity-change_plus') ? 1 : -1;
    const quantity = this.state.quantity;
    if (quantity + dir <= 0 || quantity + dir > 10) {
      return;
    }
    this.setState({
      quantity: quantity + dir
    })
  };

  choiceSize = (e, size) => {
    e.preventDefault();
    if (!size.available) {
      return;
    }
    this.setState({
      size: size.size || 0
    });
  };

  favHandler = (e) => {
    e.preventDefault();
    this.props.storageHandler(this.state.prod, 'favorites');
  };

  setActiveImg = (img) => {
    this.setState({
      activeImg: img
    })
  };

  addToCart = (e) => {
    e.preventDefault();
    if (!this.state.size) {
      return;
    }
    const order = {
      quantity: this.state.quantity,
      size: this.state.size,
      prod: this.state.prod,
    };
    this.props.cartAction(order);

  };

  render() {
    if (!this.state.prod) {
      return <h2>Loading data ...</h2>;
    }
    const prod = this.state.prod;
    const cat = this.props.categories.find(item => item.id === prod.categoryId);
    const isFav = this.props.favorites.includes(prod.id);
    const favClass = isFav ? 'chosen' : '';
    return (
      <div>
        <SitePath category={cat} product={prod}/>
        <main className="product-card">
          <section className="product-card-content">
            <h2 className="section-name">{prod.title}</h2>
            <section className="product-card-content__main-screen">
              <ImagesSlider images={prod.images} handler={this.setActiveImg}/>
              <div className="main-screen__favourite-product-pic">
                <a href="">
                  <img src={prod.images[this.state.activeImg]} alt=""/>
                </a>
                <a href="" className="main-screen__favourite-product-pic__zoom"/>
              </div>
              <div className="main-screen__product-info">
                <div className="product-info-title"><h2>{prod.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                    <tr>
                      <td className="left-col">Артикул:</td>
                      <td className="right-col">{prod.sku}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Производитель:</td>
                      <td className="right-col"><a href=""><span className="producer">{prod.brand}</span></a></td>
                    </tr>
                    <tr>
                      <td className="left-col">Цвет:</td>
                      <td className="right-col">{prod.color}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Материалы:</td>
                      <td className="right-col">{prod.material}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Сезон:</td>
                      <td className="right-col">{prod.season}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Повод:</td>
                      <td className="right-col">{prod.reason}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {prod.sizes.map((item) => {
                    return (
                      <li
                        key={item.size}
                        className={`${item.available ? '' : 'not-available'} ${this.state.size === item.size ? 'active' : ''}`}
                      >
                        <a href="" onClick={(e) => this.choiceSize(e, item)}>{item.size}</a>
                      </li>
                    )
                  })}
                </ul>
                <div className="size-wrapper">
                  <a href="">
                    <span className="size-rule"/>
                    <p className="size-table">Таблица размеров</p>
                  </a>
                </div>
                <a href="" className="in-favourites-wrapper" onClick={this.favHandler}>
                  <div className={`favourite ${favClass}`}/>
                  <p className='in-favourites'>В избранное</p>
                </a>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                    onClick={this.changeQuantity}>-
                  </div>
                  {this.state.quantity}
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                    onClick={this.changeQuantity}>+
                  </div>
                </div>
                <div className="price">{prod.price} ₽</div>
                <button
                  className="in-basket in-basket-click"
                  onClick={this.addToCart}
                  disabled={!this.state.size}
                >В корзину</button>
              </div>
            </section>
          </section>
        </main>
        <ViewedProducts
          viewedProducts={this.props.viewed}
          categories={this.props.categories}
        />
        <SimilarProducts product={prod}/>
      </div>
    )
  }
}
