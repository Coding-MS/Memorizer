

document.addEventListener("DOMContentLoaded",
    function () {
        const colors = ['red', 'green', 'blue', 'Yellow', 'orange', 'Pink'];

        let gameArray = [];
        let flippedCards = [];
        let matchedPairs = 0;

        gameArray = colors.concat(colors);
        gameArray.sort(() => 0.5 - Math.random());

        const gameBoard = document.getElementById('gameBoard');
        for (let i = 0; i < gameArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = gameArray[i];
            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
        }

        function handleCardClick(event) {
            const clickedCard = event.target;
            // Ignore click if the card has already been flipped or matched
            if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
                return
            }
            const cardColor = clickedCard.dataset.color;
            clickedCard.style.backgroundColor = cardColor;
            clickedCard.classList.add('flipped');


            // Add card to the flippedCards array 
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                const [firstCard, secondCard] = flippedCards;
                if (firstCard.dataset.color === secondCard.dataset.color) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matchedPairs = matchedPairs++;

                    flippedCards = [];

                    if (matchedPairs === colors.length) {
                        alert('You have successfully matched all colours! Well done!');
                    }
                }  else {
                    // Cards do not match, flip them back over 
                    setTimeout(() => {
                        firstCard.style.backgroundColor = '';
                        firstCard.classList.remove('flipped');
                        secondCard.style.backgroundColor = '';
                        secondCard.classList.remove('flipped');
                        flippedCards = []
                    }, 500);
                    return
                }
            }

        }

    }
)