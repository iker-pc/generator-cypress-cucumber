import { PromptQuestion } from "yeoman-generator/dist/questions";

export type CustomPrompQuestion = {
    name: 'name' 
    | 'descriptionConfirm'
    | 'description' 
    | 'baseUrl' 
    | 'consulConnection'
    | 'consulHost' 
    | 'consulPort'
    | 'consulToken' 
    | 'mySqlConnection'
    | 'devEnv'
    | 'devEnvUrl' 
    | 'devEnvConsulHost' 
    | 'devEnvConsulPort' 
    | 'devEnvConsulToken' 
    | 'preEnv' 
    | 'preEnvUrl'
    | 'preEnvConsulHost' 
    | 'preEnvConsulPort' 
    | 'preEnvConsulToken';
} & PromptQuestion;