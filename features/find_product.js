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
        return context.currIntent == classifications.inquiries.findProduct
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'well you can LOOK AT DEEZ NUTZZZZZZZ');
        await bot.reply(message, 'anyway, unfortunately i cannot help you with the details of our company products, I am an after-sales bot. If you wish to purchase items. You can refer to our site.');
        await bot.reply(message, `<a href="https://www.amway.my/">Our Website</a>`);
    })
}
