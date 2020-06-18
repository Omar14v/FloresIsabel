<?php
    $usuario=$_POST['usuario'];
    $clave=$_POST['clave'];
    $usr="estudiante";
    $psw="Ister*2020";

    if($usuario==$usr && $clave==$psw)
    {
        echo "Ingreso exitoso";
    } else {
        echo "Usuario o Clave incorrecta";
    }

?>