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

