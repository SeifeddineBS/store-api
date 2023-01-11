const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const fileName = "database/users.json";
  const file = fs.readFileSync(fileName);
  const email = req.body.email;
  const password = req.body.password;

  const users = JSON.parse(file.toString());
  for (let element of users) {
    var exist = element.email === email ? true : false; // check if user exist or not 

    if (exist) {
      var user = element; 
      break;
    }
  }
  if (!exist) res.status(404).send({ message: "Email Not found !" });
  else {
    const passwordMatch = await bcrypt.compare(password, user.password); // check if password match or not 

    if (!passwordMatch) {
      res.status(400).send({ message: "Password incorrect" });
    } else {
      // generate token 
      const token = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.header("auth-token", token).send(token);
    }
  }
};
