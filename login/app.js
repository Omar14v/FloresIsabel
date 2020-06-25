document.getElementById('registro').style.display="none";

function mostrar(){
    document.getElementById('ingreso').style.display="none";
    document.getElementById('registro').style.display="block";
}


function btnRegresar(){
    document.getElementById('ingreso').style.display="none";
}


//ingresar
function ingresar(){

    var correo = document.getElementById('idcorreo').value;
    var contraseña = document.getElementById('idcontraseña').value;

    firebase.auth().signInWithEmailAndPassword(correo, contraseña)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(correo);
        console.log(errorMessage);
        // ...
      });
}

//registrar
function registrar(){
    var correo2 = document.getElementById('idcorreo2').value;
    var contraseña2 = document.getElementById('idcontraseña2').value;

    firebase.auth().createUserWithEmailAndPassword(correo2, contraseña2)
    .then(function(){
        verificar() 
        alert("Verifique su cuenta y recargue esta página")
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

//Observar
function observar(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;

          console.log('*****************************');
          console.log(user.emailVerified)
          
          console.log('*****************************');

          console.log(email);
          var emailVerified = user.emailVerified;
          var uid = user.uid;

          if(uid == true, emailVerified == true){
            alert("Bienvenido")
                location.href ="http://www.google.com";
                
            
          }else{
            alert("Por favor Verifique su cuenta")
          }
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('No existe usuario activo')
          alert("No existe usuario activo")
          // ...
        }
      });
}
observar();

//Contenido
function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){

        contenido.innerHTML = `
    
        <button onclick="cerrar()">Cerrar Sesión</button>

    `;

    }
    
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
        alert("Ha cerrado sesión")
        document.location.reload();

    })
    .catch(function(error){
        console.log(error)
    })
}

//Verificar
function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
        console.log('Enviando correo...');
    }).catch(function(error) {
    // An error happened.
        console.log(error);
        
    });
}