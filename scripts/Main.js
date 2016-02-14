define("main", ["Entity", "Map"], function (Entity, Map) {

	var Main = function (tilesNum) {
		this.tiles = {
			0: "zero",
			1: "one"
		};
		this.mapEntities = [];
		this.entities = [];
		this.map = new Map(tilesNum);
	},
		_getRandomBinary = function () {
		return Math.random() > 0.5 ? 1 : 0;
	};

	Main.prototype.addEntities = function () {
		var that = this;

		this.map.iterateMap(function (x, y, i) {
			var entity = new Entity(x, y, i, that.tiles[that.mapEntities[x][y]], that.map);
			that.entities.push(entity);
		});
		/*
		 * Find connected entities
		 */
		this.map.iterateMap(function (x, y, i) {
			var fields = {
				top: i - that.map.dim,
				bottom: i + that.map.dim,
				left: i - 1,
				right: i + 1
			};

			for (var connection in that.entities[i].connections) {
				if (that.entities[i].connections.hasOwnProperty(connection) &&
						(that.entities[fields[connection]] && that.entities[fields[connection]].type === that.entities[i].type)) {
					if (!that.map.fields[i].isEdge[connection]) {
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

		this.map.iterateMap(function (x, y, i) {
			entity = that.entities[i];

			that.map.element.innerHTML += entity.addToMap();
			that.entities[i].setEdges();
		});
		this.entities = [];
	};

	Main.prototype.clear = function () {
		this.map.element.innerHTML = "";
	};

	Main.prototype.randomMain = function () {
		var randomMain = [],
				rand = 0;

		this.map.iterateMap(function (x) {
			if (!randomMain[x]){
				randomMain.push([]);
			}
			randomMain[x].push(_getRandomBinary());
		});
		this.mapEntities = randomMain;
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

	var visualiseRand = new Main(64);
	visualiseRand.tick("randomMain", 100);
});
