<?php
header('Content-Type: application/json');
include 'koneksi.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $nama = $_POST['nama_barang'];
    $harga = $_POST['harga'];
    $stok = $_POST['stok'];

    $sql = "UPDATE barang SET nama_barang='$nama', harga='$harga', stok='$stok' WHERE id='$id'";
    $query = mysqli_query($koneksi, $sql);

    if ($query) {
        echo json_encode(["status" => "sukses", "pesan" => "Data berhasil diupdate!"]);
    } else {
        echo json_encode(["status" => "error", "pesan" => "Gagal update: " . mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "ID tidak ditemukan atau data tidak lengkap."]);
}
?>