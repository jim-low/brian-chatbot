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
});
