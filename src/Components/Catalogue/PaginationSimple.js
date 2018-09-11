import React from 'react';

export default (props) => {

  const arrowsHandler = (e) => {
    e.preventDefault();
    const dir = e.currentTarget.parentElement.classList.contains('angle-forward') ? 1 : -1;
    const page = props.page;
    if (page + dir <= 0 || page + dir > props.pages) {
      return;
    }
    changePage(page + dir);
  };

  const setActivePage = (e, page) => {
    e.preventDefault();
    changePage(page)
  };

  const changePage = (page) => {
    if (page === props.page) {
      return;
    }
    props.getPage(page);
  };

  return (
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        <div className="angle-back"><a href="" onClick={arrowsHandler}/></div>
        <ul>
          {Array.from(Array(props.pages), (d, i) => (i + 1))
            .map((page) => {
              return (
                <li
                  key={page}
                  className={props.page === page ? 'active' : ''}
                >
                  <a href="" onClick={(e) => setActivePage(e, page)}>{page}</a>
                </li>
              )
            })}
        </ul>
        <div className="angle-forward"><a href="" onClick={arrowsHandler}/></div>
      </div>
    </div>
  )
}
