import Generator from "yeoman-generator";

const generateCypressBaseCode = (generator: Generator): any => {

    generator.fs.copy(
        generator.templatePath('cypress/**'),
        generator.destinationPath('projects/cypress')
    );

}

export default generateCypressBaseCode;