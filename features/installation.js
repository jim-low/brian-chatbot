
module.exports = function(controller) {
    controller.hears('Atmosphere SKY', 'message', async(bot, message) => {
        await bot.reply(message, '<img src="../images/atmosphere_sky.png" alt="Atmosphere_sky.png" width="200" height="300">');
        await bot.reply(message, `This is what the Atmosphere sky Looks like. If you need the installation guide, you can refer here<br>
        <a href="https://zingtree.com/show/395467186#2">Installation Guide</a>`);
    });

    controller.hears('espring', 'message', async(bot, message) => {
        await bot.reply(message, '<img src="../images/eSpring_water_treatment_system.png" alt="espring.png" width="200" height="300">');
        await bot.reply(message, `This is what the ESpring Water Treatment system Looks like. If you need the installation guide, you can refer here<br>
        <a href="https://zingtree.com/show/795370412">Installation Guide</a>`);
    });

    controller.hears('atmosphere drive', 'message', async(bot, message) => {
        await bot.reply(message, '<img src="../images/atmosphere_drive.png" alt="espring.png" width="200" height="200">');
        await bot.reply(message, `This is what the Atmosphere Drive Looks like. If you need the installation guide, unfortunately, we do not have the data for that yet.`);
    });

    controller.hears(['know more','buy','purchase'],'message', async(bot, message) => {
        await bot.reply(message, 'Unfortunately i cannot help you with the details of our company products, I am an after-sales bot. If you wish to purchase items. You can refer to our site.');
    });

    controller.hears(['installation','install'],'message', async(bot, message) => {
        await bot.reply(message, {
            text: "We currently only have installation information of the following products.",
            quick_replies: [
                {
                    title: "Atmoshpere Sky",
                    payload: "Show me the installation for atmosphere sky."
                },
                {
                    title: "ESpring",
                    payload: "Show me the installation for the Espring Water Treatment System."
                }
            ]
        })      

    });
}   