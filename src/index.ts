import Generator, { PromptAnswers } from 'yeoman-generator';
import { nameQuestion } from './const/questions/name';
import { descriptionConfirmQuestion } from './const/questions/descriptionConfirm';
import { descriptionQuestion } from './const/questions/description';
import { baseUrlQuestion } from './const/questions/baseUrl';
import { consulConnectionQuestion } from './const/questions/consulConnection';
import { consulHostQuestion } from './const/questions/consulHost';
import { envConfirmQuestion } from './const/questions/envConfirmQuestion';
import { envUrlQuestion } from './const/questions/envUrlQuestion';

export default class extends Generator {
    
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
        packageJson.dependencies = {
          "consul": "^2.0.1",
          ...(basePackageJson.dependencies || {}),
        }

        const envPropertiesTemplatePath = this.templatePath('.env.properties');
        this.fs.copyTpl(
          envPropertiesTemplatePath,
          this.destinationPath('projects/.env'),
          {
            consulConnection,
            consulHost,
            consulPort,
            consulToken,
          }
        );
        if(devEnv) {
          this.fs.copyTpl(
            envPropertiesTemplatePath,
            this.destinationPath('projects/.env.dev'),
            {
              devEnvUrl,
              devEnvConsulHost,
              devEnvConsulPort,
              devEnvConsulToken,
            }
          );
        }
        if(preEnv) {
          this.fs.copyTpl(
            envPropertiesTemplatePath,
            this.destinationPath('projects/.env.pre'),
            {
              preEnvUrl,
              preEnvConsulHost,
              preEnvConsulPort,
              preEnvConsulToken,
            }
          );
        }
      }

      const tsConfig = this.fs.readJSON(this.templatePath('tsconfig.json'));
      const destPathTsConfig = this.destinationPath('projects/tsconfig.json');
      this.fs.writeJSON(destPathTsConfig, tsConfig);
      
      const destPackageJsonPath = this.destinationPath('projects/package.json');
      this.fs.writeJSON(destPackageJsonPath, packageJson);

    }

} 