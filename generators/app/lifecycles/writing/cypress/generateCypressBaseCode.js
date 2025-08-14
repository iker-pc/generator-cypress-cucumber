"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateCypressBaseCode = (generator) => {
    generator.fs.copy(generator.templatePath('cypress/**'), generator.destinationPath('projects/cypress'));
};
exports.default = generateCypressBaseCode;
