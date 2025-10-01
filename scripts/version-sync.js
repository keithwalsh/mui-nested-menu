#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the current published version from npm registry
  const currentVersion = execSync('npm view mui-nested-menu version', {
    encoding: 'utf8'
  }).trim();

  // Read package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update version
  packageJson.version = currentVersion;

  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');

  console.log(`Updated package.json version to ${currentVersion}`);
} catch (error) {
  console.error('Error syncing version:', error.message);
  // Don't fail if package doesn't exist on npm yet
  if (error.message.includes('404') || error.message.includes('Not Found')) {
    console.log('Package not found on npm registry. Keeping current version.');
    process.exit(0);
  }
  process.exit(1);
}

