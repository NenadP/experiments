define("main", ["Entity", "Canvas"], function (Entity, Canvas) {

	var Main = function (tilesNum) {
		this.tiles = {
			0: "zero",
			1: "one"
		};
		this.map = [];
		this.canvas = new Canvas(tilesNum);
	};

	Main.prototype.draw = function () {
		var entities = [];
		this.clear();
		for (var i = 0; i < this.canvas.tilesNum; i++) {
			var entity = new Entity(i, this.tiles[this.map[i]], this.canvas);
			entities.push(entity);
			this.canvas.element.innerHTML += entity.addToCanvas();
		}

		/*
		 * Find connected entities
		 */
		for (var i = 0; i < this.canvas.tilesNum; i++) {
			var fields = {
				top: i - this.canvas.dim,
				bottom: i + this.canvas.dim,
				left: i - 1,
				right: i + 1
			};

			for (var connection in entities[i].connections) {
				if (entities[i].connections.hasOwnProperty(connection)) {
					if (entities[fields[connection]] && entities[fields[connection]].type === entities[i].type) {
						if (!this.canvas.fields[i].isEdge[connection]) {
							entities[i].connections[connection] = true;
						}
					}
				}
			}
			entities[i].setEdges();
		}
		entities = [];
	};

	Main.prototype.clear = function () {
		this.canvas.element.innerHTML = "";
	};


	Main.prototype.randomMain = function () {
		var randomMain = [],
			rand = 0;
		for (var i = 0; i < this.canvas.tilesNum; i++) {
			rand = Math.random();
			rand = rand > 0.5 ? 1 : 0;
			randomMain.push(rand);
		}
		this.map = randomMain;
	};

	Main.prototype.reDraw = function (type, runTimes) {
		var that = this,
			timesRun = 0;

		function _draw() {
			that[type]();
			that.draw();
		}

		while (runTimes !== timesRun) {
			setTimeout(_draw, 1000 * timesRun);
			timesRun += 1;
		}
	};

	map = new Main(64);
	map.reDraw("randomMain", 100);
});