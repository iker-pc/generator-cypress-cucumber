import Generator from "yeoman-generator";

const generateTestDefinitions = (generator: Generator, consulConnection: boolean): any => {

    generator.fs.copy(
        generator.templatePath('test-definitions/test.auto.feature'),
        generator.destinationPath('projects/test-definitions/test.auto.feature')
    );

    if(consulConnection) {
        generator.fs.copy(
            generator.templatePath('test-definitions/consul.auto.feature'),
            generator.destinationPath('projects/test-definitions/consul.auto.feature')
        );
    }

}

export default generateTestDefinitions;