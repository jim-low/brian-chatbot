module.exports = function(controller) {
    controller.hears('let me explore around a bit', 'message', async (bot, message) => await bot.reply(message, "You boring sack of sh-"));

}
