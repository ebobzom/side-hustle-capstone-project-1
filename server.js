const http = require('http');
const fs = require('fs');
const os = require('os');

const PORT = process.env.PORT || 4000;

const Server = http.createServer((req, res) => {
    
    if(req.method == 'GET' && req.url == '/'){
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        return fs.createReadStream('./pages/index.html').pipe(res);

    }else if(req.method == 'GET' && req.url == '/about'){
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        return fs.createReadStream('./pages/about.html').pipe(res);
    }else if(req.method == 'GET' && req.url == '/sys'){
        res.writeHead(201, {
            'content-type': 'text/html'
        });

        const OSInfo = {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus().length,
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        }
        const file = fs.writeFileSync('osinfo.json', JSON.stringify(OSInfo), 'utf-8');
        res.end('Your OS info has been saved successfully!');
    }else{
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        return fs.createReadStream('./pages/404.html').pipe(res);
    }
});

Server.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
});