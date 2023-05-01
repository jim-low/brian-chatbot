const context = require('../bot/botkit/context.js');
const natural = require('natural')
const Tokenizer = new natural.WordTokenizer();
const Stemmer = natural.PorterStemmer;
const Analyzer = new natural.SentimentAnalyzer("English", Stemmer, "afinn");
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const classifier = require('../bot/classifier');
const classifications = require('../bot/botkit/classifications');


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

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.joke.book;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'I have read "The Subtle Art of Not Giving a Fuck" by Mark Manson');
        await bot.reply(message, 'I highly recommend it');
    });

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        const result = Analyzer.getSentiment(Tokenizer.tokenize(message.text));
        return context.currIntent == classifications.joke.iDontGiveAFuck || result < 0;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'Well I dont give a fuck');
    })

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.offend.thatIsThePoint;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'that is the point');
    });

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.joke.meToo;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'me too');
    });

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.joke.noU;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'no u');
    });

    controller.hears(message => {
        context.currIntent = classifier.classify(message.text)
        return context.currIntent == classifications.joke.askQuestion;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'no');
    });

    controller.hears(message => {
        return context.currIntent == classifications.joke.tellMeJoke;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'You');
    })

    controller.hears(message => {
        return context.currIntent == classifications.joke.move;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'I can move at night while you sleep.');
    })

    controller.hears(message => {
        return context.currIntent == classifications.offend.relationships;
    }, 'message', async (bot, message) => {
        await bot.reply(message, 'You dont have it');
    })

    controller.hears(message => {
        return context.currIntent == classifications.offend.goodToEat;
    }, 'message', async (bot, message) => {
        await bot.reply(message, "Yo mom's ass");
    })

    controller.hears(message => {
        return context.currIntent == classifications.dumb_talk.whatsUrBiz;
    }, 'message', async (bot, message) => {
        await bot.reply(message, "None of your business");
    })

    controller.hears('why am i even here', 'message', async (bot, message) => {
        await bot.reply(message, 'Just to suffer, of course');
    })

    controller.hears(['screw u', 'screw you'], 'message', async (bot, message) => await bot.reply(message, "no u"));
}
