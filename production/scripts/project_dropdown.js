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
        const extendButton = this.element.querySelector(extendButtonLocator);
        if (extendButton == null) {
            console.error("Element: ", this.element);
            throw new Error("[Project Dropdown Controller]: Cannot resolve the extend-button in the project element.");
        }
        extendButton.addEventListener("click", () => {
            projectControllerList[this.index].invertState();
        });
        this.extendButton = extendButton;
        const url = document.URL;
        const projectIdentifier = url.split(/#(project_\S*)$/)[1];
        if (projectIdentifier && projectIdentifier == this.element.id)
            this.extend();
    }
    invertState() {
        if (this.isExtended())
            this.collapse();
        else
            this.extend();
    }
    extend() {
        this.closeOthers();
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
    closeOthers() {
        projectControllerList.forEach(controller => {
            if (controller.index != this.index)
                controller.collapse();
        });
    }
}
function copyCurrentURL() {
    setTimeout(() => navigator.clipboard.writeText(document.URL)
        .catch(err => console.error("Cannot copy the current URL to the user's clipboard:", err)), 100);
}
const projectControllerList = [];
for (const projectElement of projectContainer.children) {
    projectControllerList.push(new ProjectDropdownController(projectElement, projectControllerList.length));
}
console.info("Project dropdown initialized. Registered " + projectControllerList.length + " projects.");
