// 16
// 7
// 102
// 103


let foundPairs1 = document.getElementById('par-counter');
class MemoryGame {



    constructor() {

        this.play = false;
        this.card1 = null;
        this.card2 = null;


        this.availableImages = [1, 2, 3, 4, 5, 6, 7, 8];
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );
        this.maxPairNumber = this.availableImages.length;
        this.startGame();

    }

    startGame() {

        this.play = false;
        this.foundPairs = 0;
        this.aciertos = 0;
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
    }

    setNewOrder() {

        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );

    }

    setImagesInCards() {

        for (const key in this.cards) {
            
            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];

            card.dataset.image = image;
            imgLabel.src = `./images/${image}.jpg`;

        }

    }

    openCards() {

        this.cards.forEach(card => card.classList.add("opened"));
        this.cards.forEach(card => card.classList.add("frontPair"));      
        this.cards.forEach(card => card.classList.remove("frontNotPair"));       
   

        setTimeout(() => {
            this.closeCards();
        }, 500);
    }

    closeCards() {

        this.cards.forEach(card => card.classList.remove("opened"));
       // this.cards.forEach(card => card.classList.add("frontNotPair"));       
        this.addClickEvents();
        this.play = true;

    }

    addClickEvents() {

        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));
        //this.cards.forEach(card => card.classList.add("frontPair"));       

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));
                //this.cards.forEach(card => card.classList.remove("frontNotPair"));       

    }

    flipCard(e) {

        const clickedCard = e.target;

        if (this.play && !clickedCard.classList.contains("opened")) {
            
            clickedCard.classList.add("opened")
                this.checkPair( clickedCard.dataset.image);  
            } 
    }
    
    checkPair(image) {

        if(!this.card1) this.card1 = image;
        else this.card2 = image;
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`); 
        firstOpened.classList.remove("frontNotPair");
        secondOpened.classList.remove("frontNotPair");  
        firstOpened.classList.add("frontPair");
        secondOpened.classList.add("frontPair"); 


        if (this.card1 && this.card2) {
            const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
            const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`); 
            firstOpened.classList.remove("frontNotPair");
            secondOpened.classList.remove("frontNotPair");  
            firstOpened.classList.add("frontPair");
            secondOpened.classList.add("frontPair"); 
            if (this.card1 == this.card2) {
                this.play = false;
                const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
                const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`); 
                
                firstOpened.classList.remove("frontNotPair");
                secondOpened.classList.remove("frontNotPair"); 
                firstOpened.classList.add("frontPair");

                firstOpened.classList.add("frontPair");
                firstOpened.classList.add("frontPair");
                firstOpened.classList.add("frontPair");

                secondOpened.classList.add("frontPair"); 
                secondOpened.classList.add("frontPair"); 
                secondOpened.classList.add("frontPair"); 
                
                setTimeout(this.checkIfWon.bind(this),1000);
            }
            
            else {
                this.play = false;
                const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
                const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`); 
                firstOpened.classList.add("frontNotPair");
                secondOpened.classList.add("frontNotPair");
                secondOpened.classList.remove("frontPair");  
                secondOpened.classList.remove("frontPair");  

                setTimeout(this.resetOpenedCards.bind(this),800);
            }

            firstOpened.classList.add("frontPair");
        secondOpened.classList.add("frontPair"); 
        secondOpened.classList.remove("frontNotPair"); 
        secondOpened.classList.remove("frontNotPair"); 

        secondOpened.classList.add("frontPair"); 
        secondOpened.classList.add("frontPair"); 

        secondOpened.classList.add("frontPair"); 
        secondOpened.classList.add("frontPair"); 
        secondOpened.classList.add("frontPair"); 
        secondOpened.classList.add("frontPair"); 
        }

    }

    resetOpenedCards() {
        
         const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
         const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");
        firstOpened.classList.remove("frontNotPair"); 
        secondOpened.classList.remove("frontNotPair"); 
        this.card1 = null;
        this.card2 = null;

        this.play = true;
    }

    checkIfWon() {

        this.foundPairs++;
        this.aciertos++;
        foundPairs1.innerHTML = `Contador:${this.aciertos}`;
        this.card1 = null;
        this.card2 = null;
        this.play = true;

         if(this.aciertos ==8){
            setTimeout(window.location.reload(),10000);
            // setTimeout( alert("¡Felicidades, Ganaste.....Ahora eres un MonkeyLover!"),5000);
         }


        if (this.maxPairNumber == this.foundPairs) {
            // setTimeout( alert("¡Felicidades, Ganaste.....Ahora eres un MonkeyLover!"),3000);
            setTimeout( this.setNewGame().bind(this),1000);
        }

        
       
    }

    setNewGame() {
        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));
        setTimeout(this.startGame.bind(this),1000);

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new MemoryGame();
});