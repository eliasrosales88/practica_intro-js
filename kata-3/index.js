// # Tercera Kata
// ## Póker
// ### Introdución

// Una baraja de poker contiene 52 cartas. 

// ### Cartas
// Una carta se compone de dos cosas:

// Palo (suit) que pueden ser los siguientes:
// * picas/spades (S)
// * corazones/hearts (H)
// * tréboles/clubs (C)
// * diamantes/diamonds (D). 

// Valor:
// * 2 
// * 3
// * 4
// * 5
// * 6
// * 7
// * 8
// * 9
// * 10 /Ten (T)
// * dama/Jack (J)
// * reina/Queen (Q)
// * rey/King (K)
// * as/Ace (A). 

// ### Mano

// Una mano es un conjunto de 5 cartas, estamos jugando con una baraja, por lo que no puede haber cartas repetidas.

// Las manos de poker se ordenan de menor a mayor dependiendo de una serie de reglas asociadas a la mano. 

// * High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente. 

// * Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, entonces gana la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga la carta más alta. 

// * Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas diferentes entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante. 

// * Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas con mayor valor. 

// * Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces gana la que tiene la carta más alta. 

// * Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen color entonces gana el que tenga la carta más alta. 

// * Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana el que tenga el trío más alto. 

// * Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga el valor más alto.

// * Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de tener escalera las dos manos entonces gana el que tenga el valor más alto.

// ### Ejemplos

//EL JUEGO RECIBE DOS JUGADORES  Y UNAS BARAJAS

// Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C AH
// Salida: Jugador 2 gana, carta más alta:

// Entrada: Jugador 1: 2H 4S 4C 2D 4H Jugador 2: 2S 8S AS QS 3S
// Salida: Jugador 1 gana, escalera de color

// Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C KH
// Salida: Jugador 1 gana, carta más alta

// Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2D 3H 5C 9S KH
// Salida: Empate
'use strict'

let suits = ['S', 'H', 'C', 'D'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];



class Pack {
    constructor(suits, values) {
        this.suits = suits;
        this.values = values;
        this.pack;
    }

    setPack(suits, values) {
        let pack = [];

        do {
            values.forEach(value => {
                suits.forEach(suit => {
                    let random = Math.floor(Math.random() * 13);
                    if (pack.join('').includes(values[random] + suit)) {
                        return;
                    } else {
                        pack.push(values[random] + suit);
                    }
                });
            });

        } while (pack.length < 52);

        this.pack = pack;
    }

    getPack() {
        return this.pack;
    }
}

class Hand {
    constructor(pack) {
        this.pack = pack;
        this.hand = [];
        // this.gamePack;
    }

    setHand(pack) {
        do {
            let random = Math.floor(Math.random() * pack.length);
            if (this.hand.join('').includes(pack[random])) {
                return;
            } else {
                this.hand.push(pack[random]);
            }
        } while (this.hand.length < 5);
    }

    getHand() {
        return this.hand;
    }
}


class Rules {}

function game(pack, playerNames) {
    console.log('PACK', pack);

    let players = playerNames; // 2
    let playerHands = [];
    let gamePack = [];

    //Los jugadores toman cartas de la baraja 
    players.forEach(player => {
        if (gamePack.length > 0) {
            let playerHand = new Hand();
            playerHand.setHand(gamePack);
            let hand = playerHand.getHand();
            playerHands.push(hand);

        } else {
            let playerHand = new Hand();
            playerHand.setHand(pack);
            let hand = playerHand.getHand();
            playerHands.push(hand);
            pack.forEach(packCard => {
                if (!hand.join('').includes(packCard)) {
                    gamePack.push(packCard);
                }
                
            })
        }
        console.log('PLAYER HANDS', playerHands);

    })

}



let pack = new Pack();
pack.setPack(suits, values)



game(pack.getPack(), ['elias', 'luis']);
