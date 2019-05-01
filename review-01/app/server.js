const http = require('http');
const port = process.env.PORT || 3001;

const handleRequest = function(request, response) {
    const developerName = process.env.DEVELOPER_NAME || 'DEVELOPER NAME UNKNOWN';
    const secretMessage = `Patience is a virtue, ${developerName}`;

    console.log(`Received request for URL: ${request.url} at ${new Date()}`);
    console.log(`Sending secret message, ${secretMessage}`);
    response.writeHead(200);
    response.end(secretMessage);
};

const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
