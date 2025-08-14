import Generator from "yeoman-generator";

const generateTestDefinitions = (generator: Generator): any => {

    generator.fs.copy(
        generator.templatePath('test-definitions/test.feature'),
        generator.destinationPath('projects/test-definitions/test.feature')
    );

}

export default generateTestDefinitions;