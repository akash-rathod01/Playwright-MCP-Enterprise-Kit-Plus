/**
 * MCP Server Types
 * Defines interfaces and types for the Playwright MCP Server
 */

export interface TestExecutionOptions {
  pattern?: string;
  project?: string;
  grep?: string;
  workers?: number;
  headed?: boolean;
  debug?: boolean;
  reporter?: string;
  timeout?: number;
}

export interface TestExecutionResult {
  exitCode: number;
  output: string;
  success: boolean;
  timestamp: string;
  duration: number;
  summary?: TestSummary;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
}

export interface TestFailure {
  name: string;
  message: string;
  file?: string;
  line?: number;
}

export interface ServerConfig {
  name: string;
  version: string;
  description?: string;
}

export interface PlaywrightConfig {
  configFile?: string;
  baseURL?: string;
  testDir?: string;
}
