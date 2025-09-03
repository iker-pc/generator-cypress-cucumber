import Generator from "yeoman-generator";

const generateTestDefinitions = (generator: Generator): any => {

    generator.fs.copy(
        generator.templatePath('test-definitions/test.auto.feature'),
        generator.destinationPath('projects/test-definitions/test.auto.feature')
    );

}

export default generateTestDefinitions;