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

let types = {
    pair: 1,
    threeOfkind: 2,
    straight: 3,
    flush: 4,
    full: 5,
    poker: 6,
    straightFull: 7,
}

class Pack {
    constructor(suits, values) {
        this.suits = suits;
        this.values = values;
        this.pack;
    }



    // Crea una baraja aleatoria
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


    //Crea un mano aleatoria de una baraja
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


class Rules {
    constructor(hand) {
        this.hand = hand;
        this.criteria = {};
        this.criteriaArray = [];
        this.combinations = [];
        this.colors = [];
        this.result = 0;
    }

    //Evalua la mano de forma individual y define el tipo de mano par, dobles parejas, trio, etc... Define el valor de la mano

    //Toma el primer valor de cada carta para definir el valor
    //En caso de que el valor se "A" se verifica si existe otra carta a la derecha...
    //...para hacer esto hay que hacer sort de la mano (o similar) cumpliendo un criterio.
    getEvaluation(hand) {
        hand.forEach(card => {

            this.criteria[card] = parseInt(card.charAt(0));

            switch (card.charAt(0)) {
                case 'T':
                    this.criteria[card] = 10;
                    break;
                case 'J':
                    this.criteria[card] = 11;
                    break;
                case 'Q':
                    this.criteria[card] = 12;
                    break;
                case 'K':
                    this.criteria[card] = 13;
                    break;
                case 'A':
                    this.criteria[card] = 14;
                    break;
            }
        })

        //Combinaciones
        for (let i = 0; i < hand.length; i++) {
            if (i == 0) {} else if (hand[0].charAt(0) === hand[i].charAt(0)) {
                this.combinations.push(hand[0].charAt(0));
            }
        }

        if (this.combinations.length == 1) {
            this.result = types.pair;        
            
        }else if (this.combinations.length == 2) {
            this.result = types.threeOfkind;        
            
        }else if (this.combinations.length == 3) {
            this.result = types.poker;        
            
        }

        //Color
        for (let i = 0; i < hand.length; i++) {
            if (i == 0) {} else if (hand[0].charAt(1) === hand[i].charAt(1)) {
                this.colors.push(hand[0].charAt(1));
            }
        }
        
        if (this.colors.length == 4) {
            this.result = types.flush;        
        }

        return this.result;
    }
}


function game(pack, playerNames) {
    console.log('PACK', pack);

    let players = playerNames; // 2
    let playerHands = [];
    let gamePack = [];
    let result1 = 0;
    let result2 = 0;

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
    });

    let evaluatePlayer1 = new Rules();
    let evaluatePlayer2 = new Rules();
    playerHands.forEach((hand, i) => {
        try {
            if (hand.length < 5) throw 'Un jugador no tiene 5 cartas. Intentalo de nuevo.'

        } catch (error) {
            console.log(error);
            return;
        }

        if (i == 0) {
            result1 = evaluatePlayer1.getEvaluation(hand);
        } else  result2 = evaluatePlayer2.getEvaluation(hand);

    })
    console.log('PLAYER HANDS', playerHands);
    console.log('RESULT P1', result1);
    console.log('RESULT P2', result2);
    
    
    if (result1 == result2 ) {
        console.log('Empate');
        
    }
    if (result1 > result2 && result1 == 1) {
        console.log('Gana jugador 1 con pares');
        
    }
    if (result1 > result2 && result1 == 2) {
        console.log('Gana jugador 1 con trio');
        
    }
    if (result1 > result2 && result1 == 3) {
        console.log('Gana jugador 1 con poker');
        
    }
    if (result1 > result2 && result1 == 4) {
        console.log('Gana jugador 1 con color');
        
    }
    if (result2 > result1 && result2 == 1) {
        console.log('Gana jugador 2 con pares');
        
    }
    if (result2 > result1 && result2 == 2) {
        console.log('Gana jugador 2 con trio');
        
    }
    if (result2 > result1 && result2 == 3) {
        console.log('Gana jugador 2 con poker');
        
    }
    if (result2 > result1 && result2 == 4) {
        console.log('Gana jugador 2 con color');
        
    }
}



let pack = new Pack();
pack.setPack(suits, values)



game(pack.getPack(), ['elias', 'luis']);



// let hand2 = evaluateRules.getEvaluation(hand);

// let result = evaluateRules.compareHands(han1, hand2);