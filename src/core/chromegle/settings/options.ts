
export abstract class Option {

    abstract id: string; // TODO check for unique options, even across categories
    abstract name: string;
    description: string | null = null;
    default: string | null = null;
    abstract build(): HTMLElement;

    getValue(callback: (value: string) => void): void {
        chrome.storage.local.get(this.id, (items) => {
            callback(items[this.id]);
        })
    }

    setValue(value: string): void {
        chrome.storage.local.set({[this.id]: value}).then(() => {
            document.dispatchEvent(
                new CustomEvent("chromegle.settingsUpdate", {detail: {[this.id]: value}}));
        });

    }


}

export abstract class Toggle extends Option {

    default = "false";

    onLabel = "Enabled";
    offLabel = "Disabled";




}


