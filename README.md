
<div align="center">

# 🎭 Playwright + MCP Enterprise Kit Plus

### Enterprise-grade E2E Testing Framework with AI-Powered Test Execution

[![Playwright](https://img.shields.io/badge/Playwright-1.49.0-45ba4b?style=flat&logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.22.0-orange?style=flat)](https://modelcontextprotocol.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./PULL_REQUEST_TEMPLATE.md)

**Production-ready testing framework combining Playwright's power with MCP server integration for AI-driven test execution, comprehensive reporting, and enterprise integrations.**

[Features](#-features) • [Quick Start](#-quick-start) • [MCP Integration](#-mcp-server-integration) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🤖 AI-Powered Testing
- **🔌 MCP Server Integration** - Execute tests programmatically via Model Context Protocol
- **💬 AI Assistant Ready** - Claude Desktop, VS Code Copilot, and other MCP clients supported
- **⚡ Smart Test Execution** - Intelligent test selection and execution via MCP tools

### 📊 Enterprise Reporting
- **📈 Allure Reports** - Beautiful, comprehensive test analytics and history
- **📸 Visual Evidence** - Automatic screenshots, videos, and traces on failures
- **🎯 JUnit/HTML Reports** - Multi-format reporting for CI/CD pipelines

### 🔗 Integration Ecosystem
- **🐙 GitHub Issues** - Auto-create issues from test failures with full context
- **📋 Jira Integration** - Automatic ticket creation in Jira for failed tests
- **🛡️ OWASP ZAP** - Security vulnerability scanning integration
- **🚦 Lighthouse CI** - Automated performance and accessibility audits

### 🎭 Testing Capabilities
- **🌐 Multi-Browser** - Chromium, Firefox, and WebKit support
- **♿ Accessibility** - Built-in aXe-core accessibility testing
- **🔐 Enterprise Apps** - Pre-configured Workday test suite included
- **🧪 Smoke & Regression** - Organized test suites for different testing levels

### 🚀 Developer Experience
- **📦 TypeScript First** - Full type safety and IntelliSense support
- **🏗️ Page Object Model** - Maintainable test architecture
- **⚙️ CI/CD Ready** - GitHub Actions workflows included
- **🔄 Auto-Setup** - One-command browser installation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Optional (for specific features):
- **Allure** commandline for local report viewing
- **Docker** for ZAP security scanning
- **Claude Desktop** or other MCP client for AI-powered testing

---

## 🚀 Quick Start

### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/playwright-mcp-enterprise-kit-plus.git
cd playwright-mcp-enterprise-kit-plus

# Install dependencies
npm install

# Install Playwright browsers
npm run prepare
```

### 2️⃣ Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials (use your favorite editor)
notepad .env  # Windows
# or
nano .env     # macOS/Linux
```

**Minimal configuration** (for basic testing):
```env
WORKDAY_URL=https://impl.workday.com/your-tenant
WORKDAY_USERNAME=your-username
WORKDAY_PASSWORD=your-password
```

### 3️⃣ Run Your First Test

```bash
# Run all tests
npm test

# Run tests in interactive UI mode (recommended for first-time)
npm run test:ui

# Run specific test suite
npx playwright test Workday/tests/smoke

# Run in headed mode to watch tests execute
npx playwright test --headed
```

### 4️⃣ View Results

```bash
# View Playwright HTML report
npm run test:report

# Generate and view Allure report
npm run allure:generate
npm run allure:open
```

---

## 🔌 MCP Server Integration

### What is MCP?

The **Model Context Protocol (MCP)** enables AI assistants to execute your tests programmatically. This allows tools like Claude Desktop, VS Code Copilot, or custom AI agents to run, debug, and analyze your test suite.

### 🎯 Quick Setup with Claude Desktop
### 🎯 Quick Setup with Claude Desktop

**Step 1:** Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "playwright-enterprise": {
      "command": "npm",
      "args": ["run", "mcp:server"],
      "cwd": "D:\\Plywright_MCP Server_Project\\playwright-mcp-enterprise-kit-plus"
    }
  }
}
```

**Config location:**
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Step 2:** Restart Claude Desktop

**Step 3:** Ask Claude to run your tests:
```
"Run the Workday smoke tests"
"Execute all accessibility tests and show me the results"
"Run tests matching 'dashboard' and create a report"
```

### 🛠️ Available MCP Tools

| Tool | Description | Example Use |
|------|-------------|-------------|
| `run_playwright_tests` | Execute tests with full configuration options | Run specific browsers, projects, or grep patterns |
| `run_smoke_tests` | Quick smoke test execution | Fast validation before deployments |
| `run_workday_tests` | Workday-specific test suite | Enterprise app testing |
| `get_test_config` | Retrieve current configuration | Debug setup issues |

### 💡 Usage Examples
### 💡 Usage Examples

**Run specific tests:**
```javascript
// Ask Claude: "Run tests matching 'login' in Chromium browser"
{
  "grep": "login",
  "project": "chromium"
}
```

**Run tests and generate report:**
```javascript
// Ask Claude: "Run smoke tests and generate Allure report"
// MCP tool handles execution + reporting automatically
```

**Standalone server mode:**
```bash
# Start MCP server manually (for custom integrations)
npm run mcp:server

# Server listens on stdio for MCP protocol messages
```

📖 **Full MCP documentation:** [MCP_USAGE.md](./MCP_USAGE.md)

---

---

## 📊 Reporting & Analytics

### 📈 Allure Reports

Generate beautiful, interactive reports with historical trends and analytics:

```bash
# Generate report from latest test results
npm run allure:generate

# Open report in browser
npm run allure:open
```

**Allure features:**
- 📊 Historical trends and statistics
- 📸 Screenshots and video attachments
- 🔍 Detailed step-by-step execution
- 📉 Flaky test detection
- 🏷️ Test categorization and tagging

### 🐛 Auto-Create Issues from Failures

Automatically create detailed tickets when tests fail:

#### GitHub Issues Integration

```bash
# Set environment variables
export GH_TOKEN=ghp_xxxxxxxxxxxxx
export GH_OWNER=your-username
export GH_REPO=playwright-mcp-enterprise-kit-plus

# Create issues from failures
npm run issues:github
```

**Created issues include:**
- Test name and failure reason
- Screenshots and error traces
- Browser and environment details
- Direct links to test files

#### Jira Integration

```bash
# Configure Jira credentials
export JIRA_HOST=https://your-domain.atlassian.net
export JIRA_EMAIL=you@example.com
export JIRA_TOKEN=your-api-token
export JIRA_PROJECT_KEY=PROJ

# Create Jira tickets
npm run issues:jira
```

### 🔐 Security & Performance Scans

```bash
# Run OWASP ZAP baseline security scan
npm run zap:baseline

# Run full ZAP scan (longer, more thorough)
npm run zap:full

# Run Lighthouse CI performance audit
npm run lhci:autorun
```

---

---

## 🔧 Available Scripts

| Category | Script | Description |
|----------|--------|-------------|
| **Testing** | `npm test` | Run all Playwright tests |
| | `npm run test:ui` | Run tests in interactive UI mode |
| | `npm run test:report` | View Playwright HTML report |
| | `npm run test:a11y` | Run accessibility tests only |
| **MCP** | `npm run mcp:server` | Start MCP server for AI-powered execution |
| **Reports** | `npm run allure:generate` | Generate Allure report from results |
| | `npm run allure:open` | Open Allure report in browser |
| **Integrations** | `npm run issues:github` | Create GitHub issues from test failures |
| | `npm run issues:jira` | Create Jira tickets from test failures |
| **Security** | `npm run zap:baseline` | Run OWASP ZAP baseline security scan |
| | `npm run zap:full` | Run comprehensive ZAP security scan |
| | `npm run lhci:autorun` | Run Lighthouse CI performance audit |
| **Setup** | `npm run prepare` | Install Playwright browsers (auto-runs on install) |

### 💻 Direct Playwright Commands

```bash
# Run specific test file
npx playwright test Workday/tests/smoke/homepage-smoke.spec.ts

# Run tests matching pattern
npx playwright test --grep "dashboard"

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run specific browser
npx playwright test --project=chromium

# Run with UI mode (interactive)
npx playwright test --ui

# Update snapshots
npx playwright test --update-snapshots
```

---

---

## 📁 Project Structure

```
playwright-mcp-enterprise-kit-plus/
│
├── 📂 src/
│   ├── 📂 mcp/                      # MCP Server Implementation
│   │   ├── server.ts               # Main MCP server entry point
│   │   ├── types.ts                # TypeScript interfaces and types
│   │   └── tools/
│   │       └── runPlaywright.ts    # Test execution MCP tool
│   │
│   ├── 📂 tests/                   # Core Test Suites
│   │   ├── web/                    # Web application tests
│   │   │   ├── accessibility.spec.ts
│   │   │   └── ...
│   │   └── api/                    # API tests
│   │
│   └── 📂 framework/               # Test Framework
│       ├── pages/                  # Page Object Models
│       └── utils/                  # Utility functions
│
├── 📂 Workday/                     # Enterprise App Tests
│   ├── tests/
│   │   └── smoke/
│   │       └── homepage-smoke.spec.ts
│   └── utils/
│       ├── auth.ts                 # Authentication helpers
│       ├── proxy.ts                # Proxy utilities
│       └── ui.ts                   # UI interactions
│
├── 📂 integrations/                # External Integrations
│   ├── common/                     # Shared utilities
│   │   └── parseJunitXml.ts       # Test result parsing
│   ├── github/                     # GitHub Issues
│   │   └── reportFailuresToIssues.ts
│   └── jira/                       # Jira Integration
│       └── reportFailuresToIssues.ts
│
├── 📂 security/                    # Security Testing
│   └── zap/                        # OWASP ZAP integration
│       └── scripts/
│
├── 📂 allure-results/              # Allure test results (generated)
├── 📂 allure-report/               # Allure HTML reports (generated)
├── 📂 playwright-report/           # Playwright HTML report (generated)
├── 📂 reports/                     # JUnit XML reports (generated)
├── 📂 test-results/                # Test artifacts (generated)
│
├── 📄 playwright.config.ts         # Playwright configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 package.json                 # Dependencies and scripts
├── 📄 .env.example                 # Environment variables template
├── 📄 MCP_USAGE.md                 # MCP server documentation
├── 📄 QUICKSTART.md                # Quick start guide
└── 📄 README.md                    # This file
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | Main documentation (you are here) |
| [QUICKSTART.md](./QUICKSTART.md) | Fast-track setup guide |
| [MCP_USAGE.md](./MCP_USAGE.md) | Complete MCP server documentation |
| [PULL_REQUEST_TEMPLATE.md](./PULL_REQUEST_TEMPLATE.md) | PR guidelines and checklist |

---

---

## ⚙️ Environment Configuration

### 📝 Setting Up .env File

Copy the example and customize for your environment:

```bash
cp .env.example .env
```

### 🔑 Required Variables

#### Workday Testing
```env
WORKDAY_URL=https://impl.workday.com/your-tenant/d/home.html
WORKDAY_USERNAME=your-test-user@company.com
WORKDAY_PASSWORD=SecureP@ssw0rd123
```

#### GitHub Integration (Optional)
```env
GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GH_OWNER=your-github-username
GH_REPO=playwright-mcp-enterprise-kit-plus
```

#### Jira Integration (Optional)
```env
JIRA_HOST=https://your-company.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_TOKEN=ATATTxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JIRA_PROJECT_KEY=TEST
```

#### Playwright Configuration (Optional)
```env
BASE_URL=https://your-app.com
PW_SLOWMO=100                    # Slow down execution (ms)
PLAYWRIGHT_SLOWMO=100            # Alternative slowmo variable
CI=true                          # CI mode (enables retries)
```

### 🔒 Security Best Practices

- ✅ **Never commit** `.env` file to Git (already in `.gitignore`)
- ✅ Use **environment-specific** `.env` files (`.env.dev`, `.env.staging`, `.env.prod`)
- ✅ Store production secrets in **CI/CD secret vaults** (GitHub Secrets, Azure Key Vault, etc.)
- ✅ Rotate credentials regularly
- ✅ Use **service accounts** with minimal permissions for testing

---

## 🚦 CI/CD Integration

### GitHub Actions Workflow

This project includes a ready-to-use GitHub Actions workflow that:

- ✅ Runs tests on every push and pull request
- ✅ Tests across multiple browsers (Chromium, Firefox, WebKit)
- ✅ Generates and uploads Allure reports
- ✅ Creates test artifacts (screenshots, videos, traces)
- ✅ Optionally deploys reports to GitHub Pages
- ✅ Runs on Ubuntu, Windows, and macOS (configurable)

### 🔧 Setup GitHub Actions

1. **Enable GitHub Actions** in your repository
2. **Add secrets** in repository settings:
   ```
   Settings → Secrets and variables → Actions → New repository secret
   ```
   Add: `WORKDAY_URL`, `WORKDAY_USERNAME`, `WORKDAY_PASSWORD`, etc.

3. **Push to trigger** workflow:
   ```bash
   git push origin main
   ```

4. **View results** in the Actions tab

### 📊 Sample Workflow Output

```yaml
✓ Install dependencies
✓ Install Playwright browsers
✓ Run Playwright tests (chromium)
✓ Run Playwright tests (firefox)
✓ Run Playwright tests (webkit)
✓ Generate Allure report
✓ Upload test artifacts
✓ Deploy to GitHub Pages (optional)
```

---

## 🎯 Best Practices

### ✅ Test Organization
- Group tests by feature/module in logical folders
- Use descriptive test names: `should display error when login fails`
- Tag tests appropriately: `@smoke`, `@regression`, `@critical`
- Keep test files focused (one feature per file)

### ✅ Page Object Model
- Create page objects for all major pages/components
- Use selectors that are stable (data-testid preferred)
- Encapsulate page interactions in methods
- Return page objects for method chaining

### ✅ Test Data Management
- Use environment variables for configuration
- Keep test data separate from test logic
- Use fixtures for complex test setup
- Avoid hard-coded values

### ✅ Assertions
- Use specific, meaningful assertions
- Add custom error messages: `expect(value, 'User should be logged in').toBeTruthy()`
- Test both positive and negative scenarios
- Avoid flaky assertions (use `toBeVisible()` with timeouts)

### ✅ Performance
- Run tests in parallel (`fullyParallel: true` in config)
- Use `test.describe.configure({ mode: 'parallel' })` for test groups
- Share authentication state across tests
- Clean up test data after execution

---

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
1. Check if the bug is already reported in [Issues](../../issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable
   - Environment details (OS, Node version, browser)

### ✨ Feature Requests
1. Search existing [feature requests](../../issues?q=is%3Aissue+label%3Aenhancement)
2. Open a new issue describing:
   - The problem you're trying to solve
   - Proposed solution
   - Alternative solutions considered
   - Additional context

### 🔧 Pull Requests

**Quick contribution workflow:**

```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/playwright-mcp-enterprise-kit-plus.git
cd playwright-mcp-enterprise-kit-plus

# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# ... code, code, code ...

# 4. Test your changes
npm test

# 5. Commit with clear message
git commit -m "feat: add amazing new feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Open a Pull Request
```

**PR Checklist:**
- ✅ Tests pass locally (`npm test`)
- ✅ Code follows existing style
- ✅ Added tests for new features
- ✅ Updated documentation if needed
- ✅ Commit messages are clear
- ✅ No sensitive data (credentials, tokens) in code

### 📖 Documentation Improvements
- Fix typos, improve clarity
- Add examples and use cases
- Improve code comments
- Update outdated information

---

## ❓ FAQ & Troubleshooting

### General Issues

**Q: Tests are failing with "Browser not found" error**
```bash
# Solution: Install Playwright browsers
npm run prepare
# or
npx playwright install --with-deps
```

**Q: Getting "ECONNREFUSED" or timeout errors**
```bash
# Check your application is running
# Verify BASE_URL in .env or playwright.config.ts
# Check network/firewall settings
```

**Q: Tests are flaky (pass sometimes, fail sometimes)**
```typescript
// Solution: Add proper waits
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible({ timeout: 10000 });

// Avoid hard waits
// ❌ await page.waitForTimeout(5000);
// ✅ await page.waitForSelector('.my-element');
```

### MCP Server Issues

**Q: MCP server not connecting in Claude Desktop**
```bash
# 1. Verify config location
# Windows: %APPDATA%\Claude\claude_desktop_config.json
# macOS: ~/Library/Application Support/Claude/claude_desktop_config.json

# 2. Check cwd path is correct (absolute path)
# 3. Restart Claude Desktop completely
# 4. Check logs in Claude Desktop developer tools
```

**Q: MCP tools not showing up**
```bash
# Verify server starts without errors
npm run mcp:server

# Check TypeScript compilation
npx tsc --noEmit

# Ensure all dependencies installed
npm install
```

### Integration Issues

**Q: GitHub issue creation fails**
```bash
# Verify token has correct permissions (repo scope)
# Check GH_TOKEN, GH_OWNER, GH_REPO are set
# Run manually to see detailed error:
npm run issues:github
```

**Q: Allure report is empty**
```bash
# Make sure tests have run first
npm test

# Then generate report
npm run allure:generate
npm run allure:open
```

### Performance Issues

**Q: Tests are running slowly**
```typescript
// Enable parallel execution in playwright.config.ts
fullyParallel: true,

// Or in specific test file
test.describe.configure({ mode: 'parallel' });
```

**Q: Need to debug a specific test**
```bash
# Run in debug mode (opens inspector)
npx playwright test --debug

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test only
npx playwright test -g "test name"
```

---

## 🙏 Acknowledgments

Built with these amazing technologies:

- [Playwright](https://playwright.dev/) - Modern end-to-end testing framework
- [Model Context Protocol](https://modelcontextprotocol.io/) - AI assistant integration standard
- [Allure](https://docs.qameta.io/allure/) - Beautiful test reporting
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [aXe-core](https://github.com/dequelabs/axe-core) - Accessibility testing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 💬 Support & Contact

- 📫 **Issues:** [GitHub Issues](../../issues)
- 💡 **Discussions:** [GitHub Discussions](../../discussions)
- 📖 **Documentation:** [Full Docs](./QUICKSTART.md)
- 🌟 **Star this repo** if you find it helpful!

---

<div align="center">

**Made with ❤️ for the testing community**

If this project helps you, please consider giving it a ⭐!

[Report Bug](../../issues/new?labels=bug) · [Request Feature](../../issues/new?labels=enhancement) · [View Examples](./src/tests)

</div>

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
