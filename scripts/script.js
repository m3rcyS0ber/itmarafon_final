let redrawCounter = -1;
document.addEventListener('DOMContentLoaded', ()=> {
    let whoFirst = randomElement(['b','w'])
    let game = {
        "movingPerson": whoFirst,
        "player": whoFirst,
        "status": "active",
        "options": {
            "timeToMove": 30
        },
        "map": [
            ['b','b','b','b'],
            ['b','b','b','b'],
            ['b','b','b','b'],
            [null,null,null,null],
            [null,null,null,null],
            ['w','w','w','w'],
            ['w','w','w','w'],
            ['w','w','w','w']
        ]
    }

    redrawPoses(game.map, game);
    printMovingPerson()
    countdown(game.options.timeToMove,document.querySelector('.movingTimer'))

    document.querySelector('.playerColor').innerHTML = `Вы играете за ${game.player === 'w' ? 'БЕЛЫХ' : 'ЧЁРНЫХ'}`

    let giveUpButton = document.querySelector('.buttons .giveup');
    giveUpButton.addEventListener('click',() => {
        game.status = 'end';
        document.querySelector('.overlay').classList.toggle('hidden')
        document.querySelector('.loseMessage').classList.toggle('hidden')
    })


    function countdown(time, el) {
        if(game.status === 'end') return;
        let leftTime = time;
        let timer = setInterval(()=> {
            leftTime--;
            el.innerHTML = leftTime;
            if(leftTime===0) {
                changeMovingPerson();
                clearInterval(timer);
            }
        },1000)
    }
    function changeMovingPerson() {
        if(game.status === 'end') return;
        if(game.movingPerson === 'w') {
            game.movingPerson = 'b'
            printMovingPerson()
            countdown(game.options.timeToMove,document.querySelector('.movingTimer'))
        } else if(game.movingPerson === 'b') {
            game.movingPerson = 'w'
            printMovingPerson()
            countdown(game.options.timeToMove,document.querySelector('.movingTimer'))
        }
        redrawCounter = -1;
        redrawPoses(game.map, game);
    }
    function printMovingPerson() {
            if(game.movingPerson !== game.player) {
                document.querySelector('.movingPerson').innerHTML = `Ход противника`
            } else {
                document.querySelector('.movingPerson').innerHTML = `Ваш ход`
            }
    }

})
function redrawPoses(poses,gameObj) {
    document.querySelector('.playground .table').innerHTML = `                <tr>
                    <td class="playable"> </td>
                    <td> </td>
                    <td class="playable"> </td>
                    <td> </td>
                    <td class="playable"> </td>
                    <td> </td>
                    <td class="playable"> </td>
                    <td> </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                </tr>
                <tr>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                </tr>
                <tr>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                </tr>
                <tr>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                    <td></td>
                    <td class="playable"></td>
                </tr>`
    let playableZones = document.getElementsByClassName('playable');
    for(let i = 0; i <= poses.length-1; i++) {
        for(let j = 0; j <= poses[i].length-1; j++) {
            redrawCounter++;
            if(poses[i][j] === 'w') {
                    playableZones[redrawCounter].innerHTML = `<img src="media/shashka_white.png" class="white-checker checker">`
            } else if(poses[i][j] === 'b') {
                    playableZones[redrawCounter].innerHTML = `<img src="media/shashka_black.png" class="black-checker checker">`
            } else {
                continue;
            }
        }
    }
    for(let k = 0; k <= playableZones.length-1; k++) {
        playableZones[k].addEventListener('click', (e) => {
            let zone = playableZones[k].querySelector('.checker')
            if(zone) {
                if(zone.classList.contains('white-checker') && gameObj.player === 'w' && gameObj.movingPerson === 'w') {
                    playableZones[k].classList.add('selected')
                    playableZones[k-3].classList.add('availableStep')
                    playableZones[k-4].classList.add('availableStep')
                }
                if(zone.classList.contains('black-checker') && gameObj.player === 'b'&& gameObj.movingPerson === 'b') {
                    playableZones[k].classList.add('selected')
                    playableZones[k+4].classList.add('availableStep')
                    playableZones[k+3].classList.add('availableStep')
                }
            }
        })
    }
}
function randomElement (arr) {
    return arr[Math.floor((Math.random()*arr.length))];
}