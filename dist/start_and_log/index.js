import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "node:child_process"
const external_node_child_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");
;// CONCATENATED MODULE: external "node:fs"
const external_node_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");
;// CONCATENATED MODULE: external "node:path"
const external_node_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");
;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("url");
;// CONCATENATED MODULE: external "node:fs/promises"
const promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");
;// CONCATENATED MODULE: external "os"
const external_os_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("os");
;// CONCATENATED MODULE: ./src/logs.js





const logDir = external_node_path_namespaceObject.resolve(external_os_namespaceObject.tmpdir(), 'turborepo-remote-cache-gh-action');

if (!external_node_fs_namespaceObject.existsSync(logDir)) {
  external_node_fs_namespaceObject.mkdirSync(logDir, { recursive: true });
}

const logFile = (name) => external_node_path_namespaceObject.resolve(logDir, name);

const readLog = async (name) => {
  try {
    return await fsPromises.readFile(logFile(name), 'utf8');
  } catch (e) {
    return '';
  }
};
;// CONCATENATED MODULE: ./src/start_and_log.js






const start_and_log_dirname = (0,external_node_path_namespaceObject.dirname)((0,external_url_namespaceObject.fileURLToPath)(import.meta.url));

console.log('Starting Cache Server Process...');
const subprocess = (0,external_node_child_process_namespaceObject.spawn)('node', [(0,external_node_path_namespaceObject.resolve)(start_and_log_dirname, '..', 'server', 'index.cjs')], {stdio: 'pipe'});
subprocess.stdout.pipe((0,external_node_fs_namespaceObject.createWriteStream)(logFile('out')));
subprocess.stderr.pipe((0,external_node_fs_namespaceObject.createWriteStream)(logFile('err')));
