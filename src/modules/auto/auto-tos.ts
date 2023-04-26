import {Module} from "../../core/chromegle/modules";

export class AutoTOS extends Module {

    id = "AutoTOS";

    constructor() {
        super();
        this.addOmegleEventListener("startButtonClick", this.onStartButtonClick);
    }

    onStartButtonClick() {

        // Check checkboxes
        for (const element of document.querySelectorAll("input[type=checkbox]:not(:checked)")) {
            (element as HTMLInputElement).click();
        }

        // Click confirm & continue
        (document.querySelector("input[type=button][value='Confirm & continue']") as HTMLInputElement)?.click();

    }

}
