import {Registry} from "./registry";

class OmegleAPI {
    public test: string = "abc";

    public isVideoChat(): boolean {
        return document.querySelector("#videowrapper") != null;
    }

    public chatBoxEnabled(): boolean {
        let area = document.querySelector("textarea.chatmsg");
        if (!area) return false;
        return !area.classList.contains("disabled");
    }

    public skipChat(ifChatting: boolean = true): void {

        if (ifChatting && !Registry.isChatting) {
            return;
        }

        // Skip Chat
        let disconnectButton = document.querySelector('.disconnectbtn') as HTMLButtonElement;
        if (Registry.isChatting) disconnectButton.click();
        disconnectButton.click();

    }

}


export const Omegle = new OmegleAPI();
