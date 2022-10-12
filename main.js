class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}
class Deck {
  constructor() {
    this.cards = [];
  }
  createDeck() {
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.cards.length);
      location2 = Math.floor(Math.random() * this.cards.length);
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}
class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }
  sortCardsByRank() {
    return this.playerCards.sort(function (a, b) {
      return a.value - b.value;
    });
  }
  sortCardsBySuit() {
    return this.playerCards.sort(function (a, b) {
      var textA = a.suit.toUpperCase();
      var textB = b.suit.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
}
class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  play(cardListOne, cardListTwo) {
    let playerOneScore = 0;
    let playerTwoScore = 0;

    function getCards(arr, arr2) {
      while (arr2.length > 0) {
        let cardOne = arr2.pop();
        const keys = Object.keys(arr);
        const values = keys.map((key) => {
          return arr[key].value;
        });
        const max = Math.max.apply(null, values);

        let cardTwo = arr.filter((x) => x.value === max);

        arr = arr.filter((object) => {
          return object.value !== max;
        });
        if (arr.length > 0) {
          if (cardOne.value > cardTwo[0].value) {
            playerOneScore += 1;
            console.log(
              JSON.stringify(cardOne) +
                " " +
                JSON.stringify(cardTwo) +
                " " +
                "player 1 scored"
            );
          } else if (cardOne.value < cardTwo[0].value) {
            console.log(
              JSON.stringify(cardOne) +
                " " +
                JSON.stringify(cardTwo) +
                " " +
                "player 2 scored"
            );
            playerTwoScore += 1;
          } else {
            console.log("not matched");
          }
        }
      }
    }

    let spadesCardsTwo = cardListTwo.filter((x) => x.suit === "spades");
    let spadesCardsOne = cardListOne.filter((x) => x.suit === "spades");
    getCards(spadesCardsTwo, spadesCardsOne);
    let heartsCardsTwo = cardListTwo.filter((x) => x.suit === "hearts");
    let heartsCardsOne = cardListOne.filter((x) => x.suit === "hearts");
    getCards(heartsCardsTwo, heartsCardsOne);
    let dimondsCardsTwo = cardListTwo.filter((x) => x.suit === "dimonds");
    let dimondsCardsOne = cardListOne.filter((x) => x.suit === "dimonds");
    getCards(dimondsCardsTwo, dimondsCardsOne);
    let clubsCardsTwo = cardListTwo.filter((x) => x.suit === "clubs");
    let clubsCardsOne = cardListOne.filter((x) => x.suit === "clubs");
    getCards(clubsCardsTwo, clubsCardsOne);

    if (playerOneScore > playerTwoScore) {
      console.log("player 1 wins!");
    } else {
      console.log("player 2 wins!");
    }
  }

  start(playerOneName, playerTwoName) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
    let d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    this.players[0].playerCards = d.cards.slice(0, 26);
    this.players[0].sortCardsByRank();
    this.players[0].sortCardsBySuit();
    //console.log(this.players[0].playerCards.pop());
    this.players[1].playerCards = d.cards.slice(26, 52);
    this.players[1].sortCardsByRank();
    this.players[1].sortCardsBySuit();
    //console.log(this.players[1].playerCards);
    this.play(this.players[0].playerCards, this.players[1].playerCards);
  }
}
let gameBoard = new Board();
gameBoard.start("Mario", "Luigi");
//console.log(gameBoard.playerCards);
