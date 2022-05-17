// document ready event
//capturar el evento boton
$(function(){
    $("#button").click(()=>{
        //bucar el personaje
        buscarPersonaje()
    })

})

function buscarPersonaje(){ 
    let personaje = $("#info_input").val()//captura info del input
    alert("buscar personaje" + personaje)
    //validar que info_input solo sera numeros
    if (validar(personaje)==false) {
        errorInput()
    }
   
    //buscar personajes
}

function validar(num){
    let expression = /^\d{1,3}$/  //acepta de 1 a 3 digitos (regexr.com)
    if(expression.test(num)){  //se evalua con test y retorna true o false
        return true
    }else{
        return false
    }
}

function errorInput(){
    alert("Debe escribir un valor valido")
    $("#info_input").focus()
}