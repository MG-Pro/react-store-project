import React from 'react';

const heelSizeFilter = (props) => {
  return (
    <section className="sidebar__division">
      <div className="sidebar__heel-height">
        <div
          className="sidebar__division-title"
          onClick={() => props.switch('heelSizeVis')}
        >
          <h3>Размер каблука</h3>
          <div className={`${props.visible ? 'opener-down' : 'opener-up'}`}/>
        </div>
        <ul className={props.visible ? 'active' : ''}>
          <div className="list-1">
            {props.heelSizes.map((item, i, list) => {
              if (i >= list.length / 2) {
                return null;
              }
              const checked = props.activeHeelSizes.includes(item + '');
              return (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={item}
                      onClick={(e) => props.filterHandler(e, 'heelSize')}
                      checked={checked}
                    />
                    <span className="checkbox-custom"/>
                    <span className="label">{item}</span>
                  </label>
                </li>
              )
            })}
          </div>
          <div className="list-1">
            {props.heelSizes.map((item, i, list) => {
              if (i < list.length / 2) {
                return null;
              }
              const checked = props.activeHeelSizes.includes(item + '');
              return (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={item}
                      onClick={(e) => props.filterHandler(e, 'heelSize')}
                      checked={checked}
                    />
                    <span className="checkbox-custom"/>
                    <span className="label">{item}</span>
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

heelSizeFilter.defaultProps = {
  activeHeelSizes: [],
  heelSizes: [],
};

export default heelSizeFilter;
