import { NlpManager } from "node-nlp";
import { readdirSync, readFileSync } from "fs";

const manager = new NlpManager({ languages: ["en"] });
const files = readdirSync("./intents"); // read intent files in intents folder

// loop through files, parse the string to object, pass to manager instance to train and process
for (const file of files) {
    let data = readFileSync(`./intents/${file}`);
    data = JSON.parse(data);
    const intent = file.replace(".json", "");
    for (const question of data.questions) {
        manager.addDocument("en", question, intent);
    }
    for (const answer of data.answers) {
        manager.addAnswer("en", intent, answer);
    }
}

async function train_save(){ // train and save manager instance
    await manager.train();
    manager.save();
}
train_save();
