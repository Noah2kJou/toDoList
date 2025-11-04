<?php
$host = 'localhost';
$dbname = 'dbToDo';
$user = 'user';
$pass = 'pwd';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Erreur de connexion : ' . $e->getMessage()]);
    exit;
}


try {
    $stmt = $pdo->prepare("
        SELECT * FROM event
    ");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($data);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Erreur lors de la récupération des événements : ' . $e->getMessage()]);
}


// try {
//     $stmt = $pdo->prepare("
//         INSERT INTO event (title, description, status) VALUES ('Nouvel événement', 'Description de l\'événement', 'A faire')
//     ");
//     $stmt->execute();
//     $insertion = $stmt->fetchAll(PDO::FETCH_ASSOC);
//     header('Content-Type: application/json');
//     echo json_encode($insertion);

// } catch (PDOException $e) {
//     header('Content-Type: application/json');
//     echo json_encode(['error' => 'Erreur lors de la récupération des événements : ' . $e->getMessage()]);
// }


?>