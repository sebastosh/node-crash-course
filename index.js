const User = require('./user');
const user1 = new User('Sam', 33);
user1.howdy();

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if (req.url === "/") {
    //   fs.readFile(
    //     path.join(__dirname, "public", "index.html"),
    //     (err, content) => {
    //       if (err) throw err;
    //       res.writeHead(200, { "Content-Type": "text/html" });
    //       res.end(content);
    //     }
    //   );
    // }

    // if (req.url === "/about") {
    //   fs.readFile(
    //     path.join(__dirname, "public", "about.html"),
    //     (err, content) => {
    //       if (err) throw err;
    //       res.writeHead(200, { "Content-Type": "text/html" });
    //       res.end(content);
    //     }
    //   );
    // }

    // if (req.url === '/api/users') {
    //  const users = [
    //       {name: 'Joe Shmo', age: 23},
    //       {name: 'Bill Shmill', age: 43},
    //       {name: 'John Shmon', age: 34},
    //   ];
    //   res.writeHead(200, { 'Content-Type': 'application/json'});
    //   res.end(JSON.stringify(users))
    // }

    // Build file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  
//   Extension of file
    let extname = path.extname(filePath);

    // Initital content type
    let contentType = 'text/html';

    // Check extension and set content type
    switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
      }

    //   Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT'){
                // Page not found
                fs.readFile(path.join(
                    __dirname,
                    'public',
                    '404.html'
                  ), (err, content) => {
                      res.writeHead(200, {'Content-Type': 'text/html'});
                      res.end(content, 'utf8');
                  })
            } else {
                // Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            } 
        } else {
                // Success
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        })
    });





const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
