const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
resultDiv.style.display = "none";
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
  resultDiv.style.display = "block";


})

const getWordInfo = async (word) => {
    try {
    resultDiv.innerHTML = "Fetching Data..."
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data =await response.json();
    let definition = data[0].meanings[0].definitions[0];
    console.log(data);
    resultDiv.innerHTML = `<h2><strong>Word:</strong>${data[0].word}</h2>
    <p class = "partofspeech">${data[0].meanings[0].partOfSpeech}</P>
    <p><strong>Meaning:</strong>${definition.definition === undefined ? "Not Found!" : definition.definition}</P>
    <p><strong>Example:</strong>${definition.example === undefined ? "Not Found" : definition.example }</P>
    <p><strong>Antonyms:</strong></P>`;
    // Fetching Antonomys
        if(definition.antonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else{
        for(let i=0; i<definition.antonyms.length;i++){
                resultDiv.innerHTML += `<li>${definition.antonyms[i]}</li>`;
            }
        };

    resultDiv.innerHTML +=`<p><strong>synonyms:</strong></P>`;
        // // Fetching synonyms
        
        if(definition.synonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else{
        for(let j=0; j<definition.synonyms.length;j++){
                resultDiv.innerHTML += `<li>${definition.synonyms[j]}</li>`;
            }
        }
    
    // adding read more button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target = "_blank">Read More</a></div>`;
      }
      catch (error) {
        resultDiv.innerHTML = `<p>Sorry!!! the word could not be Found😆</p>`
    }
};
