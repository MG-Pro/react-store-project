import React, {Component} from 'react';
import SitePath from '../Catalogue/SitePath';
import OrderDone from './OrderDone';
import {Link} from "react-router-dom";

export default class Order extends Component {
  state = {
    total: 0,
    telIsValid: true,
    addressIsValid: true,
    nameIsValid: true,
    orderDidSend: false,
    orderData: null
  };

  countTotal = (list) => {
    return list.reduce((count, item) => {
      return count + (item.prod.price * item.amount);
    }, 0)
  };

// todo Hide Order comp if cartList.length === 0;

  componentDidMount() {
    this.setState({
      total: this.countTotal(this.props.cartList)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.cartList.length && !this.state.orderDidSend) {
      this.props.history.push(`/`);
      return;
    }
    this.setState({
      total: this.countTotal(nextProps.cartList)
    })
  }

  changeAmount = (e, item) => {
    e.preventDefault();
    const dir = e.currentTarget.classList.contains('basket-item-list__quantity-change_plus') ? 1 : -1;
    const amount = item.amount;
    if (amount + dir < 0 || amount + dir > 10) {
      return;
    }
    this.props.cartAction({
      prod: item.prod,
      size: item.size,
      quantity: ((item.amount + dir) - item.amount)
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    if(!this.props.cartList.length) {
      return;
    }
    const form = e.currentTarget;
    const valid = {
      telIsValid: false,
      addressIsValid: false,
      nameIsValid: false
    };
    if(/^\+{1}\d{11}/i.test(form.tel.value)) {
      valid.telIsValid = true;
    }
    if (form.userName.value.length > 3) {
      valid.nameIsValid = true;
    }
    if (form.address.value.length > 5) {
      valid.addressIsValid = true;
    }
    const formValid = Object.entries(valid).every(item => item[1]);
    if (formValid) {
      const body = {
        name: form.userName.value,
        phone: form.tel.value,
        address: form.address.value,
        paymentType: form.paid.value,
        cart: this.props.cartId,
      };
      fetch(`https://api-neto.herokuapp.com/bosa-noga/order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
        .then(res => res.json()).then(order => {
        console.log(order);
        this.setState({
          orderDidSend: true,
          orderData: order.data
        });
        this.props.setCartList([], true);
      });

    } else {
      this.setState(valid);
    }
  };

  inputChange = (e) => {
    e.preventDefault();
    const itemId = e.currentTarget.id;
    const valid = {};
    if (itemId === 'userName') {
      valid.nameIsValid = false;
    } else if (itemId === 'tel') {
      valid.telIsValid = false;
    }
    else if (itemId === 'address') {
      valid.addressIsValid = false;
    }
    this.setState(valid);
  };

  render() {
    return (
      <div className="wrapper order-wrapper">
        <SitePath
          category={{id: 0, title: 'Корзина'}}
          product={{title: 'Оформление'}}
          lastItem={this.state.orderDidSend ? {title: 'Заказ принят'} : null}
        />
        <section
          className="order-process"
          style={{display: `${this.state.orderDidSend ? 'none' : 'block'}`}}>
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
              {this.props.cartList.map((item, i) => {
                const prod = item.prod;
                return (
                  <div key={i} className="basket-item">
                    <div className="basket-item__pic">
                      <img src={prod.images[0]} alt="product_1"/>
                    </div>
                    <div className="basket-item__product">
                      <div className="basket-item__product-name">
                        <Link
                          to={`/category/${prod.categoryId}/product/${prod.id}`}
                        >{prod.title}</Link>
                      </div>
                      <div className="basket-item__product-features">
                        <div className="basket-item__size">Размер:
                          <span>{item.size}</span>
                        </div>
                        <div className="basket-item__producer">Производитель:
                          <span>{prod.brand}</span>
                        </div>
                      </div>
                    </div>
                    <div className="basket-item__quantity">
                      <div
                        className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                        onClick={(e) => this.changeAmount(e, item)}
                      >-
                      </div>
                      {item.amount}
                      <div
                        className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                        onClick={(e) => this.changeAmount(e, item)}
                      >+
                      </div>
                    </div>
                    <div className="basket-item__price">{prod.price}&nbsp;
                      <i className="fa fa-rub"/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="order-basket__summ">Итого:&nbsp;
              <span>{this.state.total}&nbsp;<i className="fa fa-rub"/></span>
            </div>
          </div>
          <div className="order-process__confirmed">
            <form onSubmit={this.formSubmit}>
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input
                      className={`order-process__delivery-input ${!this.state.nameIsValid ? 'order-process__delivery-input_error' : ''}`}
                      name="delivery"
                      placeholder="Представьтесь, пожалуйста"
                      id='userName'
                      onChange={this.inputChange}
                    />
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Телефон</div>
                    <input
                      className={`order-process__delivery-input ${!this.state.telIsValid ? 'order-process__delivery-input_error' : ''}`}
                      type="tel"
                      name="delivery"
                      placeholder="Номер в любом формате"
                      id='tel'
                      onChange={this.inputChange}
                    />
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Адрес</div>
                    <input
                      className={`order-process__delivery-input
                       order-process__delivery-input_adress
                       ${!this.state.addressIsValid ?
                        'order-process__delivery-input_error' :
                        ''}`}
                      name="delivery"
                      placeholder="Ваша покупка будет доставлена по этому адресу"
                      id='address'
                      onChange={this.inputChange}
                    />
                  </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  <label className="order-process__paid-label">
                    <input
                      className="order-process__paid-radio"
                      type="radio"
                      name="paid"
                      value="onlineCard"
                    />
                    <span className="order-process__paid-text">Картой онлайн</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input
                      className="order-process__paid-radio"
                      type="radio"
                      name="paid"
                      value="offlineCard"
                      defaultChecked
                    />
                    <span className="order-process__paid-text">Картой курьеру</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input
                      className="order-process__paid-radio"
                      type="radio"
                      name="paid"
                      value="offlineCash"
                    />
                    <span
                      className="order-process__paid-text">Наличными курьеру</span>
                  </label>
                </div>
              </div>
              <button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button>
            </form>
          </div>
        </section>
        {this.state.orderDidSend && <OrderDone
          orderData={this.state.orderData}
          total={this.state.total}
        />}
      </div>
    )
  }
}
