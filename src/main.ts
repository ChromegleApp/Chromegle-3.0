import {loadModules, Modules} from "./core/chromegle/modules";
import {AutoTOS} from "./modules/auto/auto-tos";
import {Menu} from "./modules/menu";
import {UserCount} from "./modules/user-count";

loadModules(
    AutoTOS,
    Menu,
    UserCount
)

