import React from 'react';

export default (props) => {

  const changeHandler = (e) => {
    props.change(e.currentTarget.value);
  };

  return (
    <div className="product-catalogue__sort-by">
      <p className="sort-by">Сортировать</p>
      <select onChange={changeHandler} defaultValue='popularity'>
        <option value="popularity">по популярности</option>
        <option value="price">по цене</option>
      </select>
    </div>
  )
}
