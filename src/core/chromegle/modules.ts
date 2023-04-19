import {Logger} from "./logging";

/**
 * Definition of a Chromegle "Module". Modules are the core of Chromegle functionality.
 * Modules are defined by extending this class and managed by the extension.
 */
export abstract class Module {

    abstract id: string;

    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions, element?: HTMLElement): void {
        listener = (listener as CallableFunction).bind(this) as EventListener;
        if (element === null) throw new DOMException("Element with \"null\" value passed to event listener");
        (element || document).addEventListener(type, listener, options);
    }

    addOmegleEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions, element?: HTMLElement): void {
        this.addEventListener(`omegle.${type}`, listener, options, element);
    }

    addChromegleEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions, element?: HTMLElement): void {
        this.addEventListener(`chromegle.${type}`, listener, options, element);
    }

}

export function loadModules(...modules: Array<new() => Module>): Array<Module> {
    const instances: Array<Module> = [];

    for (let module of modules) {
        try {
            instances.push(new module());
        } catch (ex: any) {
            Logger.ERROR("loadModules", "Failed to load a module due to an exception:\n%s", ex.stack)
        }

    }

    return instances;

}

