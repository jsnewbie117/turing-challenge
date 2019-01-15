var spawn = require('child_process').exec;

spawn('twitter-proxy');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

const ls = spawn('ng serve -o --port=4300');

ls.stdout.on('data', function (data) {
    console.log(data.toString());
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});
