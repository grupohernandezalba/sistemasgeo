formularioeditar.addEventListener('submit',(e)=> {
    e.preventDefault();

    let id =formularioeditar.ideditar.value;
    let nombre =formularioeditar.nombreeditar.value;
    let codigo =formularioeditar.codigoeditar.value;

    var registro = new Registro(id,nombre,codigo);

    registro.actualizar();

    var idregistro = document.getElementById(id);
    idregistro.querySelector('.nombre').value = nombre + ' ';
    idregistro.querySelector('.codigo').value = codigo + ' ' ;

    formularioeditar.nombreeditar.value ='';
    formularioeditar.codigoeditar.value ='';

    $('#ventanaeditar').modal('hide');
});