import devCache from "../libs/devCache.js";
import console from "./console.js";
import request from "./request.js";
import storage from "./storage.js";
import uniBus from "./uniBus.js";
import uniListen from "./uniListen.js";

/**
 * dev调试工具初始化
 */
export default function devToolsProxyInstall(options) {

  try {
    if (options.network && options.network.status) {
      request.install()
    }
    if (options.console && options.console.status) {
      console.install()
    }
    if (options.logs && options.logs.status) {
      uniListen.install()
    }

    storage.install()

    if (options.uniBus && options.uniBus.status) {
      uniBus.install()
    }

    devCache.syncLocalCache();

  } catch (error) {
    console.log("devToolsProxyInstall error", error);
  }

}