const http = require('http'),
    hostname = 'localhost',
    port = 8080,
    url = require('url'),
    server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Hello World!');
        let q = url.parse(req.url, true);
        console.log(q.pathname); //retorna string após host e antes dos parâmetros: '/recurso'
        console.log(q.search); //retrona a parte dos parâmetros de query da resuisição, exemplo: '?year=2017&month=february'
        let resourceReq = q.query;
        let ano = resourceReq.year;
        let mes = resourceReq.month;
        console.log("Ano: " + ano);
        console.log("Mês: " + mes);
    });
    
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});