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
        context.currIntent = classifier.classify(message.text)

        if (context.currIntent == classifications.small_talk.name) {
            const tags = tagger.tag(Tokenizer.tokenize(message.text)).taggedWords;
            context.userName = tags.filter(word => word.tag == "NNP").map(word => word.token).join(" ");
            return true;
        }
        return false;

    }, 'message', async (bot, message) => {
        await bot.reply(message, `Fuck you, ${context.userName}`);
    })

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.small_talk.hello;
    }, 'message', async (bot, message) => {
        await bot.reply(message, "Hello, what's your name?");
    })

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.small_talk.niceToMeetYou;
    }, 'message', async (bot, message) => {
        await bot.reply(message, "Fuck you, how can I help?");
    })

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.small_talk.whatDoYouDo
    }, 'message', async (bot, message) => {
        await bot.reply(message, `I am a chatbot titled ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`)
        await bot.reply(message, 'I am able to have a painful conversation with you as well as providing after sales information for you.');
        await bot.reply(message, {
            text: "I am also well equipped with many fun facts! Do have a hear!",
            quick_replies: [
                {
                    title: "Fun Fact",
                    payload: "Give me a fun fact!"
                },
                {
                    title: "After Sales Help",
                    payload: "help"
                },
                {
                    title: "Cancel",
                    payload: "Let me explore around a bit"
                },
            ]
        });
    })
}
