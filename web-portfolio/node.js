class TypeWriter {
    constructor(txtElement, words, wait = 1500) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 125;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 100;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


window.onload = play();
document.getElementById('tryAgain').addEventListener('click', () => { play() })

function play() {
    var blue = '#2980b9';
    var l = Snap('#Anshika');
    var p = l.select('path');
    l.clear();
    l.append(p);

    p.attr({
        fill: blue,
        stroke: '#0066CC',
    });

    setTimeout(function () {
        // modify this one line below, and see the result !
        var logoTitle = 'Anshika';
        var logoRandom = '';
        var logoTitleContainer = l.text(0, '98%', '');
        var possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";
        logoTitleContainer.attr({
            fontSize: 280,
            fontFamily: 'Dosis',
            fontWeight: '600'
        });

        function generateRandomTitle(i, logoRandom) {
            setTimeout(function () {
                logoTitleContainer.attr({ text: logoRandom });
            }, i * 70);
        }

        for (var i = 0; i < logoTitle.length + 1; i++) {
            logoRandom = logoTitle.substr(0, i);
            for (var j = i; j < logoTitle.length; j++) {
                logoRandom += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            generateRandomTitle(i, logoRandom);
            logoRandom = '';
        }

    }, 500);

}