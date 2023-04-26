const context = require('../bot/botkit/context.js');
const nlp = require('compromise');

module.exports = function(controller) {

    controller.on('channel_join', async (bot, message) => {
        await bot.reply(message, `Hello! My name is ${context.botName}. How can I help you?`)
    })

    controller.hears(['halo', 'hallo', 'hello', 'hi', 'greetings'], 'message', async (bot, message) => {
        await bot.reply(message, "Hello, whats your name?");
    })

    controller.hears(message => {

        const doc = nlp(message.text);
        if (doc.has("name") && doc.has("#Noun") || doc.has("#Singular")) {
            context.userName = doc.match("#ProperNoun").toTitleCase().text();
            return true;
        }
        return false;

    }, 'message', async (bot, message) => {
        await bot.reply(message, `Fuck you, ${context.userName}`);
    })

    controller.hears('nice to meet you', 'message', async (bot, message) => {
        await bot.reply(message, "Fuck you. How can I help?")
    })

    controller.hears(['how do you do', 'how was your day', 'how was your week', 'how are you'], 'message', async (bot, message) => {
        await bot.reply(message, 'I am doing great! I went to Sawcon last week. How can I help you?')
    })

    controller.hears(['what can you do', 'what do you do', 'what you do'], 'message', async (bot, message) => {
        await bot.reply(message, `I am a chatbot titled ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`)
        await bot.reply(message, 'I am able to have a painful conversation with you as well as recommend and provide you with information on certain products.');
        await bot.reply(message, {
            text: "I am also well equipped with many fun facts! Do have a hear!",
            quick_replies: [
                {
                    title: "Fun Fact",
                    payload: "Give me a fun fact!"
                },
                {
                    title: "Products",
                    payload: "Show me your products!"
                },
                {
                    title: "Search for product",
                    payload: "I want to look for a product"
                },
                {
                    title: "Cancel",
                    payload: "Let me explore around a bit"
                },
            ]
        });
    })
}
