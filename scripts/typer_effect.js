// Initialize Hero banner typing effect
const titleSelector = "#hero .container .title";
if (document.querySelector(titleSelector) == null) throw new Error("Cannot initialize typer effect on hero section: Node not found");
else document.querySelector(titleSelector).innerHTML = "";
const typingEffect = new Typed(titleSelector, {
    strings: ["Je crée. ^2000", "Je design.", "J'imagine.", "Je conçois.", "J'optimize."],
    typeSpeed: 70,
    startDelay: 70,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
});