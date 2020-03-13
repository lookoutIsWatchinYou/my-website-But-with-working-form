//Let's imagine that we are building a game of Tic Tac Toe. What kinds of prototype functions and properties would we need as well?
//so first off object for 3*3 grid


//winning combinations
var winningSets = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
  [1, 5, 9],
  [7, 5, 3],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];
//Making sure they will be same order as picked sets
winningSets.sort();
for (i = 0; i < winningSets.length; i++) {
  winningSets[i].sort();
}
//DOM elements made by row function
var container = document.getElementById("container")
var rowBlock = document.getElementsByClassName("rowBlock")
var columnBlock = document.getElementsByClassName("columnBlock")
//old thing delete 

//Player turn
var player = {
  xTurn: true,
  oTurn: false
}
//Value for if a square is in use
var inUse = false;

//game Object- contains main methods for the game
var game = {


  gameWon: function(win) {
      for (i = 0; i < columnBlock.length; i++) {
          columnBlock[i].innerText = ""; //removing string added to each square while playing
      }
      game.usedSquares = [];
      rowCoords = [];
      game.p1Squares = []; //if any player1 squares are in a different row
      game.p2Squares = []; //if any player1 squares are in a different row

      if (win == true) { //checks if the boards just full or if a player has actually won

          if (player.xTurn == true) {



              return window.alert("Game Over You Has won player one of the X");
          } else {
              return window.alert("Game Over You Has won player two of the O");

          }
      } else return window.alert("Game over Restarting ");
  },

  startingSquares: [],
  usedSquares: [],
  rowCoords: [],
  //For checking if squares are all used
  isGameOver: function() {
      if (game.startingSquares.length == game.usedSquares.length && game.usedSquares.length != 0) {
          setTimeout(function() {
              game.gameWon(false);
          }, 200);

      }
  },
  squareInuse: function(eventId) { //id of square user clicked
      if (game.usedSquares.indexOf(+eventId) != -1) { //if square has not already been used set it now as in use

          return inUse = true;
      } else {
          return inUse = false;

      }
  },
  p1Squares: [],
  p2Squares: [],



  checkIfWinner: function() {
      //looping through both player sets
      //to check for matching sets of threes
      for (i = 0; i < winningSets.length; i++) {
          game.p1Squares.sort(); //Helps match up with winning sets
          game.p2Squares.sort();
          var count1 = 0;
          var count2 = 0;
          for (j = 0; j < game.p1Squares.length; j++) {

              if (winningSets[i].indexOf(game.p1Squares[j]) != -1) {

                  count1++;
                  console.log("count is " + count1);
                  //if set is found- win game :)
                  if (count1 === 3) {
                      console.log("count is " + count1);

                      console.log("x won" + game.p1Squares);
                      return game.gameWon(true);

                  }

              }
          }
          for (j = 0; j < game.p2Squares.length; j++) {

              if (winningSets[i].indexOf(game.p2Squares[j]) != -1) {
                  count2++;
                  if (count2 === 3) {
                      console.log("count is " + count1);

                      console.log("o won " + game.p2Squares);

                      return game.gameWon(true);
                  }

              }



          }


      }


  }
}
//end of game object




//makes the rows for me

//borrowed from stackover flow for conveniece
grid();

function grid() {
  //make 3 by 3
  makeRow(3);
  makeCol(3);
}

function makeRow(amount) {

  for (i = 0; i < amount; i++) { //how many divs you want?
      //create a div
      var row = document.createElement("div");
      //give class name
      row.className = "rowBlock"
      //append new div to the existing container div
      container.appendChild(row);


  }


  return row;
}

function makeCol(amount) {
  for (i = 0; i < rowBlock.length; i++) {
      for (a = 0; a < amount; a++) { //loop through each existing rowblock so we can append new divs to them
          //create new div 
          var columnBlock = document.createElement("div");
          //give class name

          columnBlock.className = "columnBlock"
          //append new div to the created div so that they make a column

          rowBlock[a].appendChild(columnBlock);


      }


  }
}




//set up the page
window.onload = function() {


  //assign ids for on click stuff for row and column
  for (i = 0; i < rowBlock.length; i++) {

      rowBlock[i].setAttribute("id", i);
      game.rowCoords.push(+rowBlock[i].id);
      console.log("pz work");
  }

  for (i = 0; i < columnBlock.length; i++) {
      columnBlock[i].setAttribute("id", i);
      game.startingSquares.push(+columnBlock[i].id);

  }




  document.body.onclick = function(e) { //when the document body is clicked

      game.squareInuse(event.srcElement.id);
      if (inUse == true) {

          return;
      }




      if (window.event) {
          e = event.srcElement; //assign the element clicked to e (IE 6-8)

      } else {
          e = e.target; //assign the element clicked to e
      }

      if (e.className && e.className.indexOf('columnBlock') != -1) //as long as event click is on the game board

      {



          if (player.xTurn) {
//adding appropriate letter to square
              var p = document.createElement("p");
              var node = document.createTextNode("X");
              p.appendChild(node);
//add it to clicked square
              columnBlock[event.srcElement.id].appendChild(p);
//add to list of used squares and player squares
              game.usedSquares.push(+event.srcElement.id)
              game.p1Squares.push(+event.srcElement.id + 1)
//if theres enough squares for a winning set
              if (game.p1Squares.length >= 3) {
                  setTimeout(function() {
                      //do it slightly later so if it is a winner other things can happen
                      game.checkIfWinner();
                  }, 100);
              }
              //this just checks if the board is full and if we should restart
              game.isGameOver();

              setTimeout(function() {
                  //next players turn
                  player.xTurn = false;
                  player.oTurn = true;
              }, 200)

          } else if (player.oTurn) {
              //adding appropriate letter to square

              var p = document.createElement("p");
              var node = document.createTextNode("O");
              p.appendChild(node);
//add it to clicked square

              columnBlock[event.srcElement.id].appendChild(p);
//add to list of used squares and player squares

              game.usedSquares.push(+event.srcElement.id)
              game.p2Squares.push(+event.srcElement.id + 1)


              if (game.p2Squares.length >= 3) {
                  setTimeout(function() {
                                            //do it slightly later so if it is a winner other things can happen

                      game.checkIfWinner();
                  }, 100);


              }
     //this just checks if the board is full and if we should restart
              game.isGameOver();

              setTimeout(function() {
                                    //next players turn

                  player.xTurn = true;
                  player.oTurn = false;
              }, 200)

          }


      }

  }

}
