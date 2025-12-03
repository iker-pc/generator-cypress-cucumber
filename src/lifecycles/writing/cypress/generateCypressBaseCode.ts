import Generator from "yeoman-generator";
import { globbySync } from "globby";

const generateCypressBaseCode = (generator: Generator, devEnv: boolean, preEnv: boolean, consulConnection: boolean, mySqlConnection: boolean): any => {

    generator.fs.copyTpl(
        generator.templatePath('cypress.config.common.ts.ejs'),
        generator.destinationPath('projects/cypress.config.common.ts'),
        {
            consulConnection,
            mySqlConnection,
        }
    );

    generator.fs.copyTpl(
        generator.templatePath('cypress.config.prod.ts.ejs'),
        generator.destinationPath('projects/cypress.config.prod.ts'),
    );

    if (devEnv) {
        generator.fs.copyTpl(
            generator.templatePath('cypress.config.dev.ts.ejs'),
            generator.destinationPath('projects/cypress.config.dev.ts'),
        );
    }

    if (preEnv) {
        generator.fs.copyTpl(
            generator.templatePath('cypress.config.pre.ts.ejs'),
            generator.destinationPath('projects/cypress.config.pre.ts'),
        );
    }

    const cypressFiles = globbySync(generator.templatePath('cypress/**'));

    cypressFiles.forEach(file => {
        const relative = file.replace(generator.templatePath(), "");
        if(!relative.includes('consul') || 
            (consulConnection && relative.includes('consul'))) 
        {
            const target = relative.replace(/\.ts\.ejs$/, ".ts");
            generator.fs.copy(
                file, 
                generator.destinationPath(`projects/${target}`)
            );
        }
    });

}

export default generateCypressBaseCode;