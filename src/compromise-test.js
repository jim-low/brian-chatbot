import nlp from "compromise"
import plg from "compromise-speech"
nlp.extend(plg)

let doc = nlp("one plus one is two. six times nine is unfortunately not sixty nine. but rest assured, he will never give you up and he will never let you down.")
console.log(doc.numbers())
console.log(doc.adjectives())
console.log(doc.nouns())
console.log(doc.verbs())
console.log(doc.people())
console.log(doc.places())

console.log(doc.has("give you up"))
console.log(doc.has("give #Noun up"))
console.log(doc.has("he #Verb never"))
console.log(doc.has("#Adjective"))

console.log(doc.json())

console.log(doc.text())
doc.verbs().toPastTense()
console.log(doc.text())
