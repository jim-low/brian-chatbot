const { BayesClassifier } = require('natural')
const classifier = new BayesClassifier();
const classifications = require('./botkit/classifications')

// greetings without name
classifier.addDocument('hello', classifications.greetings.hello);
classifier.addDocument('hi', classifications.greetings.hello);
classifier.addDocument('hey', classifications.greetings.hello);
classifier.addDocument('yo', classifications.greetings.hello);
classifier.addDocument('sup', classifications.greetings.hello);
classifier.addDocument('whats up', classifications.greetings.hello);
classifier.addDocument('greetings', classifications.greetings.hello);
classifier.addDocument('nice to meet you', classifications.greetings.hello);
classifier.addDocument('hi nice to meet you', classifications.greetings.hello);
classifier.addDocument('hello nice to meet you', classifications.greetings.hello);
classifier.addDocument('hey nice to meet you', classifications.greetings.hello);

// greetings with name
classifier.addDocument('my name is Jim', classifications.greetings.name);
classifier.addDocument('you can call me Jim', classifications.greetings.name);
classifier.addDocument('i am Jim', classifications.greetings.name);
classifier.addDocument('im Jim', classifications.greetings.name);

// greetings -> "nice to meet you" kind
classifier.addDocument('nice to meet you', classifications.greetings.niceToMeetYou);
classifier.addDocument('how do you do', classifications.greetings.niceToMeetYou);
classifier.addDocument('pleasure to meet you', classifications.greetings.niceToMeetYou);
classifier.addDocument('its a pleasure', classifications.greetings.niceToMeetYou);

// greetings - bot introduction
classifier.addDocument('who are you', classifications.greetings.niceToMeetYou);
classifier.addDocument('what are you', classifications.greetings.niceToMeetYou);
classifier.addDocument('what can you do', classifications.greetings.niceToMeetYou);
classifier.addDocument('introduce yourself', classifications.greetings.niceToMeetYou);
classifier.addDocument('what can you do', classifications.greetings.niceToMeetYou);

console.log("Trained!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
classifier.train();

module.exports = classifier
