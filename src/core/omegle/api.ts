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

}


export const Omegle = new OmegleAPI();
