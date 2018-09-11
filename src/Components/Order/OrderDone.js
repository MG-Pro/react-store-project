import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class OrderDone extends Component {

  paymentTypes = [
    {value: 'onlineCard', title: 'Картой онлайн'},
    {value: 'offlineCard', title: 'Картой курьеру'},
    {value: 'offlineCash', title: 'Наличными курьеру'},
  ];

  render() {
    if (!this.props.orderData) {
      return null;
    }
    const info = this.props.orderData.info;
    const paymentType =this.paymentTypes.find(item => item.value === info.paymentType);
    return (
      <section className="order-done">
        <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
        <div className="order-done__information order-info">
          <div className="order-info__item order-info__item_summ">
            <h3>Сумма заказа:</h3>
            <p>{this.props.total}&nbsp;<i className="fa fa-rub"/></p>
          </div>
          <div className="order-info__item order-info__item_pay-form">
            <h3>Способ оплаты:</h3>
            <p>{paymentType.title}</p>
          </div>
          <div className="order-info__item order-info__item_customer-name">
            <h3>Имя клиента:</h3>
            <p>{info.name}</p>
          </div>
          <div className="order-info__item order-info__item_adress">
            <h3>Адрес доставки:</h3>
            <p>{info.address}</p>
          </div>
          <div className="order-info__item order-info__item_phone">
            <h3>Телефон:</h3>
            <p>{info.phone}</p>
          </div>
        </div>
        <p className="order-done__notice">Данные о заказе отправлены в  <span>СМС</span>
        </p>
        <Link to='/' className="order-done__continue">продолжить покупки</Link>
      </section>
      )
  }
}
