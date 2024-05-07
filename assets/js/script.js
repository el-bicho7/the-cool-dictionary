const acceptBtn = $('#search-button');
const clearBtn = $('#clear-button');
const outputWord = $('#word');

function searchWord(){
  const theWord = $('#search-input').val().trim();
  const bilingualDict = 'https://www.dictionaryapi.com/api/v3/references/spanish/json/';
  const key = '?key=a16e1bea-6077-4330-8322-a1574b70f085';
  const fetchBi = bilingualDict + theWord + key;

  fetch(fetchBi)
    .then(response => response.json())
    .then(data => {
      for (let dat of data){
        // data.hwi.hw = word stored
        if (theWord === dat.hwi.hw){
          // This gets the word in the dictionary and what type of word is it
          const word = $("<p>").append(dat.hwi.hw + " - " + dat.fl);
          $('#word').append(word);
          // This gets the word in spanish
          const translate = $("<p>").append(dat.shortdef.join("\n"));
          $('#translation').append(translate);
}}})
    .catch(error => {
      console.error("There was a problem with the Dictionary operation", error)
    })
};

function thesaurusW(){
  const theWord = $('#search-input').val().trim();
  const thesaurusDict = 'https://dictionaryapi.com/api/v3/references/ithesaurus/json/'; //https://dictionaryapi.com/api/v3/references/ithesaurus/json/pretty?key=cb8330dc-8de9-452c-9c8e-ab72c53bd096
  const key = '?key=cb8330dc-8de9-452c-9c8e-ab72c53bd096';
  const thesaurus = thesaurusDict + theWord + key;
  fetch(thesaurus)
    .then(response => response.json())
    .then(data => {
      for (let dat of data){
        if (theWord === dat.hwi.hw){
          // This adds definitions
          const def = $("<p>").append(dat.shortdef);
          $('#definitions').append(def);
          // This adds an example
          const exam = $("<p>").append(dat.shortdef);
          $('#example').append(exam);
          // This adds the synonyms
          const syn = $("<p>").append(dat.meta.syns[0].join(", "));
          $('#synonyms').append(syn);
          // This adds the antonyms
          if (dat.meta.ants[0]){
            const ant = $("<p>").append(dat.meta.ants[0].join(", "));
            $('#antonyms').append(ant);
          }}}})
    .catch(error => {
      console.error("There was a problem with the Thesaurus operation", error)
    })
}

function cleanScreen() {
  $("#search-input").val("");
  $('#word').empty();
  $('#definitions').empty();
  $('#synonyms').empty();
  $('#antonyms').empty();
  $('#translation').empty();
}

// Webster Dictionary Spanish-English dictionary
acceptBtn.on('click', function(){
  searchWord();
  thesaurusW();
});

clearBtn.on('click', cleanScreen);

const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const srchBtn = document.getElementById("srchBtn");

srchBtn.addEventListener("click", function(e){
    let inpWord = document.getElementById("inp-word")
    .value;
    fetch(`${url}${inpWord}`)
        .then((Response) => Response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button>
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

            
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
             
});
