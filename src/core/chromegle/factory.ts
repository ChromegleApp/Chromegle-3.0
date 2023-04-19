export function generateUIButton(text: string, id: string | null = null): HTMLElement {

    const element = document.createElement("div");
    element.classList.add('chromegle-ui-button');
    element.classList.add('no-select');
    element.innerHTML = `<span>${text}</span>`;
    element.id = id ? id : '';
    return element;

}
