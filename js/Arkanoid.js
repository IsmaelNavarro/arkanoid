function Arkanoid(nivel){

	this.canvas = document.getElementById('juego');
	this.context = this.canvas.getContext("2d");

	this.jugador = new Jugador(this.canvas);

	//De esta manera podemos tener varias pelotas en juego
	this.listaPelotas = new Array();

	//Esta es la pelota inicial
	this.listaPelotas.push(new Pelota(this.canvas, this));

	this.ladrillos = new Array();

	this.mapa = new Array();

	var mapa1 = [ 
				 [0,0,0,1,1,1,1,1,1,1,1,0,0,0], 
				 [0,3,2,3,2,3,2,2,3,2,3,2,3,0],
				 [0,2,3,2,3,2,3,3,2,3,2,3,2,0],
				 [0,1,1,1,4,1,1,1,1,4,1,1,1,0],
				 [0,1,1,0,0,0,0,0,0,0,0,1,1,0],
				 [0,1,4,1,1,1,2,2,1,1,1,4,1,0],
				 [0,0,0,1,1,3,1,1,3,1,1,0,0,0],
				 [0,0,0,0,0,1,2,2,1,0,0,0,0,0],
				 [0,0,0,0,0,0,3,3,0,0,0,0,0,0]
				];

	var mapa2 = [ 
				 [0,0,0,0,3,3,3,3,3,0,0,0,0,0],
				 [0,0,0,0,3,3,3,3,3,0,0,0,0,0],
				 [0,0,0,0,3,3,3,3,3,0,0,0,0,0],
				 [0,0,0,3,3,3,3,3,3,3,3,3,0,0],
				 [0,0,0,3,3,3,3,3,3,3,3,3,0,0],
				 [0,0,0,3,3,3,3,3,3,3,3,3,0,0],
				 [0,0,0,2,2,2,1,1,2,1,0,0,0,0],
				 [0,0,0,2,2,2,1,1,2,1,0,0,0,0],
				 [0,0,0,2,2,2,1,1,2,1,0,0,0,0],
				 [0,0,2,1,2,1,1,1,2,1,1,1,0,0],
				 [0,0,2,1,2,1,1,1,2,1,1,1,0,0],
				 [0,0,2,1,2,1,1,1,2,1,1,1,0,0],
				 [0,0,2,1,2,2,1,1,1,2,1,1,1,0],
				 [0,0,2,1,2,2,1,1,1,2,1,1,1,0],
				 [0,0,2,1,2,2,1,1,1,2,1,1,1,0],
				 [0,0,2,2,1,1,1,1,2,2,2,2,0,0],
				 [0,0,2,2,1,1,1,1,2,2,2,2,0,0],
				 [0,0,2,2,1,1,1,1,2,2,2,2,0,0],
				 [0,0,0,0,1,1,1,1,1,1,1,0,0,0],
				 [0,0,0,0,1,1,1,1,1,1,1,0,0,0],
				 [0,0,0,0,1,1,1,1,1,1,1,0,0,0]
				];

	switch(nivel){
		case "1":
			this.mapa = mapa1;
			break;
		case "2":
			this.mapa = mapa2;
			break;
	}



	/*this.mapa = [
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0],
					[0,0,3,0,0,0,3,0,0,0,3,0,0,0]
				];*/

	//Dibujamos el mapa según el patrón pasado en la matriz
	var num = 0;
	for(var i = 0; i < this.mapa.length; i++){
		for(var j = 0; j < this.mapa[i].length; j++){
			if(this.mapa[i][j] != 0){
				this.ladrillos[num] = new Ladrillo( 30*j+15, 
													15*i+50 , 
													this.mapa[i][j]  , 
													this.canvas, 
													this.context);
				num++;	
			}
		}
	}

	this.totalLadrillos = num;

	//Variable para el control del tiempo delta
	this.tiempoTranscurrido = Date.now();

	//Variables de control del juego
	this.paused = false;
	this.juego = true;

	document.onkeydown = document.onkeyup = keyLogger;

	//Iniciamos el bucle principal del juego
	this.animate();
}

//Esta función es la encargada de dibujar en lienzo en cada una de las vueltas del juego
Arkanoid.prototype.animate = function(time) {
	
	if(this.juego){

		//El delta es la diferencia de tiempo entre cada bucle de ejecución
		//Esta variable nos permitirá dibujar el desplazamiento de los elementos
		//de forma correcta
		var delta = (Date.now() - this.tiempoTranscurrido)/1000;
		this.tiempoTranscurrido=Date.now();

		if(!this.paused){
			this.move(delta);
			this.draw();
		}

		this.actualizaInfo();
		this.compruebaEventos();

		var arka=this;
		window.requestAnimationFrame(function(){ arka.animate(); });
			
	}

}; 

