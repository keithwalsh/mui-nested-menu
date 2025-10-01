#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

try {
  // Read package.json to get current version
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  // Read package.template.json
  const templatePath = path.join(__dirname, '..', 'package.template.json');
  const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

  // Update version in template
  template.version = version;

  // Write back to package.template.json
  fs.writeFileSync(templatePath, JSON.stringify(template, null, 2) + '\n');

  console.log(`Updated package.template.json version to ${version}`);
} catch (error) {
  console.error('Error updating template version:', error.message);
  process.exit(1);
}

