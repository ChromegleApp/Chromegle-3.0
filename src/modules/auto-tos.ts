import {Module} from "../core/chromegle/modules";

export class AutoTOS extends Module {

    id = "AutoTOS";

    constructor() {
        super();
        this.addChromegleEventListener("startButtonClick", this.onStartButtonClick);

    }

    onStartButtonClick() {
        (document.querySelector("input[type=checkbox]:not(:checked)") as HTMLInputElement)?.click();
        (document.querySelector("input[type=button][value='Confirm & continue']") as HTMLInputElement)?.click();
    }

}
