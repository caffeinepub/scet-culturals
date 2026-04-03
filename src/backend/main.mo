import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Persisted actor with data migration
(with migration = Migration.run)
actor {
  type Message = {
    author : Text;
    content : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent data structures
  let messages = List.empty<Message>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Birthday wishes message functions
  public shared ({ caller }) func addMessage(author : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add messages");
    };

    if (author.size() == 0 or author.size() > 50) {
      Runtime.trap("Author name must be between 1 and 50 characters");
    };
    if (content.size() == 0 or content.size() > 200) {
      Runtime.trap("Message content must be between 1 and 200 characters");
    };

    messages.add({ author; content });
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    // Anyone can read messages, including guests
    messages.toArray();
  };

  public query ({ caller }) func searchMessagesByAuthor(author : Text) : async [Message] {
    // Anyone can search messages, including guests
    let filteredMessages = messages.filter(
      func(msg) { msg.author.toLower().contains(#text(author.toLower())) }
    );
    if (filteredMessages.isEmpty()) {
      Runtime.trap("No messages found for author: " # author);
    };
    filteredMessages.toArray();
  };

  public shared ({ caller }) func updateMessage(oldAuthor : Text, oldContent : Text, newContent : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update messages");
    };

    if (oldAuthor.size() == 0 or oldAuthor.size() > 50) {
      Runtime.trap("Author name must be between 1 and 50 characters");
    };
    if (newContent.size() == 0 or newContent.size() > 200) {
      Runtime.trap("New message content must be between 1 and 200 characters");
    };

    let messagesArray = messages.toArray();
    let newMessages = messagesArray.map(
      func(msg) {
        if (msg.author == oldAuthor and msg.content == oldContent) {
          { author = oldAuthor; content = newContent };
        } else {
          msg;
        };
      }
    );
    messages.clear();
    messages.addAll(newMessages.values());
  };

  public shared ({ caller }) func deleteMessage(author : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete messages");
    };

    let filteredMessages = messages.toArray().filter(
      func(msg) { not (msg.author == author and msg.content == content) }
    );
    messages.clear();
    messages.addAll(filteredMessages.values());
  };
};

