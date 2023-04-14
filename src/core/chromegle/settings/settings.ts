import {Categories, Category} from "./categories";
import {Component} from "./components";


export abstract class Option {

    abstract id: string;
    abstract label: string;
    abstract components: Array<Component>

}

class OptionAlreadyExistsError extends Error {

    constructor(option: string) {
        super(`The specified option \"${option}\" already exists!`);
    }
}

export const Settings = {
    options: <Record<string, Record<string, Option>>> {},

    addOption(category: Category, option: Option) {

        // If category not used yet, add
        if (!this.options[category]) {
            this.options[category] = {};
        }

        // Check if option exists
        if (this.options[category][option.id]) {
            throw new OptionAlreadyExistsError(option.id)
        }

        // If it does not exist, add the option
        this.options[category][option.id] = option;

    }

}


