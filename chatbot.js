// import ChatBot from "chatbot"

// var config = {
//     // what inputs should the bot listen to? this selector should point to at least one input field
//     inputs: '#humanInput',
//     // if you want to show the capabilities of the bot under the search input
//     inputCapabilityListing: true,
//     // optionally, you can specify which conversation engines the bot should use, e.g. webknox, spoonacular, or duckduckgo
//     engines: [ChatBot.Engines.duckduckgo()],
//     // you can specify what should happen to newly added messages
//     addChatEntryCallback: function(entryDiv, text, origin) {
//         entryDiv.slideDown();
//     }
// };

// ChatBot.init(config);
// ChatBot.setBotName("Brian The Insufferable")

// ChatBot.addPattern(
//     "(?:my name is|I'm|I am) (.*)",
//     "response",
//     "Hi $1, thanks for talking to me today", 
//     function(matches){
//         ChatBot.setHumanName(matches[1]);
//     },
//     "Say 'My name is [name]' to be called by your name."
// );        
 
// ChatBot.addPattern("^hi$","response","Howdy my friend", undefined, "Say 'Hi' to be greeted.");
 
// ChatBot.addPattern(
//     "compute ([0-9]+) plus ([0-9]+)", 
//     "response", 
//     undefined, 
//     function (matches) {
//         ChatBot.addChatEntry("That would be "+(1*matches[1]+1*matches[2])+".","bot");
//     },
//     "Say 'compute [number] plus [number]' to make the bot your math monkey"
// );

// var sampleConversation = [
//     "Hi",
//     "My name is Botty McBotface",
//     "Bye"
// ];
 
// // play the conversation, second parameter is the pause between the inputs in milliseconds
// ChatBot.playConversation(sampleConversation,4000)

// var myengine = function() {
    
//     var capabilities = [
//         "If you say 'hip hip', the bot says hooray"
//     ]
 
//     return {
//         react: function (query) {
            
//             var content = '';
//             if (query == 'hip hip') {
//                 content = 'hooray';
//             }
            
//             ChatBot.addChatEntry(content, "bot");
//             ChatBot.thinking(false);
  
//         },
//         getCapabilities: function() {
//             return capabilities;
//         },
//         getSuggestUrl: function() {
//             return 'https://yourserver/uniboxSuggests?query=';
//         }
//     }
// }();
