define("main", ["Entity", "Canvas"], function (Entity, Canvas) {

	var Main = function (tilesNum) {
		this.tiles = {
			0: "zero",
			1: "one"
		};
		this.map = [];
		this.entities = [];
		this.canvas = new Canvas(tilesNum);
	},_getRandomBinary = function () {
		return Math.random() > 0.5 ? 1 : 0;
	};

	Main.prototype.addEntities = function () {
		var that = this;

		this.canvas.iterateMap(function (x, y, i) {
			var entity = new Entity(x, y, i, that.tiles[that.map[x][y]], that.canvas);
			that.entities.push(entity);
		});
		/*
		 * Find connected entities
		 */
		this.canvas.iterateMap(function (x, y, i) {
			var fields = {
				top: i - that.canvas.dim,
				bottom: i + that.canvas.dim,
				left: i - 1,
				right: i + 1
			};

			for (var connection in that.entities[i].connections) {
				if (that.entities[i].connections.hasOwnProperty(connection) &&
						(that.entities[fields[connection]] && that.entities[fields[connection]].type === that.entities[i].type)) {
					if (!that.canvas.fields[i].isEdge[connection]) {
						that.entities[i].connections[connection] = true;
					}
				}
			}
		})
	};

	Main.prototype.draw = function () {
		var entity = {},
				that = this;
		this.clear();

		this.canvas.iterateMap(function (x, y, i) {
			entity = that.entities[i];

			that.canvas.element.innerHTML += entity.addToCanvas();
			that.entities[i].setEdges();
		});
		this.entities = [];
	};

	Main.prototype.clear = function () {
		this.canvas.element.innerHTML = "";
	};

	Main.prototype.randomMain = function () {
		var randomMain = [],
				rand = 0;

		this.canvas.iterateMap(function (x) {
			if (!randomMain[x]){
				randomMain.push([]);
			}
			randomMain[x].push(_getRandomBinary());
		});
		this.map = randomMain;
	};

	Main.prototype.tick = function (type, runTimes) {
		var that = this;

		function _tick() {
			that[type]();
			that.addEntities();
			that.draw();
		}

		while (runTimes !== 0) {
			setTimeout(_tick, 1000 * runTimes);
			runTimes -= 1;
		}
	};

	map = new Main(64);
	map.tick("randomMain", 100);
});