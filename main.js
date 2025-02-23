import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman home.html ke dalam root
renderHTML("root", "home.html");

// Ambil data dari JSON
fetch("https://t.if.co.id/json/pohan.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }
        return response.json();
    })
    .then(responseFunction)
    .catch(error => console.error("❌ Error:", error));

function responseFunction(response) {
    console.log("✅ Data JSON diterima:", response);

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

    console.log("🔍 Memproses data avatar, nama, pekerjaan, dan deskripsi...");

    // Fungsi untuk mengecek apakah elemen ada sebelum mengubahnya
    const setText = (id, value, defaultText = "Tidak tersedia") => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value || defaultText;
            console.log(`✅ ${id} diperbarui:`, value);
        } else {
            console.warn(`⚠️ Elemen ${id} tidak ditemukan.`);
        }
    };

    const setHTML = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = value;
            console.log(`✅ ${id} diperbarui dengan HTML.`);
        } else {
            console.warn(`⚠️ Elemen ${id} tidak ditemukan.`);
        }
    };

    // Render avatar
    setHTML("profile-img", `<img src="${avatar.src}" alt="${avatar.alt}" class="profile-picture">`);

    // Render teks utama
    setText("profile-name", details.name);
    setText("company-name", details.occupation);
    setText("job-title", details.about[0]?.value);

    // Render kontak
    console.log("🔍 Memproses kontak...");
    setHTML("email", `📧 Email: <a href="${details.social_links[0]?.url}">${details.social_links[0]?.url.replace("mailto:", "")}</a>`);
    setHTML("phone", `📞 Telepon: <a href="${details.social_links[1]?.url}">${details.social_links[1]?.url.replace("https://wa.me/", "")}</a>`);
    setText("address", `📍 Alamat: ${details.social_links[2]?.url}`);
    setText("rate", `💰 Tarif: ${details.rate_day.price}`);

    // Render skills
    console.log("🔍 Memproses daftar keahlian...");
    setText("skill-title", details.skills.description);
    setHTML("skills-list", details.skills.list.map(skill => `<div class="skill-item">${skill}</div>`).join(""));

    // Render social media
    console.log("🔍 Memproses tautan sosial media...");
    setHTML("instagram", `<a href="${details.social_links[0]?.url}" target="_blank">📷 Instagram</a>`);
    setHTML("whatsapp", `<a href="${details.social_links[1]?.url}" target="_blank">💬 WhatsApp</a>`);
    setHTML("github", `<a href="${details.social_links[2]?.url}" target="_blank">🐱 GitHub</a>`);

    // Render QR Code
    console.log("🔍 Memproses QR Code...");
    setHTML("qr-code", `<img src="${card.qr_code.src}" alt="${card.qr_code.alt}" class="qr-img">`);

    console.log("✅ Semua elemen telah diperbarui!");
}
