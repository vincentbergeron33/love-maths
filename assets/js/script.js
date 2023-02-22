// wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.addEventListener('click', function(){
            if (this.getAttribute('data-type') == 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type')
                runGame(gameType);
            }

        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})
/**
 * The main game "loop, called when the script is first loaded
 * and after the user's answer has been processed"
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random()*25+1);
    let num2 = Math.floor(Math.random()*25+1);

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
    }

}
/**
 * checks the answer agaist the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! Yo got it right! :D")
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`)
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);

}
/**
 * Gets the operands (the numbers ) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer. parseInt to ensure this is a number
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === 'x') {
        return [operand1 * operand2, "multiply"];
    } else if (operator === '-') {
        return [operand1 - operand2, "subtract"];
    } else if (operator === '/') {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`)
        throw `Unimplemented operator ${operator}. Aborting`
    }
}
/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById('score').innerText = ++oldScore;

}
/**
 * Gets the current tally of incorrect answer from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let incorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById('incorrect').innerText = ++incorrect;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";

}

/* Saved from ScoreBoard Project */

/* Set oenality functions*/
let penalityBtn = document.getElementById('set-penality');
penalityBtn.addEventListener('click', setPenality);

function setPenality() {
    alert('set penality function started');
    let setPenalityInputHTML = `
    <label for="player-team">Player team</label>
    <input id="player-team-1" name='team' type="radio" class='radio-btn' required>1
    <input id="player-team-2" name='team' type="radio" class='radio-btn' required>2
    <br>
    <label for="player-number">Player #</label>
    <input id="player-number" type="number">
    <label for="Penality-time">Penality Time</label>
    <input id="pen-mins" type="number">
    <input id="pen-scds" type="number">
    <input type='submit'></submit>
    `
    let setPenalityInput = document.createElement('form');
    setPenalityInput.id = 'penality-form';
    setPenalityInput.innerHTML = setPenalityInputHTML;
    document.getElementById('penality-border-setting').appendChild(setPenalityInput);

    let subtmitPenality = document.getElementById('penality-form');
    subtmitPenality.addEventListener("submit", updatePenalityBox);

}

/**
 * The function will check which team the player is from and update the penality box with the
 * player # and time
 */

function updatePenalityBox() {
    alert('start update peneality box function');
    let team1 = document.getElementById('player-team-1');
    let team2 = document.getElementById('player-team-2');
    let playerNumber = document.getElementById('player-number').value;
    let penMins = document.getElementById('pen-mins').value;
    let penScds = document.getElementById('pen-scds').value;
    if (team1.checked) {
        alert('team 1 seclected');
        let setPenalityList = document.createElement('ul');
        let setPenalityListHTML = `
            <li>#${playerNumber}-------->${penMins}:${penScds}</li>
        `
        setPenalityList.innerHTML = setPenalityListHTML;
        document.getElementById('penality-players-team-1').appendChild(setPenalityList);
    
        document.getElementById('penality-form').remove();
    } else if (team2.checked) {
        alert('team 2 selected');
        let setPenalityList = document.createElement('ul');
        let setPenalityListHTML = `
            <li>#${playerNumber}------->${penMins}:${penScds}</li>
        `
        setPenalityList.innerHTML = setPenalityListHTML;
        document.getElementById('penality-players-team-2').appendChild(setPenalityList);
    
        document.getElementById('penality-form').remove();
    }

}
