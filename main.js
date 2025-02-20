import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman home.html ke dalam root
renderHTML("root", "home.html");

// Ambil data dari JSON
getJSON("pohan.json", null, null, responseFunction);

function responseFunction(response) {
    console.log("✅ Data JSON diterima:", response);

    if (!response || !response.card || !response.card.details) {
        console.error("❌ Data JSON tidak valid!", response);
        return;
    }

    const card = response.card;
    const details = card.details;
    const avatar = card.avatar;

    // Perbarui elemen HTML berdasarkan JSON
    document.getElementById("profile-img").innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}" class="profile-picture">`;
    document.getElementById("profile-name").textContent = details.name;
    document.getElementById("company-name").textContent = details.occupation;
    document.getElementById("job-title").textContent = details.about;

    document.getElementById("email").innerHTML = `📧 Email: <a href="${details.social_links[0].url}">${details.social_links[0].url.replace("mailto:", "")}</a>`;
    document.getElementById("phone").innerHTML = `📞 Telepon: <a href="${details.social_links[1].url}">${details.social_links[1].url.replace("https://wa.me/", "")}</a>`;
    document.getElementById("address").textContent = `📍 Alamat: ${details.social_links[2].url}`;
    document.getElementById("rate").textContent = `💰 Tarif: ${details.pricing.amount} / ${details.pricing.duration}`;

    // Tambah skills
    document.getElementById("skill-title").textContent = details.skills.description;
    document.getElementById("skills-list").innerHTML = details.skills.list.map(skill => `<div class="skill-item">${skill}</div>`).join("");

    // Tambah social media
    document.getElementById("instagram").innerHTML = `<a href="${details.social_links[0].url}" target="_blank">📷 Instagram</a>`;
    document.getElementById("whatsapp").innerHTML = `<a href="${details.social_links[1].url}" target="_blank">💬 WhatsApp</a>`;
    document.getElementById("github").innerHTML = `<a href="${details.social_links[2].url}" target="_blank">🐱 GitHub</a>`;

    // Tambah QR Code
    document.getElementById("qr-code").innerHTML = `<img src="${card.qr_code.src}" alt="${card.qr_code.alt}" class="qr-img">`;

    console.log("✅ Semua elemen diperbarui!");
}
