const fetchMusic = (query, id) => {
  //creo una funzione fetchMusic che attraverso una query (inserita poi nell'url) e un id (per html) mi permettera' di fare da tramite tra i data del server e il mio codice html
  const section = document.querySelector(`#${id}`); //seleziona tutti gli elementi html con id uguale a quello messo all'internmo della funzione
  const row = document.querySelector(`#${id}Section`); //lo stesso vale per questa riga di codice
  const modal = document.querySelector(".modal-body");
  console.log(row);
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query) //qui chiamo il server con l'url desiderato
    .then((raw) => {
      //se tutto va bene prendo il risultato del server e restituisco il risultato in formato json
      return raw.json();
    })
    .then((data) => {
      //se ancora una volta va tutto bene inizializzo una variabile music con all'interno la risposta del server
      let music = data.data;
      section.classList.remove("d-none"); //rimuovo dalla section su cui sto lavorando la classe d-none per mostrare il contenuto
      for (let i = 0; i < music.slice(0, 4).length; i++) {
        //scelgo i primi quattro elementi del vettore
        //prende le prime quattro canzoni in base alla risposta del server
        const element = music[i]; //mostro music[0] etc. e all'interno della row inietto il codice html ottenendo cosi l'immagine di copertina della posizione n del vettore
        row.innerHTML +=
          /*html*/
          `<div class='col col-3'>
            <img class='w-100' src='${element.album.cover_xl}'/> 
            </div>`;
        modal.innerHTML +=
          /*html*/
          `<p>${element.title}</p>`;
      }
    })
    .catch((err) => console.log(err));
};

window.onload = () => {
  //all'avvio chiamo
  fetchMusic("eminem", "eminem");
  fetchMusic("queen", "queen");
  fetchMusic("metallica", "metallica");
};
