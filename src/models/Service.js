import Discount from '@/models/Discount';

function Service(
  name,
  description,
  completionTime,
  price,
  discount
) {
  // all required
  this.id = '';
  this.name = name;
  this.description = description || '';
  this.completionTime = completionTime;
  this.price = price;
  this.discount = discount;

  this._path = '';

  this.toFirestore = function () {
    return {
      name: this.name,
      description: this.description,
      completionTime: this.completionTime,
      price: this.price,
      discount: this.discount.toFirestore(),
    };
  };
}

Service.collectionName = 'services';

Service.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);

  const discount = new Discount(
    data.discount.name,
    data.discount.promoCode,
    data.discount.discountValue,
    data.discount.validUntil,
    data.discount.description,
    data.discount.isActive
  );
  discount.id = data.discount.id;
  discount._path = data.discount.path;
  const service = new Service(
    data.name,
    data.description,
    data.completionTime,
    data.price,
    discount
  );

  service.id = snapshot.id;
  service._path = snapshot.ref.path;

  return service;
};

export default Service;
