import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const nameQuestion: CustomPrompQuestion = {
    type: "input",
    name: "name",
    message: "What's is the name of your project?",
    required: true,
}

export { nameQuestion };
