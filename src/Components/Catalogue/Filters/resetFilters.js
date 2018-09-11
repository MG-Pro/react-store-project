import React from 'react';
import reasonFilter from './reasonFilter';

const resetFilters = (props) => {
  return (
    <section className="sidebar__division">
      <div className={`drop-down ${props.visible ? '' : 'hide'}`}>
        <a href="" onClick={props.filterHandler}>
          <span className="drop-down-icon"/>Сбросить
        </a>
      </div>
    </section>
    )
};

resetFilters.defaultProps = {
  visible: false,
};

export default resetFilters;
