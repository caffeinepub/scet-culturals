import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  // Data types
  type Registration = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    college : Text;
    event : Text;
    teamMembers : [Text];
  };

  type Contact = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  type Event = {
    name : Text;
    category : Text;
    description : Text;
    maxParticipants : Nat;
    prizes : [Text];
  };

  // Event comparison module
  module Event {
    public func compare(e1 : Event, e2 : Event) : Order.Order {
      switch (Text.compare(e1.category, e2.category)) {
        case (#less) { #less };
        case (#greater) { #greater };
        case (#equal) {
          Text.compare(e1.name, e2.name);
        };
      };
    };
  };

  // Storage
  let registrations = Map.empty<Nat, Registration>();
  let contacts = Map.empty<Nat, Contact>();
  var nextRegistrationId = 1;
  var nextContactId = 1;

  let events : [Event] = [
    {
      name = "Solo Dance";
      category = "Cultural";
      description = "Individual dance competition";
      maxParticipants = 1;
      prizes = ["1st Place - Trophy", "2nd Place - Certificate"];
    },
    {
      name = "Coding Challenge";
      category = "Technical";
      description = "Solve programming problems";
      maxParticipants = 2;
      prizes = ["Gift Vouchers"];
    },
    {
      name = "Quiz";
      category = "Academic";
      description = "General knowledge quiz";
      maxParticipants = 3;
      prizes = ["Books", "Certificates"];
    },
  ];

  // Public functions
  public shared ({ caller }) func registerEvent(name : Text, email : Text, phone : Text, college : Text, event : Text, teamMembers : [Text]) : async () {
    let registration : Registration = {
      id = nextRegistrationId;
      name;
      email;
      phone;
      college;
      event;
      teamMembers;
    };
    registrations.add(nextRegistrationId, registration);
    nextRegistrationId += 1;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let contact : Contact = {
      id = nextContactId;
      name;
      email;
      message;
    };
    contacts.add(nextContactId, contact);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    registrations.values().toArray();
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.values().toArray();
  };

  public query ({ caller }) func getAllEvents() : async [Event] {
    events.sort();
  };

  public query ({ caller }) func searchEventsByCategory(category : Text) : async [Event] {
    let filtered = events.filter(func(e) { e.category == category });
    if (filtered.size() == 0) {
      Runtime.trap("No events found for category: " # category);
    };
    filtered.sort();
  };

  public query ({ caller }) func getRegistrationsByEvent(eventName : Text) : async [Registration] {
    let filtered = registrations.values().toArray().filter(
      func(r) { r.event == eventName }
    );
    if (filtered.size() == 0) {
      Runtime.trap("No registrations found for event: " # eventName);
    };
    filtered;
  };
};
