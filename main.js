//inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
primerResultado = null;
segundoResultado = null;
let movimientos = 0;
let aciertos =  0;
let temporizador = false;
let timer = 5;
let timerInicial = 5;
let tiempoRegresivoId = null;

//Apuntando a documentos HTML
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')


//generación de números aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//desordenar el arreglo: programo función que genere números aleatorios
numeros = numeros.sort(() => { return Math.random()-0.5})
console.log(numeros);

let ocultarBoton = document.getElementById("reiniciar").style.visibility = "hidden";

//función para contar el tiempo
function contarTiempo() {
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            let mostrarBoton = document.getElementById("reiniciar").style.visibility = "visible";
        }

    },1000)
}

function bloquearTarjetas() {
    for (let  i=0; i<16; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= numeros[i];
        tarjetaBloqueada.disabled = true;
    }

}


//función principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    /* contador de tarjetas destapadas. Cada que se dé clic en un botón, capturo su ID (que recibo como parametro) y voy incrementando en uno la variable
    tarjetas destapadas para saber cuando llego a 2 */
    tarjetasDestapadas++;
    //console.log(tarjetasDestapadas)
    //si la tarjeta destapada es igual a 1, sino deshabilito el botón
    if (tarjetasDestapadas == 1) {
        //tarjeta 1: esta tarjeta selecciona y guarda el elemento html con el ID del mismo.
        //Mostrar primer número : primera tarjeta (botón) seleccionado.
        tarjeta1 = document.getElementById(id);
        //imprimo sobre el elemento html con el ID seleccionado.Como indice del arreglo le paso el ID del botón. Para asociar los 16 elementos del arreglo con los 16 IDs de los botones.
        // lo guardo en una variable para poder comparar
        primerResultado = numeros[id];
        tarjeta1.innerHTML= primerResultado;

        //deshabilitar el primer botón seleccionado
        tarjeta1.disabled = true;

    }else if (tarjetasDestapadas == 2){
        //mostrar el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Deshabilitar segundo botón
        tarjeta2.disabled= true;

        //Incrementos la variable acumuladora movimientos cada que se destapan dos tarjetas
        movimientos++;
        //Muestro el valor de la variable movimientos dentro del html
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        // consulto si los resultados del primer y segundo resultado son iguales
        if (primerResultado == segundoResultado) {

            // si los resultados son iguales, entonces reseteo el valor de la variable tarjetasDestapadas a 0.
            tarjetasDestapadas = 0;

            //Aumento el contador del número de aciertos
            aciertos++;

            //Imprimo en el HTML el número de aciertos
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            
            //consulto si acierto es igual a 8 para mostrar mensajes
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId)
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantástico, sólo demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} ✌`;
            }
        } else {
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML= '';
                tarjeta2.innerHTML= '';
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                tarjetasDestapadas = 0;

            }, 800)
        }



    }


}


