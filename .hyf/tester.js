import { task1 } from './task1.js';
import { task2 } from './task2.js';
import fs from 'fs/promises';

const main = async () => {
  console.log('======================= Task 1 =======================');
  const score1 = await task1();

  console.log('\n======================= Task 2 =======================');
  const score2 = await task2();

  console.log('\n======================= Summary =======================');
  const totalScore = Math.min(100, Math.round(score1 * 0.7 + score2 * 0.3));
  const passingScore = 50;
  console.log(`- Task 1 Score: ${score1}%`);
  console.log(`- Task 2 Score: ${score2}%`);
  console.log(`Total Score: ${totalScore}%`);
  console.log(`Min passing score: ${passingScore}%`);
  const results = {
    score: totalScore,
    pass: totalScore >= passingScore,
    passingScore: passingScore
  };

  await fs.writeFile('score.json', JSON.stringify(results, null, 2));
}

try {
  await main();
} catch (error) {
  console.error(`❌ Something went wrong:\n${error}`);
}
