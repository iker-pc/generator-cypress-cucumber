"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globby_1 = require("globby");
const generateCypressBaseCode = (generator, devEnv, preEnv, consulConnection, mySqlConnection) => {
    generator.fs.copyTpl(generator.templatePath('cypress.config.common.ts.ejs'), generator.destinationPath('projects/cypress.config.common.ts'), {
        consulConnection,
        mySqlConnection,
    });
    generator.fs.copyTpl(generator.templatePath('cypress.config.prod.ts.ejs'), generator.destinationPath('projects/cypress.config.prod.ts'));
    if (devEnv) {
        generator.fs.copyTpl(generator.templatePath('cypress.config.dev.ts.ejs'), generator.destinationPath('projects/cypress.config.dev.ts'));
    }
    if (preEnv) {
        generator.fs.copyTpl(generator.templatePath('cypress.config.pre.ts.ejs'), generator.destinationPath('projects/cypress.config.pre.ts'));
    }
    const cypressFiles = (0, globby_1.globbySync)(generator.templatePath('cypress/**'));
    cypressFiles.forEach(file => {
        const relative = file.replace(generator.templatePath(), "");
        const target = relative.replace(/\.ts\.ejs$/, ".ts");
        generator.fs.copy(file, generator.destinationPath(`projects/${target}`));
    });
};
exports.default = generateCypressBaseCode;
