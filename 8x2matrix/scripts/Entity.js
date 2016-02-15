define("Entity", function () {
	function Entity(x, y, id, type, map) {
		this.x = x;
		this.y = y;
		this.id = id;
		this.type = type;
		this.map = map;

		this.connections = {
			top: false,
			bottom: false,
			left: false,
			right: false
		};

		this.onEdge = {
			top: false,
			bottom: false,
			left: false,
			right: false
		}
	}

	Entity.prototype.addToMap = function () {
		return '<div id="entity-' + this.id + '" class="' + this.type + '"></div>';
	};

	Entity.prototype.setEdges = function () {
		var entityElement = document.getElementById("entity-" + this.id);

		for (var connection in this.connections) {
			if (this.connections.hasOwnProperty(connection)) {
				if (this.connections[connection]) {
					entityElement.className += " connected-" + connection;
				}
			}
		}
	};

	return Entity;
});
