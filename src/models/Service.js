function Service(name, description, completionTime, price) {
  // all required
  this.id = '';
  this.name = name;
  this.description = description || '';
  this.completionTime = completionTime;
  this.price = price;

  this._path = '';

  this.toFirestore = function () {
    return {
      name: this.name,
      description: this.description,
      completionTime: this.completionTime,
      price: this.price,
    };
  };
}

Service.collectionName = 'services';

Service.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const service = new Service(
    data.name,
    data.description,
    data.completionTime,
    data.price
  );

  service.id = snapshot.id;
  service._path = snapshot.ref.path;

  return service;
};

export default Service;
