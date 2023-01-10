class PurchaseItem {
  constructor(id, itemId,purchaseId, quantity, price, totalPurchaseItemPrice) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
    this.totalPurchaseItemPrice = totalPurchaseItemPrice;
  }
}
module.exports = Purchase;
