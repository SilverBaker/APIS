let nombre=document.getElementById("root")
let pilot=document.getElementById("piloto")
let buscar=document.getElementById("buscar")
let id

let temp=document.createElement("INPUT")
        temp.type="button"
        temp.value="Temporadas"
        temp.id="temporadas"

let conductores=[]

const listarConductores=async()=>{
    return fetch("http://ergast.com/api/f1/drivers.json?limit=857")
    .then(response=>{
        return response.json()
    }).then(response=>{
            return response.MRData.DriverTable.Drivers
    })
}

const listarTemporada=async(piloto)=>{
    piloto=piloto.substring(0,1).toUpperCase()+piloto.substring(1,).toLowerCase()
    let conductor=await listarConductores()
    let index=conductor.filter(element=>element.familyName==piloto)
    fetch("https://ergast.com/api/f1/drivers/"+index[0].driverId+"/results.json")
    .then(response=>{
        return response.json()
    }).then(response=>{
            crearTabla(response.MRData.RaceTable.Races)
    })
    
}

const crearTabla=async(races)=>{
    let table=document.createElement("TABLE")
    table.classList.add("tabla")
    races.forEach(race=>{console.log(race.Results[0].Constructor.name)
        table.innerHTML+=`<tr><td colspan="2">${race.season} ${race.raceName}</td></tr><tr><td>Fecha</td><td>${race.date}</td></tr>
        <tr><td>Estado</td><td>${race.Results[0].status}</td></tr>
        <tr><td>Marca</td><td>${race.Results[0].Constructor.name}</td></tr>
        <tr><td>fecha</td><td>${race.date}</td></tr>
        <tr><td>fecha</td><td>${race.date}</td></tr>
        `})
    let carreras=document.createDocumentFragment()
    carreras.appendChild(table)
    root.appendChild(carreras)
}

let fragmento=document.createDocumentFragment()
const imprimir=async(piloto)=> {
    piloto=piloto.substring(0,1).toUpperCase()+piloto.substring(1,).toLowerCase()
    root.innerHTML=""
    conductores=await listarConductores()
    let conductor=conductores.filter(element=>element.familyName==piloto)
    conductor=conductores.filter(element=>element.driverId==piloto.toLowerCase())
    if(conductor.length==1){
        conductores=[]
        conductores=conductor
        console.log(conductores)
    }
    conductores.forEach(element=>{
        let card=document.createElement("div")
        card.classList.add("card")
        id=element.driverId
        let nombrep=document.createElement("p")
        nombrep.textContent=`Nombre y Apellidos: ${element.givenName} ${element.familyName}`
        let fechap=document.createElement("p")
        fechap.textContent=`Fecha de nacimiento: ${element.dateOfBirth}`
        let number=document.createElement("p")
        number.textContent=(element.permanentNumber!=null?"Número: "+element.permanentNumber:"Sin número")
        
        card.appendChild(nombrep)
        card.appendChild(fechap)
        card.appendChild(number)
        card.appendChild(temp)
        fragmento.appendChild(card)
    })
    root.appendChild(fragmento)
}




// listarTemporada("alonso")
// imprimir("senna")

// buscar.addEventListener("click",()=>listarTemporada(pilot.value.trim()))
buscar.addEventListener("click",()=>{
    imprimir(pilot.value.trim())})

    temp.addEventListener("click",()=>listarTemporada(id))