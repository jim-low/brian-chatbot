const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');
const stemmer = natural.PorterStemmer;
const Tokenizer = new natural.WordTokenizer();
const Analyzer = new natural.SentimentAnalyzer("English", stemmer, "afinn");

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

    controller.hears(message => getIntent(message.text, classifications.joke.book),
        'message', async (bot, message) => {
            await bot.reply(message, 'I have read "The Subtle Art of Not Giving a F***" by Mark Manson');
            await bot.reply(message, 'I highly recommend it');
        });

    controller.hears(message => {
        const result = Analyzer.getSentiment(Tokenizer.tokenize(message.text));
        return getIntent(message.text, classifications.joke.iDontGiveAFuck) && result < 0;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'Well, I do not give a fook');
    })

    controller.hears(message => getIntent(message.text, classifications.offend.thatIsThePoint), 'message', async (bot, message) => {
        await bot.reply(message, 'that is the point');
    });

    controller.hears(message => getIntent(message.text, classifications.joke.meToo), 'message', async (bot, message) => {
        await bot.reply(message, 'me too');
    });

    controller.hears(message => getIntent(message.text, classifications.joke.noU), 'message', async (bot, message) => {
        await bot.reply(message, 'no u');
    });

    controller.hears(message => getIntent(message.text, classifications.joke.askQuestion), 'message', async (bot, message) => {
        await bot.reply(message, 'no');
    });

    controller.hears(message => getIntent(message.text, classifications.joke.tellMeJoke), 'message', async (bot, message) => {
        await bot.reply(message, 'You');
    })

    controller.hears(message => getIntent(message.text, classifications.joke.move), 'message', async (bot, message) => {
        await bot.reply(message, 'I can move at night while you sleep.');
    })

    controller.hears(message => getIntent(message.text, classifications.offend.relationships), 'message', async (bot, message) => {
        await bot.reply(message, 'You dont have it');
    })

    controller.hears(message => getIntent(message.text, classifications.offend.goodToEat),
        'message', async (bot, message) => {
            await bot.reply(message, "Yo mom's a-");
        })

    controller.hears(message => getIntent(message.text, classifications.dumb_talk.whatsUrBiz), 'message', async (bot, message) => {
        await bot.reply(message, "None of your business");
    })

    controller.hears('why am i even here', 'message', async (bot, message) => {
        await bot.reply(message, 'Just to suffer, of course');
    })

    controller.hears(['screw u', 'screw you'], 'message', async (bot, message) => await bot.reply(message, "no u"));
}
