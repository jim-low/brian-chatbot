const context = require('../bot/botkit/context');
const natural = require('natural')
const Analyzer = natural.SentimentAnalyzer;
const Tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const classifier = require('../bot/classifier');
const classifications = require('../bot/botkit/classifications');
const analyzer = new Analyzer("English", stemmer, "afinn");

module.exports = function(controller) {
    controller.hears(message => {
        context.currIntent = classifier.getClassifications(message.text)[0].label;
        return context.currIntent == classifications.inquiries.changeProduct
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'Our terms does not allow users to trade or convert purchased products.');
    })
}
