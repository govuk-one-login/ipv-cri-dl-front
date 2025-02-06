const autocannon = require('autocannon');

function runAutocannon() {
  const instance = autocannon({
    url: process.env.FRONT_BASE_URL,
    connections: 22,  // Number of concurrent connections (requests per second)
    duration: 10,  // Test duration in seconds
    requests: [
      { method: 'GET', path: '/' },
    ]
  }, finishedBenchmark);

  instance.on('response', (client, statusCode, resBytes, responseTime) => {
    if (statusCode === 503) {
        console.log(`Status Code: ${statusCode}` + ' - Overload Protection enabled');
    } else {
        console.log(`Status Code: ${statusCode}`);
    }
  });

  autocannon.track(instance);

  function finishedBenchmark(err, res) {
    if (err) {
      console.error('Error running autocannon:', err);
      process.exit(1);  // Fail the test on error
    }
    console.log(autocannon.printResult(res));
  }
}

runAutocannon();
