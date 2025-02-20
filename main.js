import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render home.html ke dalam #root
renderHTML("root", "home.html");

// Ambil data dari JSON
getJSON("pohan.json", null, null, responseFunction);

function responseFunction(response) {
    console.log("✅ Data JSON diterima:", response);

    if (!response || !response.card) {
        console.error("❌ Data JSON tidak valid!", response);
        return;
    }

    const card = response.card;
    const details = card.details;
    const avatar = card.avatar;

    if (!details || !avatar) {
        console.error("❌ Struktur JSON tidak sesuai!", response);
        return;
    }

    console.log("🔍 Data ditemukan:");
    console.log("🖼️ Gambar Profil:", avatar.src);
    console.log("👤 Nama:", details.name);
    console.log("💼 Pekerjaan:", details.occupation);
    console.log("📌 Deskripsi:", details.about);
    console.log("💰 Tarif:", details.pricing.amount);
    console.log("📧 Email:", details.social_links[0]?.url);
    console.log("📞 Telepon:", details.social_links[1]?.url);
    console.log("📍 Alamat:", details.social_links[4]?.url);

    // Isi data ke home.html
    document.getElementById("profile-img").innerHTML = `<img src="${avatar.src}" 
                                                         alt="${avatar.alt}" 
                                                         style="width: 100px; height: 100px; border-radius: 50%;">`;
    document.getElementById("profile-name").textContent = details.name;
    document.getElementById("company-name").textContent = details.occupation;
    document.getElementById("job-title").textContent = details.about;
    document.getElementById("rate").textContent = details.pricing.amount;
    document.getElementById("email").textContent = details.social_links[0]?.url.replace("mailto:", "");
    document.getElementById("phone").textContent = details.social_links[1]?.url.replace("https://wa.me/", "");
    document.getElementById("address").textContent = details.social_links[4]?.url;
    document.getElementById("qr-code").innerHTML = `<img src="${card.qr_code.src}" alt="${card.qr_code.alt}">`;

    // Tambahkan skill
    let skillsHTML = "";
    details.skills.list.forEach(skill => {
        skillsHTML += `<div class="skill-item">${skill}</div>`;
    });
    document.getElementById("skills-list").innerHTML = skillsHTML;

    // Tambahkan sosial media
    document.getElementById("instagram").innerHTML = `<a href="${details.social_links[0]?.url}" target="_blank">📷</a>`;
    document.getElementById("whatsapp").innerHTML = `<a href="${details.social_links[1]?.url}" target="_blank">📞</a>`;
    document.getElementById("github").innerHTML = `<a href="${details.social_links[2]?.url}" target="_blank">🐱</a>`;

    console.log("✅ Semua elemen sudah diperbarui di halaman!");
}
