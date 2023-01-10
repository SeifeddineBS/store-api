const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const fileName = "users.json";
  const file = fs.readFileSync(fileName);
  const email = req.body.email;
  const password = req.body.password;

  const json = JSON.parse(file.toString());
  for (let element of json) {
    var exist = element.email === email ? true : false;

    if (exist) {
      var user = element;
      break;
    }
  }
  if (!exist) res.status(404).send({ message: "Email Not found !" });
  else {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).send({ message: "Password incorrect" });
    } else {
      console.log(user.id);
      console.log(user.email);
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
