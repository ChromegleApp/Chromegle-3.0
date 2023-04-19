import {Module} from "../core/chromegle/modules";
import {Logger} from "../core/chromegle/logging";
import {generateUIButton} from "../core/chromegle/factory";
import {Option, Settings} from "../core/chromegle/settings/settings";

export class Menu extends Module {

    id = "Menu";

    constructor() {
        super();
        this.onLoad();
    }

    onLoad(): void {

        // Inject menu button
        const taglineElement: HTMLElement | null = this.injectMenuOpenButton();
        if (!taglineElement) return;

        // Inject menu
        this.generateSettingsMenu();

        // Add button event listener
        this.addEventListener('click', () => this.toggleMenu(true), undefined, taglineElement);
    }

    injectMenuOpenButton(): HTMLElement | null {

        const taglineElement: HTMLElement | null = document.querySelector('img[src="/static/tagline.png"]');

        if (!taglineElement) {
            Logger.ERROR(this.id, "Failed to retrieve header tagline for menu injection.");
            return null;
        }

        // Replace Omegle tagline with settings button
        taglineElement.replaceWith(
            generateUIButton("Settings", "menu-button")
        );

        return document.getElementById('menu-button');

    }

    toggleMenu(enabled: boolean) {
        const menuContainer = document.getElementById('chromegle-menu-container');
        if (!menuContainer) return;
        menuContainer.style.display = (
            enabled ? "flex" : "none"
        );

    }

    onMenuContainerClick(event: Event): void {

        if ((event.target as HTMLElement).id === "chromegle-menu-container" ) {
            this.toggleMenu(false);
        }

    }

    generateSettingsMenu() {

        fetch(chrome.runtime.getURL("html/settings-menu.html"))
            .then((response: Response) => response.text())
            .then((htmlText: string) => {
                const menuContainer = new DOMParser().parseFromString(htmlText, "text/html").body.childNodes.item(0) as HTMLElement;
                document.getElementsByTagName("body").item(0)?.appendChild(menuContainer);
                this.setupSettingsMenu();
            });

    }

    setupSettingsMenu() {

        // Listen to background click
        const menuContainer = document.querySelector('#chromegle-menu-container') as HTMLElement;
        this.addEventListener('click', this.onMenuContainerClick, undefined, menuContainer);

        // Listen to close button click
        const closeButton = document.querySelector('.chromegle-menu-close-button') as HTMLElement;
        this.addEventListener('click', () => this.toggleMenu(false), undefined, closeButton);

        // Define categories
        type SettingsCategories = [[string, Record<string, Option>]];
        const categoryEntries: SettingsCategories = Object.entries(Settings.options) as SettingsCategories;

        // Get menu options element
        const menuOptions = document.querySelector('.chromegle-menu-options') as HTMLElement;

        for (let [categoryName, categorySettings] of categoryEntries) {

            // TODO logic to generate category

            // Define entries
            type SettingsEntries = [[string, Option]];
            const settingEntries: SettingsEntries = Object.entries(categorySettings) as SettingsEntries;

            for (let [settingName, settingOption] of settingEntries) {

                // TODO logic to generate settings and append them to given category
            }


        }

    }


}
