const root = $('#print');


fetch('https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=a16e1bea-6077-4330-8322-a1574b70f085', {
  method: 'GET', //GET is the default.
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  fetch('https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=cb8330dc-8de9-452c-9c8e-ab72c53bd096', {
    method: 'GET', //GET is the default.
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });