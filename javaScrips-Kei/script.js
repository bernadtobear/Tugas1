let daftarPilihan = [];
let namaUser = "";
let jumlahPilihan = 0;
let pilihanUser = "";

document
    .getElementById("btnJumlah")
    .addEventListener("click", buatPilihan);

function buatPilihan() {
    namaUser =
        document.getElementById("nama").value.trim();
    jumlahPilihan =
        Number(
            document.getElementById("jumlah").value
        );
    if (namaUser === "") {
        alert("Nama harus diisi!");
        document
            .getElementById("nama")
            .focus();
        return;
    }

    if (
        isNaN(jumlahPilihan) ||
        jumlahPilihan < 1 ||
        jumlahPilihan > 20
    ) {
        alert(
            "Jumlah pilihan harus berupa angka " +
            "antara 1 sampai 20!"
        );
        document
            .getElementById("jumlah")
            .focus();
        return;
    }

    daftarPilihan = [];
    const container =
        document.getElementById(
            "pilihanContainer"
        );
    container.innerHTML = "";

    for (
        let i = 0;
        i < jumlahPilihan;
        i++
    ) {
        const row =
            document.createElement("div");
        row.className =
            "pilihan-row";
        const label =
            document.createElement("label");
        label.textContent =
            "Pilihan " + (i + 1) + " :";
        const input =
            document.createElement("input");
        input.type = "text";
        input.id =
            "pilihan" + i;
        input.placeholder =
            "Teks Pilihan " + (i + 1);
        row.appendChild(label);
        row.appendChild(input);
        container.appendChild(row);
    }

    const button =
        document.createElement("button");
    button.textContent = "OK";
    button.addEventListener(
        "click",
        buatPilihanAkhir
    );
    container.appendChild(button);
}

function ambilPilihan() {
    daftarPilihan = [];
    for (
        let i = 0;
        i < jumlahPilihan;
        i++
    ) {
        const teks =
            document
                .getElementById(
                    "pilihan" + i
                )
                .value
                .trim();

        if (teks === "") {
            alert(
                "Pilihan " +
                (i + 1) +
                " harus diisi!"
            );
            document
                .getElementById(
                    "pilihan" + i
                )
                .focus();
            return false;
        }

        daftarPilihan.push(teks);
    }
    return true;
}

function buatPilihanAkhir() {
    if (!ambilPilihan()) {
        return;
    }
    const container =
        document.getElementById(
            "pilihanAkhir"
        );
    container.innerHTML = "";
    const judul =
        document.createElement("h3");
    judul.textContent =
        "Pilihan :";
    container.appendChild(judul);
    const radioContainer =
        document.createElement("div");
    for (
        let i = 0;
        i < daftarPilihan.length;
        i++
    ) {
        const div =
            document.createElement("div");
        div.className =
            "radio-item";
        const radio =
            document.createElement("input");
        radio.type = "radio";
        radio.name = "pilihan";
        radio.value =
            daftarPilihan[i];
        const label =
            document.createElement("label");
        label.textContent =
            daftarPilihan[i];
        div.appendChild(radio);
        div.appendChild(label);
        radioContainer.appendChild(div);
    }
    container.appendChild(
        radioContainer
    );

    const text =
        document.createElement("p");
    text.textContent =
        "Atau dalam bentuk Drop Down :";
    container.appendChild(text);
    const select =
        document.createElement("select");
    select.id =
        "dropdownPilihan";
    for (
        let i = 0;
        i < daftarPilihan.length;
        i++
    ) {
        const option =
            document.createElement("option");
        option.value =
            daftarPilihan[i];
        option.textContent =
            daftarPilihan[i];
        select.appendChild(option);
    }
    container.appendChild(select);
    const button =
        document.createElement("button");
    button.textContent = "OK";
    button.addEventListener(
        "click",
        ambilPilihanUser
    );
    container.appendChild(button);
}

function ambilPilihanUser() {
    const radio =
        document.querySelector(
            'input[name="pilihan"]:checked'
        );
    const dropdown =
        document.getElementById(
            "dropdownPilihan"
        );
    if (radio !== null) {
        pilihanUser =
            radio.value;
    } else {
        pilihanUser =
            dropdown.value;
    }
    const container =
        document.getElementById(
            "emailContainer"
        );
    container.innerHTML = "";
    const row =
        document.createElement("div");
    row.className =
        "form-row";
    const label =
        document.createElement("label");
    label.textContent =
        "Email :";
    const input =
        document.createElement("input");
    input.type = "email";
    input.id = "email";
    input.placeholder =
        "email@domain.com";
    row.appendChild(label);
    row.appendChild(input);
    container.appendChild(row);
    const buttonArea =
        document.createElement("div");
    buttonArea.className =
        "button-area";
    const button =
        document.createElement("button");
    button.textContent = "OK";
    button.addEventListener(
        "click",
        cekEmail
    );
    buttonArea.appendChild(button);
    container.appendChild(
        buttonArea
    );
}

function cekEmail() {
    const email =
        document
            .getElementById("email")
            .value
            .trim();
    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert(
            "Format email tidak valid!\n" +
            "Silakan masukkan email yang benar."
        );
        document
            .getElementById("email")
            .focus();
        return;
    }
    tampilkanOutput(email);
}

function tampilkanOutput(email) {
    const output =
        document.getElementById(
            "output"
        );
    const semuaPilihan =
        daftarPilihan.join(", ");
    output.innerHTML = `
        <h3>Hasil</h3>
        <p>
            Hallo, nama saya
            <b>${namaUser}</b>,
            email
            <b>${email}</b>.
        </p>

        <p>
            Saya mempunyai sejumlah
            <b>${jumlahPilihan}</b>
            pilihan yaitu
            <b>${semuaPilihan}</b>,
            dan saya memilih
            <b>${pilihanUser}</b>.
        </p>
    `;
}