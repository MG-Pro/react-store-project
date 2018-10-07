import React, {Component} from 'react';

export default class SearchBtn extends Component {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    if(this.props.history.location.pathname !== '/search') {
      this.props.history.push(`/search`);
    }
    this.props.searchHandler(e.currentTarget.value);
  };

  render() {
    return (
      <form
        className={`header-main__search ${this.props.active ? 'header-main__search_active' : ''}`}
        onSubmit={e => {e.preventDefault()} }
      >
        <input placeholder="Поиск" onInput={this.inputHandler}/>
        <i className="fa fa-search" aria-hidden="true"/>
      </form>
    )
  }
}
