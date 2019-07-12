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

function romanToArabValidator(roman) {
    let isRomanValid = true;
    // console.log('isCharacterValid', checkCharacters(roman));

    if (typeof roman != 'string' ||
        roman !== romansToUpperCase(roman) ||
        checkCharacters(roman) !== true) {
        isRomanValid = false;

    } else {
        // Evaluates not allowed combinations
        let upperRoman = romansToUpperCase(roman);
        let exceptions = [
            'IL', 'IC', 'ID', 'IM', 'XD',
            'XM', 'IIII', 'VV', 'LL', 'DD',
            'XXXX', 'CCCC', 'MMMM', 'VL', 'VD',
            'LD', 'IVI', 'IXI', 'IIX', 'XXL', 'VVX'
        ];

        exceptions.forEach(exception => {
            if (upperRoman.includes(exception)) {
                isRomanValid = false;
            }
        });


    }
    // console.log('isRomanValid', isRomanValid);

    return isRomanValid;


}

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
            //Si el modulus no es 0, toma el entero del resultado de la división entre el numero y su divisor más alto.
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
            console.log('multiplier', multiplier);

            array.push(arabs[divisor]);
        }

    }
}

function arabToRoman(number) {
    let isNumber = true;
    let arabToRoman = [];
    let higherDivisor;
    // let higherDivisornewNumber = [];
    // let higherKey;
    // let higherKeynewNumber;
    let romanMultiplier;
    let integerMultiplier;
    let newNumberMultiplier;
    let newNumber;
    // console.log(arabs);

    if (isNaN(number)) {
        return;
    } else {

        higherDivisor = getHigherDivisor(number);
        romanMultiplier = number / higherDivisor;

        if (Number.isInteger(romanMultiplier)) {
            console.log('ENTERO');

            setRomanFragment(romanMultiplier, arabToRoman, higherDivisor);

        } else {
            console.log('NO ENTERO', romanMultiplier);

            setRomanFragment(Math.floor(romanMultiplier), arabToRoman, higherDivisor);
            ////////////////////
            // FLOAT OPERATION
            ////////////////////

            if (number >= 11 && number <= 99) {

            } else {
                newNumber = number % higherDivisor; //11 % 10 = 1
                console.log('new', newNumber);
                higherDivisor = getHigherDivisor(newNumber); //10
                console.log('ONCE', higherDivisor);
                integerMultiplier = newNumber / higherDivisor; //1.56

                while (newNumber % higherDivisor > 0) {

                    if (Number.isInteger(integerMultiplier)) {
                        setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);
                        newNumber = newNumber % higherDivisor;
                        higherDivisor = getHigherDivisor(newNumber);
                        integerMultiplier = newNumber / higherDivisor;
                    } else {
                        //Aqui obtenemos el romano del entero
                        integerMultiplier = Math.floor(integerMultiplier);
                        setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);

                        newNumber = newNumber % higherDivisor;
                        higherDivisor = getHigherDivisor(newNumber);
                        integerMultiplier = newNumber / higherDivisor;
                        setRomanFragment(integerMultiplier, arabToRoman, higherDivisor);
                    }
                }
            }
        }

        console.log('arabToRoman', arabToRoman);

        console.log('JOIN', arabToRoman.join(''));

        // console.log(number, key,'romanCount', romanCount);

    }
}


// arabToRoman(200);   // CC 200
// arabToRoman(500);   // D 500
// arabToRoman(244);   // CCXLIV 244
// arabToRoman(347);   // CCCXLVII 347
// arabToRoman(1359);  // MCCCLIX 1359
// arabToRoman(2990);  // MMCMXC 2990
// arabToRoman(30);    // XXX 30
// // arabToRoman(0);     // XXXX 0 invalid
arabToRoman(3999); // MMMCMXCIX 3999
arabToRoman(2849); // MMDCCCXLIX 2849
//arabToRoman(1678);  // MDCLXXVIII 1678
//arabToRoman(3780); // MMMDCCLXXX 3780
arabToRoman(11); // MMMDCCALXXX 0 invalid