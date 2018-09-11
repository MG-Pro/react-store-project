export default (sliderElem, thumbMin, thumbMax) => {
  const sliderCoords = getCoords(sliderElem);
  const rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;
  let min = parseInt(getComputedStyle(thumbMin).left);
  let max = parseInt(getComputedStyle(thumbMax).left);
  let drag = false;

  thumbMin.onmousedown = (e) => {
    drag = true;
    const thumbCoords = getCoords(thumbMin);
    const shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = (e) => {
      if(!drag) {
        return;
      }
      let newLeft = e.pageX - shiftX - sliderCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > max - thumbMin.offsetWidth / 2) {
        newLeft = max - thumbMin.offsetWidth / 2;
      }

      min = newLeft;
      thumbMin.style.left = newLeft + 'px';
    };

    document.onmouseup = () => {
      drag = false;
    };
    return false;
  };

  thumbMax.onmousedown = (e) => {
    drag = true;
    const thumbCoords = getCoords(thumbMax);
    const shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = (e) => {
      if(!drag) {
        return;
      }
      let newLeft = e.pageX - shiftX - sliderCoords.left;

      if (newLeft < min + thumbMin.offsetWidth / 2) {
        newLeft = min + thumbMin.offsetWidth / 2;
      }

      if (newLeft > rangeEnd) {
        newLeft = rangeEnd;
      }
      max = newLeft;
      thumbMax.style.left = newLeft + 'px';
    };

    document.onmouseup = () => {
      drag = false;
    };
    return false;
  };

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }
};
