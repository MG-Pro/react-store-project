import React, {Component} from 'react';
import ProductsListItem from './ProductsListItem';
import Pagination from './PaginationSimple';
import Sorting from './Sorting';

export default class ProductsList extends Component {

  setPage = (page) => {
    this.props.change({page: page});
  };

  sorting = (by) => {
    this.props.change({sortBy: by});
  };

  storageHandler = (prod) => {
    this.props.storageHandler(prod)
  };

  render() {
    const listProp = this.props.productList;
    const list = listProp ? listProp.data : [];
    const goods = listProp ? listProp.goods : '';
    const pages = listProp ? listProp.pages : [];
    const page = listProp ? listProp.page : 1;
    return (
      <section className="product-catalogue-content">
        <section className="product-catalogue__head">
          <div className="product-catalogue__section-title">
            <h2 className="section-name">{this.props.category.title}</h2>
            <span className="amount">{goods} шт</span>
          </div>
          <Sorting change={this.sorting}/>
        </section>
        <section className="product-catalogue__item-list">
          {list.map(prod => {
            return <ProductsListItem
              key={prod.id}
              product={prod}
              storageHandler={this.storageHandler}
              favorites={this.props.favorites}
              category={this.props.category}
            />
          })}
        </section>
        <Pagination pages={pages} page={page} getPage={this.setPage}/>
      </section>
    )
  }
}
