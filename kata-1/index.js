// # Primera Kata
// ## FooBarQuix

// Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

// * Si el número es divisible por 3, escribiremos “Foo” en lugar del número
// * Si el número es divisible por 5, añadimos “Bar”
// * Si el número es divisible por 7, añadimos “Quix”.
// * Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.

// ### Ejemplos: 

// * 1  -> 1
// * 2  -> 2
// * 3  -> FooFoo (divisible por 3, contiene 3)
// * 4  -> 4
// * 5  -> BarBar (divisible por 5, contains 5)
// * 6  -> Foo (divisible por 3)
// * 7  -> QuixQuix (divisible por 7, contiene 7)
// * 8  -> 8
// * 9  -> Foo
// * 10 -> Bar
// * 13 -> Foo 
// * 15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
// * 21 -> FooQuix
// * 33 -> FooFooFoo (divisible por 3, contiene 3)
// * 51 -> FooBar
// * 53 -> BarFoo
// * 75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)


function checkCondition(type, number, array) {
   
switch (type) {
    case 'number': 
       
        if (number % 3 == 0) {
            array.push('Foo');
        }
        if (number % 5 == 0) {
            array.push('Bar');
        }
        if (number % 7 == 0) {
            array.push('Quix');
        }
        break;
    case 'digit': 
       
        if (number == 3 ) {
            array.push('Foo');
        }
        if (number == 5 ) {
            array.push('Bar');
        }
        if (number == 7 ) {
            array.push('Quix');
        }
        break;

}
    
       
}

function spellGenerator(number) {
    let spellArray = [];
    
    if (number >=1 && number <= 100) {
        checkCondition('number',number, spellArray)  
        
        let numberToArray = number.toString().split('');
        
        
        
        
        numberToArray.forEach(element => {
            checkCondition('digit',element, spellArray)  
        });
        
        return  (spellArray.length == 0 ? console.log(number): console.log('Tu conjuro es-'+number+':', spellArray.join('')));
        
            
    }else console.log('Ingresa un número válido');
    


    
}

/**Ejemplos */
spellGenerator(1);
spellGenerator(2);
spellGenerator(3);
spellGenerator(4);
spellGenerator(5);
spellGenerator(6);
spellGenerator(7);
spellGenerator(8);
spellGenerator(9);
spellGenerator(10);
spellGenerator(13);
spellGenerator(15);
spellGenerator(21);
spellGenerator(33);
spellGenerator(51);
spellGenerator(53);
spellGenerator(75);
spellGenerator(60);