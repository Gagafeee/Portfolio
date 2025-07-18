"use strict";
const extendButtonLocator = ".card .extend_button";
const projectContainerLocator = "#work ol";
const projectContainer = document.querySelector(projectContainerLocator);
if (projectContainer == null)
    throw new Error("Cannot initialize project dropdown: Cannot resolve project container. Locator: '" + projectContainerLocator + "'.");
const sidebarContainerLocator = "#work .container .sidebar";
const sidebarContainer = document.querySelector(sidebarContainerLocator);
if (sidebarContainer == null)
    throw new Error("Cannot initialize project dropdown: Cannot resolve sidebar container. Locator: '" + sidebarContainerLocator + "'.");
class ProjectDropdownController {
    constructor(element, index) {
        this.element = element;
        this.index = index;
        const pointIndicator = sidebarContainer === null || sidebarContainer === void 0 ? void 0 : sidebarContainer.querySelector("circle:nth-child(" + (this.index + 1) + ")");
        if (pointIndicator == null)
            throw new Error("[Project Dropdown Controller]: Cannot resolve the corresponding indicator in sidebar.");
        this.indicator = pointIndicator;
        //Register event button
        const extendButton = this.element.querySelector(extendButtonLocator);
        if (extendButton == null) {
            console.error("Element: ", this.element);
            throw new Error("[Project Dropdown Controller]: Cannot resolve the extend-button in the project element.");
        }
        extendButton.addEventListener("click", () => {
            projectList[this.index].invertState();
        });
        this.extendButton = extendButton;
    }
    invertState() {
        if (this.isExtended())
            this.collapse();
        else
            this.extend();
    }
    extend() {
        this.element.classList.add("extended");
        this.extendButton.innerHTML = "Voir moins";
        this.indicator.classList.add("active");
    }
    collapse() {
        this.element.classList.remove("extended");
        this.extendButton.innerHTML = "Voir plus";
        this.indicator.classList.remove("active");
    }
    isExtended() {
        return this.element.className.includes("extended");
    }
}
const projectList = [];
for (const projectElement of projectContainer.children) {
    projectList.push(new ProjectDropdownController(projectElement, projectList.length));
}
console.info("Project dropdown initialized. Registered " + projectList.length + " projects.");
