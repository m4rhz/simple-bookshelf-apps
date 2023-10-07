const ID_LIST_BELUM = "incompleteBookshelfList";
const ID_LIST_SUDAH = "completeBookshelfList";
const ID_BUKU = "bookId";

function buatListBaca(judulB, penulisB, tahunB, selesai) {
    const judulBuku = document.createElement("h3");
    const judul = document.createElement("span");
    judul.classList.add("judul_buku");
    judul.innerText = judulB;
    judulBuku.append(judul);
    
    const penulisBuku = document.createElement("p");
    penulisBuku.innerText = "Penulis : ";
    const penulis = document.createElement("span");
    penulis.classList.add("penulis_buku");
    penulis.innerText = penulisB;
    penulisBuku.append(penulis);

    const tahunBuku = document.createElement("p");
    tahunBuku.innerText = "Tahun Terbit : ";
    const tahun = document.createElement("span");
    tahun.classList.add("tahun_buku");
    tahun.innerText = tahunB;
    tahunBuku.append(tahun);

    const infoBuku = document.createElement("div");
    infoBuku.classList.add("info");
    infoBuku.append(judulBuku, penulisBuku, tahunBuku);

    const aksiBuku = document.createElement("div");
    aksiBuku.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(infoBuku, aksiBuku);

    if (selesai) {
        aksiBuku.append(buatTombolUndo(), buatTombolSampah());
    } else {
        aksiBuku.append(buatTombolCek(), buatTombolSampah());
    }
    return container;
}

function tambahBuku() {
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById("inputBookIsComplete");
    
    const judul = document.getElementById("inputBookTitle").value;
    const penulis = document.getElementById("inputBookAuthor").value;
    const tahun = document.getElementById("inputBookYear").value;
    if(!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
}

function hapusForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}

function buatTombol(buttonTypeClass, text, eventListener) {
    const tombol = document.createElement("button");
    tombol.classList.add("color");
    tombol.classList.add(buttonTypeClass);
    tombol.innerText = text;
    tombol.addEventListener("click", function (event) {
        eventListener(event);
    });
    return tombol;
}

function tambahBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul_buku").innerText;
    const penulisBuku = elemenBuku.querySelector(".penulis_buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun_buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, penulisBuku, tahunBuku, true);
    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = true;
    bukuBaru[ID_BUKU] = book.id;
    listSelesai.append(bukuBaru);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolCek() {
    return buatTombol("checklist", 'Telah selesai di Baca', function(event) {
        const parent = event.target.parentElement;
        tambahBukuSelesai(parent.parentElement);
    });
}

function hapusBukuSelesai(elemenBuku) {
    const posisiBuku = cariIndeksBuku(elemenBuku[ID_BUKU]);
    list.splice(posisiBuku, 1);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolSampah() {
    return buatTombol(".red", 'Hapus buku' ,function(event) {
        const parent = event.target.parentElement;
        hapusBukuSelesai(parent.parentElement);
    });
}

function buatTombolUndo() {
    return buatTombol(".green", 'Belum Selesai dibaca' ,function(event) {
        const parent = event.target.parentElement;
        undoBukuSelesai(parent.parentElement);
    });
}

function undoBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul_buku").innerText;
    const penulisBuku = elemenBuku.querySelector(".penulis_buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun_buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, penulisBuku, tahunBuku, false);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);

    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = false;
    bukuBaru[ID_BUKU] = book.id;
    listBelumBaca.append(bukuBaru);
    elemenBuku.remove();

    updateDataToStorage()
}

function tambahBukuEdit(elemenBuku) {
    elemenBuku.remove();
    hapusBukuSelesai(elemenBuku);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById("inputBukuSelesai");

    const judul = document.getElementById("inputJudul").value;
    const penulis = document.getElementById("inputPenulis").value;
    const tahun = document.getElementById("inputTahun").value;
    if (!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
    hapusForm();
    tombolKembali();
}

function tombolKembali() {
    document.getElementById("bookSubmit").style.display = "block";
    document.getElementById("editBuku").style.display = "none";
}
