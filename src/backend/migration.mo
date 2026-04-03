import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type Message = {
    author : Text;
    content : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  type OldActor = {
    contacts : Map.Map<Nat, Contact>;
    events : [Event];
    nextContactId : Nat;
    nextRegistrationId : Nat;
    registrations : Map.Map<Nat, Registration>;
  };

  type Contact = {
    email : Text;
    id : Nat;
    message : Text;
    name : Text;
  };
  type Event = {
    category : Text;
    description : Text;
    maxParticipants : Nat;
    name : Text;
    prizes : [Text];
  };
  type Registration = {
    college : Text;
    email : Text;
    event : Text;
    id : Nat;
    name : Text;
    phone : Text;
    teamMembers : [Text];
  };

  type NewActor = {
    messages : List.List<Message>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(_ : OldActor) : NewActor {
    {
      messages = List.empty<Message>();
      userProfiles = Map.empty<Principal, UserProfile>();
    };
  };
};

