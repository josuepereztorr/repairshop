import Customer from "@/models/Customer";
import Service from "@/models/Service";
import Discount from "@/models/Discount";
import AppointmentDate from "@/models/AppointmentDate";
import Vehicle from "./Vehicle";

function Appointment(customer, service, appointmentDate) {
  // all required
  this.id = "";
  this.customer = customer;
  this.service = service;
  this.appointmentDate = appointmentDate;
  this._path = "";

  this.toFirestore = function () {
    return {
      customer: this.customer.toFirestore(),
      service: this.service.toFirestore(),
      appointmentDate: this.appointmentDate.toFirestore(),
    };
    // return {
    //   customer: this.customer.value.toFirestore(),
    //   service: this.service.value.toFirestore(),
    //   appointmentDate: this.appointmentDate.toFirestore(),
    // };
  };
}

Appointment.collectionName = "appointments";
Appointment.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const vehicle = new Vehicle(
    data.customer.vehicle.year,
    data.customer.vehicle.make,
    data.customer.vehicle.model
  );
  const customer = new Customer(
    data.customer.firstName,
    data.customer.lastName,
    data.customer.phoneNumber,
    data.customer.emailAddress,
    vehicle
  );
  const discount = new Discount(
    data.service.discount.name,
    data.service.discount.promoCode,
    data.service.discount.discountValue,
    data.service.discount.description,
    data.service.discount.isActive
  );
  const service = new Service(
    data.service.name,
    data.service.description,
    data.service.completionTime,
    data.service.price,
    discount
  );

  const appointmentDate = new AppointmentDate(
    data.appointmentDate.dateOfService,
    data.appointmentDate.startTime,
    data.appointmentDate.endTime
  );
  appointmentDate.dateCreated = data.appointmentDate.dateCreated;
  const appointment = new Appointment(customer, service, appointmentDate);

  appointment.id = snapshot.id;
  appointment._path = snapshot.ref.path;

  return appointment;
};

export default Appointment;
