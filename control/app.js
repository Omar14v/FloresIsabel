
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
   apiKey: "AIzaSyDVuS6NCp7qozb0KDIioq9y1zT4DhDpMPg",
   authDomain: "usuarios-a04c5.firebaseapp.com",
   projectId: "usuarios-a04c5",
 });
 
 var db = firebase.firestore();

 //Agregar documentos
function guardar(){

   var cedula = document.getElementById('idcedula').value;
   var nombre = document.getElementById('idnombre').value;
   var apellido = document.getElementById('idapellido').value;
   var correo = document.getElementById('idcorreo').value;

   db.collection("usuarios").add({
      a_id: cedula,
      b_nombre: nombre,
      c_apellido: apellido,
      d_correo: correo
   })
   .then(function(docRef) {
      console.log("Documento escrito con ID: ", docRef.id);
      document.getElementById('idcedula').value='';
      document.getElementById('idnombre').value='';
      document.getElementById('idapellido').value='';
      document.getElementById('idcorreo').value='';
   })
   .catch(function(error) {
      console.error("Error agregando el documento: ", error);
   });
}

//leer datos

var tabla = document.getElementById('tabla');

db.collection("usuarios").onSnapshot((querySnapshot) => {
   tabla.innerHTML = '';
   querySnapshot.forEach((doc) => {
       console.log(`${doc.id} => ${doc.data().a_id}`);
       tabla.innerHTML += `
       <tr>
              
         <td >${doc.data().a_id}</td>
         <td>${doc.data().b_nombre}</td>             
         <td>${doc.data().c_apellido}</td>
         <td>${doc.data().d_correo}</td>
         <td> <button id="botoneditar" onclick="editar('${doc.id}','${doc.data().a_id}','${doc.data().b_nombre}','${doc.data().c_apellido}','${doc.data().d_correo}')" style="width:112px; height:30px">Editar Registro</button> </td>
         <td> <button id="botoneliminar" onclick="eliminar('${doc.id}')" style="width:125px; height:30px">Eliminar Registro</button> </td>
      
       </tr>
       `
   });
});

//Editar Datos

function editar(id, cedula, nombre, apellido, correo){

   document.getElementById('idcedula').value = cedula;
   document.getElementById('idnombre').value = nombre;
   document.getElementById('idapellido').value = apellido;
   document.getElementById('idcorreo').value = correo;

   var boton = document.getElementById('boton');
   boton.innerHTML = 'Actualizar Información';
   boton.onclick = function(){

      var actualizardatos = db.collection("usuarios").doc(id);

   // Set the "capital" field of the city 'DC'
      
      var cedula = document.getElementById('idcedula').value;
      var nombre = document.getElementById('idnombre').value;
      var apellido = document.getElementById('idapellido').value;
      var correo = document.getElementById('idcorreo').value;   

   return actualizardatos.update({
      a_id: cedula,
      b_nombre: nombre,
      c_apellido: apellido,
      d_correo: correo
   })
   .then(function() {
      console.log("Registro Actualizado Correctamente");
      boton.innerHTML = 'Registrar Nuevos Datos'; 
      document.getElementById('idcedula').value='';
      document.getElementById('idnombre').value='';
      document.getElementById('idapellido').value='';
      document.getElementById('idcorreo').value='';
   })
   .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error Actualizando el Registro: ", error);
   });

   }

}

//Borrar datos

function eliminar(id){
   db.collection("usuarios").doc(id).delete().then(function() {
      console.log("Registro Eliminado Correctamente");
   }).catch(function(error) {
      console.error("Error Eliminando el Registro: ", error);
   });
}

//Buscar
document.querySelector("#idbuscar").onkeyup = function(){
   $TableFilter("#registro", this.value);
}

$TableFilter = function(id, value){
   var rows = document.querySelectorAll(id + ' tbody tr');
   
   for(var i = 0; i < rows.length; i++){
       var showRow = false;
       
       var row = rows[i];
       row.style.display = 'none';
       
       for(var x = 0; x < row.childElementCount; x++){
           if(row.children[x].textContent.toLowerCase().indexOf(value.toLowerCase().trim()) > -1){
               showRow = true;
               break;
           }
       }
       
       if(showRow){
           row.style.display = null;
       }
   }
}