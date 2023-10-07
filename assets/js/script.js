document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("bookSubmit");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBuku();
        hapusForm();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromList();
});

const checkType = document.getElementById("inputBookIsComplete");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("tipeBuku").innerHTML = "<strong>Sudah Selesai Dibaca</strong>";
    } else {
        document.getElementById("tipeBuku").innerHTML = "<strong>Belum Selesai Dibaca</strong>";
    }
})