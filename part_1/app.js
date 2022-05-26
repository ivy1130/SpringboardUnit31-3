// Part 1: Number Facts
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

const baseUrl = 'http://numbersapi.com'

// 1.
const part1 = async () => {
    try {
        let {data:fact} = await axios.get(`${baseUrl}/14?json`)
        console.log(fact)
    }
    catch (e) {
        console.log(`There's been an error: ${e}`)
    }
}
part1()


// 2.
$exercise2 = $('#exercise-2')
const part2 = async () => {
    try {
        let {data:facts} = await axios.get(`${baseUrl}/1,5,10,15?json`)
        for (let fact in facts) {
            $exercise2.append(`<li>${facts[fact]}</li>`)
        }
    }
    catch (e) {
        console.log(`There's been an error: ${e}`)
    }
}
part2()

//3 .
$exercise3 = $('#exercise-3')
let fourFacts23 = []

for (let i = 1; i < 5; i++) {
    fourFacts23.push(
      axios.get(`${baseUrl}/23?json`)
    )
  }

const part3 = async () => {
    let facts = await Promise.all(fourFacts23)
    console.log(facts)
    for (let fact in facts) {
        $exercise3.append(`<li>${facts[fact].data.text}</li>`)
    }
}
part3()