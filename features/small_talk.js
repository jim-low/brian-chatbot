const context = require('../bot/botkit/context.js');
const natural = require('natural')
const Tokenizer = new natural.WordTokenizer();
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const classifier = require('../bot/classifier');
const classifications = require('../bot/botkit/classifications');

module.exports = function(controller) {
    controller.on('channel_join', async (bot, message) => {
        await bot.reply(message, `Hello! My name is ${context.botName}. How can I help you?`)
    })

    controller.hears(message => {
        context.greetingType = classifier.classify(message.text)

        if (context.greetingType == classifications.greetings.name) {
            context.userName = tags.filter(word => word.tag == "NNP").map(word => word.token).join(" ");
            return true;
        }
        else if (context.greetingType == classifications.greetings.niceToMeetYou || context.greetingType == classifications.greetings.hello) {
            return true;
        }
        return false;

    }, 'message', async (bot, message) => {
        if (context.greetingType == classifications.greetings.name) {
            await bot.reply(message, `Fuck you, ${context.userName}`);
        }
        else if (context.greetingType == classifications.greetings.hello) {
            await bot.reply(message, "Hello, what's your name?");
        }
        else if (context.greetingType == classifications.greetings.niceToMeetYou) {
            await bot.reply(message, "Fuck you. How can I help?")
        }
    })

    controller.hears(['how do you do', 'how was your day', 'how was your week', 'how are you'], 'message', async (bot, message) => {
        await bot.reply(message, 'I am doing great! I went to Sawcon last week. How can I help you?')
    })

    controller.hears(['what can you do', 'what do you do', 'what you do', 'who are you'], 'message', async (bot, message) => {
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
