import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {
  return (
    <div className="hidden-panel__profile header-main__hidden-panel_visible">
      <Link to='/'>Личный кабинет</Link>
      <Link to='/favorites'>
        <i className="fa fa-heart-o" aria-hidden="true"/>
        Избранное
      </Link>
      <a href=''>Выйти</a>
    </div>
  )
}
