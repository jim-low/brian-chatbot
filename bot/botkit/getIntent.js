const context = require('./context');
const natural = require('natural')
const classifier = require('../classifier');

function getIntent(message, intentedIntent) {
    context.currIntent = classifier.getClassifications(natural.PorterStemmer.tokenizeAndStem(message).join(' '))[0].label
    console.log(context.currIntent);
    return context.currIntent == intentedIntent;
}

module.exports = getIntent
