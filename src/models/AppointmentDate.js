import { getCurrentDateFormatted } from "@/utils/date";

function AppointmentDate(dateOfService, startTime) {
  this.id = "";
  this.dateCreated = getCurrentDateFormatted("MM/DD/YYYY");
  this.dateOfService = dateOfService || getCurrentDateFormatted("MM/DD/YYYY");
  this.startTime = startTime || getCurrentDateFormatted("h:mm");
  this._path = "";
  this.toFirestore = function () {
    return {
      dateCreated: this.dateCreated,
      dateOfService: this.dateOfService,
      startTime: this.startTime,
    };
  };
}

AppointmentDate.collectionName = "appointmentdates";
AppointmentDate.fromFirestore = function (snapshot, options) {
  const data = snapshot.data(options);
  const appointmentDate = new AppointmentDate(
    data.dateCreated,
    data.dateOfService,
    data.start
  );
  appointmentDate.id = snapshot.id;
  appointmentDate._path = snapshot.ref.path;

  return appointmentDate;
};

export default AppointmentDate;
