import React from 'react';
import reasonFilter from './reasonFilter';

const sizeFilter = (props) => {
  return (
    <section className="sidebar__division">
      <div className="sidebar__size">
        <div
          className="sidebar__division-title"
          onClick={() => props.switch('sizeVis')}
        >
          <h3>Размер</h3>
          <div className={`${props.visible ? 'opener-down' : 'opener-up'}`}/>
        </div>
        <ul className={props.visible ? 'active' : ''}>
          <div className="list-1">
            {props.sizes.map((size, i, list) => {
              if (i >= list.length / 2) {
                return null;
              }
              const checked = props.activeSizes.includes(size + '');
              return (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={size}
                      onChange={(e) => props.filterHandler(e, 'size')}
                      checked={checked}
                    />
                    <span className="checkbox-custom"/>
                    <span className="label">{size}</span>
                  </label>
                </li>
              )
            })}
          </div>
          <div className="list-2">
            {props.sizes.map((size, i, list) => {
              if (i < list.length / 2) {
                return null;
              }
              const checked = props.activeSizes.includes(size + '');
              return (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={size}
                      onChange={(e) => props.filterHandler(e, 'size')}
                      checked={checked}
                    />
                    <span className="checkbox-custom"/>
                    <span className="label">{size}</span>
                  </label>
                </li>
              )
            })}
          </div>
        </ul>
      </div>
    </section>
  )
};

sizeFilter.defaultProps = {
  activeSizes: [],
  sizes: [],
};

export default sizeFilter;
