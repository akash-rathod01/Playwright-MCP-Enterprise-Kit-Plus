# MCP Server Usage Guide

## Overview
The Playwright MCP Enterprise Server provides a Model Context Protocol interface for executing Playwright tests and accessing test automation features programmatically.

## Starting the MCP Server

Start the server using npm:
```bash
npm run mcp:server
```

The server will:
- Listen on stdio for MCP client connections
- Register multiple tools for test execution
- Provide detailed logging and error handling

## Available Tools

### 1. run_playwright_tests
Execute Playwright tests with comprehensive configuration options.

**Parameters:**
- `pattern` (optional): Test file pattern (e.g., "tests/smoke/**" or "homepage.spec.ts")
- `project` (optional): Browser project ("chromium", "firefox", "webkit")
- `grep` (optional): Filter tests by name pattern
- `workers` (optional): Number of parallel workers
- `headed` (optional): Run in headed mode (visible browser)
- `debug` (optional): Run with Playwright Inspector
- `reporter` (optional): Reporter type ("list", "dot", "html", "json")
- `timeout` (optional): Timeout per test in milliseconds

**Example:**
```json
{
  "pattern": "tests/smoke/**",
  "project": "chromium",
  "workers": 3,
  "reporter": "list"
}
```

### 2. run_smoke_tests
Execute quick smoke tests for rapid validation.

**Parameters:** None

### 3. get_test_config
Retrieve current Playwright configuration and environment settings.

**Parameters:** None

## Using with Claude Desktop or MCP Clients

### 1. Configure in Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "playwright-enterprise": {
      "command": "npm",
      "args": ["run", "mcp:server"],
      "cwd": "d:\\Plywright_MCP Server_Project\\playwright-mcp-enterprise-kit-plus",
      "env": {
        "BASE_URL": "https://your-app.com"
      }
    }
  }
}
```

### 2. Using npm Commands

#### Start MCP Server
```bash
npm run mcp:server
```

#### Run All Tests (Standard)
```bash
npm test
```

#### Run Tests with UI Mode
```bash
npm run test:ui
```

#### Run Specific Test Suites via MCP
When the MCP server is running, you can send tool requests like:

**Run smoke tests:**
```bash
# The MCP client would send:
{
  "tool": "run_smoke_tests",
  "params": {}
}
```

**Run smoke tests:**
```bash
# The MCP client would send:
{
  "tool": "run_smoke_tests"
}
```

**Run specific tests with options:**
```bash
# The MCP client would send:
{
  "tool": "run_playwright_tests",
  "params": {
    "pattern": "src/tests/**/*.spec.ts",
    "project": "chromium",
    "workers": 2,
    "headed": false
  }
}
```

## Environment Variables

Required for test execution:
- `BASE_URL`: Application base URL for testing

Required for GitHub integration:
- `GH_TOKEN`: GitHub personal access token
- `GH_OWNER`: GitHub repository owner
- `GH_REPO`: GitHub repository name

Required for Jira integration:
- `JIRA_HOST`: Jira instance URL
- `JIRA_EMAIL`: Jira user email
- `JIRA_TOKEN`: Jira API token
- `JIRA_PROJECT_KEY`: Jira project key

Optional:
- `BASE_URL`: Base URL for tests (default: https://example.com)
- `CI`: Set to 'true' in CI environments for optimized settings

## Testing the MCP Server

### Manual Test via Command Line
```bash
# Start the server
npm run mcp:server

# In another terminal, you can interact via stdio
# Or use an MCP client library
```

### Test with MCP Inspector (if available)
```bash
npx @modelcontextprotocol/inspector npm run mcp:server
```

## Response Format

All tools return structured responses with:
- `exitCode`: Process exit code (0 = success)
- `output`: Full console output from test execution
- `success`: Boolean indicating overall success
- `timestamp`: ISO 8601 timestamp
- `duration`: Execution time in milliseconds
- `summary`: Test result summary (passed, failed, skipped, flaky counts)

Example response:
```json
{
  "exitCode": 0,
  "output": "Running 5 tests...\n...",
  "success": true,
  "timestamp": "2026-04-02T10:30:00.000Z",
  "duration": 15234,
  "summary": {
    "total": 5,
    "passed": 5,
    "failed": 0,
    "skipped": 0,
    "flaky": 0
  }
}
```

## Reporting

After test execution, view reports:
```bash
# Playwright HTML Report
npm run test:report

# Generate Allure Report
npm run allure:generate

# Open Allure Report
npm run allure:open
```

## Troubleshooting

### Server won't start
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (16+ required)
- Verify TypeScript compilation: `npx tsc --noEmit`

### Tests fail immediately
- Check environment variables are set correctly
- Verify network connectivity
- Check Playwright browsers are installed: `npm run prepare`

### MCP client can't connect
- Ensure the server is running
- Check the working directory path is correct
- Verify stdio communication is not blocked

## Best Practices

1. **Use specific patterns** to run targeted tests
2. **Set appropriate workers** based on available resources
3. **Use headed mode** for debugging failing tests
4. **Enable debug mode** with Playwright Inspector for step-by-step execution
5. **Check reports** after failed runs for detailed trace information
