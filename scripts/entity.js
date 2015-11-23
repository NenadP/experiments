define("Entity", function () {
	function Entity(id, type, canvas) {
		this.id = id;
		this.type = type;
		this.canvas = canvas;
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

	Entity.prototype.addToCanvas = function () {
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
