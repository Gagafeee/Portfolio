const extendButtonLocator = ".card .extend_button";

const projectContainerLocator = "#work ol";
const projectContainer = document.querySelector(projectContainerLocator);
if (projectContainer == null) throw new Error("Cannot initialize project dropdown: Cannot resolve project container. Locator: '" + projectContainerLocator + "'.")
const sidebarContainerLocator = "#work .container .sidebar";
const sidebarContainer = document.querySelector(sidebarContainerLocator);
if (sidebarContainer == null) throw new Error("Cannot initialize project dropdown: Cannot resolve sidebar container. Locator: '" + sidebarContainerLocator + "'.")

class ProjectDropdownController {
    element!: Element;
    indicator!: Element;
    index!: number;
    extendButton!: Element;

    constructor(element: Element, index: number) {
        this.element = element;
        this.index = index;

        const pointIndicator = sidebarContainer?.querySelector("circle:nth-child(" + (this.index + 1) + ")");
        if (pointIndicator == null) throw new Error("[Project Dropdown Controller]: Cannot resolve the corresponding indicator in sidebar.");
        this.indicator = pointIndicator;

        //Register event button
        const extendButton = this.element.querySelector(extendButtonLocator);
        if (extendButton == null) {
            console.error("Element: ", this.element);
            throw new Error("[Project Dropdown Controller]: Cannot resolve the extend-button in the project element.")
        }
        extendButton.addEventListener("click", () => {
            projectControllerList[this.index].invertState()
        })
        this.extendButton = extendButton;

        //Auto extends if the page has loaded with the corresponding anchor.
        const url = document.URL;
        const projectIdentifier = url.split(/#(project_\S*)$/)[1];
        if (projectIdentifier && projectIdentifier == this.element.id) this.extend();
    }

    public invertState() {
        if (this.isExtended()) this.collapse()
        else this.extend();
    }

    public extend() {
        this.closeOthers()
        this.element.classList.add("extended");
        this.extendButton.innerHTML = "Voir moins";
        this.indicator.classList.add("active");
    }

    public collapse() {
        this.element.classList.remove("extended")
        this.extendButton.innerHTML = "Voir plus";
        this.indicator.classList.remove("active");
    }

    private isExtended(): boolean {
        return this.element.className.includes("extended");
    }

    private closeOthers() {
        projectControllerList.forEach(controller => {
            if (controller.index != this.index) controller.collapse()
        })
    }
}

function copyCurrentURL() {
    setTimeout(() =>
            navigator.clipboard.writeText(document.URL)
                .catch(err => console.error("Cannot copy the current URL to the user's clipboard:", err))
        , 100)
}


const projectControllerList: ProjectDropdownController[] = [];
for (const projectElement of projectContainer.children) {
    projectControllerList.push(new ProjectDropdownController(projectElement, projectControllerList.length));
}

console.info("Project dropdown initialized. Registered " + projectControllerList.length + " projects.")