import Generator from "yeoman-generator";

const generateConsulConfiguration = (
    generator: Generator, 
    basePackageJson: any, 
): any => {

  /**
   * Add the consul dependency to the package.json
   */
  basePackageJson.dependencies = {
      "consul": "^2.0.1",
      ...(basePackageJson.dependencies || {}),
  }

  const consulManagerTemplatePath = generator.templatePath('consul/ConsulManager.ts.ejs');

  generator.fs.copyTpl(
    consulManagerTemplatePath,
    generator.destinationPath('projects/consul/ConsulManager.ts')
  );

}

export default generateConsulConfiguration;