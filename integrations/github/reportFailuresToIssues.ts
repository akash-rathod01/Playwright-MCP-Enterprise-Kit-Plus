
/**
 * GitHub Issue Reporter
 * Automatically creates GitHub issues from Playwright test failures
 */

import { Octokit } from '@octokit/rest';
import { parseFailuresFromJunit } from '../common/parseJunit.js';

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

/**
 * Validate and retrieve GitHub configuration from environment
 */
function getGitHubConfig(): GitHubConfig {
  const token = process.env.GH_TOKEN;
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO;

  if (!token || !owner || !repo) {
    throw new Error(
      'Missing required GitHub environment variables.\n' +
      'Please set: GH_TOKEN, GH_OWNER, GH_REPO'
    );
  }

  return { token, owner, repo };
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('[GitHub Reporter] Starting GitHub issue creation from test failures...');
  
  try {
    const config = getGitHubConfig();
    const octokit = new Octokit({ auth: config.token });
    
    console.log(`[GitHub Reporter] Parsing JUnit results...`);
    const failures = await parseFailuresFromJunit('reports/junit.xml');
    
    if (failures.length === 0) {
      console.log('[GitHub Reporter] No test failures found. Exiting.');
      return;
    }
    
    console.log(`[GitHub Reporter] Creating ${failures.length} GitHub issue(s)...`);
    
    for (const failure of failures) {
      const title = `[AUTOMATION] Test failed: ${failure.name}`;
      const body = `## Playwright Test Failure

**Test Name**: ${failure.name}

**Error Message**:
\`\`\`
${failure.message}
\`\`\`

**Additional Information**:
- Generated automatically from CI/CD pipeline
- Check [Playwright HTML Report](../playwright-report) for detailed traces
- Check [Allure Report](../allure-report) for comprehensive analytics

**Next Steps**:
1. Review the test failure
2. Reproduce locally if needed
3. Fix the issue or update the test
4. Close this issue once resolved`;
      
      try {
        const issue = await octokit.issues.create({
          owner: config.owner,
          repo: config.repo,
          title,
          body,
          labels: ['automation', 'playwright', 'bug', 'test-failure']
        });
        
        console.log(`[GitHub Reporter] ✓ Created issue #${issue.data.number}: ${title}`);
      } catch (error) {
        console.error(`[GitHub Reporter] ✗ Failed to create issue for "${failure.name}":`, error);
      }
    }
    
    console.log('[GitHub Reporter] Completed successfully!');
  } catch (error) {
    console.error('[GitHub Reporter] Fatal error:', error);
    throw error;
  }
}

main().catch((error) => {
  console.error('[GitHub Reporter] Execution failed:', error);
  process.exit(1);
});
