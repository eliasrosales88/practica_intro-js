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
    console.log(upperRoman);

    let romanToArray = upperRoman.split('');
    return romanToArray;
}

function romanToArabValidator(roman) {

    if (typeof roman == 'string' && roman == romansToUpperCase(roman)) {

        let upperRoman = romansToUpperCase(roman);

        // Evalua STRING IF INCLUDES IL, IC, ID, IM, XD, XM

        if (
            upperRoman.includes('IL') ||
            upperRoman.includes('IC') ||
            upperRoman.includes('ID') ||
            upperRoman.includes('IM') ||
            upperRoman.includes('XD') ||
            upperRoman.includes('XM') ||
            upperRoman.includes('IIII') ||
            upperRoman.includes('VV') ||
            upperRoman.includes('LL') ||
            upperRoman.includes('DD') ||
            upperRoman.includes('XXXX') ||
            upperRoman.includes('CCCC') ||
            upperRoman.includes('MMMM') ||
            upperRoman.includes('VL') ||
            upperRoman.includes('VD') ||
            upperRoman.includes('LD') ||
            upperRoman.includes('IVI') ||
            upperRoman.includes('IXI') ||
            upperRoman.includes('IIX') ||
            upperRoman.includes('XXL') ||
            upperRoman.includes('VVX')
        ) {
            return console.log(false);

        } else return true;;



    } else return console.log(false);;



}

function romanToArab(roman) {
    let romanValuesArray = [];


    if (romanToArabValidator(roman) === true) {

        // let upperRoman = roman.toUpperCase();
        // console.log(upperRoman);

        let romanToArray = romansToArray(roman);
        console.log('ROMANNNS', romanToArray);

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

            // const key = romanToArray[i];
            // romanValuesArray.push(romans[key]);

        }
    }

    console.log(romanValuesArray);

    return console.log(romanValuesArray.reduce((total, num) => {
        return total + num;
    }, 0));




}

romanToArab('CCXLIV'); //244
romanToArab('CCCXLVII'); //347
romanToArab('MCCCLIX'); //1359
romanToArab('MMCMXC'); //2990
romanToArab('XXX'); //30
romanToArab('XXXX'); //false
romanToArab('MMMCMXCIX'); //3999
romanToArab('MDCLXXVIII'); //1678
romanToArab('MMMDCCLXXX'); //3780
romanToArab('MMMDCCALXXX'); //3780