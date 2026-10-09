console.log('Running Quality Gate Test...');
if (process.env.FAIL_TEST === 'true') {
  console.error('TEST FAILED: Quality gate check triggered a failure!');
  process.exit(1);
} else {
  console.log('TEST PASSED: Quality gate verified successfully.');
  process.exit(0);
}
