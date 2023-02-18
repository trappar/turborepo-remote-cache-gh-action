/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __nccwpck_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: external "child_process"
const external_child_process_namespaceObject = require("child_process");
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
;// CONCATENATED MODULE: ./src/utils/getLogDir.ts


const getLogDir = () => {
    const logDir = (0,external_path_namespaceObject.resolve)(process.cwd(), "log");
    if (!(0,external_fs_namespaceObject.existsSync)(logDir)) {
        (0,external_fs_namespaceObject.mkdirSync)(logDir);
    }
    return logDir;
};

;// CONCATENATED MODULE: ./src/start_and_log.ts




const logDir = getLogDir();
const subprocess = (0,external_child_process_namespaceObject.spawn)("node", [(0,external_path_namespaceObject.resolve)(__dirname, "../server")]);
subprocess.stdout.pipe((0,external_fs_namespaceObject.createWriteStream)((0,external_path_namespaceObject.resolve)(logDir, "out.log")));
subprocess.stderr.pipe((0,external_fs_namespaceObject.createWriteStream)((0,external_path_namespaceObject.resolve)(logDir, "err.log")));

module.exports = __webpack_exports__;
/******/ })()
;