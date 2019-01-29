const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'lab-mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });

Celebrity.collection.drop();

const celebrities = [
    {
      name: "Fausto Silva",
      occupation: "Apresentador de TV",
      catchPhrase: "Ô lôco, meu!",
    },
    {
      name: "Luciano Huck",
      occupation: "Apresentador de TV",
      catchPhrase: "Loucura, loucura, loucura!",
    },
    {
      name: "Edson Arantes do Nascimento",
      occupation: "Poeta",
      catchPhrase: "Entende?!",
    }
  ];

Celebrity.create(celebrities)
  .then(celebrities => {
    celebrities.forEach(celebrity => {
      console.log(`New celebrity created: ${celebrity.name}`);
    })

    mongoose.connection.close();
  })
  .catch(err => console.log(err));