//Esta función comprueba una serie de elemntos globales que pueden darse a lo largo de la partida
Arkanoid.prototype.compruebaEventos = function() {
	
	if(keymap[90])
		this.listaPelotas[0].saque(-1);

	if(keymap[88])
		this.listaPelotas[0].saque(1);

	if(keymap[27]){
		this.paused = true;
		document.getElementById('pausa').style.display = "block";
	}

	//Cuando la velocidad de alguna de las pelotas sea mayor que la velocidad del jugador más 1/3
	//aumentamos la velocidad de este jugar
	//Además establecemos el valor de la velocidad inicial de las futuras pelotas para que el juego vaya más rápido
	for(var i = 0; i < this.listaPelotas.length; i++){
		if(this.listaPelotas[i].velocidad > this.jugador.velocidad * 4/3)
			this.jugador.incrementaVelocidad(30);
		
		if(this.jugador.velocidad > this.listaPelotas[i].velocidadIni)
			this.listaPelotas[i].velocidadIni = this.jugador.velocidad;
	}
		
};

//Método que actualiza la información del panel lateral del juego
Arkanoid.prototype.actualizaInfo = function() {

	var vidas = document.getElementById('vidas');
	vidas.innerHTML = this.jugador.vidas;

	var puntos = document.getElementById('puntos');
	puntos.innerHTML = this.jugador.puntos;

	var velocidad = document.getElementById('velocidad');
	velocidad.innerHTML = this.listaPelotas[0].velocidad;

};

//Método que dibuja el lienzo en cada vuelta del bucle
Arkanoid.prototype.draw = function() {

	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.jugador.draw(this.context);

	for(var i = 0; i < this.ladrillos.length; i++)
		this.ladrillos[i].draw(this.context);

	for(var i = 0; i < this.listaPelotas.length; i++){
		this.listaPelotas[i].draw(this.context);

		if(this.listaPelotas[i].puntosFlotantes != null)
			this.listaPelotas[i].puntosFlotantes.draw(this.context);	
	}

};

//Método que mueve los distintos elementos a lo largo del lienzo
Arkanoid.prototype.move = function  (delta) {
	
	if(keymap[37]){
		this.jugador.move(delta, "izquierda");

		if(!this.listaPelotas[0].movimiento)
			this.listaPelotas[0].mueveSobrePala(delta,"izquierda");
	}
		

	if(keymap[39]){
		this.jugador.move(delta, "derecha");

		if(!this.listaPelotas[0].movimiento)
			this.listaPelotas[0].mueveSobrePala(delta,"derecha");
	}

	//Para cada pelota del array de pelotas dividimos su movimiento en pequeños intervalos
	//Esto nos permite comprobar mejor las colisiones ya que se evitará que las pelotas
	//atraviesen 
	for(var j = 0; j < this.listaPelotas.length; j++){

		if(this.listaPelotas[j].movimiento){

		var quantum=Math.floor(delta/0.005);
		for (var i=0;i<quantum;i++)
		{
		    this.listaPelotas[j].move(0.005);
		}
		quantum=delta-quantum*0.005;
		this.listaPelotas[j].move(quantum);

		//De esta manera solo puede realizar un rebote contra un ladrillo por movimiento
		this.listaPelotas[j].rebotado = false;

		}
			
	}

	//Comprobamos si se ha perdido alguna de las pelotas extras y reformamos el array
	this.compruebaPelotasExtra();
	
}

Arkanoid.prototype.finJuego = function(condicion) {

	var cont = document.getElementById('fin'); 
	
	cont.style.display = "block";

	cont.getElementsByTagName('div')[0].innerHTML = condicion;
};

Arkanoid.prototype.pierdeVida = function() {
	
	if(this.listaPelotas.length == 1){

		this.jugador.vidas--;
		if(this.jugador.vidas == 0){
			this.juego = false;
			this.paused = true;
			this.finJuego("Se te han acabado las vidas");
		}
		this.listaPelotas[0].iniciaPos();

	}

};

Arkanoid.prototype.compruebaPelotasExtra = function() {

	if(this.listaPelotas.length > 1){
		//eliminamos las pelotas que haya de sobra
		for(var i = 0; i < this.listaPelotas.length; i++){
			if(this.listaPelotas[i].eliminada)
				delete this.listaPelotas[i];
		}

		//formamos un nuevo array
		var nuevaLista = new Array();
		for(var i = 0; i < this.listaPelotas.length; i++){
			if(this.listaPelotas[i] != undefined)
				nuevaLista.push(this.listaPelotas[i]);
		}

		this.listaPelotas = nuevaLista;

	}

};

Arkanoid.prototype.destruyeLadrillo = function() {
	this.totalLadrillos--;

	if(this.totalLadrillos <= 0){
		this.juego = false;
		this.paused = true;
		this.finJuego("Has acabado con todos los ladrillos");
	}
};

//Con este método vamos comprobando las teclas pulsadas
var keymap = [];
function keyLogger (e) {
	e = e|| window.event;
	keymap[e.keyCode] = (e.type == 'keydown');
	//console.log(e.keyCode);

}