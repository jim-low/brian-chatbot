import { dockStart } from '@nlpjs/basic';
import { readdirSync, readFileSync } from "fs";

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

        manager.addNerAfterLastCondition('en', 'name', ['am', 'im', 'is']); // this is temporary, just like our sufferings

        // TODO: add word conditions to extract context
    }

    train_save(manager);
})();
