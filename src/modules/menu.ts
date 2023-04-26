import {Module, Modules} from "../core/chromegle/modules";
import {Logger} from "../core/chromegle/logging";
import {generateCategoryCollapsible, generateFragmentFromHTML, generateUIButton} from "../core/chromegle/factory";
import {Settings} from "../core/chromegle/settings/settings";
import {Categories} from "../core/chromegle/settings/categories";
import {Option} from "../core/chromegle/settings/options";

type CategoryRecord = [[string, Record<string, Option>]];
type OptionRecord = [[string, Option]];


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

    postLoad() {

        fetch(chrome.runtime.getURL("html/settings-menu.html"))
            .then((response: Response) => response.text())
            .then((htmlText: string) => {
                const containerHTML = generateFragmentFromHTML(htmlText);
                document.getElementsByTagName("body").item(0)?.appendChild(containerHTML);

                // Listen to background click
                const menuContainer = document.querySelector('#chromegle-menu-container') as HTMLElement;
                this.addEventListener('click', this.onMenuContainerClick, undefined, menuContainer);

                // Listen to close button click
                const closeButton = document.querySelector('.chromegle-menu-close-button') as HTMLElement;
                this.addEventListener('click', () => this.toggleMenu(false), undefined, closeButton);

                // Sync menu options
                this.syncOptions();
            });

    }

    syncOptions() {

        // Define categories
        const categoryEntries: CategoryRecord = Object.entries(Settings.options) as CategoryRecord;
        categoryEntries.sort(); // Alphabetical sort guarantees same position every time

        // Get menu options element
        const menuOptions = document.querySelector('.chromegle-menu-options') as HTMLElement;

        // Clear current
        menuOptions.innerHTML = "";

        for (let [categoryId, categoryOptions] of categoryEntries) {

            const categoryHTML: [HTMLElement, HTMLElement] = generateCategoryCollapsible(
                categoryId, Categories[categoryId]
            )

            menuOptions.appendChild(categoryHTML[0]);
            menuOptions.appendChild(categoryHTML[1])

            // Define entries
            const settingEntries: OptionRecord = Object.entries(categoryOptions) as OptionRecord;

            for (let [settingName, settingOption] of settingEntries) {
                console.log(settingName, settingOption);
                // TODO logic to generate settings and append them to given category
            }


        }

    }



}
