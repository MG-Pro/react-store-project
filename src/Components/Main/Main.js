import React, {Component} from 'react';
import Slider from './Slider';
import News from './News';
import Novelties from './Novelties';
import AboutUs from './AboutUs';
import sliderPic1 from '../../img/slider.jpg';
import sliderPic2 from '../../img/slider180deg.jpeg';

export default class Main extends Component {
  favHandler = (prod) => {
    this.props.storageHandler(prod, 'favorites');
  };

  render() {
    return (
      <div className="container">
        <Slider delay={4000} duration={2000} pics={[sliderPic1, sliderPic2, sliderPic1, sliderPic2]}/>
        <Novelties categories={this.props.categories} favorites={this.props.favorites} favHandler={this.favHandler}/>
        <News/>
        <AboutUs/>
      </div>
    );
  }
}
