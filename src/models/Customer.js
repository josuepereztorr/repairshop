import Vehicle from "@/models/Vehicle";

function Customer(firstName, lastName, phoneNumber, emailAddress, vehicle) {
  // all required
  this.id = "";
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.vehicle = vehicle;

  this._path = "";

  this.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };

  this.getVehicle = function () {
    return `${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}`;
  };

  this.toFirestore = function () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      vehicle: this.vehicle.toFirestore(),
    };
  };
}

Customer.collectionName = "customers";
Customer.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);

  const vehicle = new Vehicle(
    data.vehicle.year,
    data.vehicle.make,
    data.vehicle.model
  );
  const customer = new Customer(
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.emailAddress,
    vehicle
  );

  customer.id = snapshot.id;
  customer._path = snapshot.ref.path;

  return customer;
};

export default Customer;
