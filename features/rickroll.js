const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');

module.exports = function(controller) {
    controller.hears(message => getIntent(message.text, classifications.joke.rickroll), 'message', async (bot, message) => {
        await bot.reply(message, 'congratulations, you have decided to get rick rolled');
        await bot.reply(message,
            `<video width="320" height="240" autoplay>
            <source src="./rickroll.mp4" type="video/mp4">
            Your browser does not allow your rick roll.
            </video>`);
    })
}   
