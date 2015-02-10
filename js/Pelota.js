function Pelota(canvas, arkanoid){

	this.canvas = canvas;
	this.diametro = 7;

	this.pos;
	this.velocidad;
	this.movimiento;

	this.velocidadIni = 250;

	this.arkanoid = arkanoid;

	//Esta variable controla que no se produzcan multiples rebotes contra ladrillos simultaneos
	this.rebotado = false;
	this.coliConsecutivos = 0;

	//vector de la direccion
	this.vectorMov;

	//variable para el control de la eliminación de la pelota
	this.eliminada = false;

	this.puntosFlotantes = null;

	this.iniciaPos();

}

//Iniciamos la posición de la pelota sobre la pala
Pelota.prototype.iniciaPos = function() {

	this.vectorMov = new Vector(0,0);
	this.movimiento = false;
	this.velocidad = 0;
	this.pos =  new Vector(this.arkanoid.jugador.pos.x, this.arkanoid.jugador.pos.y-this.arkanoid.jugador.alto/2-this.diametro/2);

};

Pelota.prototype.draw = function(context) {
	context.beginPath();
	context.fillStyle = "#A6A6A6";
	context.arc(this.pos.x, this.pos.y, this.diametro/2, 0, 2 * Math.PI, false);
	context.lineWidth = 1;	
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();
};

//Este método realiza el saque de la pelota
//En función del parámetro dirección la pelota saldrá en una dirección u otra
Pelota.prototype.saque = function(direccion) {

	if(!this.movimiento){
		this.velocidad = this.velocidadIni;
		this.movimiento = true;
		this.vectorMov = new Vector(1 * direccion, -1 );
        this.vectorMov = this.vectorMov.normalizar().escalar(this.velocidad);
	}
	
};

Pelota.prototype.incrementaVelo = function() {
	this.velocidad += 5;
	this.vectorMov = this.vectorMov.normalizar().escalar(this.velocidad);
};

//Este método comprueba el rebote de la pelota con los distintos elementos del juego
//En principio es la esencia del juego y es un método muy largo por lo que sea ha dividido
//en varios métodos en función del elemento con el que se comprueba la colisción
Pelota.prototype.move = function(delta) {

	var radio = this.diametro / 2;
	this.pos = 	this.pos.sumar(this.vectorMov.escalar(delta));

	//Comprobamos el rebote con las paredes del canvas
	this.reboteParedes(radio);

	//Comprobamos el rebote con la pala del jugador
	this.reboteJugador();
	

    //Comprobamos los choques con los ladrillos
    this.reboteLadrillos(radio);
   
};

//Este método comprueba el rebote con las paredes
Pelota.prototype.reboteParedes = function(radio) {

	//Rebote por la izquierda
	if(this.pos.x - radio < 0){
		this.pos.x = radio;
		this.vectorMov.x *= -1;
	}

	//Rebote por la derecha
	if(this.pos.x + radio > this.canvas.width){
		this.pos.x = this.canvas.width - radio;
		this.vectorMov.x *= -1;
	}

	//Rebote por arriba
	if(this.pos.y + radio < 0){
		this.pos.y = radio;
		this.vectorMov.y *= -1;
	}

	//Rebote por abajo
	//Si rebota por aquí el jugador pierde una vida y se reinicia el juego
	if(this.pos.y > this.canvas.height){
		this.arkanoid.pierdeVida();
		this.eliminada = true;
	}
};

//Comprobamos el rebote con el jugador
Pelota.prototype.reboteJugador = function() {

	var vector = this.vectorMov;
    if (this.vectorMov.y > 0 && this.colisiona(this.arkanoid.jugador))
    {

    	this.vectorMov.y*=-1;
    	this.incrementaVelo();

    	//console.log(this.velocidad);

        this.vectorMov = this.vectorMov.rotar(this.pos.x - this.arkanoid.jugador.pos.x);

   		var angulo = this.vectorMov.getAngulo() * -1;
		
		if(angulo > 145 || angulo < 45)
			this.vectorMov = vector;   
    }

};

