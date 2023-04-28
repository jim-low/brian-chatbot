const context = require('../bot/botkit/context.js');


module.exports = function(controller) {

    controller.hears(['cooking','kitchenware','kitchen ware'], 'message', async (bot, message) => {
        await bot.reply(message, 'Here are our products.');
        await bot.reply(message, "1) Philips Food Processor");
        await bot.reply(message, "The Philips Food Processor 7000 Series is the versatile solution for your kitchen needs. It comes with a few accessories");
    })

    controller.hears(['Home care', 'Homecare'], 'message', async (bot, message) => {
        await bot.reply(message, 'Here are our products.');
        await bot.reply(message, "1) Philips Food Processor");
        await bot.reply(message, "The Philips Food Processor 7000 Series is the versatile solution for your kitchen needs. It comes with a few accessories");
        await bot.reply(message, "2) Philips SpeedPro Vaccum Cleaner");
        await bot.reply(message, "Our 3-in-1 vacuum, mop and handheld system cleans hard floors and carpets efficiently with a powerful 360-degree suction nozzle that captures dust and dirt faster from all sides. Now in a beautiful champagne colour with an improved run time of 75 minutes (Eco Mode).");
    })

    controller.hears('wellness', 'message', async (bot, message) => {
        await bot.reply(message, 'Sorry, if you are looking for our wellness products, we have no registered products on our data at the moment for this category.');
    })

    controller.hears(['Electrical Appliances', 'Electronic'], 'message', async (bot, message) => {
        await bot.reply(message, 'Here are our products.');
        await bot.reply(message,
            `1) Philips Food Processor
            <br><br>
            The Philips Food Processor 7000 Series is the versatile solution for your kitchen needs. It comes with a few accessories`);
        await bot.reply(message, "<img src=\"./images/atmosphere_drive.png\" alt=\"deez nuts\" width=\"400\" height=\"400\" />");
        await bot.reply(message, "2) Philips SpeedPro Vaccum Cleaner");
        await bot.reply(message, "Our 3-in-1 vacuum, mop and handheld system cleans hard floors and carpets efficiently with a powerful 360-degree suction nozzle that captures dust and dirt faster from all sides. Now in a beautiful champagne colour with an improved run time of 75 minutes (Eco Mode).");
    })

    controller.hears(['Electrical Appliances', 'Electronic'], 'message', async (bot, message) => {
        await bot.reply(message, 'Here are our products.');
        await bot.reply(message, "1) Philips Food Processor");
        await bot.reply(message, "The Philips Food Processor 7000 Series is the versatile solution for your kitchen needs. It comes with a few accessories");
        await bot.reply(message, "2) Philips SpeedPro Vaccum Cleaner");
        await bot.reply(message, "Our 3-in-1 vacuum, mop and handheld system cleans hard floors and carpets efficiently with a powerful 360-degree suction nozzle that captures dust and dirt faster from all sides. Now in a beautiful champagne colour with an improved run time of 75 minutes (Eco Mode).");
        await bot.reply(message, "3) ATMOSPHERE DRIVE");
        await bot.reply(message, "Atmosphere DRIVE: “Clarity from Within” / The Atmosphere DRIVE Car Air Treatment System is a new and unique portable air purifier for your car. This filtration device helps provide cleaner air inside cars, helping you to have clarity and peace of mind whenever you’re on the road.");
        await bot.reply(message, "4) ATMOSPHERE SKY");
        await bot.reply(message, "Enjoy cleaner indoor air with the Atmosphere SKY Air Treatment System! Get rid of air pollutants from viruses to mildew with its triple filter air treatment system — removing up to 99.99% of particles as small as 0.0024 microns.");
    })

    controller.hears('Vacuum', 'message', async (bot, message) => {
        await bot.reply(message, "1) Philips SpeedPro Vaccum Cleaner");
        await bot.reply(message, "Our 3-in-1 vacuum, mop and handheld system cleans hard floors and carpets efficiently with a powerful 360-degree suction nozzle that captures dust and dirt faster from all sides. Now in a beautiful champagne colour with an improved run time of 75 minutes (Eco Mode).");
    })
}