const context = require('../bot/botkit/context.js');
const nlp = require('compromise');

module.exports = function(controller) {
    controller.hears('Jim Low Lap Hong', 'message', async (bot, message) => {
        await bot.reply(message, 'Jim Low Yap Hong lmao');
    })

    controller.hears('give me a fun fact', 'message', async (bot, message) => {
        const randomNum = Math.floor(Math.random() * context.jokes.fun_facts.length);
        const sentence = context.jokes.fun_facts[randomNum];
        await bot.reply(message, sentence);
    })

    controller.hears(message => {
        const trap = message.text.split(' ').at(-1).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        if (context.jokes.deeznutz.hasOwnProperty(trap)) {
            context.deeznut = trap;
            return true;
        }
    }, 'message', async (bot, message) => {
        await bot.reply(message, context.jokes.deeznutz[context.deeznut]);
        await bot.reply(message, 'got em');
    })

    controller.hears('why am i even here', 'message', async (bot, message) => {
        await bot.reply(message, 'Just to suffer, of course');
    })

    controller.hears(['screw u', 'screw you'], 'message', async (bot, message) => await bot.reply(message, "no u"));
}
