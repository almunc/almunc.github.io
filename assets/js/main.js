var explanation = `
<div class="card inner explanation">
    <div class="card-header">
        How do I convert my name or any word to a decimal number by using any numeral system?
    </div>
    <div class="card-body">
        <p class="card-text">
            <p>
            1.) At first some general knowledge about numeral systems. E.g. in the hexadecimal system (base 16) there are 16 instead of ten numbers. 
            The numbers from 0 to 9 are the same, while for numbers from 10 to 15 the first 6 letters of the alphabet are used, so 10 equals A, 11 => B, 12 => C 13 => D, 14 => E, 15 => F. So "CAFE" in the hexadecimal system would equal 51966 in the decimal system.
            </p>
            <p>
            2.) Because a word usually consists out of more than the first six letters of the alphabet, we will use a fictive numeral system with a base of 36 (0-9, A-Z) by default. You can manually change the base to experiment with it.
            </p>
            <p>
            3.) Now start with the last character of the word and convert it to a decimal number (A => 10, B => 11, C => 12 ...) and multiply it with the base (default: 36) to the power of 0 (= 1), write down the result.
            Repeat the  the same procedure for the second last character but this time with base to the 1 (= base) and all following characters, untill you've finished with the first character.
            </p>
            <p>
            4.) Sum up all previous results and you get the end result.
            </p>
            <p>
            5.) Congratulations, you can now express your name as a decimal number =)  
            </p>  
        </p>
    </div>
</div>
`;

//write explanation for the first time
document.getElementById("explanation").innerHTML = explanation;

//when form gets submitted
document.getElementById("name").addEventListener("submit", e => {
    //prevent form submission
    e.preventDefault();

    //clear previous result
    document.getElementById("explanation").innerHTML = explanation;


    main(document.getElementById("nameInput").value, document.getElementById("base").value);
});

var ALPHABET = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function main(value, base){
    value = value.toUpperCase();
    var exponent = 0;
    var res = 0;
    var ansatz = document.getElementById("ansatz");
    var success = true;

    ansatz.innerHTML = `Ansatz: <br>`;
    for(let i = value.length-1; i >= 0; i--){
        var temp = 0;
        index = ALPHABET.indexOf(value[i]);
        if(index > base-1){
            success = false;
            break;
        }
        temp += index * Math.pow(base, exponent);
        res += temp;

        ansatz.innerHTML += `${value[i]}: ${index} * ${base}<sup>${exponent}</sup> = ${numberWithCommas(temp)}<br>`;

        exponent++;
    }
    if(success){
        ansatz.innerHTML += `<hr>Result: ${numberWithCommas(res)}`;
    }
    else{
        ansatz.innerHTML = `<div class="alert alert-danger" role="alert">Failed to convert your word, because ${ALPHABET[index]} requires a base of at least ${index+1}.</div>`;
    }
    console.log(numberWithCommas(res));
}

//function to add commas every 3 numbers in order to make large numbers more readable
function numberWithCommas(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
