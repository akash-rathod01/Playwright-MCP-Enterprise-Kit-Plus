# Quick Start Guide - MCP Server Testing

## Test Directly via MCP Server

### Method 1: Using MCP Server with npm
```bash
# Start the MCP server in one terminal
npm run mcp:server
```

The MCP server will start and expose 4 main tools:
- `run_playwright_tests` - Full test execution with options
- `run_smoke_tests` - Quick smoke tests
- `run_workday_tests` - Workday-specific tests
- `get_test_config` - View configuration

### Method 2: Standard Playwright Execution
```bash
# Run all tests
npm test

# Run Workday smoke tests specifically
npx playwright test Workday/tests/smoke/ --project=chromium

# Run with UI mode for debugging
npm run test:ui
```

## Testing Your Current File

Your current file is: `homepage-smoke.spec.ts`

### Run it via standard Playwright:
```bash
npx playwright test Workday/tests/smoke/homepage-smoke.spec.ts
```

### Run it via MCP Server:
When the MCP server is running, send this tool request:
```json
{
  "tool": "run_playwright_tests",
  "params": {
    "pattern": "Workday/tests/smoke/homepage-smoke.spec.ts",
    "project": "chromium",
    "workers": 1,
    "headed": false
  }
}
```

## Configure Environment First

Before running tests, set up your environment:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Workday credentials:
# WORKDAY_URL=https://impl.workday.com/...
# WORKDAY_USERNAME=your-username
# WORKDAY_PASSWORD=your-password
```

## Example: Full Test Flow

```bash
# 1. Install dependencies (first time only)
npm install
npm run prepare

# 2. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 3. Run tests via MCP server
npm run mcp:server

# 4. Or run directly
npm test

# 5. View reports
npm run test:report              # Playwright HTML report
npm run allure:generate          # Generate Allure report
npm run allure:open              # Open Allure report
```

## MCP Server Tools Usage Examples

### Example 1: Run all smoke tests
```json
{
  "tool": "run_smoke_tests",
  "params": {}
}
```

### Example 2: Run Workday smoke tests only
```json
{
  "tool": "run_workday_tests",
  "params": {
    "smoke": true
  }
}
```

### Example 3: Run specific test with options
```json
{
  "tool": "run_playwright_tests",
  "params": {
    "pattern": "Workday/tests/smoke/homepage-smoke.spec.ts",
    "project": "chromium",
    "workers": 1,
    "headed": true,
    "timeout": 60000
  }
}
```

### Example 4: Debug mode with headed browser
```json
{
  "tool": "run_playwright_tests",
  "params": {
    "pattern": "Workday/tests/smoke/",
    "debug": true,
    "headed": true,
    "workers": 1
  }
}
```

## Integration with Claude Desktop

1. Add to your Claude Desktop config (`%APPDATA%/Claude/claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "playwright-tests": {
      "command": "npm",
      "args": ["run", "mcp:server"],
      "cwd": "d:\\Plywright_MCP Server_Project\\playwright-mcp-enterprise-kit-plus",
      "env": {
        "WORKDAY_USERNAME": "your-username",
        "WORKDAY_PASSWORD": "your-password"
      }
    }
  }
}
```

2. Restart Claude Desktop

3. You can now ask Claude to run your tests:
   - "Run the smoke tests"
   - "Execute the Workday homepage test"
   - "Run all tests in chromium browser"
   - "Get the test configuration"

## Troubleshooting

### Tests won't run
```bash
# Reinstall Playwright browsers
npm run prepare

# Check if node_modules is complete
npm install
```

### MCP Server won't start
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Verify all dependencies
npm install
```

### Authentication failures
- Verify WORKDAY_USERNAME and WORKDAY_PASSWORD in .env
- Check if credentials are correct
- Ensure the WORKDAY_URL is accessible

## Next Steps

1. ✅ Set up environment variables
2. ✅ Run smoke tests to verify setup
3. ✅ Start MCP server for programmatic access
4. ✅ Integrate with Claude Desktop or other MCP clients
5. ✅ Add your own test cases
6. ✅ Configure CI/CD pipelines
