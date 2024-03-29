// # Segunda Kata
// ## Sistema Romano
// Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.

// Como refresco, vamos a ver sus símbolos y reglas.

// #### Símbolos

//  Romano | Árabe
// --------|-------
//  I | 1
//  V | 5
//  X | 10
//  L | 50
//  C | 100
//  D | 500
//  M | 1000

// ### Reglas

// Sólo se contemplan números entre el 1 y el 3999

// * Los símbolos I, X, C y M se pueden repetir hasta tres veces de forma consecutiva.
// * Los símbolos V, L y D no pueden repetirse.
// * Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
// * Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
// * I se resta de V y X
// * X se resta de L y C
// * C se resta de D y M
// * Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

// ### Ejercicios

// * Crear una función para pasar de número romanos a árabes
// * Crear una función para pasar de árabes a romanos
// * Hacer un validador de números romanos
'use strict'

let romans = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
};

function romansToUpperCase(roman) {
    let upperRoman = roman.toUpperCase();
    return upperRoman;
}

function romansToArray(roman) {
    let upperRoman = romansToUpperCase(roman);
    let romanToArray = upperRoman.split('');
    return romanToArray;
}


function checkCharacters(roman) {
    let isCharacterValid = true;
    romansToArray(roman).forEach(letter => {
        const current = letter;

        if (romans[current] == undefined) {
            isCharacterValid = false;
        }

    });

    return isCharacterValid;
}


// Hacer un validador de números romanos
function romanToArabValidator(roman) {
    let isRomanValid = true;
    // console.log('isCharacterValid', checkCharacters(roman));

    let upperRoman = romansToUpperCase(roman);
    let exceptions = [
        'IL', 'IC', 'ID', 'IM', 'XD',
        'XM', 'IIII', 'VV', 'LL', 'DD',
        'XXXX', 'CCCC', 'MMMM', 'VL', 'VD',
        'LD', 'IVI', 'IXI', 'IIX', 'XXL', 'VVX',
        'A','B','E','F','G','H','J','K','N','O',
        'P','Q','R','S','T','U','W','Y','Z'
    ];
    try {
        
        if (roman < 1 || roman > 3999)          throw 'Ingresa un número romano entre 1 y 3999';
        if (typeof roman != 'string')           throw 'Ingresa un número romano válido';
        if (roman !== romansToUpperCase(roman)) throw 'Ingresa un número romano en mayúsculas';
        if (checkCharacters(roman) !== true)    throw 'Ingresa una letra válida i.e I V X C';

    } catch (error) {
        isRomanValid = false;
        console.log(error);
        // return isRomanValid
    }

        // Evaluates not allowed combinations
       

        exceptions.forEach(exception => {
            try {
                if (upperRoman.includes(exception)) throw 'No es un número válido';
            } catch (error) {
                isRomanValid = false;
                console.log(error);
                // return isRomanValid;
            }
        });
    return isRomanValid;


}


// Crear una función para pasar de número romanos a árabes
function romanToArab(roman) {
    let romanValuesArray = [];
    if (romanToArabValidator(roman) === true) {

        let romanToArray = romansToArray(roman);
        for (let i = 0; i < romanToArray.length; i++) {

            const current = romanToArray[i];
            const prev = romanToArray[i - 1];
            const next = romanToArray[i + 1];
            const next2 = romanToArray[i + 2];

            if (romans[current] < romans[prev] && romans[current] < romans[next]) {
                romanValuesArray.push(romans[next] - romans[current])
            }
            if (romans[current] < romans[prev] && romans[current] > romans[next]) {
                romanValuesArray.push(romans[current])
            }
            if (romans[current] == romans[next] && romans[current] !== romans[prev]) {

                if (romans[current] == romans[next] && romans[current] == romans[next2]) {
                    romanValuesArray.push(romans[current] * 3)
                } else romanValuesArray.push(romans[current] * 2)

            } else if (romans[prev] == (null || undefined) && romans[current]) {
                romanValuesArray.push(romans[current])
            }

            // Only sum if last number is not next to one of less value
            if (romans[next] == (null || undefined) && romans[current] >= romans[prev]) {
                romanValuesArray.push(0)
            } else if (romans[next] == (null || undefined)) {
                romanValuesArray.push(romans[current])
            }

        }
    }

    // console.log(romanValuesArray);

    return console.log(romanValuesArray.reduce((total, num) => {
        return total + num;
    }, 0));




}

