"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-flag";
exports.ids = ["vendor-chunks/has-flag"];
exports.modules = {

/***/ "(ssr)/../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js":
/*!*********************************************************************************************************!*\
  !*** ../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = (flag, argv = process.argv)=>{\n    const prefix = flag.startsWith(\"-\") ? \"\" : flag.length === 1 ? \"-\" : \"--\";\n    const position = argv.indexOf(prefix + flag);\n    const terminatorPosition = argv.indexOf(\"--\");\n    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vVXNlcnMvQW1pckUvQXBwRGF0YS9Mb2NhbC9wbnBtL2dsb2JhbC81Ly5wbnBtL2hhcy1mbGFnQDQuMC4wL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBQSxPQUFPQyxPQUFPLEdBQUcsQ0FBQ0MsTUFBTUMsT0FBT0MsUUFBUUQsSUFBSTtJQUMxQyxNQUFNRSxTQUFTSCxLQUFLSSxVQUFVLENBQUMsT0FBTyxLQUFNSixLQUFLSyxNQUFNLEtBQUssSUFBSSxNQUFNO0lBQ3RFLE1BQU1DLFdBQVdMLEtBQUtNLE9BQU8sQ0FBQ0osU0FBU0g7SUFDdkMsTUFBTVEscUJBQXFCUCxLQUFLTSxPQUFPLENBQUM7SUFDeEMsT0FBT0QsYUFBYSxDQUFDLEtBQU1FLENBQUFBLHVCQUF1QixDQUFDLEtBQUtGLFdBQVdFLGtCQUFpQjtBQUNyRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Nzcy1wYW5lbC8uLi8uLi9Vc2Vycy9BbWlyRS9BcHBEYXRhL0xvY2FsL3BucG0vZ2xvYmFsLzUvLnBucG0vaGFzLWZsYWdANC4wLjAvbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzP2ZkMmMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2ID0gcHJvY2Vzcy5hcmd2KSA9PiB7XG5cdGNvbnN0IHByZWZpeCA9IGZsYWcuc3RhcnRzV2l0aCgnLScpID8gJycgOiAoZmxhZy5sZW5ndGggPT09IDEgPyAnLScgOiAnLS0nKTtcblx0Y29uc3QgcG9zaXRpb24gPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3NpdGlvbiA9IGFyZ3YuaW5kZXhPZignLS0nKTtcblx0cmV0dXJuIHBvc2l0aW9uICE9PSAtMSAmJiAodGVybWluYXRvclBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA8IHRlcm1pbmF0b3JQb3NpdGlvbik7XG59O1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJmbGFnIiwiYXJndiIsInByb2Nlc3MiLCJwcmVmaXgiLCJzdGFydHNXaXRoIiwibGVuZ3RoIiwicG9zaXRpb24iLCJpbmRleE9mIiwidGVybWluYXRvclBvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js\n");

/***/ }),

/***/ "(rsc)/../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js":
/*!*********************************************************************************************************!*\
  !*** ../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = (flag, argv = process.argv)=>{\n    const prefix = flag.startsWith(\"-\") ? \"\" : flag.length === 1 ? \"-\" : \"--\";\n    const position = argv.indexOf(prefix + flag);\n    const terminatorPosition = argv.indexOf(\"--\");\n    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vVXNlcnMvQW1pckUvQXBwRGF0YS9Mb2NhbC9wbnBtL2dsb2JhbC81Ly5wbnBtL2hhcy1mbGFnQDQuMC4wL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBQSxPQUFPQyxPQUFPLEdBQUcsQ0FBQ0MsTUFBTUMsT0FBT0MsUUFBUUQsSUFBSTtJQUMxQyxNQUFNRSxTQUFTSCxLQUFLSSxVQUFVLENBQUMsT0FBTyxLQUFNSixLQUFLSyxNQUFNLEtBQUssSUFBSSxNQUFNO0lBQ3RFLE1BQU1DLFdBQVdMLEtBQUtNLE9BQU8sQ0FBQ0osU0FBU0g7SUFDdkMsTUFBTVEscUJBQXFCUCxLQUFLTSxPQUFPLENBQUM7SUFDeEMsT0FBT0QsYUFBYSxDQUFDLEtBQU1FLENBQUFBLHVCQUF1QixDQUFDLEtBQUtGLFdBQVdFLGtCQUFpQjtBQUNyRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Nzcy1wYW5lbC8uLi8uLi9Vc2Vycy9BbWlyRS9BcHBEYXRhL0xvY2FsL3BucG0vZ2xvYmFsLzUvLnBucG0vaGFzLWZsYWdANC4wLjAvbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzP2ZkMmMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2ID0gcHJvY2Vzcy5hcmd2KSA9PiB7XG5cdGNvbnN0IHByZWZpeCA9IGZsYWcuc3RhcnRzV2l0aCgnLScpID8gJycgOiAoZmxhZy5sZW5ndGggPT09IDEgPyAnLScgOiAnLS0nKTtcblx0Y29uc3QgcG9zaXRpb24gPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3NpdGlvbiA9IGFyZ3YuaW5kZXhPZignLS0nKTtcblx0cmV0dXJuIHBvc2l0aW9uICE9PSAtMSAmJiAodGVybWluYXRvclBvc2l0aW9uID09PSAtMSB8fCBwb3NpdGlvbiA8IHRlcm1pbmF0b3JQb3NpdGlvbik7XG59O1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJmbGFnIiwiYXJndiIsInByb2Nlc3MiLCJwcmVmaXgiLCJzdGFydHNXaXRoIiwibGVuZ3RoIiwicG9zaXRpb24iLCJpbmRleE9mIiwidGVybWluYXRvclBvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../Users/AmirE/AppData/Local/pnpm/global/5/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js\n");

/***/ })

};
;