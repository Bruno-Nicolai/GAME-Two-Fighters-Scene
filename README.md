# That's a 2D Game made with Vanilla Js and the Canvas API. 
> a fighting game where two players battle it out until there is a winner or the time runs out. The game runs inside a canvas element and the graphics are drawn using the 2D context of the canvas.
+ two fighters, one controlled by the player on the left and the other controlled by the player on the right. 
+ a timer starts at 60 seconds and counts down to zero. If no fighter has won when the timer reaches zero, the game ends in a draw. The player with more health at the end of the game is declared the winner.
+ game detects collisions between the two fighters by checking if the attack box of one fighter intersects with the hitbox of the other fighter. If a fighter is hit, its health decreases.
+ it has a simple user interface with a timer, a message box that displays the winner, and a restart button.
