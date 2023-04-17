//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the Brian the Insufferable bot.
const controller = require('./bot/botkit/init.js');
const nlp = require('compromise');
const context = require('./bot/botkit/context.js');

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    /* catch-all that uses the CMS to trigger dialogs */
        if (controller.plugins.cms) {
            controller.on('message,direct_message', async (bot, message) => {
                let results = false;
                results = await controller.plugins.cms.testTrigger(bot, message);

                if (results !== false) {
                    // do not continue middleware!
                        return false;
                }
            });
        }

    // our code starts here
    controller.on('channel_join', async (bot, message) => {
        await bot.reply(message, `Hello! My name is ${context.botName}. How can I help you?`)
    })

    // introduction / greetings / small talk
    controller.hears(['halo', 'hallo', 'hello', 'hi', 'greetings'], 'message', async (bot, message) => {
        await bot.reply(message, "Hello, whats your name?");
    })

    controller.hears('Jim Low Lap Hong', 'message', async (bot, message) => {
        await bot.reply(message, 'Jim Low Yap Hong lmao');
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

    // inquiries / services
    controller.hears(['what products do you have', 'show me your products'], 'message', async (bot, message) => {
        await bot.reply(message, {
            text: "What would you like to see?",
            quick_replies: [
                {
                    title: "Home Care",
                    payload: "Home Care"
                },
                {
                    title: "Wellness",
                    payload: "Wellness"
                },
                {
                    title: "Electrical Appliances",
                    payload: "Electrical Appliances"
                },
                {
                    title: "Kitchenware",
                    payload: "Kitchenware"
                },
                {
                    title: "Vacuum",
                    payload: "Vacuum"
                },
                {
                    title: "Cooking",
                    payload: "Cooking"
                },
            ]
        })
    })

    controller.hears('what can you do', 'message', async (bot, message) => {
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
                    title: "Cancel",
                    payload: "Let me explore around a bit"
                }
            ]
        });
    })

    // existential crisis
    controller.hears('why am i even here', 'message', async (bot, message) => {
        await bot.reply(message, 'Just to suffer, of course');
    })

    controller.hears(['screw u', 'screw you'], 'message', async (bot, message) => await bot.reply(message, "no u"));

    controller.hears('let me explore around a bit', 'message', async (bot, message) => await bot.reply(message, "You boring sack of sh-"));

    // deez nutz
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
});