romanToArab('CCXLIV'); //244
romanToArab('CCCXLVII'); //347
romanToArab('MCCCLIX'); //1359
romanToArab('MMCMXC'); //2990
romanToArab('XXX'); //30
romanToArab('XXXX'); //0 invalid
romanToArab('MMMCMXCIX'); //3999
romanToArab('MDCLXXVIII'); //1678
romanToArab('MMMDCCLXXX'); //3780
romanToArab('MMMDCCALXXX'); //0 invalid



/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////////                              /////////
//////////////         PART 2               /////////         
//////////////                              /////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// Crear una función para pasar de árabes a romanos

let arabs = {
    1000: 'M',
    900: 'CM',
    800: 'DCCC',
    700: 'DCC',
    600: 'DC',
    500: 'D',
    100: 'C',
    90: 'XC',
    80: 'LXXX',
    70: 'LXX',
    60: 'LX',
    50: 'L',
    40: 'XL',
    30: 'XXX',
    20: 'XX',
    10: 'X',
    9: 'IX',
    8: 'VIII',
    7: 'VII',
    6: 'VI',
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I'
}

function getHigherDivisor(number) {
    let higher;
    for (let key in arabs) {
        higher;
        key = parseInt(key);

        if (parseInt(number) % key === 0) {
            higher = key;

        } else {
            //Si el modulus no es 0, toma el entero del resultado de la división entre el número y su divisor más alto.
            if (key <= parseInt(number)) {
                higher = key;
            }
        }
    }
    return higher;
}

function setRomanFragment(multiplier, array, divisor) {

    if (!Number.isInteger(multiplier)) {
        return;
    } else {

        for (let i = 0; i < multiplier; i++) {
            array.push(arabs[divisor]);
        }

    }
}

function arabToRoman(number) {
    let arabToRoman = [];
    let higherDivisor;
    let romanMultiplier;
    let integerMultiplier;
    let newNumber;

    try {
        if (isNaN(number)) throw 'No es un número';
        if ( number < 1 || number >3999) throw 'Ingresa un número entre 1 y 3999';
    } catch (error) {
        console.log(error);
    }

    higherDivisor = getHigherDivisor(number);
    romanMultiplier = number / higherDivisor;

    if (Number.isInteger(romanMultiplier)) {
        // console.log('ENTERO');

        setRomanFragment(romanMultiplier, arabToRoman, higherDivisor);

    } else {
        // console.log('FLOAT');
        
        //Se establece el la parte entera del multiplicador
        setRomanFragment(Math.floor(romanMultiplier), arabToRoman, higherDivisor);

        newNumber = number % higherDivisor;
        higherDivisor = getHigherDivisor(newNumber);
        integerMultiplier = newNumber / higherDivisor;
        do {
            //Se usa do while para números menores a 100
            if (Number.isInteger(integerMultiplier)) {
                setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);
                newNumber = newNumber % higherDivisor;
                higherDivisor = getHigherDivisor(newNumber);
                integerMultiplier = newNumber / higherDivisor;
            } else {
                //Aqui obtenemos el romano de la parte entera del del float
                integerMultiplier = Math.floor(integerMultiplier);
                setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);

                //Aqui establecemos el nuevo número a evaluar
                newNumber = newNumber % higherDivisor;
                higherDivisor = getHigherDivisor(newNumber);
                integerMultiplier = newNumber / higherDivisor;
                setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);

            }
        } while (newNumber % higherDivisor > 0);
    }

    // console.log('arabToRoman', arabToRoman);

    console.log(arabToRoman.join(''));

    // console.log(number, key,'romanCount', romanCount);


}


// arabToRoman(200);   // CC 200
// arabToRoman(500);   // D 500
// arabToRoman(244);   // CCXLIV 244
// arabToRoman(347);   // CCCXLVII 347
arabToRoman(1359); // MCCCLIX 1359
// arabToRoman(2990);  // MMCMXC 2990
// arabToRoman(30);    // XXX 30
arabToRoman(0);     // XXXX 0 invalid
arabToRoman(3999); // MMMCMXCIX 3999
arabToRoman(2849); // MMDCCCXLIX 2849
//arabToRoman(1678);  // MDCLXXVIII 1678
//arabToRoman(3780); // MMMDCCLXXX 3780
arabToRoman('A35'); //
arabToRoman(35); // XXXV