import React, {Component} from 'react';

class BrandFilter extends Component {
  static defaultProps = {
    activeBrand: '',
  };

  state = {
    value: this.props.activeBrand
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.activeBrand
    })
  }

  inputHandler = (e) => {
    this.setState({
      value: e.currentTarget.value
    })
  };

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__brand">
          <h3>Бренд</h3>
          <form className="brand-search" onSubmit={this.props.filterHandler}>
            <input
              type="search"
              className="brand-search"
              placeholder="Поиск"
              name='search'
              onChange={this.inputHandler}
              value={this.state.value}
            />
            <input
              type="submit"
              value=""
              className="submit"/>
          </form>
        </div>
      </section>
    )
  }
}

export default BrandFilter;
