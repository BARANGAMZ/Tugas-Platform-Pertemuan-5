<?php
header('Content-Type: application/json');
include 'koneksi.php';

if (isset($_POST['nama_barang']) && isset($_POST['harga']) && isset($_POST['stok'])) {
    $nama_barang = $_POST['nama_barang'];
    $harga = $_POST['harga'];
    $stok = $_POST['stok'];

    $query = mysqli_query($koneksi, "INSERT INTO barang (nama_barang, harga, stok) VALUES ('$nama_barang', '$harga', '$stok')");

    if ($query) {
        echo json_encode(["status" => "sukses", "pesan" => "Barang berhasil ditambahkan!"]);
    } else {
        
        echo json_encode(["status" => "error", "pesan" => "Gagal menyimpan: " . mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Data tidak diterima dengan lengkap."]);
}
?>