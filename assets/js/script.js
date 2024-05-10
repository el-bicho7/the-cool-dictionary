const acceptBtn = $('#srchBtn');
const clearBtn = $('#clear-button');
const result = $('#result');
const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

// FCB declaring an array to handle the localstorage
let arrayofWords = [{ theWord:String}];
// FCB declaring a reference to the buttons of tags at the html
const tagButton = $('#listofTags');

// This function will fetch the dictionary and get the meaning of the word
function meaningDict(theWord){
  // FCB the var theWord now is a parameter and the next line is not necesary 
  // const theWord = $('#inp-word').val().trim();
  const user_id = '12544';
  const token = 'eu3x0aXkEo6Upvjl'
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
function websterDictionary(theWord){
  // FCB the var theWord now is a parameter and the next line is not necesary 
  // const theWord = $('#inp-word').val().trim();
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
         
  }}})
    .catch(error => {
      console.error("There was a problem with the Dictionary operation", error)
    })};

  // This function gets the synonym and antonyms of the searched word
function thesaurusW(theWord){
  // FCB the var theWord now is a parameter and the next line is not necesary 
  // const theWord = $('#inp-word').val().trim();
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
  // FCB correcting an finger error transalation
  $('#modal-translation').empty();
}

// FCB adding two functions
// FCB renderTags appends tags elements in the div of the HTML

function renderTags() {
  const theTags = $('#listofTags');
  theTags.empty();

  for (let index = 0; index < arrayofWords.length; index++) {
    // FCB define the element for the <div> HTML 
    const spanTag = $('<button>').addClass('tag is-success').text(arrayofWords[index]);
    theTags.append(spanTag);
  }
}

// FCB handle localStorage function to store the searched words in the localstorage

function handleLocalStorage() {
  const theWord = $('#inp-word').val().trim();
  let lengthofArray = 0;

  // FCB load the localstorage (if not empty)
  if (localStorage.getItem("theWords")!== null) {
      arrayofWords = JSON.parse(localStorage.getItem("theWords"));
      lengthofArray = arrayofWords.length;
  } else {
      arrayofWords=[];
  }
  // FCB Add the word to the array of words
  if (lengthofArray>11) {
    // FCB delete the first element of the array to keep 12 words
      arrayofWords.shift();
  }
  arrayofWords.push(theWord);

  // FCB store the localstorage
  localStorage.setItem("theWords",JSON.stringify(arrayofWords));
}


// Webster Dictionary Spanish-English dictionary
acceptBtn.on('click', function(){
  modal.style.display = 'block';
  // FCB now the calls to the functions is with a parameter
  // thats why the next lines are commented

  // websterDictionary();
  // thesaurusW();
  // meaningDict();

  
  // FCB declarin this const that its work like a parameter
  const theseWord = $('#inp-word').val().trim();
  // FCB now the calls to the function have a parameter
  websterDictionary(theseWord);
  thesaurusW(theseWord);
  meaningDict(theseWord);
  // FCB adding a call to handleLocalStorage function
  handleLocalStorage();
  // FCB adding a call to rendertags function
  renderTags();
});

// FCB adding this function to reload the word
// when de tag button of a word is clicked

tagButton.on('click', function(){
  modal.style.display = 'block';
  const theseWord = document.activeElement.textContent; 
  websterDictionary(theseWord);
  thesaurusW(theseWord);
  meaningDict(theseWord);
});

closeButton.addEventListener("click", function() {
  modal.style.display = "none";
  clearModal();
});
