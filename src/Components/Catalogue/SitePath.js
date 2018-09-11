import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {
  const linkHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="site-path">
      <ul className="site-path__items">
        <li className="site-path__item">
          <Link to='/'>Главная</Link>
        </li>
        <li className="site-path__item">
          <Link
            to={`/category/${props.category.id}`}
          >{props.category.title}</Link>
        </li>
        {props.product &&
        <li className="site-path__item">
          <a onClick={linkHandler}>{props.product.title}</a>
        </li>
        }
        {props.lastItem &&
        <li className="site-path__item">
          <a onClick={linkHandler}>{props.lastItem.title}</a>
        </li>
        }
      </ul>
    </div>
  )
}
