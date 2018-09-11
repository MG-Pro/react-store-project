import React, {Component} from 'react';
import SitePath from './SitePath';
import Sidebar from './Sidebar';
import ProductsList from './ProductsList';
import ViewedProducts from './ViewedProducts';

export default class Catalogue extends Component {
  currentCategory = this.props.currentCategory ?
    this.props.currentCategory :
    this.props.categories.find(item => item.id === +this.props.match.params.cid);
  defListParams = {
    sortBy: 'popularity'
  };
  searchValue = '';

  componentDidMount() {
    if (this.currentCategory.id) {
      this.props.getProdList({
        categoryId: this.currentCategory.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.currentCategory.id && this.searchValue !== nextProps.searchValue) {
      this.searchValue = nextProps.searchValue;
      this.changeList({});
      return;
    } else if (!this.currentCategory.id) {
      return;
    }

    if (+nextProps.match.params.cid !== this.currentCategory.id) {
      this.currentCategory = this.props.categories.find(item => item.id === +nextProps.match.params.cid);
      this.props.getProdList({
        categoryId: this.currentCategory.id
      });
    }
  }

  changeList = (param) => {
    const isSearch =
            this.currentCategory.id ?
              {categoryId: this.currentCategory.id} :
              {search: this.searchValue};
    param = Object.assign(isSearch, this.defListParams, param);
    this.props.getProdList(param);
  };

  storageHandler = (prod) => {
    this.props.storageHandler(prod, 'favorites')
  };

  render() {
    return (
      <div>
        <SitePath category={this.currentCategory}/>
        <main className="product-catalogue">
          <Sidebar change={this.changeList}/>
          <ProductsList
            change={this.changeList}
            productList={this.props.products}
            category={this.currentCategory}
            favorites={this.props.favorites}
            storageHandler={this.storageHandler}
          />
        </main>
        {this.currentCategory ? null :
          <ViewedProducts
            viewedProducts={this.props.viewed}
            categories={this.props.categories}
          />}
      </div>
    )
  }
}
