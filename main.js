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

    while (cardListOne.length > 0) {
      let cardOne = cardListOne.pop();

      if (cardOne.suit === "spades") {
        let filtered = cardListTwo.filter((x) => x.suit === "spades");
        const keys = Object.keys(filtered);
        const values = keys.map((key) => {
          return filtered[key].value;
        });
        const max = Math.max.apply(null, values);

        let cardTwo = filtered.filter((x) => x.value === max);

        filtered = filtered.filter((object) => {
          return object.value !== max;
        });
        if (cardOne.value > cardTwo[0].value) {
          playerOneScore += 1;
          console.log(
            JSON.stringify(cardOne) +
              " " +
              JSON.stringify(cardTwo) +
              " " +
              "player 1 scored"
          );
        } else {
          console.log(
            JSON.stringify(cardOne) +
              " " +
              JSON.stringify(cardTwo) +
              " " +
              "player 2 scored"
          );
          playerTwoScore += 1;
        }

        //   if (cardOne.suit === "hearts") {
        //     if (cardOne.value > cardTwo.value) {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 1 scored"
        //       );
        //       playerOneScore += 1;
        //     } else {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 2 scored"
        //       );
        //       playerTwoScore += 1;
        //     }
        //   }
        //   if (cardOne.suit === "diamonds") {
        //     if (cardOne.value > cardTwo.value) {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 1 scored"
        //       );
        //       playerOneScore += 1;
        //     } else {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 2 scored"
        //       );
        //       playerTwoScore += 1;
        //     }
        //   }
        //   if (cardOne.suit === "clubs" && cardTwo.suit === "clubs") {
        //     if (cardOne.value > cardTwo.value) {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 1 scored"
        //       );
        //       playerOneScore += 1;
        //     } else {
        //       console.log(
        //         JSON.stringify(cardOne) +
        //           " " +
        //           JSON.stringify(cardTwo) +
        //           " " +
        //           "player 2 scored"
        //       );
        //       playerTwoScore += 1;
        //     }
        //   } else {
        //     console.log(
        //       JSON.stringify(cardOne) + " " + JSON.stringify(cardTwo) + " "
        //     );
        //   }
        // }
      }
    }
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
