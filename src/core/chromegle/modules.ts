/**
 * Definition of a Chromegle "Module". Modules are the core of Chromegle functionality.
 * Modules are defined by extending this class and managed by the extension.
 */
import {Logger} from "./logging";

export abstract class Module {

    abstract id: string;



    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        (listener as CallableFunction).bind(this);
        document.addEventListener(type, listener, options);

        let element = document.createElement("div");
        element.querySelector("");

    }

    addOmegleEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        this.addEventListener(`omegle.${type}`, listener, options)
    }

    addChromegleEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        this.addEventListener(`chromegle.${type}`, listener, options)
    }





}

export function loadModules<T extends Module>(...modules: Array<new() => T>): Array<Module> {
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

