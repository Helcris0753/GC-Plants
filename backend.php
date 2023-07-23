<?php
if (isset($_POST['query'])) {
    $query = $_POST['query'];


    echo $query;
} else {
    // Si no se proporcionó el valor 'query', devuelve un mensaje de error
    echo 'No se proporcionó el valor "query"';
}
?>