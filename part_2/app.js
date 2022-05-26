// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const baseUrl = 'http://deckofcardsapi.com/api/deck'

// 1.
const part1 = async () => {
    try {
        let {data:data} = await axios.get(`${baseUrl}/new/draw/`, {params: {count: 1}})
        let {suit, value} = data.cards[0]
        console.log(`${value} of ${suit}`)
    }
    catch (e) {
        console.log(`There's been an error: ${e}`)
    }
}
part1()

// 2.
const part2 = async () => {
    try {
        let deckId = ''
        let {data:firstData} = await axios.get(`${baseUrl}/new/draw/`, {params: {count: 1}})
        deckId = firstData.deck_id
        let {suit:firstSuit, value:firstValue} = firstData.cards[0]

        let {data:secondData} = await axios.get(`${baseUrl}/${deckId}/draw/`, {params: {count: 1}})
        let {suit:secondSuit, value:secondValue} = secondData.cards[0]

        console.log(`${firstValue} of ${firstSuit} and ${secondValue} of ${secondSuit}`)
    }
    catch (e) {
        console.log(`There's been an error: ${e}`)
    }
}
part2()

// 3.
let deckId = ''
$submit = $('#submit')
$list = $('#cards-drawn-list')

const part3 = async () => {
    let {data:data} = await axios.get(`${baseUrl}/new/shuffle/`)
    deckId = data.deck_id
    $submit.show()
}

const drawCard = async (e) => {
    try {
        e.preventDefault()
        let {data:data} = await axios.get(`${baseUrl}/${deckId}/draw/`, {params: {count: 1}})
        if (data.error) {
            $submit.hide()
        }
        else {
            let {suit, value} = data.cards[0]
            $list.append(`<li>${value} of ${suit}</li>`)
        }
    } catch (err) {
        console.log(`There's been an error: ${err}`)
    }
}

part3()
$submit.on('click', drawCard)