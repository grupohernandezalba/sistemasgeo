    formulario.addEventListener('submit',(e)=> {
        e.preventDefault();
        var registro = new Registro(null,formulario.nombre.value,formulario.codigo.value);
        registro.agregar();
        formulario.nombre.value ='';
        formulario.codigo.value ='';
        $('#ventananuevo').modal('hide');
    });