import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import qr from "qr-image"
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

function whatsapp(req,res, next){
    console.log(req.body.floatingInput);
    const url =`https://wa.me/`+ req.body.floatingInput;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('public/his_qr.png'));
    var svg_string = qr.imageSync(url, { type: 'png' });
    next();
}




app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(whatsapp);

app.post("/submit", (req, res) => {
  res.sendFile(__dirname + "/public/index1.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

 