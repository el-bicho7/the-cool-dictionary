const acceptBtn = $('#srchBtn');
const clearBtn = $('#clear-button');
const result = $('#result');
const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

// this functionwill fetch theWord from stands4 and will return definition and example
function exampleTest(){
  const user_id = '12544';
  const token = 'eu3x0aXkEo6Upvjl'
  const theWord = $('#inp-word').val().trim();
  const format = 'json';
  const url = `https://www.stands4.com/services/v2/syno.php?uid=${user_id}&tokenid=${token}&word=${theWord}&format=${format}`;
  
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.result.forEach(dat => {
      const terms = dat.term.split(", ");
      
      if (terms.includes(theWord)){
        if (dat.definition !== "" ){
          //This const will get the definition of theWord
          const definition = $('<p>').append(dat.definition);
          $('#modal-meaning').append(definition);
        } else {
          const definition = $('<p>').append(`Couldn't find a definition for ${theWord}`);
          $('#modal-meaning').append(definition);
          
        };
        if (dat.example.length > 0){
          //This const will get the example
          const example = $('<p>').append(dat.example);
          $('#modal-example').append(example);
        } else {
          const example = $('<p>').append(`Couldn't find an exampe for ${theWord}`);
          $('#modal-example').append(example);
        } 
    }}
  )})
  .catch(error =>{
    console.error("There was a problem with the Dictionary operation", error);
    $('#modal-example').append("Error in directory try another word");
  })
  };


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
  }}})
    .catch(error => {
      console.error("There was a problem with the Dictionary operation", error);
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
        if (response.meta.syns.length > 0){
        const syn = $("<p>").append(response.meta.syns[0].join(", "));
        $('#modal-synonyms').append(syn);
      } else {
        const syn = $("<p>").append(`We couldn't find synonyms for ${theWord}`);
          $('#modal-antonyms').append(syn);
      };
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
    console.error("There was a problem with the Thesaurus operation", error);
    $('#modal-synonyms').append("<p>Can't find synonyms, try another word.</p>");
    $('#modal-antonyms').append("<p>Can't find antonyms, try another word.</p>");
  })};


function clearModal(){
  $("#inp-word").val("");
  $("#modal-word").empty();
  $('#modal-meaning').empty();
  $('#modal-example').empty();
  $('#modal-synonyms').empty();
  $('#modal-antonyms').empty();
  $('#modal-translation').empty()
}

// Webster Dictionary Spanish-English dictionary
acceptBtn.on('click', function(){
  modal.style.display = 'block';
  exampleTest();
  websterDictionary();
  thesaurusW();
});

closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  clearModal();
});
