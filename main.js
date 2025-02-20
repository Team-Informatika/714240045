import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman home.html ke dalam root
renderHTML("root", "home.html");

// Ambil data dari JSON
getJSON("https://t.if.co.id/json/pohan.json", null, null, responseFunction);

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

    // Cek apakah elemen ada sebelum mengubahnya
    const setText = (id, value, defaultText = "Tidak tersedia") => {
        const element = document.getElementById(id);
        if (element) element.textContent = value || defaultText;
    };

    const setHTML = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = value;
    };

    // Render avatar
    setHTML("profile-img", `<img src="${avatar.src}" alt="${avatar.alt}" class="profile-picture">`);

    // Render teks
    setText("profile-name", details.name);
    setText("company-name", details.occupation);
    setText("job-title", details.about[0]?.value);
    setText("email", `📧 Email: <a href="${details.social_links[0]?.url}">${details.social_links[0]?.url.replace("mailto:", "")}</a>`);
    setText("phone", `📞 Telepon: <a href="${details.social_links[1]?.url}">${details.social_links[1]?.url.replace("https://wa.me/", "")}</a>`);
    setText("address", `📍 Alamat: ${details.social_links[2]?.url}`);
    setText("rate", `💰 Tarif: ${details.rate_day.price}`);

    // Tambah skills
    setText("skill-title", details.skills.description);
    setHTML("skills-list", details.skills.list.map(skill => `<div class="skill-item">${skill}</div>`).join(""));

    // Tambah social media
    setHTML("instagram", `<a href="${details.social_links[0]?.url}" target="_blank">📷 Instagram</a>`);
    setHTML("whatsapp", `<a href="${details.social_links[1]?.url}" target="_blank">💬 WhatsApp</a>`);
    setHTML("github", `<a href="${details.social_links[2]?.url}" target="_blank">🐱 GitHub</a>`);

    // Tambah QR Code
    setHTML("qr-code", `<img src="${card.qr_code.src}" alt="${card.qr_code.alt}" class="qr-img">`);

    console.log("✅ Semua elemen diperbarui!");
}
