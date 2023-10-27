const personas = [
    new Persona('Juan', 'Pérez'),
    new Persona('Camila', 'Giraldo')
]

function mostrarPersonas(){
    let texto = '';
    for(let persona of personas){
        texto += `<li>${persona.Nombre} ${persona.Apellido}</li>`
    }

    document.getElementById("personas").innerHTML = texto
}

function agregarPersona(){
    const forma = document.forms["forma"];
    const nombre = forma["nombre"];
    const apellido = forma["apellido"];
    if(nombre.value != '' && apellido.value != ''){
        personas.push(new Persona(nombre.value, apellido.value));
        mostrarPersonas();
    } else {
        alert("Debe diligenciar todos los campos!")
    }
}