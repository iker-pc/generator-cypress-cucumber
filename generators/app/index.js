"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const name_1 = require("./const/questions/name");
const descriptionConfirm_1 = require("./const/questions/descriptionConfirm");
const description_1 = require("./const/questions/description");
const baseUrl_1 = require("./const/questions/baseUrl");
const consulConnection_1 = require("./const/questions/consulConnection");
const consulHost_1 = require("./const/questions/consulHost");
const envConfirmQuestion_1 = require("./const/questions/envConfirmQuestion");
const envUrlQuestion_1 = require("./const/questions/envUrlQuestion");
class default_1 extends yeoman_generator_1.default {
    answers = null;
    async prompting() {
        this.answers = await this.prompt([
            name_1.nameQuestion,
            descriptionConfirm_1.descriptionConfirmQuestion,
            {
                ...description_1.descriptionQuestion,
                when: (answers) => answers.descriptionConfirm,
            },
            baseUrl_1.baseUrlQuestion,
            consulConnection_1.consulConnectionQuestion,
            {
                ...(0, consulHost_1.consulHostQuestion)('prod'),
                when: (answers) => answers.consulConnection,
            },
            (0, envConfirmQuestion_1.envConfirmQuestion)('dev'),
            {
                ...(0, envUrlQuestion_1.envUrlQuestion)('dev'),
                when: (answers) => answers.devEnv,
            },
            {
                ...(0, consulHost_1.consulHostQuestion)('dev'),
                when: (answers) => answers.devEnv && answers.consulConnection,
            },
            (0, envConfirmQuestion_1.envConfirmQuestion)('pre'),
            {
                ...(0, envUrlQuestion_1.envUrlQuestion)('pre'),
                when: (answers) => answers.preEnv,
            },
            {
                ...(0, consulHost_1.consulHostQuestion)('pre'),
                when: (answers) => answers.preEnv && answers.consulConnection,
            },
        ]);
    }
    writing() {
        if (!this.answers) {
            return;
        }
        const { name, description, baseUrl, consulConnection, consulHost, consulPort, consulToken, devEnv, devEnvUrl, devEnvConsulHost, devEnvConsulPort, devEnvConsulToken, preEnv, preEnvUrl, preEnvConsulHost, preEnvConsulPort, preEnvConsulToken, } = this.answers;
        const basePackageJson = this.fs.readJSON(this.templatePath('package.json'));
        const packageJson = {
            ...basePackageJson,
            name,
            ...(description && { description }),
        };
        if (consulConnection) {
            packageJson.dependencies = {
                "consul": "^2.0.1",
                ...(basePackageJson.dependencies || {}),
            };
            const envPropertiesTemplatePath = this.templatePath('.env.properties');
            this.fs.copyTpl(envPropertiesTemplatePath, this.destinationPath('projects/.env'), {
                consulConnection,
                consulHost,
                consulPort,
                consulToken,
            });
            if (devEnv) {
                this.fs.copyTpl(envPropertiesTemplatePath, this.destinationPath('projects/.env.dev'), {
                    devEnvUrl,
                    devEnvConsulHost,
                    devEnvConsulPort,
                    devEnvConsulToken,
                });
            }
            if (preEnv) {
                this.fs.copyTpl(envPropertiesTemplatePath, this.destinationPath('projects/.env.pre'), {
                    preEnvUrl,
                    preEnvConsulHost,
                    preEnvConsulPort,
                    preEnvConsulToken,
                });
            }
        }
        const tsConfig = this.fs.readJSON(this.templatePath('tsconfig.json'));
        const destPathTsConfig = this.destinationPath('projects/tsconfig.json');
        this.fs.writeJSON(destPathTsConfig, tsConfig);
        const destPackageJsonPath = this.destinationPath('projects/package.json');
        this.fs.writeJSON(destPackageJsonPath, packageJson);
    }
}
exports.default = default_1;
