export default {
  entry: "./dist/es2015/index.js",
  dest: "./dist/bundles/ssv-au-core.umd.js",
  format: "umd",
  moduleName: "ssv.au.core",
  globals: {
	  "lodash": "lodash",
	  "@ssv/core": "ssv.core",
  }
}