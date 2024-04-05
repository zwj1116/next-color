"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "./instrumentation.ts":
/*!****************************!*\
  !*** ./instrumentation.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _vercel_otel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vercel/otel */ \"@vercel/otel\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_vercel_otel__WEBPACK_IMPORTED_MODULE_0__]);\n_vercel_otel__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nfunction register() {\n    (0,_vercel_otel__WEBPACK_IMPORTED_MODULE_0__.registerOTel)(\"next-app\");\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbnN0cnVtZW50YXRpb24udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFFcEMsU0FBU0M7SUFDZEQsMERBQVlBLENBQUM7QUFDZiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtZW50ZXJwcmlzZS8uL2luc3RydW1lbnRhdGlvbi50cz9kN2Q3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZ2lzdGVyT1RlbCB9IGZyb20gXCJAdmVyY2VsL290ZWxcIlxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG4gIHJlZ2lzdGVyT1RlbChcIm5leHQtYXBwXCIpXG59XG4iXSwibmFtZXMiOlsicmVnaXN0ZXJPVGVsIiwicmVnaXN0ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./instrumentation.ts\n");

/***/ }),

/***/ "@vercel/otel":
/*!*******************************!*\
  !*** external "@vercel/otel" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("@vercel/otel");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./instrumentation.ts"));
module.exports = __webpack_exports__;

})();