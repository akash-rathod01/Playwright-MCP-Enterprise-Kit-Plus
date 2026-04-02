
/**
 * Playwright Test Execution Tool
 * Provides enhanced test execution capabilities for MCP Server
 */

import { spawn } from 'node:child_process';
import type { TestExecutionOptions, TestExecutionResult } from '../types.js';

/**
 * Execute Playwright tests with comprehensive options
 * @param options Test execution options
 * @returns Test execution result with detailed information
 */
export async function runPlaywright(options: TestExecutionOptions = {}): Promise<TestExecutionResult> {
  const startTime = Date.now();
  
  return new Promise((resolve) => {
    const args = ['test'];
    
    // Add test pattern/file if specified
    if (options.pattern) {
      args.push(options.pattern);
    }
    
    // Add project filter
    if (options.project) {
      args.push('--project', options.project);
    }
    
    // Add grep pattern for test name filtering
    if (options.grep) {
      args.push('--grep', options.grep);
    }
    
    // Add workers configuration
    if (options.workers !== undefined) {
      args.push('--workers', String(options.workers));
    }
    
    // Add headed mode
    if (options.headed) {
      args.push('--headed');
    }
    
    // Add debug mode
    if (options.debug) {
      args.push('--debug');
    }
    
    // Add reporter configuration
    if (options.reporter) {
      args.push('--reporter', options.reporter);
    }
    
    // Add timeout configuration
    if (options.timeout) {
      args.push('--timeout', String(options.timeout));
    }
    
    console.log(`[MCP Server] Executing: npx playwright ${args.join(' ')}`);
    
    const childProcess = spawn('npx', ['playwright', ...args], {
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    
    let output = '';
    let errorOutput = '';
    
    childProcess.stdout?.on('data', (data) => {
      const text = data.toString();
      output += text;
      console.log(text);
    });
    
    childProcess.stderr?.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      console.error(text);
    });
    
    childProcess.on('error', (error) => {
      console.error('[MCP Server] Process error:', error);
      const duration = Date.now() - startTime;
      resolve({
        exitCode: 1,
        output: `Process error: ${error.message}\n${output}`,
        success: false,
        timestamp: new Date().toISOString(),
        duration
      });
    });
    
    childProcess.on('close', (code) => {
      const duration = Date.now() - startTime;
      const exitCode = code ?? 1;
      const fullOutput = output + (errorOutput ? `\n\nErrors:\n${errorOutput}` : '');
      
      console.log(`[MCP Server] Test execution completed with exit code: ${exitCode}`);
      console.log(`[MCP Server] Duration: ${duration}ms`);
      
      // Parse test summary from output
      const summary = parseTestSummary(output);
      
      resolve({
        exitCode,
        output: fullOutput,
        success: exitCode === 0,
        timestamp: new Date().toISOString(),
        duration,
        summary
      });
    });
  });
}

/**
 * Parse test summary from Playwright output
 * @param output Raw test execution output
 * @returns Parsed test summary
 */
function parseTestSummary(output: string) {
  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    flaky: 0
  };
  
  // Match patterns like "5 passed (12.3s)" or "2 failed"
  const passedMatch = output.match(/(\d+)\s+passed/);
  const failedMatch = output.match(/(\d+)\s+failed/);
  const skippedMatch = output.match(/(\d+)\s+skipped/);
  const flakyMatch = output.match(/(\d+)\s+flaky/);
  
  if (passedMatch) summary.passed = parseInt(passedMatch[1], 10);
  if (failedMatch) summary.failed = parseInt(failedMatch[1], 10);
  if (skippedMatch) summary.skipped = parseInt(skippedMatch[1], 10);
  if (flakyMatch) summary.flaky = parseInt(flakyMatch[1], 10);
  
  summary.total = summary.passed + summary.failed + summary.skipped + summary.flaky;
  
  return summary.total > 0 ? summary : undefined;
}

/**
 * Simple wrapper for backward compatibility
 * @param pattern Optional test pattern
 * @returns Test execution result
 */
export async function runPlaywrightSimple(pattern?: string) {
  const result = await runPlaywright({ pattern });
  return {
    code: result.exitCode,
    output: result.output
  };
}
