import React from 'react';

const seasonFilter = (props) => {
  return (
    <section className="sidebar__division">
      <div className="sidebar__season">
        <div
          className="sidebar__division-title"
          onClick={() => props.switch('seasonVis')}
        >
          <h3>Сезон</h3>
          <div className={`${props.visible ? 'opener-down' : 'opener-up'}`}/>
        </div>
        <ul className={props.visible ? 'active' : ''}>
          {props.seasons.map((item, i) => {
            return (
              <li
                key={i}
                className={`${props.activeSeasons === item ? 'active' : ''}`}
              >
                <a
                  href=""
                  onClick={(e) => props.filterHandler(e, item, 'season')}
                >{item}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
    )
};

seasonFilter.defaultProps = {
  activeSeasons: [],
  seasons: []
};

export default seasonFilter;
