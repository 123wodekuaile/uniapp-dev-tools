import devCache from "./devCache.js"

export default {
  pageRouteMap: [],
  pageRouteKeyMap: {},
  /**
   * 安装路径分析插件
   */
  install() {

    let allRoutes = this.getAllRoutes();

    let pageRouteKeyMap = devCache.get("pageRouteKeyMap")
    if (!pageRouteKeyMap || typeof pageRouteKeyMap != "object") {
      pageRouteKeyMap = {}
    }

    let lastNo = 0;
    Object.keys(pageRouteKeyMap).forEach((key) => {
      let item = Number(pageRouteKeyMap[key])
      if (item > lastNo) {
        lastNo = item;
      }
    })

    allRoutes.forEach(item => {
      if (!pageRouteKeyMap[item.path]) {
        pageRouteKeyMap[item.path] = lastNo + 1;
        lastNo = lastNo + 1;
      }
    })

    devCache.set("pageRouteKeyMap", pageRouteKeyMap)
    this.pageRouteKeyMap = pageRouteKeyMap;


    let pageRouteMap = devCache.get("pageRouteMap");
    if (!pageRouteMap || typeof pageRouteMap != "object") {
      pageRouteMap = {}
    }

    Object.keys(pageRouteMap).forEach((key) => {
      try {
        let n = Number(pageRouteMap[key]);
        if (!Number.isInteger(n) || n < 0) {
          pageRouteMap[key] = 1;
        }
      } catch (error) { }
    })
    this.pageRouteMap = pageRouteMap;

    this.saveData()

  },
  /**
   * 获取APP注册的所有路由
   * @returns {{path: string}[]} 返回路由列表
   */
  getAllRoutes() {
    let pages = [];
    // #ifdef H5 || APP-PLUS
    try {
      __uniRoutes.map((item) => {
        let path = item.alias ? item.alias : item.path;
        pages.push({ path })
      });
    } catch (error) {
      pages = [];
    }
    // #endif
    // #ifdef MP-WEIXIN
    try {
      let wxPages = __wxConfig.pages;
      wxPages.map((item) => {
        pages.push({
          path: "/" + item,
        })
      });
    } catch (error) {
      pages = [];
    }
    // #endif
    return pages;
  },
  /**
   * 写入路由列表
   */
  pushPageRouteMap(list = []) {
    if (!list || list.length == 0) {
      list = getCurrentPages()
    }
    let key = ""
    list.forEach((item) => {
      let path = item.route.indexOf("/") == 0 ? item.route : "/" + item.route;
      let keyItem = this.pageRouteKeyMap[path];
      if (!keyItem) {
        keyItem = path;
      }
      if (key == "") {
        key = keyItem + ""
      } else {
        key = key + "," + keyItem
      }
    })

    if (this.pageRouteMap[key]) {
      this.pageRouteMap[key] = this.pageRouteMap[key] + 1;
    } else {
      this.pageRouteMap[key] = 1;
    }

  },
  /**
   * 保存路由缓存
   */
  saveData() {
    let that = this;
    setTimeout(() => {
      devCache.set("pageRouteMap", that.pageRouteMap)
      setTimeout(() => {
        that.saveData()
      }, 500);
    }, Math.round(Math.random() * 3 * 1000) + 2000);
  },
}