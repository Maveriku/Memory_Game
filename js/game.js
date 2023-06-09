const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// MÚSICAS E EFEITOS SONOROS
const Flip_Front_Card = document.getElementById('card_turn_front_sound');
const Flip_Back_Card = document.getElementById('card_turn_back_sound'); 
const Match_Sound = document.getElementById('match_sound'); 
const Winner_Sound = document.getElementById('winner_sound'); 
const background_music = document.getElementById('background_music'); 

const playFlip_Front_Card = () => {
    Flip_Front_Card = 0.6;
    Flip_Front_Card.play();
  }

const playFlip_Back_Card = () => {
    Flip_Back_Card = 1;
    Flip_Back_Card.play();
  } 

const playMatch_Sound = () => {
    Match_Sound = 0.5;
    Match_Sound.play();
  }

const playWinner_Sound = () => {
    Winner_Sound = 0.5;
    Winner_Sound.play();
  } 

const setVolume = (element, volume) => {
    if (volume < 0 || volume > 1) {
      console.error('O volume deve estar entre 0 e 1.');
      return;
    } element.volume = volume;
  }



const characters = [
    'abobora',
    'beber',
    'carne',
    'casa',
    'chuva',
    'comer',
    'dia',
    'feijao',
    'peixe',
  ];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length == 18) {
        Winner_Sound.play();  
        clearInterval(this.loop);
        Winner_Sound.onended = () => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
            background_music.pause();
          };
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard  = '';
        secondCard = '';

        checkEndGame();
        Match_Sound.play();


    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard  = '';
            secondCard = '';

        Flip_Back_Card.play();
        }, 500);
    }
}

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == ''){
        Flip_Front_Card.play();
        
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
        
    } else if (secondCard ==''){
        Flip_Front_Card.play();
        
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards()
        
    }

}

const createCard = (character) => {
    
    const card = createElement ('div', 'card');
    const front = createElement ('div', 'face front');
    const back = createElement ('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5 );

    shuffleArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });

}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {

    background_music.play(); setVolume (background_music, 0.07);

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
