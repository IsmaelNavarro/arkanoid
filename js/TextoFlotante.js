function TextoFlotante(texto, ladrillo){
	this.texto = texto;
	this.pos = new Vector(ladrillo.pos.x - 5, ladrillo.pos.y + 3);
} 

TextoFlotante.prototype.draw = function(context) {
	context.font = 'italic 8pt Calibri';
	context.fillStyle = "white";
    context.fillText(this.texto, this.pos.x, this.pos.y);
};