"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateConsulConfiguration = (generator, basePackageJson, config) => {
    basePackageJson.dependencies = {
        "consul": "^2.0.1",
        ...(basePackageJson.dependencies || {}),
    };
    const envPropertiesTemplatePath = generator.templatePath('.env.properties');
    const consulManagerTemplatePath = generator.templatePath('consul/ConsulManager.ts.ejs');
    /**
     * First of all, we need to generate the ConsulManager.ts file, which is the file that manages consul connections
     */
    generator.fs.copyTpl(consulManagerTemplatePath, generator.destinationPath('projects/consul/ConsulManager.ts'));
    generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env'), {
        consulConnection: true,
        consulHost: config.production.consulHost,
        consulPort: config.production.consulPort,
        consulToken: config.production.consulToken,
    });
    if (config.development !== undefined) {
        generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env.dev'), {
            consulConnection: true,
            consulHost: config.development.consulHost,
            consulPort: config.development.consulPort,
            consulToken: config.development.consulToken,
        });
    }
    if (config.staging !== undefined) {
        generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env.pre'), {
            consulConnection: true,
            consulHost: config.staging.consulHost,
            consulPort: config.staging.consulPort,
            consulToken: config.staging.consulToken,
        });
    }
};
exports.default = generateConsulConfiguration;
