translate = () => {
    let birdButton = document.getElementById("toBird");
    let englishButton = document.getElementById("toEnglish");

    birdButton.addEventListener('click', (e)=>{
        toBird(e);
    });

    englishButton.addEventListener('click', (e)=>{
        toEnglish(e);
    });
};

toBirdLang = (text) =>
{
    let translated = "";
    const textArray = text.split('');
    console.log(textArray);
    for (i = 0; i < textArray.length; i++)
    {
        switch(textArray[i])
        {
            case 'a':
            case 'A':
                translated = translated + ".- ";
                break;
            case 'b':
            case 'B':
                translated = translated + "-... ";
                break;
            case 'c':
            case 'C':
                translated = translated + "-.-. ";
                break;
            case 'd':
            case 'D':
                translated = translated + "-.. ";
                break;
            case 'e':
            case 'E':
                translated = translated + ". ";
                break;
            case 'f':
            case 'F':
                translated = translated + "..-. ";
                break;
            case 'g':
            case 'G':
                translated = translated + "--. ";
                break;
            case 'h':
            case 'H':
                translated = translated + ".... ";
                break;
            case 'i':
            case 'I':
                translated = translated + ".. ";
                break;
            case 'j':
            case 'J':
                translated = translated + ".--- ";
                break;
            case 'k':
            case 'K':
                    translated = translated + "-.- ";
                break;
            case 'l':
            case 'L':
                translated = translated + ".-.. ";
                break;   
            case 'm':
            case 'M':
                translated = translated + "-- ";
                break;
            case 'n':
            case 'N':
                translated = translated + "-. ";
                break;
            case 'o':
            case 'O':
                translated = translated + "--- ";
                break;
            case 'p':
            case 'P':
                translated = translated + ".--. ";
                break;
            case 'q':
            case 'Q':
                translated = translated + "--.- ";
                break;
            case 'r':
            case 'R':
                translated = translated + ".-. ";
                break;
            case 's':
            case 'S':
                translated = translated + "... ";
                break;
            case 't':
            case 'T':
                translated = translated + "- ";
                break;
            case 'u':
            case 'U':
                translated = translated + "..- ";
                break;
            case 'v':
            case 'V':
                translated = translated + "...- ";
                break;
            case 'w':
            case 'W':
                translated = translated + ".-- ";
                break;
            case 'x':
            case 'X':
                translated = translated + "-..- ";
                break;
            case 'y':
            case 'Y':
                translated = translated + "-.-- ";
                break;
            case 'z':
            case 'Z':
                translated = translated + "--.. ";
                break;   
            case ' ':
                translated = translated + "caw ";
                console.log(translated);
                break;
            default:
                translated = translated + "caw ";
                break;
        }
    
    }
    translated = translated.replace(/\-/g, "chirp");
    translated = translated.replace(/\./g, "cheep");
    return translated;
}   

toBird = (e) => {
    let birbMorse = toBirdLang(document.getElementById("inputText").value);
    document.getElementById("output").innerHTML = birbMorse;
};

toEnglishLang = (text) =>
{
    let translated = "";
    let broken = text.replace(/chirp/g, "-");
    broken = broken.replace(/cheep/g, ".");
    console.log(broken);
    const words = broken.split('caw');

    for(word = 0; word < words.length; word++) {
        let letters = words[word].split(' ');
        for(letter = 0; letter < letters.length; letter++) {
            switch(letters[letter]) {
            case ".-":
                translated = translated + "a";
                break;
            case  "-...":
                translated = translated + "b";
                break;
            case "-.-.":
                translated = translated + "c";
                break;
            case "-..":
                translated = translated + "d";
                break;
            case ".":
                translated = translated + "e";
                break;
            case "..-.":
                translated = translated + "f";
                break;
            case "--.":
                translated = translated + "g";
                break;
            case "....":
                translated = translated + "h";
                break;
                case "..":
                translated = translated + "i";
                break;
                case ".---":
                translated = translated + "j";
                break;
                case "-.-":
                translated = translated + "k";
                break;
                case ".-..":
                translated = translated + "l";
                break;   
                case "--":
                translated = translated + "m";
                break;
                case "-.":
                translated = translated + "n";
                break;
                case "---":
                translated = translated + "o";
                break;
                case ".--.":
                translated = translated + "p";
                break;
                case "--.-":
                translated = translated + "q";
                break;
                case ".-.":
                translated = translated + "r";
                break;
                case "...":
                translated = translated + "s";
                break;
                case "-":
                translated = translated + "t";
                break;
                case "..-":
                translated = translated + "u";
                break;
                case "...-":
                translated = translated + "v";
                break;
                case ".--":
                translated = translated + "w";
                break;
                case "-..-":
                translated = translated + "x";
                break;
                case "-.--":
                translated = translated + "y";
                break;
                case "--..":
                translated = translated + "z";
                break;
                default:
                break;
            }
        }
        translated = translated + " ";
        
    }


    return translated;
}   

toEnglish = (e) => {
    let english = toEnglishLang(document.getElementById("inputText").value);
    document.getElementById("output").innerHTML = english;
};
