import { CustomPrompQuestion } from "../../types/CustomPrompQuestion";

const consulConnectionQuestion: CustomPrompQuestion =    {
    type: "confirm",
    name: "consulConnection",
    message: "Do you want to add a consul connection to your project?",
}

export { consulConnectionQuestion };