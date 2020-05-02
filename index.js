const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getInput(message) {
    return new Promise((resolve, reject) => {
        rl.output.write(`${message}`)
    
        rl.on('line', input => {
            resolve(input)
            rl.removeAllListeners()
        })
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const choices = [
    'Rock',
    'Paper',
    'Scissors',
    'Lizard',
    'Spock'
]

const possibilities = {
    'Rock': ['crushes Lizard','crushes Scissors'],
    'Paper': ['covers Rock','disproves Spock'],
    'Scissors': ['cuts Paper','decapitates Lizard'],
    'Lizard': ['poisons Spock','eats Paper'],
    'Spock': ['smashes Scissors','vaporizes Rock'],
}

let humanWins = 0,
    computerWins = 0

function computerChoice() {
    const choice = choices[getRandomInt(0, choices.length)]
    console.log('Computer Chose: ' + choice)
    return choice
}

function checkWinner(humanChoice, computerChoice) {
    if(humanChoice === computerChoice) {
        console.log('Nothing happens feijoada!')
        return
    }

    const humanWin = Array.from(possibilities[humanChoice]).find(possibility => possibility.includes(computerChoice))

    if(humanWin) {
        console.log(`${humanChoice} ${humanWin}`)
        humanWins++
    } else {
        const computerWin = Array.from(possibilities[computerChoice]).find(possibility => possibility.includes(humanChoice))
        console.log(`${computerChoice} ${computerWin}`)
        computerWins++
    }
}

function showResults() {
    console.log(`You: ${humanWins} X Computer: ${computerWins}`)
    console.log('\n------------------------------------------------\n')
}

async function gameLoop() {
    console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!')
    console.log('------------------------------------------------')
    console.log('Choose on of them:\n')
    console.log('[0]: Rock')
    console.log('[1]: Paper')
    console.log('[2]: Scissors')
    console.log('[3]: Lizard')
    console.log('[4]: Spock')
    console.log('[5]: Quit the Game :(\n')

    let input = ''

    while(input !== 5) {
        input = parseInt(await getInput('Your Choice: '))
        
        if(input < 5) {
            console.log('------------------------------------------------\n')
            console.log('You Chose: ' + choices[input])
            checkWinner(choices[input], computerChoice())
            showResults()
        }
    }

    rl.close()
}

gameLoop()