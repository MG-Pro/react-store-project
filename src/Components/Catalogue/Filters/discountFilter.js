import React from 'react';
import reasonFilter from './reasonFilter';

const discountFilter = (props) => {
  return (
    <section className="sidebar__division">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          name="checkbox-disc"
          onChange={props.filterHandler}
          checked={props.active}
        />
        <span className="checkbox-discount"/>
        <span className="text-discount">Со скидкой</span>
      </label>
    </section>
  )
};

discountFilter.defaultProps = {
  active: false,
};

export default discountFilter;
