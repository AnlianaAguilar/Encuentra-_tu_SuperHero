// document ready event
let info_personajes_arr = []
//capturar el evento boton
$(function () {
    $("#button").click(() => {
        //bucar el personaje
        buscarPersonaje()
    })

    $("#button_limpiar").click(()=>{
        // alert("boton limpiar")
        limpiar()   
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
            // console.log(params)
            //generar un card
            // console.log(cards(params))
            //mostrar en html
            $("#cards").html(cards(params)) // coloca uno nuevo no suma y borra el anterio
            //input vacio
            $("#info_input").val("")
            $("#info_input").focus()
            //generar grafico
            limpiarGrafico()
            infoGrafico(params)
            grafico()
        },
        error: function (error) {
            console.log(error)
        }

    })
}

function cards(superhero) {
    let card = `
    <div class="col-12 col-md-4 col-lg-12">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">SuperHero Encontrado</h5><hr/>
                        <p class="card-text">Nombre:<span class="fw-lighter"> ${superhero.name}</span></p><hr/>
                        <p class="card-text">Conexiones:<span class="fw-lighter"> ${superhero.connections["group-affiliation"]}</span></p><hr/>
                        <p class="card-text">Publicado por:<span class="fw-lighter"> ${superhero.biography.publisher}</span></p><hr/>
                        <p class="card-text">Ocupación:<span class="fw-lighter"> ${superhero.work.occupation}</span></p><hr/>
                        <p class="card-text">Primera Aparición:<span class="fw-lighter"> ${superhero.biography["first-appearance"]}</span></p><hr/>
                        <p class="card-text">Altura:<span class="fw-lighter"> ${superhero.appearance.height[0]} - ${superhero.appearance.height[1]}</span> </p><hr/>
                        <p class="card-text">Peso:<span class="fw-lighter"> ${superhero.appearance.weight[0]} - ${superhero.appearance.weight[1]}</span></p><hr/>
                        <p class="card-text">Alianzas:<span class="fw-lighter"> ${superhero.biography.aliases[0]}</span></p>                  
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return card
}

function limpiar (){
    $("#cards").empty()
    $("#info_input").focus()
}

// 
function grafico (){

    var options = {
        title: {
            text: "Estadisticas de Poder"
        },
        subtitles: [{
            text: "As of November, 2017"
        }],
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: 
                info_personajes_arr
            
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
}

function infoGrafico (personaje){

    Object.entries(personaje.powerstats).forEach(([key, value])=>{
        let powerstatsPersonaje = {
            label:key, 
            y:value
        }
      info_personajes_arr.push(powerstatsPersonaje)  
    })
     
    console.log(info_personajes_arr)
}

function limpiarGrafico (){
    info_personajes_arr = [] 
}
