import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const getQuestionNameByEnv = (env: 'dev' | 'pre'): 'devEnv' | 'preEnv' => {
    if(env === 'dev') { 
        return 'devEnv';
    }
    return 'preEnv';
}
const envConfirmQuestion = (env: 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "confirm",
    name: getQuestionNameByEnv(env),
    message: `Do you want to add a ${env} environment to your project?`,
})

export { envConfirmQuestion };
