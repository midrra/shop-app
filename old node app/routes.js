const fs = require("fs");

const requestHandler=(req,res)=>{
    const url = req.url;
    const method = req.method;
if(url === "/"){
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>")
    res.write("</html>");
    return res.end();  
    }
    if (url==="/message" && method ==="POST"){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt',message, err=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
     
        });
      
    }
    res.setHeader("Content-Type",'text/html');
    res.write("<html>");
    res.write("<head><title>My first app in node js</title></head>");
    res.write("<body><h1>This is my first day in the learning path of node js course</h1></body>")
    res.write("</html>");
    res.end();
    // process.exit();
}

// theree ways to export 

///1
// module.exports = requestHandler

// module.exports =  {
//     handler:requestHandler,
//     text:"sometext"
// };

///2
module.exports.handler = requestHandler;
module.exports.text = "sometext";

//we can remove module 
// exports.handler = requestHandler;
// exports.text = "sometext";