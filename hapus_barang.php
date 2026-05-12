<?php
header('Content-Type: application/json');
include 'koneksi.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Query untuk menghapus data berdasarkan ID
    $query = mysqli_query($koneksi, "DELETE FROM barang WHERE id='$id'");

    if ($query) {
        echo json_encode(["status" => "sukses", "pesan" => "Data berhasil dihapus!"]);
    } else {
        echo json_encode(["status" => "error", "pesan" => "Gagal menghapus: " . mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "ID tidak ditemukan."]);
}
?>