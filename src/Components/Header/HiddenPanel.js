import React from 'react';
import Cart from './Cart';
import Profile from './profile';

export default (props) => {
  return (
    <div className={`header-main__hidden-panel hidden-panel ${props.component ? 'header-main__hidden-panel_visible' : ''}`}>
      {props.component === 'profile' && <Profile/>}
      {props.component === 'cart' &&
      <Cart
        cartAction={props.cartAction}
        orderBtnHandler={props.orderBtnHandler}
        setCartList={props.setCartList}
        cartList={props.cartList}
      />}
    </div>
  )
}
