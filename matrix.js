(function () {

	var Matrix = function () {
		this.canvas = document.getElementById("canvas");
		this.tiles = {
			0: "zero",
			1: "one"
		};
		this.map = [];
	};

	Matrix.prototype.draw = function () {
		this.clear();
		for (var i = 0; i < 64; i++) {
			canvas.innerHTML += '<div class="' + this.tiles[this.map[i]] + '"></div>';
		}
	};

	Matrix.prototype.clear = function () {
		this.canvas.innerHTML = "";
	};


	Matrix.prototype.randomMatrix = function () {
		var randomMatrix = [],
			rand = 0;
		for (var i = 0; i < 64; i++) {
			rand = Math.random();
			rand = rand > 0.5 ? 1 : 0;
			randomMatrix.push(rand);
		}
		this.map = randomMatrix;
	};

	Matrix.prototype.reDraw = function (type, runTimes) {
		var that = this,
			timesRun = 0;

		function _draw() {
			that[type]();
			that.draw();
		}

		while (runTimes !== timesRun) {
			setTimeout(_draw, 100 * timesRun);
			timesRun += 1;
		}
	};

	map = new Matrix();
	map.reDraw("randomMatrix", 100);
}());