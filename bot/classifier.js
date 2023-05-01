const { PorterStemmer, BayesClassifier } = require("natural")
const classifier = new BayesClassifier();
const classifications = require("./botkit/classifications")
const dataset = require("./botkit/small-talk-dataset.json")

dataset.data.forEach(foo => {
    foo.sentences.forEach(sentence => {
        classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), foo.intent)
    })
})

console.log("Trained!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
classifier.train();

module.exports = classifier
