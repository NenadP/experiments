define("Map", function () {
	function Map(tilesNum) {
		this.tilesNum = tilesNum;
		this.dim = Math.sqrt(this.tilesNum);
		this.element = document.getElementById("map");
		this.fields = [];
		this.registerFields();
	}

	Map.prototype.iterateMap = function (fn) {
		var x = 0,
				i = 0,
				that = this,
				iterateRow = function () {
					for (var y = 0; y < that.dim; y++) {
						fn(x, y, i);
						i += 1;
					}
					x += 1;

					if (x < that.dim) {
						iterateRow();
					}
				};
		iterateRow();
	};

	Map.prototype.registerFields = function () {
		var that = this;

		this.iterateMap(function (x, y, i) {
			var field = {
				id: i,
				isEdge: {
					top: false,
					bottom: false,
					left: false,
					right: false
				}
			};

			if (i < this.dim) {
				field.isEdge.top = true;
			}

			if (i > (that.tilesNum - that.dim - 1)) {
				field.isEdge.bottom = true;
			}

			if (y === 0) {
				field.isEdge.left = true;
			}

			if (y === that.dim - 1) {
				field.isEdge.right = true;
			}

			that.fields.push(field);
		})
	};
	return Map;
});
