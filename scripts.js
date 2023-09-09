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

    //Just for debugging purposes.
    console.log('Input Name:', inputName);

    const matchedElement = nameData.filter(entry => entry.romaji.toLowerCase() === inputName);

    if(matchedElement.length > 0) {

        const kanjiName = matchedElement.map(element => element.kanji);
        outputDiv.textContent = `Possible Kanji: ${kanjiName.join(', ')}`;

    } else {

        //Will call method that filters through different name elements...later
        //const guessedName = guessKanjiName(inputName);

        //Just for debugging purposes.
        console.log('Guessed Name:', guessedName);

        //For now, we will just do this.
        outputDiv.textContent = `Name not found in database.`;

    }

}

//Method that will guess the kanji name based on patterns (not finished yet)
function guessKanjiName(romajiName)
{

    async function getKeyValuesFromJSONFile() {
        try {
          const response = await fetch('name_elements.json');
          if (!response.ok) {
            throw new Error('JSON not found');
          }
      
          let nameElementData = await response.json();
          return nameElementData;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array or handle the error as needed
        }
      }

let nameElementData = getKeyValuesFromJSONFile();

console.log(nameElementData);

    for (const {romaji, kanji} of nameElementData)
    {
        console.log(romaji);
        console.log(romajiName);
        const pattern = new RegExp(romaji);
        if(pattern.test(romajiName))
        {
            return kanji;
        }
    }

    return null;

}