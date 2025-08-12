"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfirmQuestion = void 0;
const getQuestionNameByEnv = (env) => {
    if (env === 'dev') {
        return 'devEnv';
    }
    return 'preEnv';
};
const envConfirmQuestion = (env) => ({
    type: "confirm",
    name: getQuestionNameByEnv(env),
    message: `Do you want to add a ${env} environment to your project?`,
});
exports.envConfirmQuestion = envConfirmQuestion;
