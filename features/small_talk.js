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
        if (doc.has("#ProperNoun")) {
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

    controller.hears('how do you do', 'message', async (bot, message) => {
        await bot.reply(message, 'I am doing great! I went to Sawcon last week. How can I help you?')
    })

}
