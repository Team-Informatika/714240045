fetch("pohan.json")
  .then(response => response.json())
  .then(data => {
    const card = data.card.details;
    
    document.getElementById("avatar").src = data.card.avatar.src;
    document.getElementById("avatar").alt = data.card.avatar.alt;
    document.getElementById("name").textContent = card.name;
    document.getElementById("occupation").textContent = card.occupation;
    document.getElementById("about").textContent = card.about;
    document.getElementById("skill-title").textContent = card.skills.description;

    const skillList = document.getElementById("skill-list");
    card.skills.list.forEach(skill => {
      let li = document.createElement("li");
      li.textContent = skill;
      skillList.appendChild(li);
    });

    document.getElementById("amount").textContent = card.pricing.amount;
    document.getElementById("duration").textContent = card.pricing.duration;

    const socialLinks = document.getElementById("social-links");
    card.social_links.forEach(link => {
      let a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.innerHTML = `<i class="fa-brands fa-${link.platform.toLowerCase()}"></i>`;
      socialLinks.appendChild(a);
    });

    document.getElementById("qr-code").src = card.qr_code.src;
    document.getElementById("qr-code").alt = card.qr_code.alt;
  })
  .catch(error => console.error("Error loading JSON:", error));
