module.exports = function(controller) {

    controller.on('Cooking', async(bot, message) => {
        await bot.reply(message, 'Here are the available products');
        await bot.reply(message, "Philips Food Processor 7000 Series\n HI");
    });

}