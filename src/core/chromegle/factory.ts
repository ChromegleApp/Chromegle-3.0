import {SettingsCategory} from "./settings/categories";

export function generateUIButton(text: string, id: string | null = null): HTMLElement {

    const element = document.createElement("div");
    element.classList.add('chromegle-ui-button');
    element.classList.add('no-select');
    element.innerHTML = `<span>${text}</span>`;
    element.id = id ? id : '';
    return element;

}

export function generateCategoryCollapsible(id: string, category: SettingsCategory): [HTMLElement, HTMLElement] {

    const categoryButton = document.createElement("div");
    categoryButton.id = `${id}-chromegle-category`;
    categoryButton.textContent = category.name;
    categoryButton.classList.add("chromegle-menu-collapsible");

    const categoryContent = document.createElement("div");
    categoryContent.id = `${id}-chromegle-category-content`;
    categoryContent.classList.add("chromegle-menu-collapsible-content");

    return [categoryButton, categoryContent];

}


const parser = new DOMParser();

export function generateFragmentFromHTML(html: string): HTMLElement {
    return parser
        .parseFromString(html.trim(), "text/html")
        .body
        .childNodes
        .item(0) as HTMLElement;
}

export function generateUserCount(users: number) {

    return generateFragmentFromHTML(`
       <div id="chromegle-user-count" class="no-select">
            <span class="chromegle-users-count">${users}+</span>
            <span class="chromegle-users-desc">Online Chromeglers</span>
       </div> 
    `)

}
