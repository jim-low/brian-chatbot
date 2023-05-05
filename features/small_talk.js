const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');
const lexicon = new natural.Lexicon("EN", 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const Tokenizer = new natural.WordTokenizer();

module.exports = function(controller) {
    controller.hears(message => {
        if (getIntent(message.text, classifications.small_talk.name)) {
            const tags = tagger.tag(Tokenizer.tokenize(message.text)).taggedWords;
            context.userName = tags.filter(word => word.tag == "NNP").map(word => word.token).join(" ");
            return true;
        }
        return false;

    }, 'message', async (bot, message) => {
        await bot.reply(message, `Hello, ${context.userName}! my name is ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`);
        await bot.reply(message, 'I am able to provide mental difficulties as well as after sales information for you.');
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
        })
    })

    controller.hears(message => getIntent(message.text, classifications.small_talk.hello), 'message', async (bot, message) => {
        await bot.reply(message, `Hello! my name is ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`);
        await bot.reply(message, 'I am able to provide mental difficulties as well as after sales information for you.');
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
        })
    })

    controller.hears(message => getIntent(message.text, classifications.small_talk.niceToMeetYou),
        'message', async (bot, message) => {
            await bot.reply(message, "How can I help?");
        })

    controller.hears(message => getIntent(message.text, classifications.small_talk.whatDoYouDo), 'message', async (bot, message) => {
        await bot.reply(message, `I am a chatbot titled ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`)
        await bot.reply(message, 'I am able to provide mental difficulties as well as after sales information for you.');
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
