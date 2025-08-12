"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consulHostQuestion = void 0;
const getQuestionNameByEnv = (env) => {
    switch (env) {
        case 'pre':
            return 'preEnvConsulHost';
        case 'dev':
            return 'devEnvConsulHost';
        default:
            return 'consulHost';
    }
};
const consulHostQuestion = (env) => ({
    type: "input",
    name: getQuestionNameByEnv(env),
    message: env === 'prod' ? "What's is the consul host of your project?" : `What's is the ${env} environment consul host of your project?`,
});
exports.consulHostQuestion = consulHostQuestion;
