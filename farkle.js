var diceArr = [];
var score = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + String(i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
}

/*Rolling dice values*/
function rollDice(){
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
	getScore();
}


/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else{
		diceArr[i].clicked = 0;
	}

}

function getDiceAmounts(){
	var valueArr = [0, 0, 0, 0, 0, 0]
	for(var i = 0; i < 6; i++){
		valueArr[(diceArr[i].value)-1]++;
	}
	return valueArr
}

/*check if none of the dice rolled earn points*/
function checkForFarkle(){

	var valueArr = getDiceAmounts();
	for(var i = 0; i < 6; i++){
		if(valueArr[i] >= 3){
			return;
		}
		else if(i == 0 && valueArr[i] > 0){
			return;
		}
		else if(i == 4 && valueArr[i] > 0){
			return;
		}
	}
	
	alert("UH OH, we have a FARKLE! Your turn is over!");

}

/*calculate score*/
function getScore(){

	var valueArr = getDiceAmounts();
	var score = 0;
	for(var i = 0; i < 6; i++){
		if(i == 0 && valueArr[i] >= 3 && valueArr[i] < 6){
			score += 1000;
			if (valueArr[i] - 3 == 1){
				score += 100;
			}
			else if (valueArr[i] - 3 == 2){
				score += 200;
			}
		}
		else if(i == 0 && valueArr[i] >= 6){
			score += 2000;
		}
		else if(i == 0){
			score += valueArr[i] * 100; 
		} 
		else if(i == 4 && valueArr[i] >= 3 && valueArr[i] < 6){
			score += 500;
			if (valueArr[i] - 3 == 1){
				score += 50;
			}
			else if (valueArr[i] - 3 == 2){
				score += 100;
			}
		} 
		else if(i == 4 && valueArr[i] >= 6){
			score += 1000;
		}
		else if(i == 4){
			score += valueArr[i] * 50; 
		} 
		else if(i == 1 && valueArr[i] == 3){
			score += 200; 
		}
		else if(i == 2 && valueArr[i] == 3){
			score += 300; 
		}
		else if(i == 3 && valueArr[i] == 3){
			score += 400; 
		}
		else if(i == 5 && valueArr[i] == 3){
			score += 600; 
		}
		else if(i == 1 && valueArr[i] == 6){
			score += 400; 
		}
		else if(i == 2 && valueArr[i] == 6){
			score += 600; 
		}
		else if(i == 3 && valueArr[i] == 6){
			score += 800; 
		}
		else if(i == 5 && valueArr[i] == 6){
			score += 1200; 
		}
	}

	document.getElementById("row-score").innerHTML = score;

	if(score == 0){
		alert("UH OH, we have a FARKLE! Your turn is over!");
	}

	return score;
}

/*add score to player bank*/
function bankScore(){

	score = getScore()
	console.log("YOU EARNED", score, "POINTS");

}