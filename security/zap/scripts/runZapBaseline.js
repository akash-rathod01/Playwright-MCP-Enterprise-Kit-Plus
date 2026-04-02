
#!/usr/bin/env node
const { spawn } = require('node:child_process');
const { mkdirSync } = require('node:fs');
const target = process.env.BASE_URL || process.argv[2];
if(!target){ console.error('Usage: BASE_URL=https://target npm run zap:baseline'); process.exit(2); }
mkdirSync('security/zap/output', { recursive: true });
const args=['run','--rm','-v',`${process.cwd()}/security/zap/output:/zap/wrk:rw`,'owasp/zap2docker-stable','zap-baseline.py','-t',target,'-r','zap-baseline.html'];
const p=spawn('docker',args,{stdio:'inherit',shell:true}); p.on('close',code=>process.exit(code));
