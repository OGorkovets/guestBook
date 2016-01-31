Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
	//subscribe client to Mongo DB
	Meteor.subscribe("messages");
	//after creating helpers we can acces name and message fields in any of our project files
	Template.guestBook.helpers({
		"messages" : function(){
		return Messages.find({}) || {};
			//return all message objects, or an empty object if DB is invalid
		}
	});
	
	//access gusetBook template object from html fileCreatedDate
	//and use built-in method events
  Template.guestBook.events(
		{
			"submit form": function(event){
				event.preventDefault();
				
				//this is jQeury statement 
				var messageBox = $(event.target).find('textarea[name=guestMessage]');
				
				var messageText = messageBox.val();
				
				var nameBox = $(event.target).find('input[name=guestName]');
				
				var nameText = nameBox.val();
				
				
				Messages.insert(
					{
							name: nameText,
							message: messageText,
							createdOn: Date.now()
					}
				);
				messageBox.val('');
				nameBox.val('');
				
				//alert("Name is " + nameText + ", msg is " + nameText);
				//alert("you clicked submit.");
			}
			
			
		}
	);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("messages", function(){
	  return Messages.find({}, {sort: {createdOn: - 1}}) || {};
  });
}
