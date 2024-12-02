(() => {
  'use strict'

  const sizeMin = window.matchMedia('(max-width: 630px)');
  const container = document.querySelector('.container');
  const game = document.getElementById('game');
  const button = document.querySelector('.btn');

  function startGame() {
    const cardsArray = [];
    const timer = document.querySelector('.timer');
    timer.hidden = false;
    let firstCard = null;
    let secondCard = null;

    // Создание массива чисел
    for (let i = 1; i <= cardsCount; i++) {
      cardsArray.push(i, i);
    };

    // Перемешивание массива чисел
    for (let i = 0; i < cardsArray.length; i++) {
      let randomIndex = Math.floor(Math.random() * cardsArray.length);

      let temp = cardsArray[i];
      cardsArray[i] = cardsArray[randomIndex];
      cardsArray[randomIndex] = temp;
    };

    // Настройка сетки
    let columns = 2;

    if (cardsCount === 2) {
      columns = 2;
    } else if (cardsCount === 4 || cardsCount === 6 || cardsCount === 8) {
      columns = 4;
    } else if (cardsCount === 10) {
      columns = 5;
    };
    game.style = `grid-template-columns: repeat(${columns}, 1fr);`;

    // Таймер
    setTimeout(() => {
      timer.textContent = 60;
      timer.style = `color: black;`;

      const time = setInterval(() => {
        timer.textContent--

        if (timer.textContent === '10') {
          timer.style = `color: #ff0000; background-image: radial-gradient(#fff100, #ff0000);`
        };

        if (timer.textContent === '0') {
          clearInterval(time);

          setTimeout(() => {
            alert('В следующий раз обязательно получится!');
          }, 200);

          setTimeout(() => {
            button.hidden = false;
          }, 400);
        };

        if (cardsArray.length === document.querySelectorAll('.success').length) {
          clearInterval(time);
        }
      }, 1000);
    }, 500);

    // Создание карточек
    for (const cardNumber of cardsArray) {
      const card = document.createElement('li');
      card.classList.add('card');
      card.textContent = cardNumber;

      //Hастройка размеров карточек
      function changeCardSize() {
        let width;
        let height;

        if (sizeMin.matches) {
          width = 80;
          height = 80;
        } else {
          if (cardsCount === 6 || cardsCount === 8) {
            width = 120;
            height = 120;
          } else if (cardsCount === 10) {
            width = 100;
            height = 100;
          }
        }
        card.style = `width: ${width}px; height: ${height}px;`;
      };
      changeCardSize();
      sizeMin.addEventListener('change', changeCardSize);

      // Клик по карточке
      const clickCard = function () {
        if (card.classList.contains('open') || card.classList.contains('success')) {
          return;
        };

        if (firstCard !== null && secondCard !== null) {
          firstCard.classList.remove('open');
          secondCard.classList.remove('open');

          firstCard = null;
          secondCard = null;
        };

        card.classList.add('open');

        if (firstCard === null) {
          firstCard = card;
        } else {
          secondCard = card;
        };

        if (firstCard !== null && secondCard !== null) {
          let firstCardNumber = firstCard.textContent;
          let secondCardNumber = secondCard.textContent;

          if (firstCardNumber === secondCardNumber) {
            firstCard.classList.add('success');
            secondCard.classList.add('success');
          }
        };

        // Проверка финала игры
        if (cardsArray.length === document.querySelectorAll('.success').length) {
          setTimeout(() => {
            alert('ПОБЕДА!!!');
          }, 500);

          setTimeout(() => {
            button.hidden = false;
          }, 800);
        };
      };

      window.addEventListener('click', () => {
        card.addEventListener('click', clickCard);

        if (timer.textContent === '0') {
          card.removeEventListener('click', clickCard);
        }
      });
      game.append(card);
    }
  }

  // Старт игры
  let cardsCount;
  button.hidden = false;

  if (button.textContent = 'Начать игру') {
    container.style = `justify-content: center;`;
  };

  button.addEventListener('click', () => {
    game.innerHTML = '';
    button.hidden = true;

    if (button.hidden === true) {
      cardsCount = Number(prompt('Введите четное количество пар от 2 до 10', 2));
      let result = (Number(cardsCount) % 2 === 0 && Number(cardsCount) >= 2 && Number(cardsCount) <= 10) ? Number(cardsCount) : 2;
      cardsCount = result;
    };

    startGame(game, cardsCount);

    if (startGame) {
      container.style = `justify-content: flex-start;`;
      button.textContent = 'Сыграть ещё раз';
    };
  });
})();







