import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Comprehensive vocabulary data for all 10 levels
const VOCABULARY_DATA = {
  level1: {
    pronouns: [
      { german: "ich", english: "I", description: "Zeigefinger auf Brust", difficulty: 1, category: "pronouns" },
      { german: "du", english: "you", description: "Zeigefinger auf Gegenüber", difficulty: 1, category: "pronouns" },
      { german: "er", english: "he", description: "Zeigefinger nach vorne", difficulty: 1, category: "pronouns" },
      { german: "sie", english: "she/they", description: "Zeigefinger nach vorne", difficulty: 1, category: "pronouns" },
      { german: "wir", english: "we", description: "Kreisförmige Bewegung", difficulty: 1, category: "pronouns" },
      { german: "ihr", english: "you (plural)", description: "Zeigefinger auf mehrere", difficulty: 1, category: "pronouns" }
    ],
    responses: [
      { german: "ja", english: "yes", description: "Nicken mit Kopf", difficulty: 1, category: "responses" },
      { german: "nein", english: "no", description: "Kopf schütteln", difficulty: 1, category: "responses" },
      { german: "bitte", english: "please", description: "Hand zum Mund", difficulty: 1, category: "responses" },
      { german: "danke", english: "thank you", description: "Hand auf Herz", difficulty: 1, category: "responses" }
    ],
    basic_verbs: [
      { german: "sein", english: "to be", description: "Hände flach vor Körper", difficulty: 1, category: "basic_verbs" },
      { german: "haben", english: "to have", description: "Fäuste zeigen Besitz", difficulty: 1, category: "basic_verbs" },
      { german: "gehen", english: "to go", description: "Zeigefinger nach vorne", difficulty: 1, category: "basic_verbs" },
      { german: "kommen", english: "to come", description: "Zeigefinger zu sich", difficulty: 1, category: "basic_verbs" },
      { german: "sehen", english: "to see", description: "Von Augen weg", difficulty: 1, category: "basic_verbs" },
      { german: "hören", english: "to hear", description: "Hand an Ohr", difficulty: 1, category: "basic_verbs" },
      { german: "sprechen", english: "to speak", description: "An Mund zeigen", difficulty: 1, category: "basic_verbs" },
      { german: "essen", english: "to eat", description: "Hand zum Mund", difficulty: 1, category: "basic_verbs" },
      { german: "trinken", english: "to drink", description: "Hand zum Mund", difficulty: 1, category: "basic_verbs" },
      { german: "schlafen", english: "to sleep", description: "Kopf an Hände", difficulty: 1, category: "basic_verbs" }
    ],
    common_nouns: [
      { german: "wasser", english: "water", description: "W-förmige Hände", difficulty: 1, category: "common_nouns" },
      { german: "haus", english: "house", description: "Dachform mit Händen", difficulty: 1, category: "common_nouns" },
      { german: "auto", english: "car", description: "Lenkradbewegung", difficulty: 1, category: "common_nouns" },
      { german: "buch", english: "book", description: "Seiten blättern", difficulty: 1, category: "common_nouns" },
      { german: "schule", english: "school", description: "Lerngebärde", difficulty: 1, category: "common_nouns" },
      { german: "arbeit", english: "work", description: "Arbeitsgebärde", difficulty: 1, category: "common_nouns" },
      { german: "familie", english: "family", description: "Zusammenfügen", difficulty: 1, category: "common_nouns" },
      { german: "freund", english: "friend", description: "Hände gefaltet", difficulty: 1, category: "common_nouns" },
      { german: "kind", english: "child", description: "Körpergröße zeigen", difficulty: 1, category: "common_nouns" },
      { german: "mutter", english: "mother", description: "Hand an Wange", difficulty: 1, category: "common_nouns" },
      { german: "vater", english: "father", description: "Hand an Stirn", difficulty: 1, category: "common_nouns" },
      { german: "mann", english: "man", description: "An Oberkörper", difficulty: 1, category: "common_nouns" },
      { german: "frau", english: "woman/wife", description: "Weibliche Figur zeigen", difficulty: 1, category: "common_nouns" },
      { german: "stadt", english: "city", description: "Stadtlandschaft andeuten", difficulty: 1, category: "common_nouns" },
      { german: "dorf", english: "village", description: "Dorf mit Häusern zeigen", difficulty: 1, category: "common_nouns" },
      { german: "zeit", english: "time", description: "Handgelenk berühren", difficulty: 1, category: "common_nouns" }
    ],
    basic_adjectives: [
      { german: "gut", english: "good", description: "Daumen hoch", difficulty: 1, category: "basic_adjectives" },
      { german: "schlecht", english: "bad", description: "Daumen runter", difficulty: 1, category: "basic_adjectives" },
      { german: "groß", english: "big", description: "Hände auseinander", difficulty: 1, category: "basic_adjectives" },
      { german: "klein", english: "small", description: "Hände zusammen", difficulty: 1, category: "basic_adjectives" },
      { german: "neu", english: "new", description: "Hände öffnen", difficulty: 1, category: "basic_adjectives" },
      { german: "alt", english: "old", description: "Langsame Bewegung", difficulty: 1, category: "basic_adjectives" },
      { german: "schnell", english: "fast", description: "Schnelle Bewegung", difficulty: 1, category: "basic_adjectives" },
      { german: "langsam", english: "slow", description: "Langsame Bewegung", difficulty: 1, category: "basic_adjectives" },
      { german: "richtig", english: "right/correct", description: "Gerade Linie zeigen", difficulty: 1, category: "basic_adjectives" },
      { german: "falsch", english: "wrong/false", description: "Verdrehte Bewegung", difficulty: 1, category: "basic_adjectives" },
      { german: "hell", english: "bright/light", description: "Helle Fläche zeigen", difficulty: 1, category: "basic_adjectives" },
      { german: "dunkel", english: "dark", description: "Dunkle Fläche zeigen", difficulty: 1, category: "basic_adjectives" },
      { german: "voll", english: "full", description: "Volle Bewegung", difficulty: 1, category: "basic_adjectives" },
      { german: "leer", english: "empty", description: "Leere Bewegung", difficulty: 1, category: "basic_adjectives" }
    ],
    locations: [
      { german: "hier", english: "here", description: "Auf Boden zeigen", difficulty: 1, category: "locations" },
      { german: "dort", english: "there", description: "In Ferne zeigen", difficulty: 1, category: "locations" },
      { german: "zuhause", english: "at home", description: "Brust + Hausform", difficulty: 1, category: "locations" },
      { german: "oben", english: "above/up", description: "Nach oben zeigen", difficulty: 1, category: "locations" },
      { german: "unten", english: "below/down", description: "Nach unten zeigen", difficulty: 1, category: "locations" },
      { german: "links", english: "left", description: "Nach links zeigen", difficulty: 1, category: "locations" },
      { german: "rechts", english: "right", description: "Nach rechts zeigen", difficulty: 1, category: "locations" }
    ],
    time: [
      { german: "heute", english: "today", description: "Nach unten zeigen", difficulty: 1, category: "time" },
      { german: "morgen", english: "tomorrow", description: "Nach vorne zeigen", difficulty: 1, category: "time" },
      { german: "gestern", english: "yesterday", description: "Nach hinten zeigen", difficulty: 1, category: "time" },
      { german: "jetzt", english: "now", description: "Sofortige Geste", difficulty: 1, category: "time" }
    ],
    conversational: [
      { german: "hallo", english: "hello", description: "Winken mit Hand", difficulty: 1, category: "conversational" },
      { german: "auf wiedersehen", english: "goodbye", description: "Winken nach hinten", difficulty: 1, category: "conversational" },
      { german: "bitte schön", english: "you're welcome", description: "Einladende Geste", difficulty: 1, category: "conversational" },
      { german: "gern geschehen", english: "my pleasure", description: "Herzliche Geste", difficulty: 1, category: "conversational" },
      { german: "kein problem", english: "no problem", description: "Abwehrende Geste", difficulty: 1, category: "conversational" },
      { german: "vielen dank", english: "thank you very much", description: "Intensives Danken", difficulty: 1, category: "conversational" },
      { german: "gesundheit", english: "bless you", description: "Gesundheitswunsch", difficulty: 1, category: "conversational" },
      { german: "und", english: "and", description: "Hände zusammenführen", difficulty: 1, category: "conversational" },
      { german: "oder", english: "or", description: "Alternierende Bewegung", difficulty: 1, category: "conversational" },
      { german: "aber", english: "but", description: "Abwehrende Bewegung", difficulty: 1, category: "conversational" },
      { german: "weil", english: "because", description: "Erklärende Bewegung", difficulty: 1, category: "conversational" },
      { german: "auch", english: "also/too", description: "Hinzufügende Bewegung", difficulty: 1, category: "conversational" },
      { german: "noch", english: "still/yet", description: "Fortsetzungsbewegung", difficulty: 1, category: "conversational" },
      { german: "schon", english: "already", description: "Abgeschlossen zeigen", difficulty: 1, category: "conversational" },
      { german: "nur", english: "only/just", description: "Begrenzende Geste", difficulty: 1, category: "conversational" },
      { german: "sehr", english: "very", description: "Intensivierung zeigen", difficulty: 1, category: "conversational" },
      { german: "so", english: "so", description: "Vergleichsbewegung", difficulty: 1, category: "conversational" },
      { german: "zu", english: "too", description: "Übermaß zeigen", difficulty: 1, category: "conversational" },
      { german: "mit", english: "with", description: "Zusammenfügen", difficulty: 1, category: "conversational" },
      { german: "von", english: "from/of", description: "Herkunft zeigen", difficulty: 1, category: "conversational" },
      { german: "für", english: "for", description: "Nach vorne zeigen", difficulty: 1, category: "conversational" },
      { german: "in", english: "in/into", description: "Nach innen zeigen", difficulty: 1, category: "conversational" },
      { german: "auf", english: "on/onto", description: "Aufwärts zeigen", difficulty: 1, category: "conversational" },
      { german: "an", english: "at/to", description: "Kontakt zeigen", difficulty: 1, category: "conversational" },
      { german: "aus", english: "out of/from", description: "Auswärts bewegen", difficulty: 1, category: "conversational" },
      { german: "mein", english: "my", description: "Auf Brust zeigen", difficulty: 1, category: "conversational" },
      { german: "dein", english: "your", description: "Zum Gegenüber zeigen", difficulty: 1, category: "conversational" },
      { german: "unser", english: "our", description: "Kreisförmige Bewegung", difficulty: 1, category: "conversational" },
      { german: "mehr", english: "more", description: "Anhäufende Bewegung", difficulty: 1, category: "conversational" },
      { german: "wenig", english: "little/few", description: "Kleine Menge zeigen", difficulty: 1, category: "conversational" },
      { german: "viel", english: "much/many", description: "Große Menge zeigen", difficulty: 1, category: "conversational" },
      { german: "alle", english: "all", description: "Umfassende Bewegung", difficulty: 1, category: "conversational" },
      { german: "kein", english: "no/none", description: "Abwehrende Bewegung", difficulty: 1, category: "conversational" },
      { german: "dieser", english: "this", description: "Nahe zeigen", difficulty: 1, category: "conversational" },
      { german: "jener", english: "that", description: "Ferne zeigen", difficulty: 1, category: "conversational" },
      { german: "vielleicht", english: "maybe", description: "Ungewisse Bewegung", difficulty: 1, category: "conversational" },
      { german: "entschuldigung", english: "sorry/excuse me", description: "Entschuldigende Geste", difficulty: 1, category: "conversational" }
    ]
  },
  level2: {
    essential_verbs: [
      { german: "können", english: "can/to be able", description: "C-förmige Hände", difficulty: 2, category: "essential_verbs" },
      { german: "wollen", english: "to want", description: "Vor Brust ziehen", difficulty: 2, category: "essential_verbs" },
      { german: "müssen", english: "must", description: "Feste Geste", difficulty: 2, category: "essential_verbs" },
      { german: "sollen", english: "should", description: "Zeigende Geste", difficulty: 2, category: "essential_verbs" },
      { german: "dürfen", english: "to be allowed", description: "Offene Hände", difficulty: 2, category: "essential_verbs" },
      { german: "verstehen", english: "to understand", description: "Stirn + vorne", difficulty: 2, category: "essential_verbs" },
      { german: "wissen", english: "to know", description: "An Kopf tippen", difficulty: 2, category: "essential_verbs" },
      { german: "denken", english: "to think", description: "An Schläfe tippen", difficulty: 2, category: "essential_verbs" },
      { german: "machen", english: "to make/do", description: "Hände formen", difficulty: 2, category: "essential_verbs" },
      { german: "geben", english: "to give", description: "Hände reichen", difficulty: 2, category: "essential_verbs" },
      { german: "nehmen", english: "to take", description: "Hände greifen", difficulty: 2, category: "essential_verbs" },
      { german: "finden", english: "to find", description: "Suchbewegung", difficulty: 2, category: "essential_verbs" },
      { german: "suchen", english: "to search", description: "Suchbewegung", difficulty: 2, category: "essential_verbs" },
      { german: "warten", english: "to wait", description: "Wartegeste", difficulty: 2, category: "essential_verbs" },
      { german: "fühlen", english: "to feel", description: "Hand auf Herz, Gefühl zeigen", difficulty: 2, category: "essential_verbs" }
    ],
    questions: [
      { german: "was", english: "what", description: "Handflächen oben", difficulty: 2, category: "questions" },
      { german: "wie", english: "how", description: "Bewegungsform", difficulty: 2, category: "questions" },
      { german: "wo", english: "where", description: "Suchende Bewegung", difficulty: 2, category: "questions" },
      { german: "wann", english: "when", description: "Auf Uhr zeigen", difficulty: 2, category: "questions" },
      { german: "warum", english: "why", description: "Stirn + Frage", difficulty: 2, category: "questions" },
      { german: "wer", english: "who", description: "Fragerichtung", difficulty: 2, category: "questions" },
      { german: "welcher", english: "which", description: "Auswahlbewegung", difficulty: 2, category: "questions" }
    ],
    food_drink: [
      { german: "essen", english: "food", description: "Zum Mund führen", difficulty: 2, category: "food_drink" },
      { german: "trinken", english: "drink", description: "Zum Mund führen", difficulty: 2, category: "food_drink" },
      { german: "brot", english: "bread", description: "Brotform zeigen", difficulty: 2, category: "food_drink" },
      { german: "milch", english: "milk", description: "Milchgebärde", difficulty: 2, category: "food_drink" },
      { german: "kaffee", english: "coffee", description: "Kaffeegebärde", difficulty: 2, category: "food_drink" },
      { german: "tee", english: "tea", description: "Teegeste", difficulty: 2, category: "food_drink" },
      { german: "fleisch", english: "meat", description: "Armmuskel zeigen", difficulty: 2, category: "food_drink" },
      { german: "fisch", english: "fish", description: "Schwimmbewegung", difficulty: 2, category: "food_drink" },
      { german: "gemüse", english: "vegetables", description: "Pflückbewegung", difficulty: 2, category: "food_drink" },
      { german: "obst", english: "fruit", description: "Pflückbewegung", difficulty: 2, category: "food_drink" }
    ],
    numbers: [
      { german: "eins", english: "one", description: "Zeigefinger hoch", difficulty: 2, category: "numbers" },
      { german: "zwei", english: "two", description: "Zeige- und Mittelfinger", difficulty: 2, category: "numbers" },
      { german: "drei", english: "three", description: "Drei Finger hoch", difficulty: 2, category: "numbers" },
      { german: "vier", english: "four", description: "Vier Finger hoch", difficulty: 2, category: "numbers" },
      { german: "fünf", english: "five", description: "Fünf Finger hoch", difficulty: 2, category: "numbers" },
      { german: "sechs", english: "six", description: "Daumen + fünf", difficulty: 2, category: "numbers" },
      { german: "sieben", english: "seven", description: "Siebenform", difficulty: 2, category: "numbers" },
      { german: "acht", english: "eight", description: "Achtform", difficulty: 2, category: "numbers" },
      { german: "neun", english: "nine", description: "Neunform", difficulty: 2, category: "numbers" },
      { german: "zehn", english: "ten", description: "Zehn Finger", difficulty: 2, category: "numbers" }
    ],
    time_expressions: [
      { german: "später", english: "later", description: "Nach vorne zeigen", difficulty: 2, category: "time_expressions" },
      { german: "früher", english: "earlier", description: "Nach hinten zeigen", difficulty: 2, category: "time_expressions" },
      { german: "immer", english: "always", description: "Kreisförmig", difficulty: 2, category: "time_expressions" },
      { german: "nie", english: "never", description: "Abweisend", difficulty: 2, category: "time_expressions" },
      { german: "manchmal", english: "sometimes", description: "Unregelmäßig", difficulty: 2, category: "time_expressions" },
      { german: "oft", english: "often", description: "Wiederholend", difficulty: 2, category: "time_expressions" },
      { german: "selten", english: "rarely", description: "Wenig Bewegung", difficulty: 2, category: "time_expressions" }
    ],
    colors: [
      { german: "rot", english: "red", description: "Wange berühren", difficulty: 2, category: "colors" },
      { german: "blau", english: "blue", description: "Hals berühren", difficulty: 2, category: "colors" },
      { german: "grün", english: "green", description: "Brust berühren", difficulty: 2, category: "colors" },
      { german: "gelb", english: "yellow", description: "Bauch berühren", difficulty: 2, category: "colors" },
      { german: "schwarz", english: "black", description: "Schulter berühren", difficulty: 2, category: "colors" },
      { german: "weiß", english: "white", description: "Knie berühren", difficulty: 2, category: "colors" },
      { german: "braun", english: "brown", description: "Ellenbogen berühren", difficulty: 2, category: "colors" }
    ]
  },
  level3: {
    emotions: [
      { german: "glücklich", english: "happy", description: "Lächeln + offene Arme", difficulty: 3, category: "emotions" },
      { german: "traurig", english: "sad", description: "Kopf hängen lassen", difficulty: 3, category: "emotions" },
      { german: "wütend", english: "angry", description: "Faust ballen", difficulty: 3, category: "emotions" },
      { german: "ängstlich", english: "afraid", description: "Hände zittern", difficulty: 3, category: "emotions" },
      { german: "überrascht", english: "surprised", description: "Hände an Gesicht", difficulty: 3, category: "emotions" },
      { german: "zufrieden", english: "satisfied", description: "Entspannte Haltung", difficulty: 3, category: "emotions" },
      { german: "enttäuscht", english: "disappointed", description: "Kopf senken", difficulty: 3, category: "emotions" },
      { german: "hoffnungsvoll", english: "hopeful", description: "Nach vorne blicken", difficulty: 3, category: "emotions" },
      { german: "besorgt", english: "worried", description: "Stirn runzeln", difficulty: 3, category: "emotions" },
      { german: "erleichtert", english: "relieved", description: "Ausatmen", difficulty: 3, category: "emotions" }
    ],
    daily_activities: [
      { german: "aufwachen", english: "to wake up", description: "Augen öffnen", difficulty: 3, category: "daily_activities" },
      { german: "aufstehen", english: "to get up", description: "Nach oben zeigen", difficulty: 3, category: "daily_activities" },
      { german: "anziehen", english: "to get dressed", description: "Kleidung ziehen", difficulty: 3, category: "daily_activities" },
      { german: "frühstücken", english: "to have breakfast", description: "Essen morgens", difficulty: 3, category: "daily_activities" },
      { german: "arbeiten", english: "to work", description: "Arbeitsbewegung", difficulty: 3, category: "daily_activities" },
      { german: "essen", english: "to eat", description: "Zum Mund führen", difficulty: 3, category: "daily_activities" },
      { german: "trinken", english: "to drink", description: "Zum Mund führen", difficulty: 3, category: "daily_activities" },
      { german: "schlafen", english: "to sleep", description: "Kopf an Hände", difficulty: 3, category: "daily_activities" },
      { german: "duschen", english: "to shower", description: "Wasserbewegung", difficulty: 3, category: "daily_activities" },
      { german: "putzen", english: "to clean", description: "Putzbewegung", difficulty: 3, category: "daily_activities" }
    ],
    weather: [
      { german: "sonne", english: "sun", description: "Kreis über Kopf", difficulty: 3, category: "weather" },
      { german: "regen", english: "rain", description: "Finger wie Tropfen", difficulty: 3, category: "weather" },
      { german: "schnee", english: "snow", description: "Flocken fallen", difficulty: 3, category: "weather" },
      { german: "wind", english: "wind", description: "Luftbewegung", difficulty: 3, category: "weather" },
      { german: "kalt", english: "cold", description: "Zittern", difficulty: 3, category: "weather" },
      { german: "warm", english: "warm", description: "Wärme ausstrahlen", difficulty: 3, category: "weather" },
      { german: "bewölkt", english: "cloudy", description: "Wolken formen", difficulty: 3, category: "weather" },
      { german: "sonnig", english: "sunny", description: "Sonne zeigen", difficulty: 3, category: "weather" }
    ],
    body_parts: [
      { german: "kopf", english: "head", description: "An Kopf tippen", difficulty: 3, category: "body_parts" },
      { german: "hand", english: "hand", description: "Hand zeigen", difficulty: 3, category: "body_parts" },
      { german: "arm", english: "arm", description: "Armbewegung", difficulty: 3, category: "body_parts" },
      { german: "bein", english: "leg", description: "Beinbewegung", difficulty: 3, category: "body_parts" },
      { german: "auge", english: "eye", description: "An Auge zeigen", difficulty: 3, category: "body_parts" },
      { german: "ohr", english: "ear", description: "An Ohr zeigen", difficulty: 3, category: "body_parts" },
      { german: "mund", english: "mouth", description: "An Mund zeigen", difficulty: 3, category: "body_parts" },
      { german: "nase", english: "nose", description: "An Nase zeigen", difficulty: 3, category: "body_parts" }
    ],
    family_extended: [
      { german: "bruder", english: "brother", description: "Bruderzeichen", difficulty: 3, category: "family_extended" },
      { german: "schwester", english: "sister", description: "Schwesterzeichen", difficulty: 3, category: "family_extended" },
      { german: "oma", english: "grandmother", description: "Großmutterzeichen", difficulty: 3, category: "family_extended" },
      { german: "opa", english: "grandfather", description: "Großvaterzeichen", difficulty: 3, category: "family_extended" },
      { german: "onkel", english: "uncle", description: "Onkelzeichen", difficulty: 3, category: "family_extended" },
      { german: "tante", english: "aunt", description: "Tantezeichen", difficulty: 3, category: "family_extended" },
      { german: "cousin", english: "cousin", description: "Cousinzeichen", difficulty: 3, category: "family_extended" },
      { german: "neffe", english: "nephew", description: "Neffezeichen", difficulty: 3, category: "family_extended" }
    ],
    common_verbs: [
      { german: "gehen", english: "to go", description: "Nach vorne zeigen", difficulty: 3, category: "common_verbs" },
      { german: "kommen", english: "to come", description: "Zu sich ziehen", difficulty: 3, category: "common_verbs" },
      { german: "sehen", english: "to see", description: "Von Augen weg", difficulty: 3, category: "common_verbs" },
      { german: "hören", english: "to hear", description: "An Ohr zeigen", difficulty: 3, category: "common_verbs" },
      { german: "sprechen", english: "to speak", description: "An Mund zeigen", difficulty: 3, category: "common_verbs" },
      { german: "machen", english: "to make/do", description: "Hände formen", difficulty: 3, category: "common_verbs" },
      { german: "haben", english: "to have", description: "Besitz zeigen", difficulty: 3, category: "common_verbs" },
      { german: "sein", english: "to be", description: "Existenz zeigen", difficulty: 3, category: "common_verbs" }
    ]
  },
  level4: {
    clothing: [
      { german: "hemd", english: "shirt", description: "Hemdform zeigen", difficulty: 4, category: "clothing" },
      { german: "hose", english: "pants", description: "Hose zeigen", difficulty: 4, category: "clothing" },
      { german: "jacke", english: "jacket", description: "Jacke zeigen", difficulty: 4, category: "clothing" },
      { german: "schuhe", english: "shoes", description: "Schuhe zeigen", difficulty: 4, category: "clothing" },
      { german: "hut", english: "hat", description: "Hut zeigen", difficulty: 4, category: "clothing" },
      { german: "socken", english: "socks", description: "Sockenform", difficulty: 4, category: "clothing" },
      { german: "schal", english: "scarf", description: "Schal um Hals", difficulty: 4, category: "clothing" },
      { german: "handschuhe", english: "gloves", description: "Handschuhe anziehen", difficulty: 4, category: "clothing" }
    ],
    household: [
      { german: "tisch", english: "table", description: "Tischform", difficulty: 4, category: "household" },
      { german: "stuhl", english: "chair", description: "Sitzbewegung", difficulty: 4, category: "household" },
      { german: "bett", english: "bed", description: "Schlafposition", difficulty: 4, category: "household" },
      { german: "tür", english: "door", description: "Öffnungsbewegung", difficulty: 4, category: "household" },
      { german: "fenster", english: "window", description: "Fensterform", difficulty: 4, category: "household" },
      { german: "küche", english: "kitchen", description: "Kochbewegung", difficulty: 4, category: "household" },
      { german: "bad", english: "bathroom", description: "Waschbewegung", difficulty: 4, category: "household" },
      { german: "wohnzimmer", english: "living room", description: "Sitzbereich", difficulty: 4, category: "household" }
    ],
    professions: [
      { german: "lehrer", english: "teacher", description: "Lehrbewegung", difficulty: 4, category: "professions" },
      { german: "arzt", english: "doctor", description: "Arztbewegung", difficulty: 4, category: "professions" },
      { german: "koch", english: "cook", description: "Kochbewegung", difficulty: 4, category: "professions" },
      { german: "verkäufer", english: "salesperson", description: "Verkaufsbewegung", difficulty: 4, category: "professions" },
      { german: "mechaniker", english: "mechanic", description: "Reparaturbewegung", difficulty: 4, category: "professions" },
      { german: "polizist", english: "police officer", description: "Polizeiuniform", difficulty: 4, category: "professions" },
      { german: "feuerwehrmann", english: "firefighter", description: "Feuerwehrhelm", difficulty: 4, category: "professions" },
      { german: "krankenschwester", english: "nurse", description: "Pflegebewegung", difficulty: 4, category: "professions" }
    ],
    health: [
      { german: "krank", english: "sick", description: "Krankheitszeichen", difficulty: 4, category: "health" },
      { german: "gesund", english: "healthy", description: "Gesundheitszeichen", difficulty: 4, category: "health" },
      { german: "krankenhaus", english: "hospital", description: "Krankenhausform", difficulty: 4, category: "health" },
      { german: "medikament", english: "medicine", description: "Medizinzeichen", difficulty: 4, category: "health" },
      { german: "schmerzen", english: "pain", description: "Schmerz zeigen", difficulty: 4, category: "health" },
      { german: "fieber", english: "fever", description: "Fieber zeigen", difficulty: 4, category: "health" },
      { german: "husten", english: "to cough", description: "Hustenbewegung", difficulty: 4, category: "health" },
      { german: "kopfschmerzen", english: "headache", description: "Kopf halten", difficulty: 4, category: "health" }
    ],
    food_kitchen: [
      { german: "kochen", english: "to cook", description: "Kochbewegung", difficulty: 4, category: "food_kitchen" },
      { german: "backen", english: "to bake", description: "Backbewegung", difficulty: 4, category: "food_kitchen" },
      { german: "suppe", english: "soup", description: "Löffelbewegung", difficulty: 4, category: "food_kitchen" },
      { german: "salat", english: "salad", description: "Blätter mischen", difficulty: 4, category: "food_kitchen" },
      { german: "reis", english: "rice", description: "Reiskörner", difficulty: 4, category: "food_kitchen" },
      { german: "nudeln", english: "pasta", description: "Nudelform", difficulty: 4, category: "food_kitchen" },
      { german: "käse", english: "cheese", description: "Käseform", difficulty: 4, category: "food_kitchen" },
      { german: "butter", english: "butter", description: "Butter streichen", difficulty: 4, category: "food_kitchen" }
    ],
    tools: [
      { german: "hammer", english: "hammer", description: "Hammerbewegung", difficulty: 4, category: "tools" },
      { german: "schraubendreher", english: "screwdriver", description: "Schraubenbewegung", difficulty: 4, category: "tools" },
      { german: "schlüssel", english: "key", description: "Schlüssel drehen", difficulty: 4, category: "tools" },
      { german: "telefon", english: "telephone", description: "Telefonform", difficulty: 4, category: "tools" },
      { german: "computer", english: "computer", description: "Tastatur tippen", difficulty: 4, category: "tools" },
      { german: "buch", english: "book", description: "Seiten blättern", difficulty: 4, category: "tools" },
      { german: "stift", english: "pen", description: "Schreibbewegung", difficulty: 4, category: "tools" },
      { german: "papier", english: "paper", description: "Papier falten", difficulty: 4, category: "tools" }
    ]
  },
  level5: {
    travel: [
      { german: "reisen", english: "to travel", description: "Reisebewegung", difficulty: 5, category: "travel" },
      { german: "urlaub", english: "vacation", description: "Urlaubszeichen", difficulty: 5, category: "travel" },
      { german: "hotel", english: "hotel", description: "Hotelform", difficulty: 5, category: "travel" },
      { german: "flughafen", english: "airport", description: "Flughafenform", difficulty: 5, category: "travel" },
      { german: "koffer", english: "suitcase", description: "Koffergriff", difficulty: 5, category: "travel" },
      { german: "flugzeug", english: "airplane", description: "Flugzeugform", difficulty: 5, category: "travel" },
      { german: "zug", english: "train", description: "Zugbewegung", difficulty: 5, category: "travel" },
      { german: "auto", english: "car", description: "Lenkradbewegung", difficulty: 5, category: "travel" }
    ],
    transportation: [
      { german: "bus", english: "bus", description: "Busform", difficulty: 5, category: "transportation" },
      { german: "fahrrad", english: "bicycle", description: "Fahrrad fahren", difficulty: 5, category: "transportation" },
      { german: "straße", english: "street", description: "Straßenform", difficulty: 5, category: "transportation" },
      { german: "bahnhof", english: "train station", description: "Bahnhofsform", difficulty: 5, category: "transportation" },
      { german: "ticket", english: "ticket", description: "Ticketform", difficulty: 5, category: "transportation" },
      { german: "fahren", english: "to drive/go", description: "Fahrzeugbewegung", difficulty: 5, category: "transportation" },
      { german: "fliegen", english: "to fly", description: "Flugbewegung", difficulty: 5, category: "transportation" },
      { german: "ankommen", english: "to arrive", description: "Ankunftsbewegung", difficulty: 5, category: "transportation" }
    ],
    technology: [
      { german: "internet", english: "internet", description: "Netz weben", difficulty: 5, category: "technology" },
      { german: "email", english: "email", description: "Umschlag senden", difficulty: 5, category: "technology" },
      { german: "fernsehen", english: "to watch TV", description: "Bildschirm zeigen", difficulty: 5, category: "technology" },
      { german: "smartphone", english: "smartphone", description: "Telefonbewegung", difficulty: 5, category: "technology" },
      { german: "video", english: "video", description: "Filmbewegung", difficulty: 5, category: "technology" },
      { german: "foto", english: "photo", description: "Foto zeigen", difficulty: 5, category: "technology" },
      { german: "musik", english: "music", description: "Musikbewegung", difficulty: 5, category: "technology" },
      { german: "radio", english: "radio", description: "Radioform", difficulty: 5, category: "technology" }
    ],
    communication: [
      { german: "anrufen", english: "to call", description: "Telefonbewegung", difficulty: 5, category: "communication" },
      { german: "schreiben", english: "to write", description: "Schreibbewegung", difficulty: 5, category: "communication" },
      { german: "lesen", english: "to read", description: "Lesebewegung", difficulty: 5, category: "communication" },
      { german: "brief", english: "letter", description: "Briefumschlag", difficulty: 5, category: "communication" },
      { german: "nachricht", english: "message", description: "Nachricht senden", difficulty: 5, category: "communication" },
      { german: "gespräch", english: "conversation", description: "Sprechbewegung", difficulty: 5, category: "communication" },
      { german: "frage", english: "question", description: "Fragezeichen", difficulty: 5, category: "communication" },
      { german: "antwort", english: "answer", description: "Antwortbewegung", difficulty: 5, category: "communication" }
    ]
  },
  level6: {
    politics: [
      { german: "politik", english: "politics", description: "Politikzeichen", difficulty: 6, category: "politics" },
      { german: "wahl", english: "election", description: "Wahlurne", difficulty: 6, category: "politics" },
      { german: "regierung", english: "government", description: "Regierungsform", difficulty: 6, category: "politics" },
      { german: "gesetz", english: "law", description: "Gesetzblatt", difficulty: 6, category: "politics" },
      { german: "demokratie", english: "democracy", description: "Demokratiezeichen", difficulty: 6, category: "politics" },
      { german: "partei", english: "party", description: "Parteiform", difficulty: 6, category: "politics" },
      { german: "präsident", english: "president", description: "Präsidentzeichen", difficulty: 6, category: "politics" },
      { german: "bürger", english: "citizen", description: "Bürgerzeichen", difficulty: 6, category: "politics" }
    ],
    education: [
      { german: "lernen", english: "to learn", description: "Lernbewegung", difficulty: 6, category: "education" },
      { german: "universität", english: "university", description: "Universitätsform", difficulty: 6, category: "education" },
      { german: "student", english: "student", description: "Studentzeichen", difficulty: 6, category: "education" },
      { german: "prüfung", english: "exam", description: "Prüfungszeichen", difficulty: 6, category: "education" },
      { german: "diplom", english: "diploma", description: "Diplomform", difficulty: 6, category: "education" },
      { german: "wissen", english: "knowledge", description: "Wissensform", difficulty: 6, category: "education" },
      { german: "forschung", english: "research", description: "Forschungsbewegung", difficulty: 6, category: "education" },
      { german: "studium", english: "studies", description: "Studiumsbewegung", difficulty: 6, category: "education" }
    ],
    money: [
      { german: "geld", english: "money", description: "Geld zählen", difficulty: 6, category: "money" },
      { german: "euro", english: "euro", description: "Eurozeichen", difficulty: 6, category: "money" },
      { german: "kaufen", english: "to buy", description: "Kaufbewegung", difficulty: 6, category: "money" },
      { german: "verkaufen", english: "to sell", description: "Verkaufsbewegung", difficulty: 6, category: "money" },
      { german: "teuer", english: "expensive", description: "Teuer-Geste", difficulty: 6, category: "money" },
      { german: "billig", english: "cheap", description: "Billig-Geste", difficulty: 6, category: "money" },
      { german: "preis", english: "price", description: "Preis zeigen", difficulty: 6, category: "money" },
      { german: "bezahlen", english: "to pay", description: "Zahlungsbewegung", difficulty: 6, category: "money" }
    ],
    society: [
      { german: "gesellschaft", english: "society", description: "Gruppenform", difficulty: 6, category: "society" },
      { german: "kultur", english: "culture", description: "Kulturzeichen", difficulty: 6, category: "society" },
      { german: "tradition", english: "tradition", description: "Traditionszeichen", difficulty: 6, category: "society" },
      { german: "geschichte", english: "history", description: "Geschichtsbewegung", difficulty: 6, category: "society" },
      { german: "zukunft", english: "future", description: "Zukunftsrichtung", difficulty: 6, category: "society" },
      { german: "vergangenheit", english: "past", description: "Vergangenheitsrichtung", difficulty: 6, category: "society" },
      { german: "veränderung", english: "change", description: "Veränderungsbewegung", difficulty: 6, category: "society" },
      { german: "entwicklung", english: "development", description: "Entwicklungsbewegung", difficulty: 6, category: "society" }
    ]
  },
  level7: {
    philosophy: [
      { german: "philosophie", english: "philosophy", description: "Denkerpose", difficulty: 7, category: "philosophy" },
      { german: "wahrheit", english: "truth", description: "Wahrheitszeichen", difficulty: 7, category: "philosophy" },
      { german: "freiheit", english: "freedom", description: "Freiheitszeichen", difficulty: 7, category: "philosophy" },
      { german: "moral", english: "morality", description: "Moralzeichen", difficulty: 7, category: "philosophy" },
      { german: "ethik", english: "ethics", description: "Ethikzeichen", difficulty: 7, category: "philosophy" },
      { german: "bewusstsein", english: "consciousness", description: "Bewusstseinszeichen", difficulty: 7, category: "philosophy" },
      { german: "existenz", english: "existence", description: "Existenzzeichen", difficulty: 7, category: "philosophy" },
      { german: "realität", english: "reality", description: "Realitätszeichen", difficulty: 7, category: "philosophy" }
    ],
    psychology: [
      { german: "gefühl", english: "feeling", description: "Herz berühren", difficulty: 7, category: "psychology" },
      { german: "gedanke", english: "thought", description: "Kopf berühren", difficulty: 7, category: "psychology" },
      { german: "erinnerung", english: "memory", description: "Erinnerungszeichen", difficulty: 7, category: "psychology" },
      { german: "traum", english: "dream", description: "Traumzeichen", difficulty: 7, category: "psychology" },
      { german: "angst", english: "fear", description: "Angst zeigen", difficulty: 7, category: "psychology" },
      { german: "hoffnung", english: "hope", description: "Hoffnungszeichen", difficulty: 7, category: "psychology" },
      { german: "vertrauen", english: "trust", description: "Vertrauenszeichen", difficulty: 7, category: "psychology" },
      { german: "liebe", english: "love", description: "Liebesbewegung", difficulty: 7, category: "psychology" }
    ],
    science: [
      { german: "wissenschaft", english: "science", description: "Wissenschaftszeichen", difficulty: 7, category: "science" },
      { german: "forschung", english: "research", description: "Forschungsbewegung", difficulty: 7, category: "science" },
      { german: "entdeckung", english: "discovery", description: "Entdeckungsbewegung", difficulty: 7, category: "science" },
      { german: "experiment", english: "experiment", description: "Experimentalbewegung", difficulty: 7, category: "science" },
      { german: "theorie", english: "theory", description: "Theoriezeichen", difficulty: 7, category: "science" },
      { german: "beweis", english: "proof", description: "Beweisbewegung", difficulty: 7, category: "science" },
      { german: "analyse", english: "analysis", description: "Analysebewegung", difficulty: 7, category: "science" },
      { german: "ergebnis", english: "result", description: "Ergebnis zeigen", difficulty: 7, category: "science" }
    ],
    art: [
      { german: "kunst", english: "art", description: "Kunstbewegung", difficulty: 7, category: "art" },
      { german: "malen", english: "to paint", description: "Malbewegung", difficulty: 7, category: "art" },
      { german: "zeichnen", english: "to draw", description: "Zeichenbewegung", difficulty: 7, category: "art" },
      { german: "musik", english: "music", description: "Musikbewegung", difficulty: 7, category: "art" },
      { german: "tanzen", english: "to dance", description: "Tanzbewegung", difficulty: 7, category: "art" },
      { german: "theater", english: "theater", description: "Theaterform", difficulty: 7, category: "art" },
      { german: "film", english: "film", description: "Filmbewegung", difficulty: 7, category: "art" },
      { german: "literatur", english: "literature", description: "Literaturzeichen", difficulty: 7, category: "art" }
    ]
  },
  level8: {
    complex_emotions: [
      { german: "eifersucht", english: "jealousy", description: "Eifersuchtszeichen", difficulty: 8, category: "complex_emotions" },
      { german: "stolz", english: "pride", description: "Stolzzeichen", difficulty: 8, category: "complex_emotions" },
      { german: "scham", english: "shame", description: "Schamzeichen", difficulty: 8, category: "complex_emotions" },
      { german: "vertrauen", english: "trust", description: "Vertrauenszeichen", difficulty: 8, category: "complex_emotions" },
      { german: "misstrauen", english: "distrust", description: "Misstrauenszeichen", difficulty: 8, category: "complex_emotions" },
      { german: "respekt", english: "respect", description: "Respektsbewegung", difficulty: 8, category: "complex_emotions" },
      { german: "bewunderung", english: "admiration", description: "Bewunderungszeichen", difficulty: 8, category: "complex_emotions" },
      { german: "neid", english: "envy", description: "Neidzeichen", difficulty: 8, category: "complex_emotions" }
    ],
    leadership: [
      { german: "führung", english: "leadership", description: "Führungsbewegung", difficulty: 8, category: "leadership" },
      { german: "verantwortung", english: "responsibility", description: "Verantwortungszeichen", difficulty: 8, category: "leadership" },
      { german: "vision", english: "vision", description: "Sichtzeichen", difficulty: 8, category: "leadership" },
      { german: "strategie", english: "strategy", description: "Strategiebewegung", difficulty: 8, category: "leadership" },
      { german: "exzellenz", english: "excellence", description: "Exzellenzzeichen", difficulty: 8, category: "leadership" },
      { german: "motivation", english: "motivation", description: "Motivationsbewegung", difficulty: 8, category: "leadership" },
      { german: "inspiration", english: "inspiration", description: "Inspirationszeichen", difficulty: 8, category: "leadership" },
      { german: "team", english: "team", description: "Teamform", difficulty: 8, category: "leadership" }
    ],
    creativity: [
      { german: "kreativität", english: "creativity", description: "Schöpfungsbewegung", difficulty: 8, category: "creativity" },
      { german: "innovation", english: "innovation", description: "Neuerungszeichen", difficulty: 8, category: "creativity" },
      { german: "imagination", english: "imagination", description: "Vorstellungszeichen", difficulty: 8, category: "creativity" },
      { german: "talent", english: "talent", description: "Begabungszeichen", difficulty: 8, category: "creativity" },
      { german: "genie", english: "genius", description: "Geniezeichen", difficulty: 8, category: "creativity" },
      { german: "meisterwerk", english: "masterpiece", description: "Meisterwerkszeichen", difficulty: 8, category: "creativity" },
      { german: "perfektion", english: "perfection", description: "Perfektionszeichen", difficulty: 8, category: "creativity" },
      { german: "originalität", english: "originality", description: "Originalitätszeichen", difficulty: 8, category: "creativity" }
    ],
    business: [
      { german: "unternehmen", english: "company", description: "Unternehmensform", difficulty: 8, category: "business" },
      { german: "management", english: "management", description: "Managementbewegung", difficulty: 8, category: "business" },
      { german: "marketing", english: "marketing", description: "Marketingbewegung", difficulty: 8, category: "business" },
      { german: "produkt", english: "product", description: "Produktform", difficulty: 8, category: "business" },
      { german: "dienstleistung", english: "service", description: "Servicebewegung", difficulty: 8, category: "business" },
      { german: "kunde", english: "customer", description: "Kundenzeichen", difficulty: 8, category: "business" },
      { german: "qualität", english: "quality", description: "Qualitätszeichen", difficulty: 8, category: "business" },
      { german: "erfolg", english: "success", description: "Erfolgszeichen", difficulty: 8, category: "business" }
    ]
  },
  level9: {
    mastery_verbs: [
      { german: "erfahren", english: "to experience", description: "Erfahrungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "verwirklichen", english: "to realize", description: "Verwirklichungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "beeinflussen", english: "to influence", description: "Beeinflussungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "gestalten", english: "to shape", description: "Gestaltungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "entwickeln", english: "to develop", description: "Entwicklungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "transformieren", english: "to transform", description: "Transformationsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "optimieren", english: "to optimize", description: "Optimierungsbewegung", difficulty: 9, category: "mastery_verbs" },
      { german: "integrieren", english: "to integrate", description: "Integrationsbewegung", difficulty: 9, category: "mastery_verbs" }
    ],
    deep_philosophy: [
      { german: "bewusstsein", english: "consciousness", description: "Bewusstseinszeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "existenz", english: "existence", description: "Existenzzeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "realität", english: "reality", description: "Realitätszeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "illusion", english: "illusion", description: "Illusionszeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "transzendenz", english: "transcendence", description: "Transzendenzzeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "einheit", english: "unity", description: "Einheitsform", difficulty: 9, category: "deep_philosophy" },
      { german: "dualität", english: "duality", description: "Dualitätszeichen", difficulty: 9, category: "deep_philosophy" },
      { german: "paradox", english: "paradox", description: "Paradoxzeichen", difficulty: 9, category: "deep_philosophy" }
    ],
    spirituality: [
      { german: "seele", english: "soul", description: "Seelenzeichen", difficulty: 9, category: "spirituality" },
      { german: "meditation", english: "meditation", description: "Meditationsbewegung", difficulty: 9, category: "spirituality" },
      { german: "erleuchtung", english: "enlightenment", description: "Erleuchtungszeichen", difficulty: 9, category: "spirituality" },
      { german: "harmonie", english: "harmony", description: "Harmoniebewegung", difficulty: 9, category: "spirituality" },
      { german: "universum", english: "universe", description: "Universumsform", difficulty: 9, category: "spirituality" },
      { german: "kosmos", english: "cosmos", description: "Kosmosform", difficulty: 9, category: "spirituality" },
      { german: "schöpfung", english: "creation", description: "Schöpfungsbewegung", difficulty: 9, category: "spirituality" },
      { german: "ewigkeit", english: "eternity", description: "Ewigkeitszeichen", difficulty: 9, category: "spirituality" }
    ],
    wisdom: [
      { german: "weisheit", english: "wisdom", description: "Weisheitszeichen", difficulty: 9, category: "wisdom" },
      { german: "verständnis", english: "understanding", description: "Verständniszeichen", difficulty: 9, category: "wisdom" },
      { german: "erkenntnis", english: "insight", description: "Erkenntniszeichen", difficulty: 9, category: "wisdom" },
      { german: "intuition", english: "intuition", description: "Intuitionszeichen", difficulty: 9, category: "wisdom" },
      { german: "wahrnehmung", english: "perception", description: "Wahrnehmungszeichen", difficulty: 9, category: "wisdom" },
      { german: "bewusstheit", english: "awareness", description: "Bewusstheitszeichen", difficulty: 9, category: "wisdom" },
      { german: "klarheit", english: "clarity", description: "Klarheitszeichen", difficulty: 9, category: "wisdom" },
      { german: "tiefe", english: "depth", description: "Tiefenzeichen", difficulty: 9, category: "wisdom" }
    ]
  },
  level10: {
    ultimate_mastery: [
      { german: "meisterwerk", english: "masterpiece", description: "Meisterwerkszeichen", difficulty: 10, category: "ultimate_mastery" },
      { german: "perfektion", english: "perfection", description: "Perfektionszeichen", difficulty: 10, category: "ultimate_mastery" },
      { german: "genius", english: "genius", description: "Geniezeichen", difficulty: 10, category: "ultimate_mastery" },
      { german: "weisheit", english: "wisdom", description: "Weisheitszeichen", difficulty: 10, category: "ultimate_mastery" },
      { german: "enlightenment", english: "enlightenment", description: "Erleuchtungsstrahl", difficulty: 10, category: "ultimate_mastery" },
      { german: "transzendenz", english: "transcendence", description: "Transzendenzstrahl", difficulty: 10, category: "ultimate_mastery" },
      { german: "einheit", english: "unity", description: "Einheitsstrahl", difficulty: 10, category: "ultimate_mastery" },
      { german: "unendlichkeit", english: "infinity", description: "Unendlichkeitszeichen", difficulty: 10, category: "ultimate_mastery" }
    ],
    universal_concepts: [
      { german: "universum", english: "universe", description: "Universumsform", difficulty: 10, category: "universal_concepts" },
      { german: "ewigkeit", english: "eternity", description: "Ewigkeitszeichen", difficulty: 10, category: "universal_concepts" },
      { german: "unendlichkeit", english: "infinity", description: "Unendlichkeitszeichen", difficulty: 10, category: "universal_concepts" },
      { german: "schöpfung", english: "creation", description: "Schöpfungsbewegung", difficulty: 10, category: "universal_concepts" },
      { german: "evolution", english: "evolution", description: "Evolutionsbewegung", difficulty: 10, category: "universal_concepts" },
      { german: "harmonie", english: "harmony", description: "Harmoniebewegung", difficulty: 10, category: "universal_concepts" },
      { german: "balance", english: "balance", description: "Balancebewegung", difficulty: 10, category: "universal_concepts" },
      { german: "perfektion", english: "perfection", description: "Perfektionszeichen", difficulty: 10, category: "universal_concepts" }
    ]
  }
}

async function seedVocabulary() {
  console.log('🌱 Seeding comprehensive vocabulary database...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await prisma.word.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.vocabularyLevel.deleteMany({})

    // Extract all categories and levels
    const categories = new Set<string>()
    const levels = new Map<number, { id: number; name: string; description: string }>()

    // Collect all categories and levels
    for (const [levelKey, levelData] of Object.entries(VOCABULARY_DATA)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))

      for (const [categoryName, words] of Object.entries(levelData)) {
        categories.add(categoryName)

        if (!levels.has(levelNumber)) {
          levels.set(levelNumber, {
            id: levelNumber,
            name: `Level ${levelNumber}`,
            description: `Vocabulary Level ${levelNumber} - ${levelNumber === 1 ? 'Basic communication' : levelNumber === 2 ? 'Intermediate conversations' : levelNumber === 3 ? 'Emotions and daily life' : levelNumber === 4 ? 'Household and professions' : levelNumber === 5 ? 'Travel and technology' : levelNumber === 6 ? 'Society and culture' : levelNumber === 7 ? 'Abstract concepts' : levelNumber === 8 ? 'Complex emotions and leadership' : levelNumber === 9 ? 'Advanced mastery' : 'Ultimate mastery'}`
          })
        }
      }
    }

    // Create categories
    console.log(`📂 Creating ${categories.size} categories...`)
    const categoryPromises = Array.from(categories).map(async (categoryName) => {
      return await prisma.category.create({
        data: {
          name: categoryName,
          description: `Vocabulary category: ${categoryName}`
        }
      })
    })

    const createdCategories = await Promise.all(categoryPromises)
    const categoryMap = new Map(createdCategories.map(cat => [cat.name, cat.id]))

    // Create levels
    console.log(`🏆 Creating ${levels.size} levels...`)
    const levelPromises = Array.from(levels.values()).map(async (levelData) => {
      return await prisma.vocabularyLevel.create({
        data: levelData
      })
    })

    await Promise.all(levelPromises)

    // Create words in smaller batches to avoid timeout
    let totalWords = 0
    const BATCH_SIZE = 50

    for (const [levelKey, levelData] of Object.entries(VOCABULARY_DATA)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))

      for (const [categoryName, words] of Object.entries(levelData)) {
        const categoryId = categoryMap.get(categoryName)

        if (!categoryId) {
          console.error(`❌ Category not found: ${categoryName}`)
          continue
        }

        console.log(`📝 Adding ${words.length} words to ${categoryName} (Level ${levelNumber})...`)

        // Process words in batches
        for (let i = 0; i < words.length; i += BATCH_SIZE) {
          const batch = words.slice(i, i + BATCH_SIZE)
          const wordPromises = batch.map(async (word: any) => {
            return await prisma.word.create({
              data: {
                german: word.german,
                english: word.english,
                description: word.description,
                difficulty: word.difficulty,
                categoryId: categoryId,
                levelId: levelNumber
              }
            })
          })

          await Promise.all(wordPromises)
        }

        totalWords += words.length
      }
    }

    console.log(`✅ Successfully seeded ${totalWords} vocabulary words!`)
    console.log(`📊 Database contains:`)
    console.log(`   • ${categories.size} categories`)
    console.log(`   • ${levels.size} levels`)
    console.log(`   • ${totalWords} words`)

    // Summary by level
    console.log(`📈 Level breakdown:`)
    const levelCounts: { [key: number]: number } = {}
    for (const [levelKey, levelData] of Object.entries(VOCABULARY_DATA)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))
      let count = 0
      for (const categoryWords of Object.values(levelData)) {
        count += (categoryWords as any[]).length
      }
      levelCounts[levelNumber] = count
      console.log(`   • Level ${levelNumber}: ${count} words`)
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedVocabulary()