Pelota.prototype.reboteLadrillos = function(radio) {

	 if(this.pos.y < 550){

    	for(var i = 0; i < this.arkanoid.ladrillos.length; i++){

    		//Ladrillo que comprobamos
    		var ladrillo = this.arkanoid.ladrillos[i];
    		if(ladrillo.estado != 0 && this.rebotado == false && this.colisiona(ladrillo)){

    			//Esta variable nos permite  conocer los rebotes consecutivos para sumar los puntos
    			this.coliConsecutivos++;

    			//Variables para comprobamos el lugar de colisción
    			var coliInf = false;
    			var coliSup = false;
    			var coliDer = false;
    			var coliIzd = false;

    			//Variables auxiliares de posicion, con los vectores de movimiento original podemos conocer 
    			//los datos necesarios para corregir el rebote
    			var oriX = this.vectorMov.x;
                var oriY = this.vectorMov.y;

                //Corregimos la posición de la pelota y la velocidad en función del rebote
                //Rebote por la derecha
    			if(this.pos.x >= ladrillo.pos.x + ladrillo.ancho/2){
    			    this.vectorMov.x *= -1;
    			    this.pos.x = ladrillo.pos.x + ladrillo.ancho/2 + radio;
    			    coliDer = true;
    			}
    			//Rebote por la izquierda
    			else if( this.pos.x  <= ladrillo.pos.x - ladrillo.ancho/2){
    				this.vectorMov.x *= -1;
    				this.pos.x = ladrillo.pos.x - ladrillo.ancho/2 - radio;
    				coliIzd = true;
    			}
    			//Rebote por abajo
    			if(this.pos.y > ladrillo.pos.y + ladrillo.alto/2){
    				this.vectorMov.y *= -1;
    				this.pos.y = ladrillo.pos.y + ladrillo.alto/2 + radio;
    				coliInf = true;
    			}
    			//Rebote por arriba
    			else if(this.pos.y  < ladrillo.pos.y - ladrillo.alto/2){
    				this.vectorMov.y *= -1;
    				this.pos.y = ladrillo.pos.y - ladrillo.alto/2 - radio;
    				coliSup = true;
    			}

    			//En caso de que la pelota rebote en la esquina del ladrillo se produce un rebote extraño
    			//que aunque correcto matematicamente hace que la jugabilidad disminuya y se den situaciones extrañas
    			//es por eso que aquí corregimos el rebote en esos casos
    			if((coliDer || coliIzd) && (coliInf || coliSup)){

    				//Estudiamos las esquinas por separado para corregir el rebote
    				//Esquina superior-izquierda
    				if(coliIzd && coliSup){
                        if((oriX > 0 && oriY > 0) || (oriX > 0 && oriY < 0) )
                            this.vectorMov.y *= -1;
                        else if(oriX < 0 && oriY < 0)
                            this.vectorMov.x *= -1; 
    				}
    				//Esquina superior-derecha
                    if(coliDer && coliSup){
                        if((oriX < 0 && oriY > 0) || (oriX < 0 && oriY < 0) )
                            this.vectorMov.y *= -1;
                        else if(oriX > 0 && oriY > 0)
                            this.vectorMov.x *= -1;
                    }
                    //Esquina inferior-izquierda
                    if(coliIzd && coliInf){
                        if((oriX > 0 && oriY > 0) || (oriX > 0 && oriY < 0) )
                            this.vectorMov.y *= -1;
                        else if(oriX < 0 && oriY < 0)
                            this.vectorMov.x *= -1;
                    }
                    //Esquina inferior-derecha
                    if(coliDer && coliInf){
                        if((oriX < 0 && oriY > 0) || (oriX < 0 && oriY < 0) )
                            this.vectorMov.y *= -1;
                        else if(oriX > 0 && oriY < 0)
                            this.vectorMov.x *= -1;
                    }    					
    			}
				
				//Si se diera el caso de que el ladrillo es especial se hacen los efectos necesarios
    			if(ladrillo.estado > 3)
					this.compruebaLadrillosEspeciales(ladrillo);

    			ladrillo.estado--;

    			if(ladrillo.estado == 0)
    				this.arkanoid.destruyeLadrillo();

    			//Dibujamos los puntos flotantos que se ganan al destruir el ladrillo
    			this.puntosFlotantes = new TextoFlotante(this.coliConsecutivos*10, ladrillo);

    			this.arkanoid.jugador.puntos += this.coliConsecutivos * 10;

    			this.rebotado = true;
    		}

    	}

    }
    else {
    	this.coliConsecutivos = 0;
    	this.puntosFlotantes = null;
    }

};

//Comprueba si existe la colisción de la pelota con otro elemento.
//Aunque la pelota es circular comprobamos la colición como si de un 
//cuadrado se tratara. Al ser muy pequeña la pelota no se nota en el juego.
Pelota.prototype.colisiona = function(pala) {

	var radio=this.diametro/2;
    if (this.pos.x + radio < pala.pos.x - pala.ancho/2) return false;
    if (this.pos.y + radio < pala.pos.y - pala.alto/2) return false;
    if (this.pos.x - radio > pala.pos.x + pala.ancho/2) return false;
    if (this.pos.y - radio > pala.pos.y + pala.alto/2) return false;

	return true;

};

//Este método nos permite mover la pelota sobre la pala antes de realizar el saque
Pelota.prototype.mueveSobrePala = function(delta, direccion) {
	var dist = Math.round(delta * this.velocidadIni);
	
	switch(direccion){

		case "izquierda":
			if(this.pos.x - this.arkanoid.jugador.ancho/2 > 0)
				this.pos.x -= dist;
			break;

		case "derecha":
			if(this.pos.x + this.arkanoid.jugador.ancho/2 < this.canvas.width)
				this.pos.x += dist;
			break;
	}
};

//Comprobamos la coslición con los posibles ladrillos especiales
Pelota.prototype.compruebaLadrillosEspeciales = function(ladrillo) {

	if(ladrillo.estado == 4){
		//Ponemos el ladrillo a 1 para que se ponga a cero más adelante
		ladrillo.estado = 1;

		//Creamos una nueva pelota y la inicializamos
		var pelotaNueva = new Pelota(arkanoid.canvas, arkanoid);
		pelotaNueva.pos = new Vector(ladrillo.pos.x, ladrillo.pos.y);
		pelotaNueva.movimiento = true;
		pelotaNueva.velocidad = this.velocidad;
		pelotaNueva.vectorMov = new Vector(this.vectorMov.x*-1, this.velocidad);
		
		//Sumamos la nueva pelota al array de pelotas del juego
		arkanoid.listaPelotas.push(pelotaNueva);
	}

};