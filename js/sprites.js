var imgPegasus = new Image();
var canvas;
var stage;
var screen_width;
var screen_height;
var animation;

function init() {
	//find canvas and load image
	canvas = document.getElementById("gameCanvas");
	
	imgPegasus.src = "images/royalPegaGuard.png";
	imgPegasus.onload = handleImageLoad;
	imgPegasus.onerror = handleImageError;
}

function handleImageLoad(e) {
	start();
}

function reset() {
	stage.removeAllChildren();
	createjs.Ticker.removeAllEventListeners();
	stage.update();
}

function start() {

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
	
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;

	// create spritesheet and assign the associated data.
	var spriteSheet = new createjs.SpriteSheet({
		//image to use
		images: [imgPegasus],
		//width, height & registration point of each sprite
		frames: { width: 60, height: 64, regX: 32, regY: 12 },
		// To slow down the animation loop of the sprite, we set the frequency to 4 to slow down by a 4x factor
		animations: {
			walk: [0, 9, "walk", 4]
		}
	});

	// create a Sprite instance to display and play back the sprite sheet:
	animation = new createjs.Sprite(spriteSheet);

	// start playing the sequence:
	animation.gotoAndPlay("walk"); 	//walking from left to right

	animation.name = "royalPegaGuard";
	animation.direction = 90;
	animation.vX = 0.5;
	animation.vY = 0;
	animation.x = 14;
	animation.y = 32;

	// have each pegasus start at a specific frame
	animation.currentFrame = 10;
	stage.addChild(animation);

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addEventListener(stage);
	createjs.Ticker.addEventListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(15);
	
	// update the stage:
	createjs.Ticker.on("tick", tick);
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}

function tick(event) {
	
	// Moving the sprite based on the direction & the speed
	if (animation.direction == 90) {
		animation.x += animation.vX;
		animation.y += animation.vY;
	}
	else {
		animation.x -= animation.vX;
		animation.y -= animation.vY;
	}
	
	// update the stage:
	stage.update(event);
}