import {Omegle} from "./api";
import {Logger} from "../chromegle/logging";

class OmegleRegistry {

    private static id = "OmegleRegistry";
    private observer: MutationObserver = new MutationObserver(this.onMutation.bind(this));
    private pageStarted: boolean = false;
    public videoLoaded = false;
    public isChatting = false;
    public uuid: string | null = null;

    constructor() {
        this.observer.observe(document, {subtree: true, childList: true, attributes: true});
        document.addEventListener("click", this.onClick.bind(this));
    }

    /**
     * Set page started
     */
    private setPageStarted(event: any) {
        this.pageStarted = true;
        document.dispatchEvent(new CustomEvent("omegle.startButtonClick", {detail: {button: event.target, isVideoChat: Omegle.isVideoChat()}}))
    }

    /**
     * Handle button clicks
     */
    onClick(event: MouseEvent): void {

        // START buttons clicked (video, text)
        if (["videobtn", "textbtn"].includes((event.target as HTMLElement).id) && !this.pageStarted) {
            this.setPageStarted(event);
        }

        // IN-CHAT start/disconnect chat button clicked
        if ((event.target as HTMLElement).classList.contains("disconnectbtn")) {
            document.dispatchEvent(new CustomEvent('omegle.chatButtonClick', {detail: event}));
        }

    }

    /**
     * Handle page updates
     */
    onMutation(event: MutationRecord[]): void {

        for (let record of event) {

            // IN-CHAT video loaded (loading spinner disappears)
            if ((record.target as HTMLElement).id === "othervideospinner" && record.attributeName === "style") {
                if ((record.target as HTMLElement).style.display === "none" && this.isChatting) {
                    document.dispatchEvent(new CustomEvent("omegle.strangerVideoLoaded"));
                    this.videoLoaded = true;
                }
            }

            // IN-CHAT WebRTC detection block (page-side proxy use detected)
            if ((record.target as HTMLElement)?.innerText?.includes("Server was unreachable for too long")) {
                Logger.ERROR(
                    OmegleRegistry.id,
                    "Chat failed to connect, you are likely using a VPN/proxy that is detected. If so, your provider's software is being detected, not the IP.",
                )
                document.dispatchEvent(new CustomEvent('omegle.failedChatStart'));
            }

            // IN-CHAT anything involving chat message
            if ((record.target as HTMLElement).classList.contains("chatmsg")) {

                // Page started (backup method)
                if (!this.pageStarted) {
                    this.setPageStarted(record);
                }


                // Chat Started
                if (!this.isChatting && Omegle.chatBoxEnabled()) {

                    this.isChatting = true;
                    this.videoLoaded = false;
                    this.uuid = this.generateUUID();

                    Logger.INFO(OmegleRegistry.id, "Chat Started: UUID <%s>", this.uuid);
                }

                // Chat Ended
                if (this.isChatting && !Omegle.chatBoxEnabled()) {
                    Logger.INFO(OmegleRegistry.id, "Chat Ended: UUID <%s>", this.uuid);

                    this.isChatting = false;
                    this.uuid = null;
                    this.videoLoaded = false;

                }


            }


        }

    }

    /**
     * Generate chat UUID
     */
    private generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, uuid = c === 'x' ? r : (r & 0x3 | 0x8);
            return uuid.toString(16);
        });
    }

}

export const Registry = new OmegleRegistry();

