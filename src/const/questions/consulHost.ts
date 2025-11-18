
import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const consulHostQuestion = (env: 'prod' | 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "input",
    name: env === 'prod' ? 'consulHost' : `${env}EnvConsulHost`,
    message: env === 'prod' ? "Insert the consul host of your project:" : `Insert the ${env} environment consul host of your project:`,
})

const consulPortQuestion = (env: 'prod' | 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "input",
    name: env === 'prod' ? 'consulPort' : `${env}EnvConsulPort`,
    message: env === 'prod' ? "Insert the consul port of your project:" : `Insert the ${env} environment consul port of your project:`,
})

const consulTokenQuestion = (env: 'prod' | 'dev' | 'pre'): CustomPrompQuestion => ({
    type: "input",
    name: env === 'prod' ? 'consulToken' : `${env}EnvConsulToken`,
    message: env === 'prod' ? "Insert the consul token of your project:" : `Insert the ${env} environment consul token of your project: `,
})

export { consulHostQuestion, consulPortQuestion, consulTokenQuestion };