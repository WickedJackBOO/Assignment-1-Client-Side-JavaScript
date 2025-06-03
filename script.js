let currentIndexes = [0, 0, 0, 0, 0] // keeps track of which word is picked for each list

for (let i = 0; i < 5; i++) {
    let list = document.getElementById("list" + i) // get list by index
    let items = list.getElementsByTagName("li")   // get all words in that list
    items[0].classList.add("selected") // highlight the first word in each list
}

// when a number button is clicked, cycle to the next word
function nextWord(index) {
    let list = document.getElementById("list" + index) // get list by index
    let items = list.getElementsByTagName("li") // get all words in that list

    items[currentIndexes[index]].classList.remove("selected") // remove the selected class from the current word

    currentIndexes[index] = currentIndexes[index] + 1 // move to the next word in that list
    if (currentIndexes[index] >= items.length) { // if at end
        currentIndexes[index] = 0 // go back to top
    }

    items[currentIndexes[index]].classList.add("selected") // highlight the new word
}

// picks a random word from each list
function makeRandomStory() {
    for (let i = 0; i < 5; i++) { // loop through each list
        let list = document.getElementById("list" + i) // get list by index
        let items = list.getElementsByTagName("li") // get all words in that list

        items[currentIndexes[i]].classList.remove("selected") // remove the selected class from the current word
        // https://www.w3schools.com/JS/js_random.asp
        // helped with this next line
        let randomIndex = Math.floor(Math.random() * items.length) // pick a random word from that list
        currentIndexes[i] = randomIndex // set that as the current word

        items[randomIndex].classList.add("selected") // highlight the new word
    }

    showStory() // show the story
}

// shows the sentence made from the picked words
function showStory() {
    let story = "" // start with an empty string

    for (let i = 0; i < 5; i++) { // loop through each list
        let list = document.getElementById("list" + i) // get list by index
        let items = list.getElementsByTagName("li") // get all words in that list
        story += items[currentIndexes[i]].innerText + " " // add the current word to the string
    }

    document.getElementById("story-output").innerText = story.trim() // display the string
}

// reads the sentence out loud (optional feature)
function sayStory() {
    showStory() // make sure the story is built first
    // this helped https://www.w3schools.in/javascript/text-to-speech-api
    // for the code below
    let text = document.getElementById("story-output").innerText // innerText because getting text from <p> not a input box
    let speech = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(speech)
}
