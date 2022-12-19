function Vehicle(year, make, model) {
  // all required
  this.id = "";
  this.year = year;
  this.make = make;
  this.model = model;

  this._path = "";

  this.toString = function () {
    return `${this.year} ${this.make} ${this.model}`;
  };

  this.toFirestore = function () {
    return {
      year: this.year,
      make: this.make,
      model: this.model,
    };
  };
}

Vehicle.collectionName = "vehicles";
Vehicle.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const vehicle = new Vehicle(data.year, data.make, data.model);

  vehicle.id = snapshot.id;
  vehicle._path = snapshot.ref.path;

  return vehicle;
};

export default Vehicle;
