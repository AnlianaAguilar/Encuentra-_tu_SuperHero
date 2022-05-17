// document ready event
//capturar el evento boton
$(function () {
    $("#button").click(() => {
        //bucar el personaje
        buscarPersonaje()
    })

})

function buscarPersonaje() {
    let personaje = $("#info_input").val()//captura info del input
    // alert("buscar personaje" + personaje)
    //validar que info_input solo sera numeros
    if (validar(personaje) == false) {
        errorInput()
        return
    }

    //buscar personajes
    getPersonaje(personaje)
}

function validar(num) {
    let expression = /^\d{1,3}$/  //acepta de 1 a 3 digitos (regexr.com)
    if (expression.test(num)) {  //se evalua con test y retorna true o false
        return true
    } else {
        return false
    }
}

function errorInput() {
    alert("Debe ingresar un valor nemerico")
    $("#info_input").focus()
}

function getPersonaje(id) {
    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/10225987047762296/${id}`,
        success: function (params) {
            console.log(params)
            //generar un card
            console.log(cards(params))
            //mostrar en html
            $("#cards").append(cards(params))
        },
        error: function (error) {
            console.log(error)
        }

    })
}

function cards(superhero) {
    let card = `
    <div class="col-12 col-md-4">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">SuperHero Encontrado</h5>
                        <p class="card-text">${superhero.name}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return card
}



//https://superheroapi.com/api.php/10225987047762296/43