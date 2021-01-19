//Challenge 1: Age in days

function ageInDays()
{
    var birthYear = prompt("What is your birth year?");
    var numDays = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1'); //create an h1 element and setting its value to a var h1
    var textAnswer = document.createTextNode("You are "+ numDays + " days old.")
    h1.setAttribute('id','ageInDays'); //setting the id of the created h1 element to ageInDays
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1); //add the h1 to flex-box-result
}

function reset()
{
    document.getElementById('ageInDays').remove();
}

//Challenge 2: Cat Generator

function generateCat()
{
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors

function playRPS(userElement)
{
    userChoice = userElement.id;

    myChoice = getMyRPS();

    result = winner(userChoice,myChoice);

    message = finalMessage(result);

    rpsFrontEnd(userChoice,myChoice,message);
}

function getMyRPS()
{
    myNum = Math.floor(Math.random()*3);
    myChoice = null;

    if(myNum==0)
    {
        return "rock";
    }
    else if(myNum==1)
    {
        return "paper";
    }
    else (myChoice == 2)
    {
        return "scissors";
    }
}

function winner(userChoice, myChoice)
{
    if(userChoice===myChoice)
    {
        return 'none';
    }

    else
    {
        if((userChoice==='rock' && myChoice ==='paper') ||
        (userChoice==='paper' && myChoice ==='scissors') ||
        (userChoice==='scissors' && myChoice ==='rock'))
        {            
            return 'bot';
        }
        else
        {
            return 'user';
        }
    }
}

function finalMessage(result)
{
    if(result === 'bot')
    {
        return {'message': 'You lost!', 'color': 'red'};
    }
    else if(result === 'user')
    {
        return {'message': 'You won!', 'color': 'green'};
    }
    else
    {
        return {'message': 'You tied!', 'color': 'yellow'}
    }
}
function rpsFrontEnd(userImageChoice, botImageChoice, finalMessage)
{
    var imagesDatabase = 
    {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src      
    }

    //removing all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var userDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    userDiv.innerHTML = "<img src='" + imagesDatabase[userImageChoice] + "' style = 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    document.getElementById('flex-box-rps-div').appendChild(userDiv);

    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style = 'box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4: Change the Color of All Buttons

var allButtons = document.getElementsByTagName('button');

var originalButtons = [];
for(let i=0; i<allButtons.length; i++)
{
    originalButtons.push(allButtons[i].classList[1]);
}


function buttonColorChange(that)
{
    if(that.value === 'red')
    {
        buttonsRed();
    }

    else if(that.value === 'green')
    {
        buttonsGreen();
    }

    else if(that.value === 'reset')
    {
        buttonsReset();
    }
    else if(that.value === 'random')
    {
        buttonsRandom();
    }
}

function buttonsRed()
{
    for(let i=0; i<allButtons.length; i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen()
{
    for(let i=0; i<allButtons.length; i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonsReset()
{
    for(let i=0; i<allButtons.length; i++)
    {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(originalButtons[i]);
    }
}

function buttonsRandom()
{
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(let i=0; i<allButtons.length; i++)
    {
        let myNum = Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[myNum]);
    }
}

//Challenge 5: BlackJack
let blackjackGame = 
{
    'you': {'scoreSpan': '#your-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    'cardsMap' : {'2': 2, '3':3, '4':4, '5':5, '6': 6, '7':7, '8':8, '9':9, '10':10, 'J':10,'Q':10, 'K':10, 'A':[1,11]},
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];


const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#stand-button').addEventListener('click', blackjackStand);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);

function blackjackHit()
{ 
    if(YOU['score']<21 && DEALER['score']==0)
    {
        let card = randomCard();
        showCard(YOU,card);
        updateScore(YOU,card);
        showScore(YOU);
    }
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function blackjackStand()
{
    if(YOU['score']!=='BUSTED' && YOU['score']!=='BLACKJACK' && YOU['score']>11)
    {
        while(DEALER['score']<21)
        {
            console.log(DEALER['score']);
            if(DEALER['score'] < YOU['score'])
            {
                let card = randomCard();
                showCard(DEALER,card);
                updateScore(DEALER,card);
                showScore(DEALER);
            }

            else if (DEALER['score'] == YOU['score'])
            {
                showScore(DEALER);
                document.querySelector('#BlackJack-result').textContent = 'PUSH';
                draw();
                break;
            }

            else
            {
                document.querySelector('#BlackJack-result').textContent = 'DEALER WINS';
                showScore(DEALER);
                document.querySelector(DEALER['scoreSpan']).style.color = 'green';
                loss();
                break;
            }
        }
    }
}

function showCard(activePlayer,card)
{
    let cardImage = document.createElement('img');

    cardImage.src = 'static/images/' + card + '.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal()
{
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    document.querySelector('#BlackJack-result').textContent = 'Let\'s Play';

    for(let i=0; i< yourImages.length; i++)
    {
        yourImages[i].remove();
        YOU['score'] = 0;
        showScore(YOU);
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
    }

    for(let i=0; i< dealerImages.length; i++)
    {
        dealerImages[i].remove();
        DEALER['score'] = 0;
        showScore(DEALER);
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    }
}

function updateScore(activePlayer,card)
{
    if(card === 'A')
    {
        if((activePlayer['score'] + 11) < 21)
        {
            activePlayer['score'] += 11;
        }
        else
        {
            activePlayer['score'] += 1;
        }
    }
    else
    {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

    checkWin(activePlayer);
    checkBust(activePlayer);
}

function showScore(activePlayer)
{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

function checkWin(activePlayer)
{
    if(activePlayer['score']==21)
    {
        document.querySelector(activePlayer['scoreSpan']).style.color = 'green';
        if(activePlayer == YOU)
        {
            document.querySelector('#BlackJack-result').textContent = 'YOU WIN. BLACKJACK';
            win();
            
        }
        else
        {
            document.querySelector('#BlackJack-result').textContent = 'DEALER WINS. BLACKJACK';
            loss();
        }
    }
}

function checkBust(activePlayer)
{ 
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        if(activePlayer == DEALER)
        {
            document.querySelector('#BlackJack-result').textContent = 'YOU WIN. DEALER BUSTED';
            win();
        }
        else
        {
            document.querySelector('#BlackJack-result').textContent = 'DEALER WINS. YOU BUSTED';
            loss();
        }
    }
}

function win()
{
    winSound.play();
    let wins = parseInt(document.querySelector('#wins').textContent);
    wins++;
    document.querySelector('#wins').textContent = wins;
}

function draw()
{
    let draws = parseInt(document.querySelector('#draws').textContent);
    draws++;
    document.querySelector('#draws').textContent = draws;
}

function loss()
{
    loseSound.play();
    let losses = parseInt(document.querySelector('#losses').textContent);
    losses++;
    document.querySelector('#losses').textContent = losses;
}