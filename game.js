const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector ('.timer');

const personagens = [
  'SOS_mata_tlantica',
  'sapo_cururu',
  'samanbaia',
  'pau_do_brasil',
  'mico_leao_dourado',
  'jacare_de_papo_amarelo',
  'tucano',
  'araucaria',
  'onça_pintada',
  'cachoera'

]

const createElement = (tag, className) =>{
   const element = document.createElement (tag);
   element.className = className;
   return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
   const disabledCards = document.querySelectorAll('.disabled-card');

   if (disabledCards.length === 20) {
      clearInterval(this.loop);
     alert(`PARABÉNS, seu tempo foi de :${timer.innerHTML}, ate o proximo ANO`);

   }
}

const cheackCards = () => {
   const firstPersonagen = firstCard.getAttribute('data-personagen');
   const secondPersonagen = secondCard.getAttribute('data-personagen');

   if (firstPersonagen === secondPersonagen){
      firstCard.firstChild.classList.add ('disabled-card');
      secondCard.firstChild.classList.add ('disabled-card');

      firstCard = '';
      secondCard = '';

      checkEndGame ()


   }  else{
      setTimeout(() => {

         firstCard.classList.remove('reveal-card')
         secondCard.classList.remove('reveal-card')

         firstCard = '';
         secondCard = '';

      },  500);

   }
   
}

const revealCard = ({ target }) =>{

   if(target.parentNode.className.includes('reveal-card')) {
      return;
   } 

   if(firstCard === '') {
     
     target.parentNode.classList.add('reveal-card');
     firstCard = target.parentNode;

   } else if(secondCard === '') {
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;

      cheackCards()
   }
}


const createCard = (personagen) => {

   const card =createElement('div','card');
   const front = createElement('div','face front');
   const back = createElement('div','face back');

   front.style.backgroundImage = `url(../imagens/${personagen}.jpg)`;


   card.appendChild(front);
   card.appendChild(back);

   card.addEventListener('click', revealCard);
   card.setAttribute('data-personagen', personagen)
   
   
   return card;


}

const loadgame = () => {
   const duplicatePersonagens = [...personagens, ...personagens];

   const shuffleadArrey = duplicatePersonagens.sort(() => Math.random() - 0.5);

   shuffleadArrey.forEach((personagen) => {

     const card = createCard(personagen);
     console.log(personagen);
     grid.appendChild(card);

    })

}



const startTimer = () => {
  
   if (isNaN(timer.innerHTML)) {
      timer.innerHTML = 0;
   }

   this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
   }, 1000);
}



window.onload = () => {
  
  const playerName = localStorage.getItem('player'); 

  spanPlayer.innerHTML = playerName;
  startTimer();
  loadgame();
  
 
}


