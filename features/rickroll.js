const context = require('../bot/botkit/context.js');
const natural = require('natural')
const Tokenizer = new natural.WordTokenizer();
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const classifier = require('../bot/classifier');
const classifications = require('../bot/botkit/classifications');

module.exports = function(controller) {
    controller.hears(message => {
        context.currIntent = classifier.getClassifications(message.text)[0].label;
        return context.currIntent == classifications.joke.rickroll;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'congratulations, you have decided to get rick rolled');
        await bot.reply(message,
            `<video width="320" height="240" autoplay>
            <source src="./rickroll.mp4" type="video/mp4">
            Your browser does not allow your rick roll.
            </video>`);
    })
}   
