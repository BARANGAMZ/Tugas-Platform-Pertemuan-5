const ENDPOINT_GET = "./get_barang.php";
const ENDPOINT_SIMPAN = "./tambah_barang.php";
const ENDPOINT_UPDATE = "./update_barang.php";
const ENDPOINT_HAPUS = "./hapus_barang.php";

document.addEventListener("DOMContentLoaded", fetchDataBarang);

async function fetchDataBarang() {
  const tbody = document.getElementById("data-barang");
  try {
    const response = await fetch(ENDPOINT_GET);
    const data = await response.json();
    tbody.innerHTML = "";

    if (data.status === "success") {
      data.data.forEach((barang, index) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-blue-50 transition duration-150";

        const statusStok =
          barang.stok > 5
            ? '<span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Tersedia</span>'
            : '<span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Menipis</span>';

        // Perbaikan: Hapus <td> yang dobel dan perbaiki tanda kutip di tombol
        tr.innerHTML = `
                    <td class="p-4 text-center">${index + 1}</td>
                    <td class="p-4 font-semibold">${barang.nama_barang}</td>
                    <td class="p-4">Rp ${new Intl.NumberFormat("id-ID").format(barang.harga)}</td>
                    <td class="p-4">${barang.stok}</td>
                    <td class="p-4 text-center">${statusStok}</td>
                    <td class="p-4 text-center">
                        <button onclick='editBarang(${JSON.stringify(barang)})' 
                         class="text-blue-600 hover:underline font-medium mx-2">Edit</button>
    
                        <button onclick="hapusBarang(${barang.id})" 
                         class="text-red-600 hover:underline font-medium mx-2">Hapus</button>
                    </td>
                `;
        tbody.appendChild(tr);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

function bukaModal() {
  document.getElementById("modalTitle").innerText = "Tambah Barang";
  document.getElementById("formBarang").reset();
  document.getElementById("id_barang").value = "";
  document.getElementById("modalBarang").classList.remove("hidden");
}

function tutupModal() {
  document.getElementById("modalBarang").classList.add("hidden");
}

function editBarang(barang) {
  document.getElementById("modalTitle").innerText = "Edit Barang";
  document.getElementById("id_barang").value = barang.id;
  document.getElementById("nama_barang").value = barang.nama_barang;
  document.getElementById("harga").value = barang.harga;
  document.getElementById("stok").value = barang.stok;
  document.getElementById("modalBarang").classList.remove("hidden");
}

document.getElementById("formBarang").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id_barang").value;

  const formData = new FormData();
  formData.append("nama_barang", document.getElementById("nama_barang").value);
  formData.append("harga", document.getElementById("harga").value);
  formData.append("stok", document.getElementById("stok").value);

  let url = ENDPOINT_SIMPAN;
  if (id) {
    url = ENDPOINT_UPDATE;
    formData.append("id", id);
  }

  try {
    const response = await fetch(url, { method: "POST", body: formData });
    const textResponse = await response.text();

    try {
      const result = JSON.parse(textResponse);
      alert(result.pesan);

      if (result.status === "sukses" || result.status === "success") {
        tutupModal();
        fetchDataBarang();
      }
    } catch (parseError) {
      console.error("Server membalas bukan JSON:", textResponse);
      alert(
        "Terjadi kesalahan di server. Cek console browser (F12) untuk detailnya.",
      );
    }
  } catch (error) {
    alert("Gagal menghubungi server.");
  }
});

// Perbaikan: Fungsi hapusBarang yang sebelumnya terlupa dimasukkan ke sini
async function hapusBarang(id) {
  const konfirmasi = confirm(
    "Yakin nih mau menghapus barang ini? Data yang dihapus tidak bisa dikembalikan.",
  );

  if (konfirmasi) {
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await fetch(ENDPOINT_HAPUS, {
        method: "POST",
        body: formData,
      });

      const textResponse = await response.text();

      try {
        const result = JSON.parse(textResponse);
        alert(result.pesan);

        if (result.status === "sukses" || result.status === "success") {
          fetchDataBarang();
        }
      } catch (parseError) {
        console.error("Server membalas bukan JSON:", textResponse);
        alert("Gagal memproses respon dari server.");
      }
    } catch (error) {
      alert("Gagal menghubungi server.");
    }
  }
}
