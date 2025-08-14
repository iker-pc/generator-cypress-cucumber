import Generator, { PromptAnswers } from 'yeoman-generator';
import { nameQuestion } from './const/questions/name';
import { descriptionConfirmQuestion } from './const/questions/descriptionConfirm';
import { descriptionQuestion } from './const/questions/description';
import { baseUrlQuestion } from './const/questions/baseUrl';
import { consulConnectionQuestion } from './const/questions/consulConnection';
import { consulHostQuestion } from './const/questions/consulHost';
import { envConfirmQuestion } from './const/questions/envConfirmQuestion';
import { envUrlQuestion } from './const/questions/envUrlQuestion';

// Generator lifecycle's utils
import generateConsulConfiguration from './lifecycles/writing/consul/consulConfiguration';
import generateTestDefinitions from './lifecycles/writing/test-definitions/testDefinitions';
import generateCypressBaseCode from './lifecycles/writing/cypress/generateCypressBaseCode';

export default class MyGenerator extends Generator {
    
  private answers: PromptAnswers | null = null;

  async prompting() {
      this.answers = await this.prompt([
          nameQuestion,
          descriptionConfirmQuestion,
          {
            ...descriptionQuestion,
            when: (answers) => answers.descriptionConfirm,
          },
          baseUrlQuestion,
          consulConnectionQuestion,
          {
            ...consulHostQuestion('prod'),
            when: (answers) => answers.consulConnection,
          },
          envConfirmQuestion('dev'),
          {
            ...envUrlQuestion('dev'),
            when: (answers) => answers.devEnv,
          },
          {
            ...consulHostQuestion('dev'),
            when: (answers) => answers.devEnv && answers.consulConnection,
          },
          envConfirmQuestion('pre'),
          {
            ...envUrlQuestion('pre'),
            when: (answers) => answers.preEnv,
          },
          {
            ...consulHostQuestion('pre'),
            when: (answers) => answers.preEnv && answers.consulConnection,
          },
      ]);
    }

    writing() {
      if(!this.answers) {
        return;
      }
      const { 
        name, 
        description, 
        baseUrl, 
        consulConnection, 
        consulHost, 
        consulPort, 
        consulToken, 
        devEnv, 
        devEnvUrl, 
        devEnvConsulHost,
        devEnvConsulPort,
        devEnvConsulToken,
        preEnv, 
        preEnvUrl,
        preEnvConsulHost,
        preEnvConsulPort,
        preEnvConsulToken,
      } = this.answers;
      
      const basePackageJson = this.fs.readJSON(this.templatePath('package.json'));
      const packageJson = {
        ...basePackageJson,
        name,
        ...(description && { description }),
      }

      if(consulConnection) {
            generateConsulConfiguration(
            this, 
            basePackageJson, 
            {
            production: {
                consulHost,
                consulPort,
                consulToken,
            },
            ...(devEnv && {
                development: {
                    consulHost: devEnvConsulHost,
                    consulPort: devEnvConsulPort,
                    consulToken: devEnvConsulToken,
                }
            }),
            ...(preEnv && {
                staging: {
                    consulHost: preEnvConsulHost,
                    consulPort: preEnvConsulPort,
                    consulToken: preEnvConsulToken,
                }
            }),
          }
        )
      }

      this.fs.copyTpl(
        this.templatePath('cypress.config.common.ts.ejs'),
        this.destinationPath('projects/cypress.config.common.ts'),
        {
          baseUrl,
        }
      );

      const tsConfig = this.fs.readJSON(this.templatePath('tsconfig.json'));
      const destPathTsConfig = this.destinationPath('projects/tsconfig.json');
      this.fs.writeJSON(destPathTsConfig, tsConfig);
      
      const destPackageJsonPath = this.destinationPath('projects/package.json');
      this.fs.writeJSON(destPackageJsonPath, packageJson);

      generateTestDefinitions(this);
      generateCypressBaseCode(this);
    }

    install() {
      	this.spawnSync('npm', ['install'], {
          	cwd: this.destinationPath('projects'),
          	stdio: 'inherit'
      	});
    }
} 