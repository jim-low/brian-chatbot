const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');

module.exports = function(controller) {
    controller.hears(message => getIntent(message.text, classifications.inquiries.repair), 'message', async (bot, message) => {
        await bot.reply(message, 'We have a 100% satisfaction guaranteed policy that allows you to opt for a 100% refund or a change in product.');
        await bot.reply(message, 'Our 100% satisfaction guaranteed policy is only available if it meets our Terms and Conditions.');
        await bot.reply(message, {
            text: "What would you like to explore?",
            quick_replies: [
                {
                    title: "Terms and Conditions",
                    payload: "Let me see your Terms and Conditions"
                },
                {
                    title: "100% refund",
                    payload: "I would like the 100% refund"
                },
                {
                    title: "Change product",
                    payload: "I would like to change products"
                }
            ]
        })
    })

    controller.hears(message => getIntent(message.text, classifications.inquiries.workingHours), 'message',
        async (bot, message) => {
            await bot.reply(message, 'I am currently only available when my server is enabled manually.');
            await bot.reply(message, 'However, if in the future a server was dedicated to me. I would be available all the time.');
            await bot.reply(message, 'You may try to report me, but i dont think you are good enough for that.');
    })

    controller.hears(message => getIntent(message.text, classifications.inquiries.troubleshoot),'message', async(bot, message) => {
            await bot.reply(message, {
                text: "Are you having trouble with your a product? Or do you need help with searching our shops? We are currently offering the following services.",
                quick_replies: [
                    {
                        title: "Shop Locations",
                        payload: "Show me your available shops"
                    },
                    {
                        title: "Warranty",
                        payload: "I would like to see your warranty information"
                    },
                    {
                        title: "Installation",
                        payload: "I would like to see your installation information"
                    },
                    {
                        title: "Repair",
                        payload: "I would like to see repair information"
                    }
                ]
        })      
    });
}
