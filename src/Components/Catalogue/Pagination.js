import React, {Component} from 'react';
import '../../css/Catalogue/Pagination.css'

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDotsEnd: true,
      isDotsStart: false,
      offset: 0
    };
    this.visiblePagesCount = 5;
    this.visiblePages = this.getPages(this.visiblePagesCount);
    this.curPage = 1;
  }


  arrowsHandler = (e) => {
    e.preventDefault();
    const dir = e.currentTarget.parentElement.classList.contains('angle-forward') ? 1 : -1;
    const page = this.props.page;
    if (page + dir <= 0 || page + dir > this.props.pages) {
      return;
    }
    this.changePage(page + dir);
  };

  setActivePage = (e, page) => {
    e.preventDefault();
    this.changePage(page);
  };

  changePage = (page) => {
    this.test(page);
    const pages = this.props.pages;
    const pagesArr = this.getPages(pages);
    const shift = pagesArr[page - 1] - pagesArr[this.curPage - 1];
    let offset = this.state.offset;
    let isDotsEnd = this.state.isDotsEnd;
    let isDotsStart = this.state.isDotsStart;

    if (shift === 0) {
      return;
    }

    if (page > pages - 3 && isDotsEnd && shift > 0) {
      offset = offset + shift;
      isDotsEnd = false
    } else if (isDotsEnd && shift > 0) {
      if (page > 3) {
        offset = offset + shift;
        isDotsStart = true;
      }
    }
    if (page <= 3 && isDotsStart && shift < 0) {
      offset = 0;
      isDotsStart = false
    } else if (isDotsStart && shift < 0) {
      if (page <= pages - 3) {
        offset = offset + shift;
        isDotsEnd = true
      }
    }

    this.setState({
      offset: offset,
      isDotsEnd: isDotsEnd,
      isDotsStart: isDotsStart
    });

    this.curPage = page;
    this.props.getPage(page);
  };

  getPageCountElem = (pos) => {
    let count = 1;
    if (pos === 'end') {
      count = this.props.pages;
    }
    return <li><a href='' onClick={(e) => this.setActivePage(e, count)}>{count}</a></li>
  };

  getPages = (length) => {
    return Array.from(Array(length), (d, i) => (i + 1));
  };

  render() {
    const dots = <li><span>...</span></li>;
    const endDots = this.state.isDotsEnd;
    const startDots = this.state.isDotsStart;

    const offset = this.state.offset //>= 3 ? 3 : this.state.offset;
    console.log(this.state.offset);
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><a href="" onClick={this.arrowsHandler}/></div>
          <ul>
            {startDots ? this.getPageCountElem('start') : null}
            {startDots ? dots : null}
            {this.visiblePages.map((page) => {
              //debugger
              const offsetPage = page + offset;
              if (offsetPage > this.props.pages) {
                return null;
              }
              return (
                <li
                  key={offsetPage}
                  className={this.props.page === offsetPage ? 'active' : ''}
                >
                  <a href="" onClick={(e) => this.setActivePage(e, offsetPage)}>{offsetPage}</a>
                </li>
              )
            })}
            {endDots ? dots : null}
            {endDots ? this.getPageCountElem('end') : null}
          </ul>
          <div className="angle-forward"><a href="" onClick={this.arrowsHandler}/></div>
        </div>
      </div>
    )
  }
}
