EXPERIMENT1 = (function () {
  "use strict";

  var wrapper = document.getElementById("content");
  var start = document.getElementById("start");
  start.addEventListener("click", generateJollyBalls);


  function abstractTransform(transform) {
    return {
      webkitTransform: transform,
      MozTransform: transform,
      msTransform: transform,
      OTransform: transform,
      transform: transform
    }
  }

  function tick(obj, tasks) {

    var elementAnimation = setInterval(doTick, 1);

    function doTick() {
      var i = 0;

      for (i; i < tasks.length; i++) {
        tasks[i](obj);
      }
    }
  }

  function JollyBall(top, left) {

    var animTasks = [
          move,
          pulse
        ],
        div = document.createElement("div");

    div.className = "jolly-ball";

    this.top = top + randomizer(30);
    this.left = left + randomizer(30);
    this.speed = Math.floor(Math.random() * 100 ) / 100;
    this.horizontal = "right";
    this.vertical = "down";
    this.pulseGrowing = true;
    this.pulseSpeed = randomizer(100, 50) / 50;
    this.initDiameter = 32;
    this.diameter = 32;

    this.element = wrapper.appendChild(div);

    this.randomMoveTweak();
    this.randomColour();

    tick(this, animTasks);
  }

  JollyBall.prototype.randomMoveTweak = function () {
    this.pulseSize = this.initDiameter + 20 + Math.floor(Math.random() * 100);
  };

  JollyBall.prototype.randomColour = function () {
    var red = 20 + randomizer(30),
        green = 140 + randomizer(30),
        blue = 150 + randomizer(30);

    this.element.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
  };

  function randomizer(top, bottom) {
    top = top || 100;
    bottom = bottom || 0;

    var randomNum = Math.floor(Math.random() * top) - bottom;

    if (randomNum < bottom) {
      randomNum = bottom;
    }

    return randomNum;
  }

  function move(el) {

    collision(el);

    if (el.horizontal === "left") {
      el.left -= el.speed  + el.randomBounceLeft;
    }

    if (el.horizontal === "right") {
      el.left += el.speed  + el.randomBounceLeft;
    }

    if (el.vertical === "up") {
      el.top -= el.speed  + el.randomBounceTop;
    }

    if (el.vertical === "down") {
      el.top += el.speed + el.randomBounceTop;
    }

    el.element.style.left = el.left + "px";
    el.element.style.top = el.top + "px";

  }

  function collision (el) {
    if(el.left > 1000) {
      el.horizontal = "left";

    }

    if(el.left < 10) {
      el.horizontal = "right";
      randomBounce();
    }

    if(el.top > 600) {
      el.vertical = "up";
      randomBounce();
    }

    if(el.top < 10) {
      el.vertical = "down";

    }

    function randomBounce() {
      el.randomBounceTop = Math.floor(Math.random() * 100) / 100;
      el.randomBounceLeft = Math.floor(Math.random() * 100) / 100;
    }
  }

  function pulse(el) {

    el.diameter = el.pulseGrowing ? el.diameter += el.pulseSpeed : el.diameter -= el.pulseSpeed;

    if (el.diameter === el.pulseSize) {
      el.pulseGrowing = false;
    }

    if (el.diameter === el.initDiameter) {
      el.pulseGrowing = true;
    }

      scale(el, el.diameter);
  }

  function scale (el, factor) {
    el.element.style.width = el.diameter + factor + "px";
    el.element.style.height = el.diameter + factor + "px";
  }

  function generateJollyBalls() {
    var num = document.getElementById("num").value,
        offset = document.getElementById("offset").value;

    for (var i = 0; i < num; i++) {
      var element = new JollyBall(-(i * offset),-( i * offset));
    }
  }

})();