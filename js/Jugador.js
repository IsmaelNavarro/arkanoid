function Jugador(canvas){

	this.canvas = canvas;
	this.ancho = 80;
	this.alto = 5;
	this.pos = new Vector(canvas.width/2, canvas.height - 30);
	this.velocidad = 250;

	//Estadísticas del jugador
	this.puntos = 0;
	this.vidas = 3;
	this.vivo = true;

}

Jugador.prototype.draw = function(context) {
	context.beginPath();
	context.fillStyle = "black";
	context.lineWidth = 1;	
	context.strokeStyle = 'white';
	context.rect(this.pos.x - this.ancho/2, this.pos.y - this.alto/2, this.ancho, this.alto);
	context.fill();
	context.stroke();
};

Jugador.prototype.move = function(delta, direccion) {
	var dist = Math.round(delta * this.velocidad);
	
	switch(direccion){

		case "izquierda":
			if(this.pos.x - this.ancho/2 > 0)
				this.pos.x -= dist;
			break;

		case "derecha":
			if(this.pos.x + this.ancho/2 < this.canvas.width)
				this.pos.x += dist;
			break;
	}
};

Jugador.prototype.incrementaVelocidad = function(numero) {
	this.velocidad += numero;
};

