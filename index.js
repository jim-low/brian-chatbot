// link for reference: https://stormotion.io/blog/how-to-make-a-chatbot-using-js/#:~:text=In%20order%20to%20implement%20a,good%20choice%20for%20this%20task.

    // import { NlpManager } from "node-nlp";
// import { createInterface } from "readline";
// import defaults from "./bot/defaults.js"

// const manager = new NlpManager({ languages: ["en"] });
// manager.load();

// var rl = createInterface(process.stdin, process.stdout);

// console.log(`Welcome! Have a chat with ${defaults.botName}.`);

// rl.setPrompt("You: ");
// rl.prompt();
// rl.on("line", async function (line) {
    //     const response = await manager.process("en", line);
    //     console.log(`Brian: ${response.answer}`);
    //     console.log();
    //     rl.prompt();
    // }).on("close", function () {
        //     process.exit(0);
        // });

// ============ ABOVE HERE IS FROM NODE-NLP VERSION 3 ============

    // ============ BELOW HERE IS FROM NODE-NLP VERSION 4 ============

    import { dockStart } from '@nlpjs/basic';

(async () => {
    const dock = await dockStart({
        settings: {
            nlp: {
                forceNER: true,
                languages: ['en'],
                corpora: [
                    "./corpus.json"
                ]
            }
        },
        use: ['Basic', 'LangEn'],
    });

    const manager = dock.get('nlp');

    // Train the network
    await manager.train();

    // best thing about this is that i have absolutely no idea what the difference is
    // but it looks like we can alter a bit of the sentence by adding templates and placeholders
    const result = await manager.process('en', 'I saw spooderman eating spaghetti today in the city!');
    console.log(JSON.stringify(result, null, 2));

    // Output:
    // {
        //   "locale": "en",
        //   "utterance": "I saw spiderman eating spaghetti today in the city!",
        //   "languageGuessed": false,
        //   "localeIso2": "en",
        //   "language": "English",
        //   "nluAnswer": {
            //     "classifications": [
                //       {
                    //         "intent": "sawhero",
                    //         "score": 0.9999886119117264
                    //       },
                //       {
                    //         "intent": "wanteat",
                    //         "score": 0.000011388088273636744
                    //       }
                //     ]
            //   },
        //   "classifications": [
            //     {
                //       "intent": "sawhero",
                //       "score": 0.9999886119117264
                //     },
            //     {
                //       "intent": "wanteat",
                //       "score": 0.000011388088273636744
                //     }
            //   ],
        //   "intent": "sawhero",
        //   "score": 0.9999886119117264,
        //   "domain": "default",
        //   "optionalUtterance": "I saw @hero eating @food today in the city!",
        //   "sourceEntities": [],
        //   "entities": [
            //     {
                //       "start": 6,
                //       "end": 14,
                //       "len": 9,
                //       "levenshtein": 0,
                //       "accuracy": 1,
                //       "entity": "hero",
                //       "type": "enum",
                //       "option": "spiderman",
                //       "sourceText": "spiderman",
                //       "utteranceText": "spiderman",
                //       "alias": "hero_0"
                //     },
            //     {
                //       "start": 23,
                //       "end": 31,
                //       "len": 9,
                //       "levenshtein": 0,
                //       "accuracy": 1,
                //       "entity": "food",
                //       "type": "enum",
                //       "option": "pasta",
                //       "sourceText": "Spaghetti",
                //       "utteranceText": "spaghetti",
                //       "alias": "food_0"
                //     }
            //   ],
        //   "answers": [],
        //   "actions": [],
        //   "sentiment": {
            //     "score": 0.708,
            //     "numWords": 9,
            //     "numHits": 2,
            //     "average": 0.07866666666666666,
            //     "type": "senticon",
            //     "locale": "en",
            //     "vote": "positive"
            //   }
        // }    
})();
