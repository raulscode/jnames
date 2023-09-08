let nameData = [];

//Making instance of XMLHttpRequest
const xhr = new XMLHttpRequest();

//Loading the JSON file
xhr.onreadystatechange = function () {

    //Error check
    if(xhr.readyState === 4 && xhr.status === 200) {

        //If all good, parse JSON file
        nameData = JSON.parse(xhr.responseText);

    } else if (xhr.readyState === 4 && xhr.status !== 200) {

    console.error('Could not load JSON file');

    }

};

//Send XHR GET request
xhr.open('GET', 'japanese_last_names.json', true);
xhr.send();

//Find name and convert to kanji
function translateName() {

    const inputName = document.getElementById('input_name').value.trim().toLowerCase();
    const outputDiv = document.getElementById('result_area');

    console.log('Input Name:', inputName);

    const matchedElement = nameData.find(entry => entry.romaji.toLowerCase() === inputName);

    if(matchedElement) {

        const kanjiName = matchedElement.kanji;
        outputDiv.textContent = `Possible Kanji: ${kanjiName}`;

    } else {

        outputDiv.textContent = "Sorry, name not found.";

    }

}