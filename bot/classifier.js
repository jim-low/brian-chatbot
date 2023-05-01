const { PorterStemmer, BayesClassifier } = require("natural")
const classifier = new BayesClassifier();
const classifications = require("./botkit/classifications")
const dataset = require("./botkit/small-talk-dataset.json")

dataset.data.forEach(foo => {
    console.log(foo.intent)
    foo.sentences.forEach(sentence => {
        console.log(sentence)
        classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), foo.intent)
    })
    console.log()
    console.log()
})

console.log("Trained!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
classifier.train();

module.exports = classifier
