import { getCurrentDateFormatted } from '@/utils/date';

function Discount(
  name,
  promoCode,
  discountValue,
  validUntil,
  description,
  isActive
) {
  this.id = '';

  this.name = name || '';
  this.promoCode = promoCode || '';
  this.discountValue = discountValue || 0;
  this.validUntil =
    validUntil || getCurrentDateFormatted('MM/DD/YYYY');
  this.description = description || ''; // optional
  this.isActive = isActive || false;

  this._path = '';

  this.toFirestore = function () {
    return {
      name: this.name,
      promoCode: this.promoCode,
      discountValue: this.discountValue,
      validUntil: this.validUntil,
      description: this.description,
      isActive: this.isActive,
    };
  };
}

Discount.collectionName = 'discounts';

Discount.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const discount = new Discount(
    data.name,
    data.promoCode,
    data.discountValue,
    data.validUntil,
    data.description,
    data.isActive
  );

  discount.id = snapshot.id;
  discount._path = snapshot.ref.path;

  return discount;
};

export default Discount;
