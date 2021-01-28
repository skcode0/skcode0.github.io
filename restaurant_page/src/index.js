import {renderNav} from "./nav";
import {renderHome} from "./home";
import {renderMenu} from "./menu";
import {renderContact} from "./contact"

init();
let contact = document.querySelector(".contact-container");
contact.style.display = "none";


let navLinks = document.querySelectorAll(".links");
function toggleNav(){
    [...navLinks].forEach(link =>{
        link.classList.remove("pink");
    });
}

let homeDiv = document.querySelector(".intro-container");
let menuDiv = document.querySelector(".toggle-menu");
let contactDiv = document.querySelector(".contact-container")

// home
navLinks[0].addEventListener("click", function(){
    homeDiv.style.display = "block";
    contactDiv.style.display = "none";
    toggleNav();
    navLinks[0].classList.add("pink");
    menuDiv.style.display = "none";
});

// order btn
let orderBtn = document.querySelector(".order-btn");
orderBtn.addEventListener("click", function(){
    homeDiv.style.display = "none";
    toggleNav();
    navLinks[1].classList.add("pink");
    menuDiv.style.display = "block";
});

// menu
navLinks[1].addEventListener("click", function(){
    homeDiv.style.display = "none";
    contactDiv.style.display = "none";
    toggleNav();
    navLinks[1].classList.add("pink");
    menuDiv.style.display = "block";
});

//contact
navLinks[2].addEventListener("click", () =>{
    homeDiv.style.display = "none";
    menuDiv.style.display = "none";
    toggleNav();
    navLinks[2].classList.add("pink");
    contactDiv.style.display = "block";
});

function init(){
    renderNav();
    renderHome();
    renderMenu();
    renderContact();
}





