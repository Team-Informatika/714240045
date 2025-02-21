// main.js
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render halaman home.html ke dalam root
renderHTML("root", "home.html");

// Ambil data dari JSON
getJSON("https://t.if.co.id/json/pohan.json", null, null, responseFunction);

function responseFunction(response) {
    console.log("✅ Data JSON diterima:", response);

    if (!response || !response.card || !response.card.details) {
        console.error("❌ Data JSON tidak valid!", response);
        return;
    }

    const card = response.card;
    const details = card.details;

    const setText = (id, value, defaultText = "Tidak tersedia") => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value || defaultText;
        }
    };

    const setHTML = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = value;
        }
    };

    setHTML("profile-img", `<img src="${card.avatar.src}" alt="${card.avatar.alt}" class="profile-picture">`);
    setText("profile-name", details.name);
    setText("company-name", details.occupation);
    setText("rate", `💰 Tarif: ${details.pricing.amount} / ${details.pricing.duration}`);
    setHTML("email", `<a href="${details.social_links[0]?.url}" target="_blank">📧 Email</a>`);
    setHTML("phone", `<a href="${details.social_links[1]?.url}" target="_blank">📞 WhatsApp</a>`);
    setHTML("github", `<a href="${details.social_links[2]?.url}" target="_blank">🐱 GitHub</a>`);
    setHTML("skills-list", details.skills.list.map(skill => `<div>${skill}</div>`).join(""));
}
