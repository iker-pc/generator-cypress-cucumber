"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envUrlQuestion = void 0;
const getQuestionNameByEnv = (env) => {
    if (env === 'dev') {
        return 'devEnvUrl';
    }
    return 'preEnvUrl';
};
const envUrlQuestion = (env) => ({
    type: "input",
    name: getQuestionNameByEnv(env),
    message: `What's is the ${env} environment URL of your project?`,
});
exports.envUrlQuestion = envUrlQuestion;
