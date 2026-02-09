#!/usr/bin/env node

// Seed tests based on vocabulary data for ALL levels

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedTests() {
  console.log('🧪 Seeding test data from vocabulary...')

  try {
    // Clear existing test data
    console.log('🗑️  Clearing existing test data...')
    await prisma.userTestResult.deleteMany({})
    await prisma.userAnswer.deleteMany({})
    await prisma.option.deleteMany({})
    await prisma.question.deleteMany({})
    await prisma.test.deleteMany({})

    // Get all vocabulary data from the API
    console.log('📚 Fetching vocabulary data from all levels...')
    const allVocabularyData = {}

    for (let level = 1; level <= 10; level++) {
      try {
        console.log(`📖 Fetching level ${level}...`)
        // Since we're seeding, we need to use the vocabulary data directly
        // For now, let's create comprehensive vocabulary data for all levels
      } catch (error) {
        console.warn(`Failed to fetch level ${level}:`, error)
      }
    }

    // Since we can't easily call the API during seeding, let's define comprehensive vocabulary data
    // This mirrors the data structure used in the main seed file
    const vocabularyData = {
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
          { german: "langsam", english: "slow", description: "Langsame Bewegung", difficulty: 1, category: "basic_adjectives" }
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
          { german: "ticket", english: "ticket", description: "Ticketform", difficulty: 5, category: "transportation" }
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
          { german: "wissen", english: "knowledge", description: "Wissensform", difficulty: 6, category: "education" }
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

    // Create tests from vocabulary data
    let testCount = 0
    let questionCount = 0
    let optionCount = 0

    for (const [levelKey, levelData] of Object.entries(vocabularyData)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))

      for (const [categoryName, words] of Object.entries(levelData)) {
        if (words.length < 4) continue // Need at least 4 words for meaningful questions

        const wordCount = Math.min(words.length, 10) // Limit to 10 questions per test

        // Create test
        const test = await prisma.test.create({
          data: {
            title: `DGS Level ${levelNumber} - ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/_/g, ' ')}`,
            description: `Test your knowledge of ${categoryName.replace(/_/g, ' ')} in Level ${levelNumber} of German Sign Language`,
            level: levelNumber,
            category: categoryName,
            timeLimit: 300, // 5 minutes
            passingScore: 70,
            isActive: true
          }
        })

        console.log(`📝 Created test: ${test.title}`)
        testCount++

        // Create questions for this test
        const selectedWords = words.slice(0, wordCount)

        for (let i = 0; i < selectedWords.length; i++) {
          const correctWord = selectedWords[i]

          // Get wrong answers from other words in the same category
          const wrongWords = selectedWords.filter(w => w.german !== correctWord.german)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)

          // Create question
          const question = await prisma.question.create({
            data: {
              testId: test.id,
              text: `Wie gebärdet man "${correctWord.german}"?`,
              order: i + 1,
              points: 1
            }
          })

          questionCount++

          // Create options (correct + 3 wrong)
          const options = [
            { text: correctWord.description, isCorrect: true },
            { text: wrongWords[0]?.description || 'Alternative 1', isCorrect: false },
            { text: wrongWords[1]?.description || 'Alternative 2', isCorrect: false },
            { text: wrongWords[2]?.description || 'Alternative 3', isCorrect: false }
          ].sort(() => 0.5 - Math.random()) // shuffle options

          for (let j = 0; j < options.length; j++) {
            await prisma.option.create({
              data: {
                questionId: question.id,
                text: options[j].text,
                isCorrect: options[j].isCorrect,
                order: j + 1
              }
            })
            optionCount++
          }
        }
      }
    }

    console.log(`\n✅ Test seeding completed!`)
    console.log(`📊 Created:`)
    console.log(`   • ${testCount} tests`)
    console.log(`   • ${questionCount} questions`)
    console.log(`   • ${optionCount} options`)

  } catch (error) {
    console.error('❌ Error seeding tests:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTests()
