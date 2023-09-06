/*
www/movies
www/movies/add -> FORMA
www/movies/filmo-pavadinimas -> ATSKIRAS PSL
www/movies/kobra-11 -> ATSKIRAS PSL
www/movies/Labai-ilgas-filmo-pavadinimas-is-Miesto -> ATSKIRAS PSL
www/movies/labai-ilgas-filmo-pavadinimas-is-miesto -> 

TRANSFORMACIJOS:

Pavadinimas -> pavadinimas
Filmo pavadinimas -> filmo-pavadinimas
Filmas 777 -> filmas-777
Labas rytas Maryte! -> labas-rytas-Maryte
Ąčių tau ūž tavo meilė -> aciu-tau-uz-tavo-meile

1. daug zodziu sujungiam su "-" (minusu)
2. didziosios/mazosios raides - nesvarbu, todel suvienodiname i mazasias
3. ne anglu kalbos abeceles raides keiciamos i ju artimiausia atitikmeni
4. spec zenklai istrinami
5. negali buti daugiau nei po 1 minusa is eiles
*/

// Labai ačiū! -> labai ačiū! -> labai-ačiū! -> labai-aciu! -> labai-aciu

export function slugify(text) {
    const letters = {
        'ą': 'a',
        'č': 'c',
        'ę': 'e',
        'ė': 'e',
        'į': 'i',
        'š': 's',
        'ų': 'u',
        'ū': 'u',
        'ž': 'z',
    };

    text = text.trim();

    for (const s in letters) {
        text = text.replaceAll(s, letters[s]);
    }
    text = text.replaceAll(' ', '-').toLowerCase();

    const allowed = 'abcdefghijklmnopqrstuvwxyz0123456789-';

    let result = '';
    for (const s of text) {
        if (allowed.includes(s)) {
            result += s;
        }
    };

    let resultWithoutMinus = result[0];
    for (let i = 1; i < result.length; i++) {
        if (result[i] !== '-') {
            resultWithoutMinus += result[i];
        }
        if (result[i - 1] !== '-' && result[i] === '-') {
            resultWithoutMinus += '-';
        }
    };
 
    if (resultWithoutMinus[0] === '-') {
        resultWithoutMinus = resultWithoutMinus.slice(1);
    };

    if (resultWithoutMinus.at(-1) === '-') {
        resultWithoutMinus = resultWithoutMinus.slice(0, -1);
    };

    return resultWithoutMinus;
};