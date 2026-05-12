<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "sql100.infinityfree.com";
$user = "if0_41758525";
$pass = "barangam123"; 
$db   = "if0_41758525_db_toko"; 

$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    die(json_encode(["status" => "error", "pesan" => "Koneksi Database Gagal!"]));
}
?>