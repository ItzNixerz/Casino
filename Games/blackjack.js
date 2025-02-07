<script>
    const cardValues = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 10, 'Q': 10, 'K': 10, 'A': 11
    };

    const cardImages = {
        '2': 'https://deckofcardsapi.com/static/img/2.png', 
        '3': 'https://deckofcardsapi.com/static/img/3.png', 
        '4': 'https://deckofcardsapi.com/static/img/4.png', 
        '5': 'https://deckofcardsapi.com/static/img/5.png', 
        '6': 'https://deckofcardsapi.com/static/img/6.png', 
        '7': 'https://deckofcardsapi.com/static/img/7.png', 
        '8': 'https://deckofcardsapi.com/static/img/8.png', 
        '9': 'https://deckofcardsapi.com/static/img/9.png', 
        '10': 'https://deckofcardsapi.com/static/img/10.png', 
        'J': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4d364ce1-cddf-46f1-8a9d-c0e8cc9c36cc/dawrv2l-d5e735db-bea6-46e2-be6a-51c4e289b36b.png/v1/fill/w_1024,h_1364,q_80,strp/my_playing_cards_v2___queen_of_spades_by_gabe0530_dawrv2l-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM2NCIsInBhdGgiOiJcL2ZcLzRkMzY0Y2UxLWNkZGYtNDZmMS04YTlkLWMwZThjYzljMzZjY1wvZGF3cnYybC1kNWU3MzVkYi1iZWE2LTQ2ZTItYmU2YS01MWM0ZTI4OWIzNmIucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pLihV6HdFGd320zaUUf2N5STrKNH7KHndBhcw4GJh1k', 
        'Q': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4d364ce1-cddf-46f1-8a9d-c0e8cc9c36cc/dawrv2l-d5e735db-bea6-46e2-be6a-51c4e289b36b.png/v1/fill/w_1024,h_1364,q_80,strp/my_playing_cards_v2___queen_of_spades_by_gabe0530_dawrv2l-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM2NCIsInBhdGgiOiJcL2ZcLzRkMzY0Y2UxLWNkZGYtNDZmMS04YTlkLWMwZThjYzljMzZjY1wvZGF3cnYybC1kNWU3MzVkYi1iZWE2LTQ2ZTItYmU2YS01MWM0ZTI4OWIzNmIucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pLihV6HdFGd320zaUUf2N5STrKNH7KHndBhcw4GJh1k', 
        'K': 'https://thumbs.dreamstime.com/b/large-index-playing-card-king-spades-american-deck-122573720.jpg', 
        'A': 'https://thumbs.dreamstime.com/b/ace-spades-playing-card-graphic-icon-230889606.jpg'
    };

    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let playerScore = 0;
    let dealerScore = 0;
    let gameOver = false;
    let winner = '';  // Variable to store who won

    // Function to create and shuffle the deck
    function createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = Object.keys(cardValues);

        deck = [];

        suits.forEach(suit => {
            values.forEach(value => {
                deck.push(value + suit);
            });
        });

        deck = shuffleDeck(deck);
    }

    // Shuffle deck function
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    // Draw a card from the deck
    function drawCard() {
        return deck.pop();
    }

    // Update score for player or dealer
    function updateScore(hand, isPlayer) {
        let score = 0;
        let aceCount = 0;

        hand.forEach(card => {
            const cardValue = card.slice(0, -1); // Remove suit to get the value
            score += cardValues[cardValue];
            if (cardValue === 'A') aceCount++;
        });

        // Adjust score for Aces
        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }

        if (isPlayer) {
            playerScore = score;
            document.getElementById('player-score').textContent = `Score: ${playerScore}`;
        } else {
            dealerScore = score;
            document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
        }
    }

    // Render cards in the player's or dealer's hand with images
    function renderCards(hand, isPlayer) {
        const cardDeck = isPlayer ? document.getElementById('player-cards') : document.getElementById('dealer-cards');
        cardDeck.innerHTML = '';  // Clear previous cards

        hand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            const cardValue = card.slice(0, -1); // Get the card value (e.g., 'A', '10', 'K')
            const cardImage = cardImages[cardValue]; // Get the card image URL
            const img = document.createElement('img');
            img.src = cardImage;
            img.alt = card;
            img.style.width = '60px';  // Set image width
            img.style.height = '90px';  // Set image height
            cardDiv.appendChild(img);
            cardDeck.appendChild(cardDiv);
        });
    }

    // Start a new game
    function startNewGame() {
        gameOver = false;
        playerScore = 0;
        dealerScore = 0;
        playerHand = [];
        dealerHand = [];

        createDeck();
        dealInitialCards();

        document.getElementById('game-status').textContent = '';
        document.getElementById('hit-button').disabled = false;
        document.getElementById('stand-button').disabled = false;
    }

    // Deal initial cards to player and dealer
    function dealInitialCards() {
        playerHand.push(drawCard(), drawCard());
        dealerHand.push(drawCard(), drawCard());

        renderCards(playerHand, true);
        renderCards(dealerHand, false);

        updateScore(playerHand, true);
        updateScore(dealerHand, false);
    }

    // Handle the player's hit action
    function playerHit() {
        if (gameOver) return;

        playerHand.push(drawCard());
        renderCards(playerHand, true);
        updateScore(playerHand, true);

        if (playerScore > 21) {
            gameOver = true;
            document.getElementById('game-status').textContent = 'Player busts! Dealer wins!';
            document.getElementById('hit-button').disabled = true;
            document.getElementById('stand-button').disabled = true;
        }
    }

    // Handle the player's stand action
    function playerStand() {
        if (gameOver) return;

        gameOver = true;

        while (dealerScore < 17) {
            dealerHand.push(drawCard());
            renderCards(dealerHand, false);
            updateScore(dealerHand, false);
        }

        if (dealerScore > 21) {
            document.getElementById('game-status').textContent = 'Dealer busts! Player wins!';
        } else if (playerScore > dealerScore) {
            document.getElementById('game-status').textContent = 'Player wins!';
        } else if (dealerScore > playerScore) {
            document.getElementById('game-status').textContent = 'Dealer wins!';
        } else {
            document.getElementById('game-status').textContent = 'It\'s a tie!';
        }

        document.getElementById('hit-button').disabled = true;
        document.getElementById('stand-button').disabled = true;
    }

    // Event listeners for buttons
    document.getElementById('hit-button').addEventListener('click', playerHit);
    document.getElementById('stand-button').addEventListener('click', playerStand);
    document.getElementById('new-game-button').addEventListener('click', startNewGame);

    // Start the game when the page loads
    window.onload = startNewGame;
</script>
