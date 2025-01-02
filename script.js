import {renderHTML,onClick,setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

renderHTML('content', 'nogi.html');

onClick("github",myGithub);
function myGithub() {
    window.open('https://github.com/Nogi3201', 'blank');
}
onClick("whatsapp",mywhatsapp);
function mywhatsapp() {
    window.open('https://whatsapp.com/6282161299141', 'blank');
}
onClick("instagram",myinstagram);
function myinstagram() {
    window.open('https://instagram.com/san_knj4d', 'blank');
}

setInner("tex", "kontak saya:")