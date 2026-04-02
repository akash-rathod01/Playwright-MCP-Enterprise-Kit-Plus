
/**
 * Jira Issue Reporter
 * Automatically creates Jira issues from Playwright test failures
 */

import JiraApi from 'jira-client';
import { parseFailuresFromJunit } from '../common/parseJunit.js';

interface JiraConfig {
  host: string;
  email: string;
  token: string;
  projectKey: string;
}

/**
 * Validate and retrieve Jira configuration from environment
 */
function getJiraConfig(): JiraConfig {
  const host = process.env.JIRA_HOST;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY;

  if (!host || !email || !token || !projectKey) {
    throw new Error(
      'Missing required Jira environment variables.\n' +
      'Please set: JIRA_HOST, JIRA_EMAIL, JIRA_TOKEN, JIRA_PROJECT_KEY'
    );
  }

  return { host, email, token, projectKey };
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('[Jira Reporter] Starting Jira issue creation from test failures...');
  
  try {
    const config = getJiraConfig();
    
    const jira = new JiraApi({
      protocol: 'https',
      host: config.host.replace('https://', '').replace('http://', ''),
      username: config.email,
      password: config.token,
      apiVersion: '3',
      strictSSL: true
    });
    
    console.log('[Jira Reporter] Parsing JUnit results...');
    const failures = await parseFailuresFromJunit('reports/junit.xml');
    
    if (failures.length === 0) {
      console.log('[Jira Reporter] No test failures found. Exiting.');
      return;
    }
    
    console.log(`[Jira Reporter] Creating ${failures.length} Jira issue(s)...`);
    
    for (const failure of failures) {
      const summary = `[AUTOMATION] Test failed: ${failure.name}`;
      const description = `h2. Playwright Test Failure

` +
        `*Test Name*: ${failure.name}\n\n` +
        `*Error Message*:\n{code}\n${failure.message}\n{code}\n\n` +
        `*Additional Information*:\n` +
        `- Generated automatically from CI/CD pipeline\n` +
        `- Check Playwright HTML Report for detailed traces\n` +
        `- Check Allure Report for comprehensive analytics\n\n` +
        `*Next Steps*:\n` +
        `# Review the test failure\n` +
        `# Reproduce locally if needed\n` +
        `# Fix the issue or update the test\n` +
        `# Close this issue once resolved`;
      
      try {
        const issue = await jira.addNewIssue({
          fields: {
            project: { key: config.projectKey },
            summary,
            description,
            issuetype: { name: 'Bug' },
            labels: ['automation', 'playwright', 'test-failure'],
            priority: { name: 'Medium' }
          }
        });
        
        console.log(`[Jira Reporter] ✓ Created issue ${issue.key}: ${summary}`);
      } catch (error) {
        console.error(`[Jira Reporter] ✗ Failed to create issue for "${failure.name}":`, error);
      }
    }
    
    console.log('[Jira Reporter] Completed successfully!');
  } catch (error) {
    console.error('[Jira Reporter] Fatal error:', error);
    throw error;
  }
}

main().catch((error) => {
  console.error('[Jira Reporter] Execution failed:', error);
  process.exit(1);
});
