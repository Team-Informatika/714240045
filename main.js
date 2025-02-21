import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { renderHTML } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// Render home.html ke dalam root
document.getElementById("root").innerHTML = '<object type="text/html" data="home.html"></object>';

// Ambil data JSON
getJSON("https://t.if.co.id/json/pohan.json", null, null, responseFunction);

function responseFunction(response) {
    if (!response || !response.card || !response.card.details) {
        console.error("Data JSON tidak valid!", response);
        return;
    }
    
    const { avatar, details, qr_code } = response.card;
    
    const setText = (id, value, defaultText = "Tidak tersedia") => {
        const element = document.getElementById(id);
        if (element) element.textContent = value || defaultText;
    };
    
    document.getElementById("profile-img").innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}">`;
    setText("profile-name", details.name);
    setText("company-name", details.occupation);
    setText("job-title", details.about);
    
    setText("email", `📧 ${details.social_links[0]?.url}`);
    setText("phone", `📞 ${details.social_links[1]?.url}`);
    setText("address", `📍 ${details.social_links[2]?.url}`);
    
    document.getElementById("skills-list").innerHTML = details.skills.list.map(skill => `<li>${skill}</li>`).join(" ");
    
    document.getElementById("instagram").innerHTML = `<a href="${details.social_links[0]?.url}" target="_blank">Instagram</a>`;
    document.getElementById("whatsapp").innerHTML = `<a href="${details.social_links[1]?.url}" target="_blank">WhatsApp</a>`;
    document.getElementById("github").innerHTML = `<a href="${details.social_links[2]?.url}" target="_blank">GitHub</a>`;
    
    document.getElementById("qr-code").innerHTML = `<img src="${qr_code.src}" alt="${qr_code.alt}">`;
}
