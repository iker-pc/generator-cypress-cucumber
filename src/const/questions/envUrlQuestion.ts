import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const getQuestionNameByEnv = (env: 'dev' | 'pre'): 'devEnvUrl' | 'preEnvUrl' => {
    if(env === 'dev') {
        return 'devEnvUrl';
    }
    return 'preEnvUrl';
}

const envUrlQuestion = (env: 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "input",
    name: getQuestionNameByEnv(env),
    message: `What's is the ${env} environment URL of your project?`,
})

export { envUrlQuestion };