
$(function() {
  
  var anim_id;

  //saving dom objects to variables
  var container = $('#container');
  var human = $('#human');
  var zombie_1 = $('#zombie_1');
  var zombie_2 = $('#zombie_2');
	var zombie_3 = $('#zombie_3');
	var zombie_4 = $('#zombie_4');
  var zombie_5 = $('#zombie_5');
	var zombie_6 = $('#zombie_6');
	var zombie_7 = $('#zombie_7');
  var zombie_8 = $('#zombie_8');
	var zombie_9 = $('#zombie_9');
	var zombie_10 = $('#zombie_10');
  var bullet_1 = $('#bullet_1');
  var bullet_2 = $('#bullet_2');
	var bullet_3 = $('#bullet_3');
	var bullet_4 = $('#bullet_4');
  var bullet_5 = $('#bullet_5');
	var bullet_6 = $('#bullet_6');
	var bullet_7 = $('#bullet_7');
  var bullet_8 = $('#bullet_8');
	var bullet_9 = $('#bullet_9');
	var bullet_10 = $('#bullet_10');
  var restart_div = $('#restart_div');
  var restart_btn = $('#restart');
  var score = $('#score');

  //saving some initial setup
	var container_left = parseInt(container.css('left'));
	var container_right = parseInt(container.css('right'));
  var container_width = parseInt(container.width());
  var container_height = parseInt(container.height());
  var human_width = parseInt(human.width());
  var human_height = parseInt(human.height());

  //some other declarations
  var game_over = false;
  var score_counter = 1;
  var speed = 1;
  var bullet_speed = 3;
  var move_right = false;
  var move_left = false;
  var move_up = false;
  var move_down = false;


	// GAME LOGIC
	// defining direction methods
	function left() {
    if (game_over === false && parseInt(human.css('left')) > 0) {
      human.css('left', parseInt(human.css('left')) - 5);
      move_left = requestAnimationFrame(left);
    }
  }

  function right() {
    if (game_over === false && parseInt(human.css('left')) < container_width - human_width) {
      human.css('left', parseInt(human.css('left')) + 5);
      move_right = requestAnimationFrame(right);
    }
  }

  function up() {
    if (game_over === false && parseInt(human.css('top')) > 0) {
      human.css('top', parseInt(human.css('top')) - 3);
      move_up = requestAnimationFrame(up);
    }
  }

  function down() {
    if (game_over === false && parseInt(human.css('top')) < container_height - human_height) {
      human.css('top', parseInt(human.css('top')) + 3);
      move_down = requestAnimationFrame(down);
    }
	}
	
  // Arrow keys / keycodes for moving human
  $(document).on('keydown', function(e) {
    if (game_over === false) {
      var key = e.keyCode;
      if (key === 37 && move_left === false) {
        move_left = requestAnimationFrame(left);
			} else if (key === 38 && move_up === false) {
				move_up = requestAnimationFrame(up);
			} else if (key === 39 && move_right === false) {
        move_right = requestAnimationFrame(right);
      } else if (key === 40 && move_down === false) {
        move_down = requestAnimationFrame(down);
      }
    }
  });

  $(document).on('keyup', function(e) {
    if (game_over === false) {
      var key = e.keyCode;
      if (key === 37) {
        cancelAnimationFrame(move_left);
        move_left = false;
			} else if (key === 38) {
        cancelAnimationFrame(move_up);
        move_up = false;
      } else if (key === 39) {
        cancelAnimationFrame(move_right);
        move_right = false;
      } else if (key === 40) {
        cancelAnimationFrame(move_down);
        move_down = false;
      }
    }
  });


	// handling zombie and bullet movements
  function zombie_down(zombie) {
    var zombie_current_top = parseInt(zombie.css('top'));
    if (zombie_current_top > container_height) {
      zombie_current_top = -200;
      var zombie_left = parseInt(Math.random() * (container_width - human_width));
      zombie.css('left', zombie_left);
    }
    zombie.css('top', zombie_current_top + speed);
  }

  function bullet_left(bullet) {
    var bullet_current_right = parseInt(bullet.css('right'));
    if (bullet_current_right > container_width) {
        bullet_current_right = -300;
    }
    bullet.css('right', bullet_current_right + bullet_speed);
	}
	
	function bullet_right(bullet) {
    var bullet_current_left = parseInt(bullet.css('left'));
    if (bullet_current_left > 1400) {
        bullet_current_left = -300;
    }
    bullet.css('left', bullet_current_left + bullet_speed);
  }

  restart_btn.click(function() {
    location.reload();
	});
	
	// testing for collison
  function collision(object1, object2) {
    var object1LeftOffset = object1.offset().left;
    var object1TopOffset = object1.offset().top;
    var object1FullHeight = object1.outerHeight(true);
    var object1FullWidth = object1.outerWidth(true);
    var object1CombinedVertical = object1TopOffset + object1FullHeight;
    var object1CombinedHorizontal = object1LeftOffset + object1FullWidth;
    var object2LeftOffset = object2.offset().left;
    var object2TopOffset = object2.offset().top;
    var object2FullHeight = object2.outerHeight(true);
    var object2FullWidth = object2.outerWidth(true);
    var object2CombinedVertical = object2TopOffset + object2FullHeight;
    var object2CombinedHorizontal = object2LeftOffset + object2FullWidth;

    if (object1CombinedVertical < object2TopOffset || object1TopOffset > object2CombinedVertical || object1CombinedHorizontal < object2LeftOffset || object1LeftOffset > object2CombinedHorizontal) return false;
    return true;
  }

	// Function to check if collision with a deadly zombie has occured
	var myFunc = function() {
		if (collision(human, zombie_1) || collision(human, zombie_2) || collision(human, zombie_3) || collision(human, zombie_4) || collision(human, zombie_5)) {
			stop_the_game();
			return;
		}
		
		if (collision(human, bullet_6) || collision(human, bullet_7) || collision(human, bullet_8) || collision(human, bullet_9) || collision(human, bullet_10)) {
			score_counter -= 1;
		} 

		if (collision(human, zombie_6) || collision(human, zombie_7) || collision(human, zombie_8) || collision(human, zombie_9) || collision(human, zombie_10)) {
			score_counter -= 5;
		} 

		if (collision(human, bullet_1) || collision(human, bullet_2) || collision(human, bullet_3) || collision(human, bullet_4) || collision(human, bullet_5)) {
			score_counter -= 10;
		}

		score_counter++;

		if (score_counter % 20 == 0) {
			score.text(parseInt(score.text()) + 1);
		}
		
		if (score_counter % 500 == 0) {
			speed += 0.5;
			bullet_speed++;
		}

		zombie_down(zombie_1);
		zombie_down(zombie_2);
		zombie_down(zombie_3);
		zombie_down(zombie_4);
		zombie_down(zombie_5);
		zombie_down(zombie_6);
		zombie_down(zombie_7);
		zombie_down(zombie_8);
		zombie_down(zombie_9);
		zombie_down(zombie_10);

		bullet_left(bullet_1);
		bullet_left(bullet_2);
		bullet_left(bullet_3);
		bullet_left(bullet_4);
		bullet_left(bullet_5);
		bullet_right(bullet_6);
		bullet_right(bullet_7);
		bullet_right(bullet_8);
		bullet_right(bullet_9);
		bullet_right(bullet_10);

		anim_id = requestAnimationFrame(repeat);
	};

  function stop_the_game() {
    game_over = true;
    cancelAnimationFrame(anim_id);
    cancelAnimationFrame(move_right);
    cancelAnimationFrame(move_left);
    cancelAnimationFrame(move_up);
    cancelAnimationFrame(move_down);
    restart_div.slideDown();
    restart_btn.focus();
	}
	
	// function to be called until a fatal collision occurs or score < 0
  function repeat() {
		score_counter < 0 ? stop_the_game() : myFunc()		
	}
	
	// recursively call the requestAnimationFrame with repeat until game over
	anim_id = requestAnimationFrame(repeat);
});