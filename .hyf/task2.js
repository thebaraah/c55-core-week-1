import fs from 'fs/promises';

const readGithubUsername = async () => {
  try {

    const content = await fs.readFile('../task-2/github-username.txt', 'utf-8');
    return content.trim();
  } catch (error) {
    console.log('❌ Error reading github-username.txt:', error.message);
    return null;
  }
};

const fetchGithubProfile = async (username) => {
  const readmeUrl = `https://raw.githubusercontent.com/${username}/${username}/main/README.md`;
  console.log('▶️ Downloading profile README from:', readmeUrl);

  try {
    const response = await fetch(readmeUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.log('❌ Failed to download profile README:', error.message);
    return null;
  }
};

export const task2 = async () => {
  let score = 0;
  let maxScore = 30;

  // Read the GitHub username
  const username = await readGithubUsername();

  if (!username) {
    console.log('❌ No username found in file');
    return score;
  }

  console.log('Your GitHub username:', username);

  const profileContent = (await fetchGithubProfile(username)) ?? "";

  // Check if profile contains GitHub top languages widget (10 points)
  maxScore += 10;
  const expectedStatsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}`;
  if (profileContent.includes(expectedStatsUrl)) {
    console.log('✅ Profile contains GitHub top languages widget');
    score += 10;
  } else {
    console.log('❌ Profile does not contain GitHub top languages widget');
  }


  // Check if profile contains GitHub top languages widget (10 points)
  maxScore += 10;
  const expectedStreaksUrl = `https://streak-stats.demolab.com?user=${username}`;
  if (profileContent.includes(expectedStreaksUrl)) {
    console.log('✅ Profile contains GitHub streaks widget');
    score += 10;
  } else {
    console.log('❌ Profile does not contain GitHub streaks widget');
  }

  // Check if profile contains GitHub top languages widget (10 points)
  maxScore += 10;
  const expectedTitleUrl = `https://readme-typing-svg.demolab.com`;
  if (profileContent.includes(expectedTitleUrl)) {
    console.log('✅ Profile contains an animated title');
    score += 10;
  } else {
    console.log('❌ Profile does not contain an animated title');
  }

  return Math.round((score / maxScore) * 100);
}

