// import { getCurrentDateFormatted } from '@/utils/date';

function Discount(name, promoCode, discountValue, description, isActive) {
  this.id = "";

  this.name = name || "";
  this.promoCode = promoCode || "";
  this.discountValue = discountValue || 0;
  this.description = description || ""; // optional
  this.isActive = isActive || false;

  this._path = "";

  this.toFirestore = function () {
    return {
      id: this.id,
      name: this.name,
      promoCode: this.promoCode,
      discountValue: this.discountValue,
      description: this.description,
      isActive: this.isActive,
    };
  };
}

Discount.collectionName = "discounts";

Discount.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const discount = new Discount(
    data.name,
    data.promoCode,
    data.discountValue,
    data.description,
    data.isActive
  );

  discount.id = snapshot.id;
  discount._path = snapshot.ref.path;

  return discount;
};

export default Discount;
