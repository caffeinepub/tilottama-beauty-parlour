import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Appointment = {
    customerName : Text;
    service : Text;
    preferredDate : Text;
    phoneNumber : Text;
    timestamp : Time.Time;
  };

  module Appointment {
    public func compare(app1 : Appointment, app2 : Appointment) : Order.Order {
      Text.compare(app1.customerName, app2.customerName);
    };
  };

  let appointments = Map.empty<Principal, Appointment>();

  public shared ({ caller }) func submitAppointment(appointment : Appointment) : async () {
    if (appointments.containsKey(caller)) { Runtime.trap("Appointment already exists") };
    let newAppointment : Appointment = {
      appointment with
      timestamp = Time.now();
    };
    appointments.add(caller, newAppointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort(); // Implicitly uses Appointment.compare
  };
};
