const fs = require("fs");

const usersFile = "database/users.json";
const itemsFile = "database/items.json";
const purchasesFile = "database/purchases.json";
const purchaseItemsFile = "database/purchaseItems.json";

const createDatabase = () => {
  if (!fs.existsSync(usersFile)) {
    //create new file if not exist
    fs.closeSync(fs.openSync(usersFile, "w"));
  }
  if (!fs.existsSync(itemsFile)) {
    //create new file if not exist
    fs.closeSync(fs.openSync(itemsFile, "w"));
  }
  if (!fs.existsSync(purchasesFile)) {
    //create new file if not exist
    fs.closeSync(fs.openSync(purchasesFile, "w"));
  }
  if (!fs.existsSync(purchaseItemsFile)) {
    //create new file if not exist
    fs.closeSync(fs.openSync(purchaseItemsFile, "w"));
  }
};

module.exports = createDatabase;
