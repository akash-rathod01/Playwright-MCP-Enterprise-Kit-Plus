
/**
 * JUnit XML Parser
 * Parses JUnit XML reports to extract test failure information
 */

import fs from 'node:fs';
import { parseStringPromise } from 'xml2js';

export interface TestFailure {
  name: string;
  message: string;
  file?: string;
  line?: number;
}

/**
 * Parse test failures from JUnit XML report
 * @param path Path to JUnit XML file
 * @returns Array of test failures
 */
export async function parseFailuresFromJunit(path: string): Promise<TestFailure[]> {
  try {
    if (!fs.existsSync(path)) {
      console.warn(`[parseJunit] JUnit file not found: ${path}`);
      return [];
    }

    const xml = fs.readFileSync(path, 'utf-8');
    const data = await parseStringPromise(xml);
    const failures: TestFailure[] = [];
    
    const suites = data.testsuites?.testsuite || data.testsuite || [];
    const arr = Array.isArray(suites) ? suites : [suites];
    
    for (const suite of arr) {
      const cases = suite.testcase || [];
      
      for (const tc of cases) {
        const name = tc.$?.name || 'unknown';
        const failure = tc.failure?.[0];
        
        if (failure) {
          failures.push({
            name,
            message: failure._ || failure.$?.message || 'Test failed without specific message',
            file: tc.$?.file,
            line: tc.$?.line ? parseInt(tc.$?.line, 10) : undefined
          });
        }
      }
    }
    
    console.log(`[parseJunit] Found ${failures.length} test failures in ${path}`);
    return failures;
  } catch (error) {
    console.error('[parseJunit] Error parsing JUnit XML:', error);
    throw new Error(`Failed to parse JUnit XML: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
