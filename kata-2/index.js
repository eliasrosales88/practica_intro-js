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
    I:1,
    V:5,
    X:10,
    L:50,
    C:100,
    D:500,
    M:1000
};

function isAllowedToSubstract(roman1, roman2) {
    
}

function romanToArabValidator(roman){
   


    

}

function romanToArab(roman) {
    let romanArray = [];
    console.log(typeof roman);
    
    if (typeof roman == 'string' ) {
        let upperRoman = roman.toUpperCase();
        console.log(upperRoman);
        
        let romanToArray = upperRoman.split('');
        
        for (let i = 0; i < romanToArray.length; i++) {
            const key = romanToArray[i];

            romanArray.push(romans[key]);
            
        }

        console.log(romanArray);
        
        return console.log(romanArray.reduce((total, num)=>{
            return total + num;
        }, 0));
        



    }else console.log('Ingresa un número válido');
}

romanToArab('xi');
romanToArab('xiiii');
romanToArab('xl');