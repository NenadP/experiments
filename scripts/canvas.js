define("Canvas", function () {
	function Canvas(tilesNum) {
		this.tilesNum = tilesNum;
		this.dim = Math.sqrt(this.tilesNum);
		this.element = document.getElementById("canvas");
		this.fields = [];
		this.registerFields();
	}

	Canvas.prototype.registerFields = function () {
		for (var i = 0; i < this.tilesNum; i++) {
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

			//TODO implement left right edges

			if (i > (this.tilesNum - this.dim -1)) {
				field.isEdge.bottom = true;
			}
			this.fields.push(field);
		}
	};
	return Canvas;
});
