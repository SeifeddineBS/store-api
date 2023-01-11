const fs = require("fs");
const usersFile = fs.readFileSync("database/users.json");
const itemsFile = fs.readFileSync("database/items.json");
const purchasesFile = fs.readFileSync("database/purchases.json");
const purchaseItemsFile = fs.readFileSync("database/purchaseItems.json");
const users = JSON.parse(usersFile.toString());
const items = JSON.parse(itemsFile.toString());
const purchases = JSON.parse(purchasesFile.toString());
const purchaseItems = JSON.parse(purchaseItemsFile.toString());

const getItemById = (id) => {
  for (let item of items) {
    if (item.id === id) return item;
  }
};
const getUserById = (id) => {
  for (let user of users) {
    if (user.id === id) return user;
  }
};

exports.getPurchaseByUser = (req, res) => {
  const userId = req.params.userId;
  const user = getUserById(userId);
  var userPurchases = [];

  for (let user of users) {
    var exist = user.id === userId ? true : false;

    if (exist) {
      break;
    }
  }
  if (!exist) {
    res.status(404).send({ res: "User not found " }); // user given not found
    return;
  } else {
    var i = 1;
    for (let purchase of purchases) {
      // get all purchases
      if (purchase.userId === userId) {
        // get user's purchases
        var userPurchase = {};
        userPurchase.order = i;
        userPurchase.id = purchase.id;
        userPurchase.date = purchase.date;
        userPurchase.userName = user.name + " " + user.lastName;
        userPurchase.total = purchase.totalPurchasePrice;

        userPurchase.items = [];
        for (let purchaseItem of purchaseItems) {
          // get all purchasesItem
          if (purchaseItem.purchaseId === purchase.id) {
            //get all user'spurchasesItem
            let item = getItemById(purchaseItem.itemId);
            console.log(purchaseItem.itemId);
            let userItem = {
              name: item.name,
              quantity: purchaseItem.quantity,
              price: purchaseItem.price,
              totalPurchaseItemPrice: purchaseItem.totalPurchaseItemPrice,
            };
            userPurchase.items.push(userItem);
          }
        }

        userPurchases.push(userPurchase);
        i++;
      }
    }
    res.status(200).send({ Purchases: userPurchases });
  }
};
