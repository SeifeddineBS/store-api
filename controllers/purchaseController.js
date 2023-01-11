const fs = require("fs");
const usersFile = fs.readFileSync("database/users.json");
const itemsFile = fs.readFileSync("database/items.json");
const purchasesFile = fs.readFileSync("database/purchases.json");
const purchaseItemsFile = fs.readFileSync("database/purchaseItems.json");
const users = JSON.parse(usersFile.toString());
const items = JSON.parse(itemsFile.toString());
const purchases = JSON.parse(purchasesFile.toString());
const purchaseItems = JSON.parse(purchaseItemsFile.toString());

const getPurchaseById = (id) => {
  for (let purchase of purchases) {
    if (purchase.id === id) return purchase;
  }
};
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
    res.status(404).send({ res: "User not found " });
    return;
  } else {
    var i = 1;
    for (let purchase of purchases) {
      if (purchase.userId === userId) {
        var userPurchase = {};
        userPurchase.order = i;
        userPurchase.id = purchase.id;
        userPurchase.date = purchase.date;
        userPurchase.userName = user.name + " " + user.lastName;
        userPurchase.total = purchase.totalPurchasePrice;

        userPurchase.items = [];
        for (let purchaseItem of purchaseItems) {
          if (purchaseItem.purchaseId === purchase.id) {
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

// for (let purchaseItem of purchaseItems) {
//   let purchase = getPurchaseById(purchaseItem.purchaseId);
//   console.log("first :" + purchaseItem.purchaseId);
//   console.log("second :" + purchase.id);

//   if (purchase.userId === userId) {
//     let user = getUserById(userId);
//     userPurchase.id = purchase.id;

//     userPurchase.userId = userId;
//     userPurchase.data = purchase.date;
//     userPurchase.userName = user.name + " " + user.lastName;
//     userPurchase.totalPurchasePrice = purchase.totalPurchasePrice;
//     userPurchases.push(userPurchase);
//   }
// }
// res.status(200).send({ Purchases: userPurchases });
