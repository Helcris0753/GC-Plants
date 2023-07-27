<?php

$conn = new mysqli('localhost:3306', 'root', '1234', 'green cell project');

if ($conn -> connect_errno) {
    die("fallo al conectarse a la base de datos" . $conn->connect_errno);
}


$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['action']) && $data['action'] === 'search') {
    $query = $data['query'];
    $page = $data['page'];

    if ($conn->multi_query("CALL ppSearch('$query', $page);")) {
        $result1 = $conn->store_result();
        
        $results_array = array();
        while ($row = $result1->fetch_assoc()) {
            $results_array[] = array(
                "Plant_Scient_Name" => $row['Plant_Scient_Name'],
                "link" => (int) $row['link']
            );
        }

        $result1 -> free();

        $conn->next_result();
        $result2 = $conn->store_result();
        $row = $result2 -> fetch_assoc();
        $pages = (int) $row['count'];
        $result2 -> free();

        $json_reponse = array (
            "results" => $results_array,
            "pages" => $pages
        );
        $conn->close();
        echo json_encode($json_reponse);
    }
    else{
        $conn->close();
        echo json_encode(mysqli_error($conn));
    }
    
}
elseif (isset($data['action']) && $data['action'] === 'find') {
    $plant_id = $data["plantid"];
    
    $result = $conn -> query("call ppPlant($plant_id)");

    $row = $result -> fetch_assoc();
    $conn->close();
    echo json_encode($row);
}
?>

