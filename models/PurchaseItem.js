class PurchaseItem {
  constructor(id, itemId, purchaseId, quantity, price, totalPurchaseItemPrice) {
    this.id = id;
    this.itemId = itemId;
    this.purchaseId = purchaseId;
    this.quantity = quantity;
    this.price = price;
    this.totalPurchaseItemPrice = totalPurchaseItemPrice;
  }
}
module.exports = Purchase;
