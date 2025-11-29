/**
 * Script to generate the environment file used by Angular.
 * This script should be executed as a step prior to building the application (build step).
 *
 * If the .env file does not exist in the project root, it will be created with default
 * variables described in the defaultEnvVariables constant.
 *
 * Author: @rolivencia
 */

import { writeFileSync, existsSync, mkdirSync, writeFile } from 'fs';
import ErrnoException = NodeJS.ErrnoException;
import { join } from 'node:path';

// Constants for generating the environment file
export type EnvironmentType = 'development' | 'production';
const environment: EnvironmentType = (process.env['NODE_ENV'] as EnvironmentType) ?? 'development';
const dirPath = `src/environments`;
const targetPath = `${dirPath}/environment.ts`;

const defaultEnvVariables = {
  CLARITY_PROJECT_ID: '',
};

// Creates a .env file with default variables if it doesn't exist
function createEnvFile() {
  const envFilePath = join(process.cwd(), '.env');
  if (existsSync(envFilePath)) {
    console.log('.env file already exists, skipping creation step.');
    return;
  }

  const fileContents = Object.entries(defaultEnvVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  writeFileSync(envFilePath, fileContents);
  console.log('.env file created with default variables.');
}

if (environment === 'development') {
  createEnvFile();
}

// Access environment variables and generate a string
// corresponding to the environment object that Angular will use
const exportedEnvironment = {
  production: environment === 'production',
  clarityProjectId: '',
};

// Check if the environment variable for Microsoft Clarity analytics exists
if (process.env['CLARITY_PROJECT_ID']) {
  exportedEnvironment.clarityProjectId = `${process.env['CLARITY_PROJECT_ID']}`;
}

const environmentFileContent = `
export interface Environment {
  production: boolean;
  clarityProjectId: string;
}

export const environment: Environment = ${JSON.stringify(exportedEnvironment, null, 2)};
`;

// Create the environments directory if it doesn't exist
if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

// Write the content to the corresponding environment.ts file
writeFile(targetPath, environmentFileContent, { flag: 'w' }, function (err: ErrnoException | null) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Environment variables written to ${targetPath}`);
  console.log('Environment:', environment);
  console.log('Production:', exportedEnvironment.production);
  console.log('Clarity Project ID:', exportedEnvironment.clarityProjectId || '(not set)');
});
