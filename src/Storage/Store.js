import AsyncStorage from '@react-native-async-storage/async-storage';

export const DECKS_KEY = '@DECKS_API';

// TODO: Change with async store 
const Sample_data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}


const Question = (question, answer) => ({
    question,
    answer
})

export const saveQuestion = async (_question, _answer, title) => {
    // TODO: null check variables
    const newQuestion = Question(_question, _answer);
    const storedDataParsed = await getDecks();
    if (storedDataParsed !== null && storedDataParsed[title] !== undefined) {
        storedDataParsed[title].questions.push(newQuestion);
        await saveDecks(storedDataParsed);
    }
}

// Deck object
const Deck = (title) => ({
    [title]: {
        title,
        questions: []
    }
})

/**
 * Get All Decks
 */
export const getDecks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DECKS_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

/** 
 * Get Deck with deck title
 * @param {string} title 
 */
export const getDeck = async (title) => {
    try {
        const jsonValue = await getDecks()
        return (jsonValue != null && jsonValue[title] !== undefined) ? jsonValue[title] : null;
    } catch (e) {
        // error reading value
    }
}

/**
 * Create new Deck Object with deck title
 * @param {string} title 
 */
export const createDeckObject = async (title) => {
    try {
        const decks = await getDecks();
        let newData = [];
        if (decks === null) {
            await saveDecks(Deck(title));
        } else {
            newData = { ...decks, ...Deck(title) };
            await saveDecks(newData);
        }
    } catch (e) {
        // saving error
    }
}

/**
 * Delete deck with title
 * @param {string} title 
 */
export const deleteDeck = async (title) => {
    try {
        const decks = await getDecks();
        if (decks !== null && decks[title] !== undefined) {
            decks[title] = undefined;
            delete decks[title];
            await saveDecks(decks);
        }
    } catch (e) {
        // saving error
    }
}

const saveDecks = async (data) => {
    try {
        await save(DECKS_KEY, data);
    } catch (e) {
        // saving error
    }
}

// Sample of array merge 
export const createDeckArray = async (value) => {
    try {
        const storedDataParsed = await getDecks();
        let newData = [];
        if (storedDataParsed === null) {
            await saveDecks([Deck(value)]);
        } else {
            newData = [...storedDataParsed, Deck(value)];
            await saveDecks(newData);
        }
    } catch (e) {
        // saving error
    }
}
// <= DECK

const save = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        // saving error
    }
}
