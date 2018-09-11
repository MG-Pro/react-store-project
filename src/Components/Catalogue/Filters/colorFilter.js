import React from 'react';
import colorsData from './colorsData';

const colorFilter = (props) => {
  return (
    <section className="sidebar__division">
      <div className="sidebar__color">
        <div
          className="sidebar__division-title"
          onClick={() => props.switch('colorVis')}
        >
          <h3>Цвет</h3>
          <div className={`${props.visible ? 'opener-down' : 'opener-up'}`}/>
        </div>
        <ul className={props.visible ? 'active' : ''}>
          {props.colors.map((color, i) => {
            return (
              <li
                key={i}
                className={`${props.activeColor === color ? 'active' : ''}`}
              >
                <a
                  href=""
                  onClick={(e) => props.filterHandler(e, color, 'color')}
                >
                  <div className={`color ${colorsData.find(item => item.title === color).value}`}/>
                  <span className="color-name">{color}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
    )
};

colorFilter.defaultProps = {
  colors: [],
};

export default colorFilter;
