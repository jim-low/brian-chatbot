const natural = require('natural')
const Analyzer = natural.SentimentAnalyzer;
const Tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const classifier = require('../bot/classifier');
const classifications = require('../bot/botkit/classifications');
const analyzer = new Analyzer("English", stemmer, "afinn");
const NGrams = natural.NGrams;

module.exports = function(controller) {
    controller.hears(['warranty registration','register warranty'], 'message', async(bot, message) => {
        await bot.reply(message, 'In order to replace your product, you must have your product registered (if you have not done so) in the site.');
        await bot.reply(message, '1) You would need to search for the id number of your electronic.');
        await bot.reply(message, '2) Screenshot an image of your product.');
        await bot.reply(message, '3) Insert the details in our site and submit.');
        await bot.reply(message, 'Remember that our warranty services only apply to our electronical products.');
    });

    controller.hears(['warranty extension','extend warranty'], 'message', async(bot, message) => {
        await bot.reply(message, 'Warranty extension is provided only if you have registered your product warranty in our site, <b>within its warranty grace period.</b>');
        await bot.reply(message, 'This warranty extension may range anywhere from 3 months to a year, here are the applicable products.');
        await bot.reply(message, `<b>Atmosphere DRIVE</b><br>
                                Standard Warranty Duration: 12 months<br>
                                Warranty Registration Grace Period: 3 months<br>
                                Maximum Warranty Period: 3 months<br>`);
        await bot.reply(message, `<b>Atmosphere SKY</b><br>
                                Standard Warranty Duration: 60 months<br>
                                Warranty Registration Grace Period: 6 months<br>
                                Maximum Warranty Period: 66 months<br>`);
        await bot.reply(message, `<b>eSpring Treatment System</b><br>
                                Standard Warranty Duration: 24 months<br>
                                Warranty Registration Grace Period: 12 months<br>
                                Maximum Warranty Period: 36 months<br>`);
        await bot.reply(message, 'Remember that the warranty extension only applies to our products above.');
    });
    
    controller.hears('warranty', 'message', async (bot, message) => {
        const result = NGrams.bigrams(message.text);

        console.log(result)
        console.log(result.map(list => list.join(" ")).includes("no warranty"))

        if (result.map(list => list.join(" ")).includes("no warranty"))
        {
            //they have no warranty
            await bot.reply(message, 'Then i am unable to help you. please refer to our terms and conditions');
        }
        else {
            //they have warranty
            // await bot.reply(message, doc.text());
            await bot.reply(message, message);
            await bot.reply(message, {
                text: "Here are some of our warranty guidelines.",
                quick_replies: [
                    {
                        title: "Warranty Registration",
                        payload: "Show me your warranty registration."
                    },
                    {
                        title: "Warranty Extension",
                        payload: "I would like to see your warranty extension information"
                    },
                ]
            })      
        }
    })
}
