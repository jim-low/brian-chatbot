import nlp from "compromise"

const doc = nlp("time flies like an arrow")
console.log(JSON.stringify(doc.json(), null, 2))
