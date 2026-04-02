
/**
 * Playwright MCP Enterprise Server
 * Model Context Protocol server for Playwright test automation
 * Provides tools for test execution, reporting, and integration
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { runPlaywright } from './tools/runPlaywright.js';
import type { ServerConfig, TestExecutionOptions } from './types.js';

const SERVER_CONFIG: ServerConfig = {
  name: 'playwright-mcp-enterprise-kit-plus',
  version: '1.1.0',
  description: 'Enterprise Playwright MCP Server with advanced test execution and reporting'
};

/**
 * Initialize and start the MCP server
 */
async function main() {
  console.log(`[MCP Server] Starting ${SERVER_CONFIG.name} v${SERVER_CONFIG.version}`);
  
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version
  });

  // ========== TOOL 1: Run Playwright Tests ==========
  server.registerTool(
    'run_playwright_tests',
    {
      title: 'Run Playwright Tests',
      description: 'Execute Playwright tests with comprehensive options for filtering, configuration, and reporting. Returns detailed execution results including pass/fail counts and output.',
      inputSchema: {
        pattern: z.string().optional().describe('Test file pattern or path (e.g., "tests/smoke/**" or "homepage.spec.ts")'),
        project: z.string().optional().describe('Project name to run (e.g., "chromium", "firefox", "webkit")'),
        grep: z.string().optional().describe('Run tests matching this grep pattern in test names'),
        workers: z.number().optional().describe('Number of parallel workers (default: auto)'),
        headed: z.boolean().optional().describe('Run tests in headed mode (visible browser)'),
        debug: z.boolean().optional().describe('Run tests in debug mode with Playwright Inspector'),
        reporter: z.string().optional().describe('Reporter to use (e.g., "list", "dot", "html", "json")'),
        timeout: z.number().optional().describe('Timeout for each test in milliseconds')
      },
      outputSchema: {
        exitCode: z.number(),
        output: z.string(),
        success: z.boolean(),
        timestamp: z.string(),
        duration: z.number(),
        summary: z.object({
          total: z.number(),
          passed: z.number(),
          failed: z.number(),
          skipped: z.number(),
          flaky: z.number()
        }).optional()
      }
    },
    async (input) => {
      const options: TestExecutionOptions = {
        pattern: input.pattern,
        project: input.project,
        grep: input.grep,
        workers: input.workers,
        headed: input.headed,
        debug: input.debug,
        reporter: input.reporter,
        timeout: input.timeout
      };

      console.log('[MCP Server] Executing Playwright tests with options:', JSON.stringify(options, null, 2));
      
      const result = await runPlaywright(options);
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ========== TOOL 2: Run Quick Smoke Tests ==========
  server.registerTool(
    'run_smoke_tests',
    {
      title: 'Run Smoke Tests',
      description: 'Execute quick smoke tests for rapid validation. Runs tests in parallel with minimal configuration.',
      inputSchema: {},
      outputSchema: {
        exitCode: z.number(),
        output: z.string(),
        success: z.boolean()
      }
    },
    async () => {
      console.log('[MCP Server] Running smoke tests');
      
      const result = await runPlaywright({
        pattern: 'tests/smoke/**',
        workers: 3,
        reporter: 'list'
      });
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            exitCode: result.exitCode,
            output: result.output,
            success: result.success,
            summary: result.summary
          }, null, 2)
        }]
      };
    }
  );

  // ========== TOOL 3: Get Test Configuration ==========
  server.registerTool(
    'get_test_config',
    {
      title: 'Get Test Configuration',
      description: 'Retrieve current Playwright configuration and environment settings',
      inputSchema: {},
      outputSchema: {
        config: z.object({
          baseURL: z.string().optional(),
          testDir: z.string(),
          timeout: z.number(),
          workers: z.string(),
          projects: z.array(z.string())
        })
      }
    },
    async () => {
      const config = {
        baseURL: process.env.BASE_URL || 'https://example.com',
        testDir: './src/tests',
        timeout: 60000,
        workers: process.env.CI ? '1' : 'auto',
        projects: ['chromium', 'firefox', 'webkit']
      };
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ config }, null, 2)
        }]
      };
    }
  );

  // Connect server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.log('[MCP Server] Server connected and ready to receive requests');
  console.log('[MCP Server] Available tools:');
  console.log('  - run_playwright_tests: Execute tests with comprehensive options');
  console.log('  - run_smoke_tests: Quick smoke test execution');
  console.log('  - get_test_config: Retrieve configuration information');
}

// Start the server
main().catch((error) => {
  console.error('[MCP Server] Fatal error:', error);
  process.exit(1);
});

