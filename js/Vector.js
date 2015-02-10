
/************************************
* Esta clase es la encargada de posicionar a los elementos
* y de establecer su dirección de movimiento
* me he ayudado de una librería para formarla
***********************************/

function Vector(x,y){
	this.x = x;
	this.y = y;
}

//Método para obtener el módulo del vector
Vector.prototype.longitud = function() {
	return (Math.sqrt(this.x * this.x + this.y * this.y));
};

//Método que devuelve un nuevo vector resultante de 
// la multuplicación escalar por num
Vector.prototype.escalar = function(num) {
	return new Vector(this.x*num, this.y*num);
};

//Método que suma dos vectores distintos
Vector.prototype.sumar = function(vec) {
	return new Vector(this.x + vec.x, this.y + vec.y);
};

//Método que devuelve un vector normalizado
Vector.prototype.normalizar = function() {

	var lon = this.longitud();

	if(lon != 0)
		return this.escalar(1/lon);
	else 
		return new Vector(0,0);

};

//Rotar el vector según un ángulo dado
Vector.prototype.rotar = function(angulo) {

	var rad = angulo * Math.PI / 180;

	var x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
	var y = this.x * Math.sin(rad) + this.y * Math.cos(rad);

	//redondeamos el resultado a dos decimales
	if(x != 0)
		x = Math.round(x*100)/100;

	if(y != 0)
		y = Math.round(y*100)/100;

	return new Vector(x,y);
};

//Obtiene el angulo que tiene el vector
Vector.prototype.getAngulo = function() {
	return Math.atan2(this.y, this.x)*180 / Math.PI;
};

//Devuelve un clon del vector
Vector.prototype.clonar = function() {
	return new Vector(this.x, this.y);
};