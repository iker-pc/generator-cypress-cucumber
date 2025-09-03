"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateTestDefinitions = (generator) => {
    generator.fs.copy(generator.templatePath('test-definitions/test.auto.feature'), generator.destinationPath('projects/test-definitions/test.auto.feature'));
};
exports.default = generateTestDefinitions;
