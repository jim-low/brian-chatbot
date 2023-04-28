module.exports = function(controller) {
    controller.hears("rick roll", 'message', async (bot, message) => {
        await bot.reply(message,
            `<video width="320" height="240" autoplay>
        <source src="./rickroll.mp4" type="video/mp4">
      Your browser does not allow your rick roll.
      </video>`)
    })
}   
