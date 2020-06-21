
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDVuS6NCp7qozb0KDIioq9y1zT4DhDpMPg",
    authDomain: "usuarios-a04c5.firebaseapp.com",
    projectId: "usuarios-a04c5",
  });
  
  var db = firebase.firestore();
 
  //Agregar documentos
 function guardar(){
 
    var identificacion = document.getElementById('id_numero').value;
    var nombre = document.getElementById('idnombre').value;
    var descripcion = document.getElementById('iddescripcion').value;
    var precio = document.getElementById('idprecio').value;
 
    db.collection("productos").add({
       a_id: identificacion,
       b_nombre: nombre,
       c_descripcion: descripcion,
       d_precio: precio
    })
    .then(function(docRef) {
       console.log("Documento escrito con ID: ", docRef.id);
       document.getElementById('id_numero').value='';
       document.getElementById('idnombre').value='';
       document.getElementById('iddescripcion').value='';
       document.getElementById('idprecio').value='';
    })
    .catch(function(error) {
       console.error("Error agregando el documento: ", error);
    });
 }
 
 //leer datos
 
 var tabla = document.getElementById('tabla');
 
 db.collection("productos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().a_id}`);
        tabla.innerHTML += `
        <tr>
               
          <td >${doc.data().a_id}</td>
          <td>${doc.data().b_nombre}</td>             
          <td>${doc.data().c_descripcion}</td>
          <td>${doc.data().d_precio}</td>
          <td> <button id="botoneditar" onclick="editar('${doc.id}','${doc.data().a_id}','${doc.data().b_nombre}','${doc.data().c_descripcion}','${doc.data().d_precio}')" style="width:112px; height:30px">Editar Registro</button> </td>
          <td> <button id="botoneliminar" onclick="eliminar('${doc.id}')" style="width:125px; height:30px">Eliminar Registro</button> </td>
       
        </tr>
        `
    });
 });
 
 //Editar Datos
 
 function editar(id, identificacion, nombre, descripcion, precio){
 
    document.getElementById('id_numero').value = identificacion;
    document.getElementById('idnombre').value = nombre;
    document.getElementById('iddescripcion').value = descripcion;
    document.getElementById('idprecio').value = precio;
 
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar Información';
    boton.onclick = function(){
 
       var actualizardatos = db.collection("productos").doc(id);
 
    // Set the "capital" field of the city 'DC'
       
        var identificacion = document.getElementById('id_numero').value;
        var nombre = document.getElementById('idnombre').value;
        var descripcion = document.getElementById('iddescripcion').value;
        var precio = document.getElementById('idprecio').value;
   
 
    return actualizardatos.update({
       a_id: identificacion,
       b_nombre: nombre,
       c_descripcion: descripcion,
       d_precio: precio
    })
    .then(function() {
       console.log("Registro Actualizado Correctamente");
       boton.innerHTML = 'Registrar Nuevos Datos'; 
       document.getElementById('id_numero').value='';
       document.getElementById('idnombre').value='';
       document.getElementById('iddescripcion').value='';
       document.getElementById('idprecio').value='';
    })
    .catch(function(error) {
       // The document probably doesn't exist.
       console.error("Error Actualizando el Registro: ", error);
    });
 
    }
 
 }
 
 //Borrar datos
 
 function eliminar(id){
    db.collection("productos").doc(id).delete().then(function() {
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