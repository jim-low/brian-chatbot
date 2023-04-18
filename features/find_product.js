module.exports = function(controller) {
    controller.hears('i want to look for a product', 'message', async (bot, message) => {
        await bot.reply(message, 'well you can LOOK AT DEEZ NUTZZZZZZZ');
    })
}
