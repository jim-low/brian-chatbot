import { dockStart } from '@nlpjs/basic';
// import { NlpManager } from "node-nlp";
import { readdirSync, readFileSync } from "fs";


// loop through files, parse the string to object, pass to manager instance to train and process
// this is for version 3
// for (const file of files) {
//     let data = readFileSync(`./intents/${file}`);
//     data = JSON.parse(data);
//     const intent = file.replace(".json", "");

//     for (const question of data.questions) {
//         manager.addDocument("en", question, intent);
//     }

//     for (const answer of data.answers) {
//         manager.addAnswer("en", intent, answer);
//     }
// }

// this is for version 4

async function train_save(manager) { // train and save manager instance
    await manager.train();
    const minified = true;
    const data = manager.export(minified);
    manager.save()
}

(async () => {
    const dock = await dockStart({
        settings: {
            nlp: {
                forceNER: true,
                languages: ['en']
            },
        },
        use: ['Basic', 'LangEn']
    });
    const manager = dock.get('nlp');
    const files = readdirSync("./intents"); // read intent files in intents folder

    for (const file of files) {
        let data = readFileSync(`./intents/${file}`)
        data = JSON.parse(data)
        const intent = file.replace(".json", "")

        for (const utterance of data.utterances) {
            manager.addDocument('en', utterance, intent);
        }

        for (const answer of data.answers) {
            manager.addAnswer('en', intent, answer)
        }

        // TODO: add word conditions to extract context
    }

    train_save(manager);
})();
