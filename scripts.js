d = document
d.addEventListener('DOMContentLoaded', () => {
    /* 
        Algorithm to create anagrams 
        tutorial by: https://www.youtube.com/watch?v=TQaIiNJIaYg&t=614s (not my channel or tutorial)
    */
    let anagrams = []
    //Create Anagram
    let genAnagrams = (word, anagram = '') => {

        if (!word) {
            anagrams.push(anagram)
            return;

        }

        for (let i = 0; i < word.length; i++) {


            anagram += word[i]

            genAnagrams(word.slice(0, i) + word.slice(i + 1), anagram)

            anagram = anagram.slice(0, anagram.length - 1)

        }

        return anagrams

    }

    let total = genAnagrams('KQRrBbNn'),
        arr = [],
        n, pos, board;

    /* Filter position  */

    total = total.filter(el =>

        //The king on a1 or h1
        (el[0] === 'K' || el[el.length - 1] === 'K' ||

            //Rooks side by side

            el.indexOf('R') + 1 === el.indexOf('r') ||
            el.indexOf('r') + 1 === el.indexOf('R')) ||

        //The king always between rooks

        el.indexOf('K') < el.indexOf('R') && el.indexOf('K') < el.indexOf('r') ||
        el.indexOf('K') > el.indexOf('r') && el.indexOf('K') > el.indexOf('r') ||

        //Bishops in different color squares

        el.indexOf('B') === el.indexOf('b') + 2 || el.indexOf('B') === el.indexOf('b') + 4 || el.indexOf('B') === el.indexOf('b') + 6 ||
        el.indexOf('b') === el.indexOf('B') + 2 || el.indexOf('b') === el.indexOf('B') + 4 || el.indexOf('b') === el.indexOf('B') + 6 ?
        '' : arr.push(el))


    /*Chessboard */

    const fenInput = document.getElementById('fen'),
        button = document.getElementById('genPos'),
        btnCopy = document.getElementById('btn-copy')


    //random number between 1 and 960
    let randomPosition = () => {

        n = Math.floor(Math.random() * (arr.length / 4))
        pos = arr[n].toLowerCase() + '/pppppppp/8/8/8/8/PPPPPPPP/' + arr[n].toUpperCase()
        fenInput.value = `${pos}`
        board = ChessBoard('board', pos);
    }
    randomPosition()

    //Generate random position 
    button.addEventListener('click', randomPosition)

    /*Copy to clipboard */
    btnCopy.addEventListener('click', () => {
        fenInput.select()
        document.execCommand("copy");
    })





});