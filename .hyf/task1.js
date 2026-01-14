import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const setup = async () => {
  await fs.rm('project', { recursive: true, force: true });
  await execPromise('git config --global user.name "Tester"');
  await execPromise('git config --global user.email "tester@example.com"');
}

const checkPath = async (filePath, shouldExist) => {
  let score = 0;
  try {
    await fs.access(filePath);
    let icon = shouldExist ? "✅" : "❌";
    if (shouldExist) {
      score = 2;
    }
    console.log(`${icon} Path exists:`, filePath);
  } catch {
    let icon = shouldExist ? "❌" : "✅";
    if (!shouldExist) {
      score = 2;
    }
    console.log(`${icon} Path does not exist:`, filePath);
  }
  return score;
}

const checkFileContent = async (filePath, expectedContent) => {
  let score = 0;
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    if (content.trim() === expectedContent.trim()) {
      score += 3;
      console.log(`✅ File content is correct:`, filePath);
    } else {
      console.log(`❌ File content does not match:`, filePath);
      console.log(`Expected: "${expectedContent.trim()}"`);
      console.log(`Found:    "${content.trim()}"`);
    }
  } catch (error) {
    console.log(`❌ Error reading file:`, filePath);
  }
  return score;
}

const checkStringInOutput = (output, pattern) => {
  let score = 0;
  const regex = new RegExp(pattern, 'i');
  if (regex.test(output)) {
    console.log(`✅ Output has: "${pattern}"`);
    score += 1;
  } else {
    console.log(`❌ Output does not have: "${pattern}"`);
  }
  return score;
}

const checkGitCommits = async () => {
  let score = 0;
  const workDir = 'project';
  try {
    // Check number of commits
    const { stdout: countOutput } = await execPromise('git rev-list --count HEAD', { cwd: workDir });
    const commitCount = Number.parseInt(countOutput.trim()) ?? 0;
    if (commitCount === 3) {
      console.log(`✅ Found 3 commits`);
    } else {
      console.log(`❌ Expected 3 commits, found ${commitCount}`);
    }
    score += Math.max(commitCount, 0) * 3;

    // Check first commit message
    const { stdout: firstCommitMsg } = await execPromise('git log --format=%s $(git rev-list --max-parents=0 HEAD)', { cwd: workDir });
    const message = firstCommitMsg.trim();

    if (message.toLowerCase() === 'initial commit') {
      console.log(`✅ First commit message is "initial commit"`);
      score += 1;
    } else {
      console.log(`❌ First commit message is "${message}", expected "initial commit"`);
    }
  } catch (error) {
    console.log(`❌ Error checking git commits:`, error.message);
  }
  return score;
}

export const task1 = async () => {
  // Setup
  let score = 0;
  let maxScore = 0;
  await setup();

  // Run
  console.error('▶️ Running setup.sh...');
  let output = null;
  const startTime = performance.now();
  try {
    let result = await execPromise('bash ../task-1/setup.sh');
    output = result.stdout;
    console.log(`✅ Successfully executed setup.sh.`);
  } catch (error) {
    console.error(`❌ Error executing setup.sh (Exit code ${error.code})`);
    output = error.stdout + error.stderr;
  }

  // check execution time (5 points)
  maxScore += 5;
  const executionTime = (performance.now() - startTime) / 1000;
  if (executionTime >= 6) {
    console.log(`✅ Script ran for at least 6 seconds`);
    score += 5;
  } else {
    console.log(`❌ Script ran for less than 6 seconds (${executionTime.toFixed(2)}s)`);
  }

  // Check paths (26 points)
  maxScore += 26;
  const expectedPaths = [
    'project',
    'project/README.md',
    'project/settings.conf',
    'project/resources',
    'project/resources/icon.png',
    'project/resources/logo.png',
    'project/src',
    'project/src/program.js',
    'project/src/database',
    'project/.git'
  ];
  const expectedPathsNotToExist = [
    'project/resources/family picture.jpg',
    'project/src/profile',
    'project/src/program.java',
  ];
  for (const path of expectedPaths) {
    score += await checkPath(path, true);
  }
  for (const path of expectedPathsNotToExist) {
    score += await checkPath(path, false);
  }

  // Check file contents (6 points)
  maxScore += 6;
  score += await checkFileContent('project/src/program.js', `console.log('JavaScript works!');`);
  score += await checkFileContent('project/README.md', `Welcome to my project`);

  // Check output content (6 points)
  maxScore += 6;
  score += checkStringInOutput(output, 'Creating project');
  score += checkStringInOutput(output, 'Setup project');
  score += checkStringInOutput(output, 'Setup JavaScript');
  score += checkStringInOutput(output, 'JavaScript works!');
  score += checkStringInOutput(output, 'icon.png');
  score += checkStringInOutput(output, 'All done!');

  // Check git commits (10 points)
  maxScore += 10;
  score += await checkGitCommits();

  return Math.round((score / maxScore) * 100);
};
