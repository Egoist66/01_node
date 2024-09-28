import http, { IncomingMessage } from "http";
import fs from "fs";
import path from "path";
import { delay } from "./utils/delay.js";
import { checkType } from "./utils/check-type.js";




const __dirname = path.resolve("./");
const PORT: number = 3003;

const app = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  if (req.url === "/favicon.ico") {
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  if(!fs.existsSync(path.join(__dirname, "forterp.html"))){

    const data = await (await fetch('https://fortegrp.com')).text();

    fs.writeFile('forterp.html', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    await delay(1000);  

    fs.readFile(
      path.join(__dirname, "forterp.html"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
  
        res.end(`${data}`);
      }
    );
   

  }
  else {

    fs.readFile(
      path.join(__dirname, "forterp.html"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
  
        res.end(`${data}`);
      }
    );
   
  }
  
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

    //   emitters();

   

});
