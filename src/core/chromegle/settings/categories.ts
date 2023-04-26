

export class SettingsCategory {

    constructor(public name: string) {}

}

export enum Category {
    AUTOMATION = "automation",
}

export const Categories: Record<string, SettingsCategory> = {
    [Category.AUTOMATION]: new SettingsCategory("Automation")
}
