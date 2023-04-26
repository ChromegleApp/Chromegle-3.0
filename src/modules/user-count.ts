import {Module} from "../core/chromegle/modules";
import {generateUserCount} from "../core/chromegle/factory";
import {API_URL} from "../core/chromegle/statics";

export class UserCount extends Module {

    id = "UserCount";
    interval: ReturnType<typeof setInterval> | null = null;
    interval_ms = 1000 * 300;

    constructor() {
        super();
        document.querySelector("#tagline")?.appendChild(generateUserCount(-1));
    }

    postLoad() {
        this.refreshUserCount();
        this.interval = setInterval(() => this.refreshUserCount(), this.interval_ms);
    }

    refreshUserCount() {
        fetch(`${API_URL}/users`)
            .then((response: Response) => response.json())
            .then((response: Record<string, string>) => {

                // Count Update
                let countSpan = document.querySelector('.chromegle-users-count');
                if (countSpan) countSpan.textContent = response.count;

                // Visibility Update
                let countContainer = document.querySelector('#chromegle-user-count') as HTMLElement;
                if (countContainer) countContainer.style.display = "flex";

            });
    }

}
