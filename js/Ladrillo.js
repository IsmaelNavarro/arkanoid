function Ladrillo(x, y, estado, canvas, context){

	this.canvas = canvas;
	this.ancho = 30;
	this.alto = 15;
	this.estado = estado;

	this.pos = new Vector(x,y);

}

Ladrillo.prototype.draw = function(context) {

	//En función del tipo de ladrillo lo dibujamos de una forma 
	// u otra para distinguirlos en la pantalla
	if(this.estado != 0){

		switch(this.estado){
			case 1:
				context.fillStyle = "#DDDD00";
				break;
			case 2:
				context.fillStyle = "#CE8E17";
				break;
			case 3:
				context.fillStyle = "#CC0000";
				break;
			case 4:
				context.fillStyle = "#8080FF";
		}

	   var x = this.pos.x - this.ancho/2;
	   var y = this.pos.y - this.alto/2;
	   var radio = 4;

	   context.lineWidth = .5;	
	   context.strokeStyle = 'black';
	   context.beginPath();
	   context.moveTo(x, y + radio);
	   context.lineTo(x, y + this.height - radio);
	   context.quadraticCurveTo(x, y + this.alto ,x + radio, y + this.alto);
	   context.lineTo(x + this.ancho - radio, y + this.alto);
	   context.quadraticCurveTo(x + this.ancho, y + this.alto, x + this.ancho, y + this.alto-radio);
	   context.lineTo(x + this.ancho, y + radio);
	   context.quadraticCurveTo(x + this.ancho, y, x + this.ancho - radio, y);
	   context.lineTo(x + radio, y);
	   context.quadraticCurveTo(x, y, x, y + radio);
	   context.closePath();
	   context.fill();
	   context.stroke();



	};	
	
};
