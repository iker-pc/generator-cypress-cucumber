
import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const getQuestionNameByEnv = (env: 'prod' | 'dev' | 'pre'): 'consulHost' | 'preEnvConsulHost' | 'devEnvConsulHost' => {
    switch(env) {
        case 'pre':
            return 'preEnvConsulHost';
        case 'dev':
            return 'devEnvConsulHost';
        default:
            return 'consulHost';
    }
}

const consulHostQuestion = (env: 'prod' | 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "input",
    name: getQuestionNameByEnv(env),
    message: env === 'prod' ? "What's is the consul host of your project?" : `What's is the ${env} environment consul host of your project?`,
})

export { consulHostQuestion };