

auth.onAuthStateChanged( user =>{
 
    if(user){
        console.log('Usuario entró');
        db.collection('platillos').onSnapshot(snapshot =>{
            obtienePlatillos(snapshot.docs);
            configuraMenu(user);
        }, err => {
            console.log(err.message);
        });


        var name, email, photoUrl, uid, emailVerified;

        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  
        
        console.log(name,email,photoUrl,emailVerified,uid);

    }
    else{
        console.log('Usuario salió');
        obtienePlatillos([]);
        configuraMenu();
    }

});


const formaregistrate = document.getElementById('formaregistrate');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();

    const correo = formaregistrate['rcorreo'].value;
    const contrasena = formaregistrate['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo,contrasena).then( cred =>{

        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaregistrate['rnombre'].value,
            telefono: formaregistrate['rtelefono'].value,
            direccion: formaregistrate['rdireccion'].value
        });


    }).then( ()=>{
        $('#registratemodal').modal('hide');
        formaregistrate.reset();
        formaregistrate.querySelector('.error').innerHTML = '';
    }).catch( err => {
        formaregistrate.querySelector('.error').innerHTML = mensajeError(err.code);
    });


});


const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        alert("El usuario ha salido del sistema");
    });

});


function mensajeError(codigo) {

    let mensaje = '';

    switch(codigo) {
        case 'auth/wrong-password':
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
      }
    return mensaje;
  }

const formaingresar =  document.getElementById('formaingresar');

formaingresar.addEventListener('submit',(e)=>{
    e.preventDefault();
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{

        $('#ingresarmodal').modal('hide');
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch( err => {

        formaingresar.querySelector('.error').innerHTML = mensajeError(err.code);
        console.log(err);
    });
    
});


entrarGoogle = () => {
 
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            console.log(user);
            const html = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html;

            $('#ingresarmodal').modal('hide');
            formaingresar.reset();
            formaingresar.querySelector('.error').innerHTML = '';


        // ...
        }).catch(function(error) {
            console.log(error);
    });

}