// Initialize Hero banner typing effect
const titleLocator = "#hero .card .title";
if (document.querySelector(titleLocator) == null) throw new Error("Cannot initialize typer effect on the hero section: Node not found. Locator: " + titleLocator);

setTimeout(() => {
    document.querySelector(titleLocator).innerHTML = "";
    new Typed(titleLocator, {
        strings: ["Je crée. ^2000", "Je design.", "J'imagine.", "Je conçois.", "J'optimise."],
        typeSpeed: 70,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
    });
}, 70)
