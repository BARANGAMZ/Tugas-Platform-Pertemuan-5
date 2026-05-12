<?php
include 'koneksi.php';

$sql = "SELECT * FROM barang";
$query = mysqli_query($koneksi, $sql);

$hasil = array();

while ($row = mysqli_fetch_assoc($query)) {
    $hasil[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $hasil
]);
?>