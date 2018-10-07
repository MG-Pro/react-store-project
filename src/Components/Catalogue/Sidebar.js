import React, {Component} from 'react';
import PriceFilter from './Filters/PriceFilter';
import ColorFilter from './Filters/colorFilter';
import SizeFilter from './Filters/sizeFilter';
import HeelSizeFilter from './Filters/heelSizeFilter';
import ReasonFilter from './Filters/reasonFilter';
import SeasonFilter from './Filters/seasonFilter';
import BrandFilter from './Filters/BrandFilter';
import DiscountFilter from './Filters/discountFilter';
import ResetFilters from './Filters/resetFilters';

export default class Sidebar extends Component {
  state = {
    filtersData: {},
    colorVis: false,
    sizeVis: false,
    heelSizeVis: false,
    reasonVis: false,
    seasonVis: false,
    filters: {}
  };

  filtersAction = (filter) => {
    const filters = Object.assign(this.state.filters, filter);
    this.setState({
      filters: filters
    });
    this.props.change(this.state.filters);
  };

  sectionToggle = (field) => {
    const state = {};
    state[field] = !this.state[field];
    this.setState(state)
  };

  listFilter = (e, value, filterType) => {
    e.preventDefault();
    if (this.state.filters[filterType] === value) {
      delete this.state.filters[filterType];
      this.filtersAction({});
    } else {
      const state = {};
      state[filterType] = value;
      this.filtersAction(state);
    }
  };

  checkboxFilter = (e, filterType) => {
    const value = e.currentTarget.name;
    const filterList = this.state.filters[filterType] || [];
    const indx = filterList.findIndex(item => item === value);
    if (indx === -1) {
      filterList.push(value);
    } else {
      filterList.splice(indx, 1);
    }
    const state = {};
    state[filterType] = filterList;
    this.filtersAction(state);
  };

  discountFilter = (e) => {
    const value = e.currentTarget.checked;
    if (this.state.filters.discounted) {
      delete this.state.filters.discounted;
      this.filtersAction({});
    } else {
      const state = {};
      state.discounted = value;
      this.filtersAction(state);
    }
  };

  brandFilter = (e) => {
    e.preventDefault();
    const value = e.currentTarget.search.value;
    this.filtersAction({
      search: value,
    });
  };

  resetFilters = (e) => {
    e.preventDefault();
    this.setState({
      filters: {},
      reset: true
    });
    this.props.change({});
  };

  priceFilter = (range) => {
    this.filtersAction(range);
  };

  componentDidMount() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/filters`)
      .then(res => res.json()).then(filters => {
      this.setState({
        filtersData: filters.data
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <section className="sidebar">
        <PriceFilter
          filterHandler={this.priceFilter}
        />
        <div className="separator-150"/>
        <ColorFilter
          colors={this.state.filtersData.color}
          activeColor={this.state.filters.color}
          switch={this.sectionToggle}
          filterHandler={this.listFilter}
          visible={this.state.colorVis}
        />
        <div className="separator-150"/>
        <SizeFilter
          sizes={this.state.filtersData.sizes}
          switch={this.sectionToggle}
          filterHandler={this.checkboxFilter}
          visible={this.state.sizeVis}
          activeSizes={this.state.filters.size}
        />
        <div className="separator-150"/>
        <HeelSizeFilter
          heelSizes={this.state.filtersData.heelSize}
          switch={this.sectionToggle}
          filterHandler={this.checkboxFilter}
          visible={this.state.heelSizeVis}
          activeHeelSizes={this.state.filters.heelSize}
        />
        <div className="separator-150"/>
        <ReasonFilter
          reasons={this.state.filtersData.reason}
          switch={this.sectionToggle}
          filterHandler={this.listFilter}
          activeReasons={this.state.filters.reason}
          visible={this.state.reasonVis}
        />
        <div className="separator-150"/>
        <SeasonFilter
          seasons={this.state.filtersData.season}
          switch={this.sectionToggle}
          filterHandler={this.listFilter}
          activeSeasons={this.state.filters.season}
          visible={this.state.seasonVis}
        />
        <div className="separator-150"/>
        <BrandFilter
          filterHandler={this.brandFilter}
          activeBrand={this.state.filters.search}
        />
        <div className="separator-150"/>
        <DiscountFilter
          filterHandler={this.discountFilter}
          active={this.state.filters.discounted}
        />
        <div className="separator-150"/>
        <ResetFilters
          visible={Object.entries(this.state.filters).length}
          filterHandler={this.resetFilters}
        />
      </section>
    )
  }
}
