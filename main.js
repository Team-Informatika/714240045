import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman home.html ke dalam root
renderHTML("root", "home.html");

// Ambil data dari JSON
getJSON("https://t.if.co.id/json/pohan.json", null, null, responseFunction);

function responseFunction(response) {
    console.log("✅ Data JSON diterima:", response);

    // Periksa apakah response memiliki struktur yang benar
    if (!response || !response.data || !response.data.card) {
        console.error("❌ Data JSON tidak valid!", response);
        return;
    }

    const card = response.data.card;
    const details = card.details;
    const avatar = card.avatar;

    if (!details || !avatar) {
        console.error("❌ Struktur JSON tidak sesuai!", response);
        return;
    }

    // Perbarui elemen HTML berdasarkan JSON
    document.getElementById("profile-img").innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}" class="profile-picture">`;
    document.getElementById("profile-name").textContent = details.name || "Nama Tidak Ditemukan";
    document.getElementById("company-name").textContent = details.occupation || "Pekerjaan Tidak Ditemukan";
    document.getElementById("job-title").textContent = details.about || "Deskripsi Tidak Ditemukan";

    document.getElementById("email").innerHTML = `<a href="${details.social_links[0].url}" target="_blank">${details.social_links[0].url.replace("mailto:", "")}</a>`;
    document.getElementById("phone").innerHTML = `<a href="${details.social_links[1].url}" target="_blank">${details.social_links[1].url.replace("https://wa.me/", "")}</a>`;
    document.getElementById("address").textContent = details.social_links[2].url || "Alamat Tidak Tersedia";
    document.getElementById("rate").textContent = details.pricing.amount || "Tarif Tidak Diketahui";

    // Tambah skills jika ada
    if (details.skills && details.skills.list.length > 0) {
        document.getElementById("skill-title").textContent = details.skills.description;
        document.getElementById("skills-list").innerHTML = details.skills.list
            .map(skill => `<div class="skill-item">${skill}</div>`)
            .join("");
    }

    // Tambah social media
    document.getElementById("instagram").innerHTML = `<a href="${details.social_links[0].url}" target="_blank">📷 Instagram</a>`;
    document.getElementById("whatsapp").innerHTML = `<a href="${details.social_links[1].url}" target="_blank">💬 WhatsApp</a>`;
    document.getElementById("github").innerHTML = `<a href="${details.social_links[2].url}" target="_blank">🐱 GitHub</a>`;

    // Tambah QR Code jika tersedia
    if (details.qr_code) {
        document.getElementById("qr-code").innerHTML = `<img src="${details.qr_code.src}" alt="${details.qr_code.alt}" class="qr-img">`;
    }

    console.log("✅ Semua elemen diperbarui di halaman!");
}
