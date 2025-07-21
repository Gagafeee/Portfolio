// Initialize Hero banner typing effect
const titleSelector = "#hero .container .title";
if (document.querySelector(titleSelector) == null) throw new Error("Cannot initialize typer effect on hero section: Node not found");

setTimeout(() => {
    document.querySelector(titleSelector).innerHTML = "";
    new Typed(titleSelector, {
        strings: ["Je crée. ^2000", "Je design.", "J'imagine.", "Je conçois.", "J'optimise."],
        typeSpeed: 70,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
    });
}, 70)
