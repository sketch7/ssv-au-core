const ssvTools = require("@ssv/tools");
const gulp = require("gulp");
const jest = require('jest-cli');
const runSeq = require("run-sequence");

const args = require("../args");

const jestConfig = {
	rootDir: 'source'
};

gulp.task("test", cb => {
	return runSeq(
		"compile:test",
		"jest",
		cb);
});

gulp.task("jest", cb => jest.runCLI({ config: jestConfig }, ".", cb));

gulp.task("compile:test", () => {
	return ssvTools.compileTsc({
		module: "es2015",
		configPath: "./tsconfig.test.json",
		continueOnError: args.continueOnError
	});
});