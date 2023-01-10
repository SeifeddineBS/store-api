const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const { json } = require("express");
const idAutoIncrement = require("id-auto-increment");
const bcrypt = require("bcrypt");

dotenv.config();

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

//Middlewear
app.use(express.json());

app.post("/test", async (req, res) => {
  const fileName = "users.json";
  //check if file exist
  if (!fs.existsSync(fileName)) {
    //create new file if not exist
    fs.closeSync(fs.openSync(fileName, "w"));
  }

  // read file
  const file = fs.readFileSync(fileName);
  req.body.id = await idAutoIncrement(); // await syntax
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const data = req.body;
  var exist;

  //check if file is empty
  if (file.length == 0) {
    //add data to json file
    fs.writeFileSync(fileName, JSON.stringify([data]));
    res.send({ res: "Created succ" });
  } else {
    //append data to jso file
    const json = JSON.parse(file.toString());
    for (let user of json) {
      exist = user.email === req.body.email ? true : false;

      if (exist) {
        break;
      }
    }

    //add json element to json object
    if (exist) res.send({ res: "email exisit" });
    else {
      json.push(data);
      fs.writeFileSync(fileName, JSON.stringify(json));
      res.send({ res: "Success" });
    }
  }
});
