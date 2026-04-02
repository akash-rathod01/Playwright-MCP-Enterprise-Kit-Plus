
# Playwright + MCP Enterprise Starter (Plus)

**Enterprise-grade Playwright testing framework with Model Context Protocol (MCP) server integration.**

## ✨ Features
- 🔌 **MCP Server Integration** - Execute tests via Model Context Protocol
- 📊 **Allure Reporting** - Comprehensive test reporting and analytics
- 🔗 **Auto Issue Creation** - GitHub and Jira integration for test failures
- 🎭 **Multi-Browser Support** - Chromium, Firefox, and WebKit
- 🔐 **Workday Test Suite** - Pre-configured enterprise application testing
- 🏗️ **Repository Templates** - Quick project setup
- 🛡️ **Security Scanning** - ZAP integration
- ♿ **Accessibility Testing** - aXe-core integration
- 🚀 **CI/CD Ready** - GitHub Actions workflows included

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
npm run prepare  # Install Playwright browsers
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your credentials
```

### 3. Run Tests

#### Standard Test Execution
```bash
npm test                    # Run all tests
npm run test:ui            # Run with UI mode
npm run test:report        # View HTML report
```

#### MCP Server Execution
```bash
# Start MCP Server
npm run mcp:server

# The server exposes tools for test execution
# See MCP_USAGE.md for detailed documentation
```

## 🔌 MCP Server Usage

The MCP server allows you to execute Playwright tests through the Model Context Protocol. This enables integration with AI assistants, automation tools, and custom clients.

### Start the Server
```bash
npm run mcp:server
```

### Available MCP Tools
1. **run_playwright_tests** - Execute tests with comprehensive options
2. **run_smoke_tests** - Quick smoke test execution
3. **run_workday_tests** - Workday-specific test suite
4. **get_test_config** - Retrieve configuration information

### Configure with Claude Desktop
```json
{
  "mcpServers": {
    "playwright-enterprise": {
      "command": "npm",
      "args": ["run", "mcp:server"],
      "cwd": "/path/to/playwright-mcp-enterprise-kit-plus"
    }
  }
}
```

📖 **See [MCP_USAGE.md](./MCP_USAGE.md) for complete documentation.**

## 📊 Reporting

### Allure Reports
```bash
npm run allure:generate    # Generate Allure report
npm run allure:open        # Open report in browser
```

### Auto-Create Issues on Failures
Automatically create GitHub or Jira issues from test failures:

#### GitHub Issues
```bash
export GH_TOKEN=ghp_xxx
export GH_OWNER=your-org
export GH_REPO=your-repo
npm run issues:github
```

#### Jira Issues
```bash
export JIRA_HOST=https://your-domain.atlassian.net
export JIRA_EMAIL=you@example.com
export JIRA_TOKEN=atlassian-api-token
export JIRA_PROJECT_KEY=PROJ
npm run issues:jira
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all Playwright tests |
| `npm run test:ui` | Run tests in UI mode |
| `npm run test:report` | View Playwright HTML report |
| `npm run mcp:server` | Start MCP server for programmatic test execution |
| `npm run allure:generate` | Generate Allure report from results |
| `npm run allure:open` | Open Allure report in browser |
| `npm run issues:github` | Create GitHub issues from test failures |
| `npm run issues:jira` | Create Jira issues from test failures |

## 🏗️ Project Structure

```
playwright-mcp-enterprise-kit-plus/
├── src/
│   ├── mcp/
│   │   ├── server.ts              # MCP server implementation
│   │   ├── types.ts               # TypeScript types and interfaces
│   │   └── tools/
│   │       └── runPlaywright.ts   # Test execution tool
│   ├── tests/
│   │   ├── web/                   # Web application tests
│   │   └── api/                   # API tests
│   └── framework/
│       ├── pages/                 # Page Object Models
│       └── utils/                 # Utility functions
├── Workday/
│   ├── tests/                     # Workday-specific tests
│   │   └── smoke/                 # Smoke tests
│   └── utils/                     # Workday utilities
├── integrations/
│   ├── common/                    # Shared integration utilities
│   ├── github/                    # GitHub issue integration
│   └── jira/                      # Jira issue integration
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── MCP_USAGE.md                   # MCP server documentation
└── .env.example                   # Environment variables template
```

## 🔐 Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Required for Workday tests
WORKDAY_URL=https://impl.workday.com/...
WORKDAY_USERNAME=your-username
WORKDAY_PASSWORD=your-password

# Required for GitHub integration
GH_TOKEN=your-github-token
GH_OWNER=your-org
GH_REPO=your-repo

# Required for Jira integration
JIRA_HOST=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_TOKEN=your-jira-token
JIRA_PROJECT_KEY=PROJ
```

## 🚦 CI/CD Integration

GitHub Actions workflow included (`.github/workflows/ci.yml`):
- ✅ Runs tests on pull requests and pushes
- 📊 Generates and uploads Allure reports
- 🔍 Publishes Lighthouse CI results
- 📦 Uploads test artifacts
- 🌐 Optional GitHub Pages deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🆘 Troubleshooting

### MCP Server Issues
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (16+ required)
- Verify TypeScript compilation: `npx tsc --noEmit`

### Test Execution Issues
- Install browsers: `npm run prepare`
- Check environment variables in `.env`
- Verify network connectivity
- Review logs in `test-results/` directory

### Integration Issues
- Verify API tokens are valid and have proper permissions
- Check network connectivity to GitHub/Jira
- Ensure JUnit report exists: `reports/junit.xml`

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Allure Framework](https://docs.qameta.io/allure/)
- [MCP Server Usage Guide](./MCP_USAGE.md)
