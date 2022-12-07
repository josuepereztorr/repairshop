function Service(
  firstName,
  lastName,
  phoneNumber,
  emailAddress,
  vehicles
) {
  // all required
  this.id = '';
  this.firstName = firstName;
  this.lastName = lastName;
  (this.phoneNumber = phoneNumber),
    (this.emailAddress = emailAddress),
    (this.vehicles = vehicles),
    (this._path = '');

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
    data.firstName,
    data.description,
    data.completionTime,
    data.price
  );

  service.id = snapshot.id;
  task._path = snapshot.ref.path;
};

export default Service;
