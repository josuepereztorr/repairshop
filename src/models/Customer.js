function Customer(
  firstName,
  lastName,
  phoneNumber,
  emailAddress
) {
  // all required
  this.id = '';
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.vehicles = [];

  this._path = '';

  this.toFirestore = function () {
    const vehicles = [];
    this.vehicles.forEach((vehicle) => {
      vehicle.push(vehicle.toFirestore());
    });
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      vehicles: vehicles,
    };
  };
}

Customer.collectionName = 'customers';
Customer.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const customer = new Customer(
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.emailAddress,
    data.vehicles
  );

  customer.id = snapshot.id;
  customer._path = snapshot.ref.path;

  return customer;
};

export default Customer;
