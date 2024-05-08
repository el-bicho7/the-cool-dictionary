const acceptBtn = $('#srchBtn');
const clearBtn = $('#clear-button');
const result = $('#result');
const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

// This function will fetch the dictionary and get the meaning of the word
function meaningDict(){
  const theWord = $('#inp-word').val().trim();
  const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
  
  fetch(`${url}${theWord}`)
    .then(response => response.json())
    .then(data =>{
      const meaning = $("<p>").append(data[0].meanings[0].definitions[0].definition);
      $("#modal-meaning").append(meaning);
    })
    .catch(error => {
      console.error("There was a problem with the Meaning operation", error)
    })};


// This function gets the word from the Webster Dictionary and returns the word in spanish
function websterDictionary(){
  const theWord = $('#inp-word').val().trim();
  const spanishAPI = 'https://www.dictionaryapi.com/api/v3/references/spanish/json/';
  const keySpanish = '?key=a16e1bea-6077-4330-8322-a1574b70f085';
  const fetchBi = spanishAPI + theWord + keySpanish;
  
  fetch(fetchBi)
    .then(response => response.json())
    .then(data => {
      for (let dat of data){
        // data.hwi.hw = word stored
        if (theWord === dat.hwi.hw){
          
          // This gets the word and the part of speech
          const partOfSent = $("<p>").append(dat.hwi.hw + " - " + dat.fl);
          $('#modal-word').append(partOfSent);
          // This gets the word in spanish
          const translate = $("<p>").append(dat.shortdef.join("\n"));
          $('#modal-translation').append(translate);
          // This gets the example of the theWord
          // const example = $("<p>").append(dat.def.sseq[0][0][1].dt[0][1].t);
          // $('#modal-example').append(example);
  }}})
    .catch(error => {
      console.error("There was a problem with the Dictionary operation", error)
    })};

  // This function gets the synonym and antonyms of the searched word
function thesaurusW(){
  const theWord = $('#inp-word').val().trim();
  const thesAPI = 'https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/';
  const keyThesaurus = '?key=cb8330dc-8de9-452c-9c8e-ab72c53bd096';
  const thesaurus = thesAPI + theWord + keyThesaurus;

  fetch(thesaurus)
  .then(response => response.json())
  .then(responses => {
    for (let response of responses){
      if (theWord === response.hwi.hw){
        // This adds the synonyms
        const syn = $("<p>").append(response.meta.syns[0].join(", "));
        $('#modal-synonyms').append(syn);
        // This adds the antonyms
        if (response.meta.ants.length > 0){
          const ant = $("<p>").append(response.meta.ants[0].join(", "));
          $('#modal-antonyms').append(ant);
        } else {
          const ant = $("<p>").append(response.hwi.hw + " as a " + response.fl + " doesn't have antonyms");
          $('#modal-antonyms').append(ant);
        }
      }}})
  .catch(error => {
    console.error("There was a problem with the Thesaurus operation", error)
  })};


function clearModal(){
  $("#inp-word").val("");
  $("#modal-word").empty();
  $('#modal-meaning').empty();
  $('#modal-example').empty();
  $('#modal-synonyms').empty();
  $('#modal-antonyms').empty();
  $('#modal-transalation').empty()
}

// Webster Dictionary Spanish-English dictionary
acceptBtn.on('click', function(){
  modal.style.display = 'block';
  websterDictionary();
  thesaurusW();
  meaningDict();
});

closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  clearModal();
});
