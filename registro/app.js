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