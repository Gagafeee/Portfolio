"use strict";
const expandButtonLocator = ".card .expand_button";
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
        const expandButton = this.element.querySelector(expandButtonLocator);
        if (expandButton == null) {
            console.error("Element: ", this.element);
            throw new Error("[Project Dropdown Controller]: Cannot resolve the expand-button in the project element.");
        }
        const action = () => {
            projectControllerList[this.index].invertState();
        };
        expandButton.addEventListener("click", action);
        expandButton.addEventListener("keydown", (event) => {
            const code = event.code;
            if (code === "Enter" || code === "NumpadEnter")
                action();
        });
        this.expandButton = expandButton;
        const url = document.URL;
        const projectIdentifier = url.split(/#(project_\S*)$/)[1];
        if (projectIdentifier && projectIdentifier === this.element.id)
            this.expand();
    }
    invertState() {
        if (this.isExpanded())
            this.collapse();
        else {
            this.expand();
            this.scrollToElement();
        }
    }
    expand() {
        this.closeOthers();
        this.element.classList.add("expanded");
        this.expandButton.innerHTML = "Voir moins";
        this.indicator.classList.add("active");
    }
    collapse() {
        this.element.classList.remove("expanded");
        this.expandButton.innerHTML = "Voir plus";
        this.indicator.classList.remove("active");
    }
    scrollToElement() {
        this.element.scrollIntoView();
    }
    isExpanded() {
        return this.element.className.includes("expanded");
    }
    closeOthers() {
        projectControllerList.forEach(controller => {
            if (controller.index !== this.index)
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
