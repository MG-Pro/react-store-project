import React, {Component} from 'react';
import Pagination from '../Catalogue/PaginationSimple';
import Sorting from '../Catalogue/Sorting';
import SitePath from '../Catalogue/SitePath';
import ProductsListItem from '../Catalogue/ProductsListItem';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pages: 1,
      page: 1,
      length: 0
    };
  }

  componentDidMount() {
    this.getProductList(this.props.favorites);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.favorites);
    this.getProductList(nextProps.favorites);
    if (nextProps.favorites.length !== this.props.favorites.length) {

    }
  }

  getProductList = (idList) => {
    if (!idList.length) {
      this.setState({
        length: 0,
        products: 0,
        pages: 1,
      });
      return;
    }
    let paramsStr = '?';
    idList.forEach(item => {
      paramsStr += `id[]=${item}&`;
    });
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${paramsStr}`)
      .then(res => res.json()).then(products => {
      const pages = this.createPages(products.data);
      this.setState({
        length: products.data.length,
        products: pages,
        pages: pages.length,
      })
    }).catch(err => console.log(err));
  };

  storageHandler = (prod) => {
    this.props.storageHandler(prod, 'favorites');
  };

  setPage = (page) => {
    this.setState({
      page: page
    })
  };

  createPages = (list) => {
    const pagesList = [];
    let pageList = [];
    list.forEach((item, i) => {
      if (pageList.length <= 11 && list.length !== i + 1) {
        pageList.push(item);
      } else {
        pageList.push(item);
        pagesList.push(pageList);
        pageList = [];
      }
    });
    return pagesList;
  };

  render() {
    const list = this.state.products.length ? this.state.products[this.state.page - 1] : [];
    return (
      <div className="wrapper wrapper_favorite">
        <SitePath category={{id: 0, title: 'Избранное'}}/>
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite"> {this.state.length} товаров</span>
            </div>
            <Sorting/>
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
            {list.map((prod, i) => {
              return <ProductsListItem
                key={i}
                product={prod}
                storageHandler={this.storageHandler}
                favorites={this.props.favorites}
                category={this.props.category}
              />
            })}
          </section>
        </main>
        <Pagination pages={this.state.pages} page={this.state.page} getPage={this.setPage}/>
      </div>
    );
  }
}
