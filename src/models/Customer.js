function Service(firstName, lastName, phoneNumber, emailAddress, vehicles) {
  // all required
  this.id = "";
  this.firstName = firstName;
  this.lastName = lastName;
  (this.phoneNumber = phoneNumber),
    (this.emailAddress = emailAddress),
    (this.vehicles = vehicles),
    (this._path = "");

  this.toFirestore = function () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      vehicles: this.vehicles,
    };
  };
}

Service.collectionName = "customers";
Service.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const customer = new Service(
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.emailAddress,
    data.vehicles
  );

  service.id = snapshot.id;
  task._path = snapshot.ref.path;
};

export default Service;
