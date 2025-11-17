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




if (isset($_GET['new-event-title'])) {
    //$data = $_GET['new-event-title']; // ex: '2025-10'
    if ($_GET['set-time-limit']) {
        $currentDate = date('Y-m-d H:i:s');
        try {
            $stmt = $pdo->prepare("
                INSERT INTO event (description, status, date_creation, date_fin) VALUES (:description, 'aFaire', :date_creation, :date_fin)
            ");
            $stmt->bindParam(':description', $_GET['new-event-title']);
            $stmt->bindParam(':date_creation', $currentDate);
            $stmt->bindParam(':date_fin', $_GET['new-event-date']);
            $stmt->execute();
            header('Location: http://localhost/toDoList/home.php');
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Erreur lors de l insertion de événement : ' . $e->getMessage()]);
        }
    } else {
        $currentDate = date('Y-m-d H:i:s');
        try {
            $stmt = $pdo->prepare("
                INSERT INTO event (description, status, date_creation, date_fin) VALUES (:description, 'aFaire', :date_creation, NULL)
            ");
            $stmt->bindParam(':description', $_GET['new-event-title']);
            $stmt->bindParam(':date_creation', $currentDate);
            $stmt->execute();
            header('Location: http://localhost/toDoList/home.php');
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Erreur lors de l insertion de événement : ' . $e->getMessage()]);
        }
    }
}


if (isset($_GET['taskStatus'], $_GET['taskId'])) {
    try {
        $status = (string) $_GET['taskStatus'];
        $id = $_GET['taskId'];

        $stmt = $pdo->prepare('
            UPDATE event
            SET status = :status
            WHERE id = :id
        ');
        
        $stmt->bindValue(':status', $status);
        $stmt->bindValue(':id', $id);
        $stmt->execute();

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
        header('Location: http://localhost/toDoList/home.php');
        exit;
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Erreur lors de la mise à jour du statut : ' . $e->getMessage()]);
        exit;
    }
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



?>