

class SettingsCategory {

    constructor(public name: string) {

    }

}

export enum Category {
    GREETINGS = "greetings",
}

export const Categories = {
    [Category.GREETINGS]: new SettingsCategory("Greeting Settings")
}
