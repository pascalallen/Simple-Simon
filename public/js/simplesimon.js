$(document).ready(function() {
"use strict";

	var compPattern = [];
	var userPattern = [];
	var buttons = $(".pad");
	var padNum;
	var score = 0;
	var level = 0;

	function animateColor(color_num) {
		$("[data-number='" + color_num + "']").animate({
			opacity: 1.0
		}, 500).animate({
			opacity: 0.5
		}, 500);
	}

	function randomColor() {
		padNum = Math.floor(Math.random() * 4);
		return padNum;
	}

	function addNumber() {
		if(level != 0){
			scoreUp();
		}
		userPattern = [];
		compPattern.push(randomColor());
		levelUp(compPattern);
	}

	function displayPattern() {
		compPattern.forEach(function(color_num, index){
			setTimeout(function(){
				$("#sound" + color_num).get(0).play();
				animateColor(color_num);
			}, (1000 * (index + 1)))
		});
	}

	function newGame() {
		addNumber();
		displayPattern();
		$(".pad").click(function(){
			checkPattern($(this).data("number"));
		});
	}

	$('.start').click(function() {
		newGame();
		$(".start").attr("disabled", true);
    });

	function checkPattern(userNumber) {
		userPattern.push(userNumber);
		animateColor(userNumber);
		$('#sound' + userNumber).get(0).play();
		if(userPattern[userPattern.length-1] != compPattern[userPattern.length-1]) {
			alert("Game Over");
		}else if(userPattern.length == compPattern.length){
			addNumber();
			displayPattern();
		};
	}

	function levelUp(compPattern) {
		level = (compPattern.length);
		$("#level").text(level);
	}

	function scoreUp() {
		score += 1;
		$("#score").text(score);
	}

});