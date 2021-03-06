  //
  // let arr = [1,2,3,4,5];
  // arr.reverse()
  // console.log(arr);
$(document).ready(() => {

//values from forms
    const value1 = $('#player1Name');
    const value2 = $('#player2Name');


// Starts game after landing page gets button
  $('.startBtn').click(() => {
    event.preventDefault()
    console.log('Game starts!');
    $('h1').text(`Roll the Dice to begin! \n${value1.val()}'s Turn`);
    $('.logo').addClass('animated infinite tada')
    $('#startgame').addClass('zoomOutDown')
    $('audio').attr('src', 'Audio/music2.mp3')
    $('.gameSection').css('display', 'flex');

  });

  // const value1 = $('#player1Name');
  // const value2 = $('#player2Name');

  // let playerOne = $('#player1Name').val()
  // (console.log(playerOne.val()));


  let redPiece = $('.redPiece')
  let bluePiece = $('.bluePiece')

//sets an array of all the flexboxes
  const cell = $('.cell');


  var part0 = cell.slice(0,10);
  var part1 = cell.slice(10, 12);
  var part2 = cell.slice(12, 14);
  var part3 = cell.slice(14);


//rearranges cells so they are actually board format
function adjCell(array, array2, array3, array4) {
  let ans = [];



  for (var i = 0; i < array.length; i++) {
    ans.push(array[i]);
  }

  for (var h = 0; h < array2.length; h++) {
    ans.push(array2[h]);
  }

  for (var j = array3.length - 1; j >= 0; j--) {
    ans.push(array3[j]);
  }

  for (var k = array4.length -1; k >= 0; k--) {
    ans.push(array4[k]);
  }

  return ans;
};

const newCell = adjCell(part0, part2, part3, part1);
console.log(newCell);

class Cell {
  constructor(key,value){
    this.key = key;
    this.value = value;
    this.occupied = false;
  }
  isOccupied() {
    return this.occupied;
  }
  hidePiece() {
    if('red') {
    $(this.value).children('.redPiece').css('visibility', 'hidden');
    this.occupied = false;
    }
    if('blue'){
    $(this.value).children('.bluePiece').css('visibility', 'hidden');
    this.occupied = false;
    }
  }
  showPiece() {
    if('red') {
    $(this.value).children('.redPiece').css('visibility', 'visible');
    this.occupied = true;
    }
    if('blue') {
    $(this.value).children('.bluePiece').css('visibility', 'visible');
    this.occupied = true;
    }
  }
}
let cells = []
// cell.each( function(i,d) {
//   cells.push(new Cell(i,d))
// })

for (var i = 0; i < newCell.length; i++) {
  cells.push(new Cell (i, newCell[i]));
};

//$(cells[0]).html("new text")
// console.log(cell);
console.log(cells);



  let counter = 2;

  let turns = "red";


  let clickDice = $('.dice').click(rollDice)
  let diceVal = null;

  function rollDice() {
    //create an object of a Dice
    var dice = {
      sides: 6,
      // method to generate number
      roll: function () {
        // random number between 0-1, times the amount of possible side,
        // rounded down, add one to add possibility of 6.
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
      }
     }
    let value = dice.roll();

    if(value === 1) {
      $(".dice > img").attr("src","Images/Die_1.png");
      diceVal = 1;
      movePiece();
    }
    if(value === 2) {
      $(".dice > img").attr("src","Images/Die_2.png");
      diceVal = 2;
      movePiece();
    }
    if(value === 3) {
      $(".dice > img").attr("src","Images/Die_3.png");
      diceVal = 3;
      movePiece();
    }
    if(value === 4) {
      $(".dice > img").attr("src","Images/Die_4.png");
      diceVal = 4;
      movePiece();
    }
    if(value === 5) {
      $(".dice > img").attr("src","Images/Die_5.png");
      diceVal = 5;
      movePiece();
    }
    if(value === 6) {
      $(".dice > img").attr("src","Images/Die_6.png");
      diceVal = 6;
      // $('h1').text('You Rolled a Six. Roll Again!');
      // rollSix();
      movePiece();
    }

    return value;
  }

    let redCurrent = 0;
    let blueCurrent = 12;

    function movePiece() {
    checkWin();


      if (turns == 'red') {
        $('#mainPiece1').css('visibility','hidden');
        cells[redCurrent].showPiece('red');

          if (counter >= 3 && !isHigher('red')) {

            cells[redCurrent].hidePiece('red');
            redCurrent += diceVal
            cells[redCurrent].showPiece('red');
            console.log(cells[redCurrent].occupied)
            changeTurns();
            // $('.redPiece').click(changeTurns());
          } else {
          changeTurns();
        }

      } else {
          $('#mainPiece2').css('visibility','hidden');
          cells[blueCurrent].showPiece('blue');

            if (counter >= 4 && !isHigher('blue')) {
                cells[blueCurrent].hidePiece('blue');
                blueCurrent += diceVal
                cells[blueCurrent].showPiece('blue');
                console.log(cells[blueCurrent].occupied)
                changeTurns();
              // $('.bluePiece').click(changeTurns());
            } else {
            changeTurns();
          }
      }

  }
  function isHigher(turn) {
    if ((redCurrent + diceVal) > 9) {
      alert('You rolled too high! Wait till next turn');
      return true;
    }
    if ((blueCurrent + diceVal) > 21) {
      alert('You rolled too high! Wait till next turn');
      return true;
    }
  }

    function changeTurns() {

      if(counter % 2 == 0) {
        console.log(turns);
        $('.bluePiece').off('click');
        turns = "blue";
        $('h1').text(`${value1.val()}'s Turn. ${value2.val()} is next.`);


        // $('.redPiece').click(movePiece);
        counter ++;
      }
      else {
        console.log(turns);
        $('.redPiece').off('click');
        turns = "red";
        $('h1').text(`${value2.val()}'s Turn. ${value1.val()} is next.`);

        // $('.bluePiece').click(movePiece);
        counter++;

      }
    }

  function checkWin() {
    if(cells[9].isOccupied()) {
      $('.gameSection').css('display', 'none');
      $('#startgame').removeClass('zoomOutDown').addClass('zoomIn');
      $('#startgame').text(`${value1.val()} wins!`)
    }
    if(cells[21].isOccupied()) {
      $('.gameSection').css('display', 'none');
      $('#startgame').removeClass('zoomOutDown').addClass('zoomIn');
      $('#startgame').text(`${value2.val()} wins!`)
    }
  }
  // function rollSix() {
  //
  //   if(turns == 'red') {
  //     let clickMainPiece1 = $('#mainPiece1').click(function() {
  //         console.log('this has been clicked');
  //         $('#mainPiece1').css('display','none');
  //         $('.redPiece').css('visibility', 'visible');
  //         rollDice();
  //         // changeTurns();
  //     });
  //   }
  //
  //   if(turns == 'blue') {
  //     let clickMainPiece2 = $('#mainPiece2').click(function() {
  //         console.log('this has been clicked');
  //         $('#mainPiece2').css('display','none');
  //         $('.bluePiece').css('visibility', 'visible');
  //         rollDice();
  //         // changeTurns();
  //     });
  //   }
  // };
//JQUERY ender
});


  // class Player {
  //   constructor(player, color, clickMainPiece, currentPlayer) {
  //     this.player = player
  //     this.color = color
  //     this.clickMainPiece = clickMainPiece
  //     this.currentPlayer = false;
  //   }

  //   changeTurns(){};
  //   rollDice() {};
  //   movePiece(){};

  // }
    // let setBoard;
  // class gameBoard {
  //   constructor() {

  //   }

  // }


    // let player1 = new Player(1,'red', clickMainPiece1) ;
    // let player2 = new Player(2,'blue', clickMainPiece2);
    // console.log(player1)
    // console.log(player2)
