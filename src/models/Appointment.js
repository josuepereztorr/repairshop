import Customer from "@/models/Customer";
import Service from "@/models/Service";
import AppointmentDate from "@/models/AppointmentDate";

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
  };
}

Service.collectionName = "appointments";
Service.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const customer = new Customer(
    data.customer.firstName,
    data.customer.lastName,
    data.customer.phoneNumber,
    data.customer.emailAddress,
    data.customer.vehicle
  );
  const service = new Service(
    data.service.name,
    data.service.description,
    data.service.completionTime,
    data.service.price,
    data.service.discount
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
