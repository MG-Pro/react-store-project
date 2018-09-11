import React from 'react';

const reasonFilter = (props) => {
  return (
    <section className="sidebar__division">
      <div className="sidebar__occasion">
        <div
          className="sidebar__division-title"
          onClick={() => props.switch('reasonVis')}
        >
          <h3>Повод</h3>
          <div className={`${props.visible ? 'opener-down' : 'opener-up'}`}/>
        </div>
        <ul className={props.visible ? 'active' : ''}>
          {props.reasons.map((item, i) => {
            return (
              <li
                key={i}
                className={`${props.activeReasons === item ? 'active' : ''}`}
              >
                <a
                  href=""
                  onClick={(e) => props.filterHandler(e, item, 'reason')}
                >{item}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
};

reasonFilter.defaultProps = {
  activeReasons: [],
  reasons: [],
};

export default reasonFilter;
