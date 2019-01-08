
exports.handler = function(context, event, callback) {

    const body = event.Body ? event.Body.toLowerCase(): null ;
    
//   const fs = require('fs'); //Opening a private JSON does not need fs 
   let file = Runtime.getAssets()['weather.json'].open(); //Opening the JSON file stored in Twilio Assets 

//    let text = fs.readFileSync(file).toString('utf-8');
//    let jsonobj = JSON.stringify(file);
    let jsonobj1 = JSON.parse(file); // Parse the JSON file to Javascript object array 
    console.log(jsonobj1) // Check the file has been parse correctly on the console
    
    var key = body; //In Twilio function, the body constant though inherit BODY event but cannot be used for later uses. declaring a var to inherit body 
    var keyval = "" //the var to obtain the value property of the key 

//Check for a special key 
if (key === "all") {
    // Print out the whole JS array 
    keyval = JSON.stringify(jsonobj1.forecasts);
//    console.log(keyval + " all");
}
    // looping through the JSON Javascript object array
    else
for (var i = 0; i < jsonobj1.forecasts.length; i++){
     var obj =jsonobj1.forecasts[i]
     if (obj.area.toLowerCase() === key.toLowerCase()) { //Using lowercase for matching
         //obtaining the value property of the key matched in the key-value array 
         keyval = obj.forecast;
     }
      
// console.log("the search result is " + keyval); // including this will print out the length of the array - only for debugging
}

//    keyval = jsonobj1.forecasts['key']; // this only work for JSON JS object but the imported file is JSON JS array instead
    console.log("The key is " + key +" , " + keyval);
    var resp = "The weather in " + body + " is "+ keyval; //constructing the message response, twilio twl does not support var within
    let twiml = new Twilio.twiml.MessagingResponse();
    twiml.message(resp); // using the var that contains the complete reponse message
    console.log(resp + " " + keyval);
    
//  var jsonobj = {'area' : 'forecast'}

//  console.log('Your file contents: ' + text);
    
    callback(null, twiml);
}  

