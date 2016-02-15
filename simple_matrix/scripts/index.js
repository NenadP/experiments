NENAD_PANTIC = (function () {
  "use strict";

  function ColorBoxes (main) {
    this.main = main;
  }

  var obj = new ColorBoxes("Nenad Pantic");

  ColorBoxes.prototype.getRandomColor = function () {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  ColorBoxes.prototype.getRandomGrayColor = function () {
    var value = Math.random() * 0xFF | 0,
        grayscale = (value << 16) | (value << 8) | value;
    return '#' + grayscale.toString(16);

  };

  ColorBoxes.prototype.change = function (evt) {

    clearInterval(obj.interval);

    evt.srcElement.style.backgroundColor = obj.getRandomColor();
  };


  ColorBoxes.prototype.addBlocks = function	() {
    var panel = document.getElementById("panel"),
        element;
    panel.innerHTML = '';



    for (var i = 0; i < 64; i++) {
      element = document.createElement("span");

      element.id = "block" + i;
      element.style.backgroundColor = obj.getRandomGrayColor();
      element.addEventListener("mouseover", obj.change);

      panel.appendChild(element);
    }
  };

  ColorBoxes.prototype.animateBlocks = function	() {
    this.interval = setInterval(obj.addBlocks, 250);
  };

  obj.animateBlocks();


})();