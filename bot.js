//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the Brian the Insufferable bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const nlp = require('compromise');

// Import a platform-specific adapter for web.

const { WebAdapter } = require('botbuilder-adapter-web');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file
require('dotenv').config();

let storage = null;
if (process.env.MONGO_URI) {
    storage = mongoStorage = new MongoDbStorage({
        url : process.env.MONGO_URI,
    });
}


const adapter = new WebAdapter({});


const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapter: adapter,

    storage
});

if (process.env.CMS_URI) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN,
    }));
}

const context = { 
    botName: "Brian the Insufferable",
    jokes: {
        deeznutz: {
            "sawcon": "SAWCON DEEZ NUTZZZZZZZZZZ",
            "stairs": "STAIR AT DEEZ NUTZZZZZZZZZZZZ",
            "ligma": "LIGMA NUTZZZZZZZZZZ",
            "sugma": "SUGMA NUTZZZZZZZZZ",
            "sugon": "SUGON DEEZ NUTZZZZZZZZZZZZZZ",
        },
        fun_facts: [
            "Have you heard of Ligma? It seems to be a pretty serious disease.",
            "Have you been to Sawcon? It was really fun!",
            "Have you walked those stairs before? There were some rumours going on about it.",
            "Have you heard of Sugma? A lot of athletes have been going there lately!",
            "Have you seen a Sugon? The government appears to be keeping it a secret...",
        ]
    }
}
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

    controller.hears(['halo', 'hallo', 'hello', 'hi', 'greetings'], 'message', async (bot, message) => {
        await bot.reply(message, "Hello, whats your name?");
    })

    controller.hears('Jim Low Lap Hong', 'message', async (bot, message) => {
        await bot.reply(message, 'Jim Low Yap Hong lmao');
    })

    controller.hears(message => {

        const doc = nlp(message.text);
        if (doc.has("#Person")) {
            context.userName = doc.match("#Person").toTitleCase().text();
            return true;
        }
        return false;

    }, 'message', async (bot, message) => {
        await bot.reply(message, `Fuck you, ${context.userName}`);
    })

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

    controller.hears('nice to meet you', 'message', async (bot, message) => {
        await bot.reply(message, "Fuck you. How can I help?")
    })

    controller.hears('how do you do', 'message', async (bot, message) => {
        await bot.reply(message, 'I am doing great! I went to Sawcon last week. How can I help you?')
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

    controller.hears('why am i even here', 'message', async (bot, message) => {
        await bot.reply(message, 'Just to suffer, of course');
    })

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

    controller.hears('screw u', 'message', async (bot, message) => await bot.reply(message, "no u"));
    controller.hears('let me explore around a bit', 'message', async (bot, message) => await bot.reply(message, "You boring sack of sh-"));
});
