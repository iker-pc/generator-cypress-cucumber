# Generator Cypress Cucumber

A Yeoman generator that scaffolds an end-to-end testing project using Cypress with Cucumber-style Gherkin syntax. It sets up a clean testing environment with predefined folder structure, step definitions, example feature files, and basic configuration.

## 📋 Features

- ✅ Automatic Cypress project structure generation
- ✅ Gherkin/Cucumber syntax support
- ✅ Multi-environment configuration (development, pre-production, production)
- ✅ Optional Consul integration (for each environment)
- ✅ TypeScript configuration files
- ✅ Organized folder structure for test definitions
- ✅ Example feature files and step definitions

## 🚀 Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Generator Installation

```bash
npm install
```
## 📖 Usage

### Generate a New Project

Run the generator with Yeoman:

```bash
npm run generate
```
The generator will ask you a series of questions:

1. **Project name**: Name for your testing project
2. **Description**: Project description (optional)
3. **Base URL**: Base URL for the production environment
4. **Consul connection**: Whether you want to configure a Consul connection. If you choose to enable it, you will be asked for the Consul host, port, and token.
6. **Additional environments**: Option to configure development and pre-production environments. If you choose to add a development or pre-production environment, you will be asked for the host, port, and access token of the Consul instance associated with that environment.

### Generated Structure

The generator creates the following structure in the `projects/` folder:

```
projects/
├── cypress/
│   ├── e2e/
│   │   └── test/
│   │       └── test.ts          # Step definitions
│   ├── support/
│   │   ├── commands/
│   │   │   └── test.ts          # Custom commands
│   │   ├── commands.ts          # Commands export
│   │   └── e2e.ts               # Support configuration
│   └── fixtures/                # Test data
├── test-definitions/
│   └── test.auto.feature        # Gherkin feature files that describes user cases
├── cypress.config.common.ts     # Common configuration
├── cypress.config.prod.ts       # Production configuration file
├── cypress.config.dev.ts        # Development configuration file (If dev environment is configured)
├── cypress.config.pre.ts        # Pre-production configuration file (If pre-production environment is configured)
├── package.json                 # Project dependencies
├── .env                         # Enviromental variables for the production testing environment
├── .env.dev                     # Enviromental variables for the development testing environment (If exists)
├── .env.pre                     # Enviromental variables for the pre-production testing environment (If exists)
└── tsconfig.json                # TypeScript configuration

```

### Generated Project Scripts

Once the project is generated, in the `projects/` folder you can use:

- `npm run cy:open`: Opens Cypress in interactive mode (production)
- `npm run cy:open:devel`: Opens Cypress for development environment (If development environment is configured)
- `npm run cy:open:pre`: Opens Cypress for pre-production environment (If pre-production environment is configured)

## 📦 Main Dependencies

### Generator
- `yeoman-generator`: Framework for creating generators
- `typescript`: Programming language

### Generated Project
- `cypress`: End-to-end testing framework
- `@badeball/cypress-cucumber-preprocessor`: Cucumber preprocessor for Cypress
- `@bahmutov/cypress-esbuild-preprocessor`: ESBuild preprocessor for Cypress
- `@faker-js/faker`: Test data generation
- `dotenv-cli`: Environment variables management

## 🔧 Configuration

### Environment Variables

The generator creates `.env` properties files for each environment:
- `.env` (production)
- `.env.dev` (development)
- `.env.pre` (pre-production)

These files contain:
- Environment URLs
- Consul configuration (if enabled)

### Cypress Configuration

Each environment has its own configuration file:
- `cypress.config.prod.ts`
- `cypress.config.dev.ts`
- `cypress.config.pre.ts`

All extend from `cypress.config.common.ts` which contains the shared configuration.

## 📝 Feature File Example

The generator includes an example feature file:

```gherkin
Feature: Just a test definition

Scenario: Testing...
    Given User navigates to base url
    Then Everything is ok
```

## 🔌 Consul Integration

If you enable Consul integration during generation, the project will include:

- Consul connection configuration for each environment
- `ConsulManager` class to manage the connection
- Environment variables for Consul host, port, and token

## 🏗️ Development

### Source Code Structure

```
src/
├── const/
│   └── questions/          # Generator questions
├── lifecycles/
│   └── writing/            # File generation logic
│       ├── consul/         # Consul configuration generation
│       ├── cypress/        # Cypress code generation
│       ├── env-files/      # .env files generation
│       └── test-definitions/ # Feature files generation
├── types/                  # TypeScript type definitions
└── index.ts                # Generator entry point
```


## 📞 Support

If you have questions or encounter any issues, please open an issue in the repository.
