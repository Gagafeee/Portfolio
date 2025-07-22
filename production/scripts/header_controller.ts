const headerLocator = "body > header";
const headerElement = document.querySelector(headerLocator);
if (headerElement == null) throw new Error("Cannot initialize header indicator controller: Cannot find the header element. Locator: " + headerLocator + ".");

class IndicatorController {
    container!: Element;
    indicatorElement!: Element;
    buttons!: Element[];

    constructor(container: Element) {
        const menuContainerLocator = "nav";
        const menuContainerElement = document.querySelector(menuContainerLocator);
        if (menuContainerElement == null) throw new Error("Cannot initialize header indicator controller: Cannot find the menu container element. Locator: " + menuContainerLocator + ".");
        this.container = menuContainerElement;

        const indicatorContainerLocator = ".indicator";
        const indicatorContainerElement = container.querySelector(indicatorContainerLocator);
        if (indicatorContainerElement == null) throw new Error("Cannot initialize header indicator controller: Cannot find the indicator element. Locator: " + indicatorContainerLocator + ".");
        this.indicatorElement = indicatorContainerElement;

        const buttons: Element[] = Array.from(this.container.querySelectorAll("a"));
        if (buttons.length == 0) console.warn("Warning: No buttons elements are registered in the menu.")
        this.buttons = buttons;

        if (document.documentElement.getBoundingClientRect().width < 500) {
            (this.indicatorElement as HTMLElement).style.setProperty("--left", this.buttons[0].getBoundingClientRect().x + "px");
        }
    }

    public setVisible() {
        (this.indicatorElement as HTMLElement).style.setProperty("opacity", "1");
    }

    public moveTo(breakpointIndex: number) {
        this.setMargin(this.calculateMargin(breakpointIndex));
    }

    private calculateMargin(selectedIndex: number): number {
        if (selectedIndex >= this.buttons.length) throw new Error("Cannot render margin: The selected element is out of range. Try to select the element " + selectedIndex + " but the last element is " + (this.buttons.length - 1) + ".")
        const menuLeftPosition = this.container.getBoundingClientRect().x;
        const selectedElementLeftPosition = this.buttons[selectedIndex].getBoundingClientRect().x;
        const selectedElementWidth = this.buttons[selectedIndex].getBoundingClientRect().width;

        return selectedElementLeftPosition - menuLeftPosition + (selectedElementWidth / 2);
    }

    private setMargin(margin: number) {
        (this.indicatorElement as HTMLElement).style.setProperty("--margin", margin + "px");
    }
}

class AnchorController {
    breakpointList!: number[];
    thresholds: number = 100;

    constructor(anchorList: Element[]) {
        this.breakpointList = anchorList.map(anchor => (anchor.getBoundingClientRect().y + window.scrollY));

        //Register scroll event
        document.addEventListener("scroll", () => this.onScroll(window.scrollY));

        //Init indicator
        this.setIndicator(this.getBreakpointIndex(window.scrollY));
    }

    private onScroll(currentPosition: number) {
        this.setIndicator(this.getBreakpointIndex(currentPosition));
    }

    private setIndicator(selectedIndex: number) {
        menuIndicatorController.moveTo(selectedIndex);
        setTimeout(() => {
            menuIndicatorController.setVisible();
        }, 250)
    }

    private getBreakpointIndex(_currentPosition: number): number {
        const currentPosition = _currentPosition + this.thresholds;
        let breakpointIndex = 0;
        for (let index = 0; index < this.breakpointList.length; index++) {
            const breakpointPosition = this.breakpointList[index];
            if (currentPosition <= breakpointPosition) {
                if (index - 1 > 0) breakpointIndex = index - 1;
                break;
            }
        }
        if (currentPosition >= this.breakpointList[this.breakpointList.length - 1]) breakpointIndex = this.breakpointList.length - 1;

        return breakpointIndex;
    }
}

const menuIndicatorController = new IndicatorController(headerElement);

const sections = Array.from(document.querySelectorAll("main > section"));
const anchorController = new AnchorController(sections)

console.info("Header controller script initialized.")