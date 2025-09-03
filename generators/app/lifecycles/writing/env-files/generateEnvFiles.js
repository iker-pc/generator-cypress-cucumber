"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateEnvFiles = (generator, baseUrls, consulConfig) => {
    const envPropertiesTemplatePath = generator.templatePath('.env.properties');
    generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env'), {
        baseUrl: baseUrls.production,
        consulConnection: true,
        consulHost: consulConfig.production.consulHost,
        consulPort: consulConfig.production.consulPort,
        consulToken: consulConfig.production.consulToken,
    });
    if (baseUrls.dev !== undefined && consulConfig.dev !== undefined) {
        generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env.dev'), {
            baseUrl: baseUrls.dev,
            consulConnection: true,
            consulHost: consulConfig.dev.consulHost,
            consulPort: consulConfig.dev.consulPort,
            consulToken: consulConfig.dev.consulToken,
        });
    }
    if (baseUrls.pre !== undefined && consulConfig.pre !== undefined) {
        generator.fs.copyTpl(envPropertiesTemplatePath, generator.destinationPath('projects/.env.pre'), {
            baseUrl: baseUrls.pre,
            consulConnection: true,
            consulHost: consulConfig.pre.consulHost,
            consulPort: consulConfig.pre.consulPort,
            consulToken: consulConfig.pre.consulToken,
        });
    }
};
exports.default = generateEnvFiles;
