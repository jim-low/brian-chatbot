module.exports = function(controller) {
    controller.hears(/terms and conditions/gi, 'message', async (bot, message) => {
        await bot.reply(message, 'only nerds read terms and conditions lmao');
        await bot.reply(message, 'but here u go');
    })
}
