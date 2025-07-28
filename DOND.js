var orig = [1,1]
var tourn = []

orig.length = 26

for (i=0;i<3;i++){
    orig[i+2] = orig[i+1] + orig[i];
}
for (i=3;i>0;i--){
    orig[i] = orig[i] * orig[4]
    orig[i+3] = orig[i] * orig[4]
}
   
for (i=7;i<11;i++){
    orig[i] = (i-5) * orig[5] 
}
 
for (i=11;i<14;i++){
    orig[i] = (i-9) * orig[10] 
}

for (i=14;i<26;i++){
    if (i <= 15){
        orig[i] = orig[i-13] * orig[13]
    }else{
        orig[i] = orig[i-12] * orig[13] 
    }        
}

multiple = orig.slice(0,3).concat(orig.slice(4,26))
multiple.splice(1,0,2.5)

for (i=0;i<13;i++){
    tourn[i] = [1]
    tourn[i].length=26
}   
for (j=1;j<26;j++){
    tourn[0][j] = 2 * multiple[j]  
}
for (i=1;i<13;i++){
    for (j=0;j<26;j++){
        tourn[i][j] = tourn[0][i] * multiple[j]
    }                   
}  
// Reserves and admission fees for different levels
reserve = [1e+05, 5e+05, 2e+06, 5e+06, 1.5e+07, 3e+07, 7.5e+07, 1.75e+08, 3e+08, 5.5e+08, 1e+09, 1.75e+09, 2.75e+09, 5e+09]

percent = [0]
increment = [0.005]
increment.length = 12
admission = [0]
admission.length = 14
max_prize = [0]
max_prize.length = 14

for (i=1;i<5;i++){
	increment[i] = 0.0035
} 

for (i=5;i<10;i++){
	increment[i] = increment[i-1] + 0.0005
}

increment[10] = increment[9] / 2
increment[11] = increment[10]

sum = 0
increment.forEach(element => {
	sum = sum + element
});  
  
percent[0] = sum
increment.splice(6, 0, increment[4])
increment[7] = increment[7] - increment[6]
	
for (i=0;i<13;i++){
	percent[i+1] = percent[i] + increment[i]      
}

for (i=0;i<14;i++){
	if(i<4){
		max_prize[i] = tourn[i][25]
	}
	else{
		max_prize[i] = tourn[0][25] * orig[i-1]
	}
	admission[i] = max_prize[i] * percent[i]  
}

var cases = document.querySelectorAll(".cases")
var caseNo = document.querySelectorAll(".caseNo")
var caseValue = document.querySelectorAll(".caseValue")
var moneyShow = document.querySelectorAll(".moneyShow")
var eliminate = document.getElementById("eliminate");
var rightMoneys = document.getElementById("rightMoneys")
var leftMoneys = document.getElementById("leftMoneys")
var bank = document.getElementById("bank");
var Deal = document.getElementById("Deal");
var noDeal = document.getElementById("noDeal");
var countdown = document.getElementById("countdown");
var bankOffer = document.querySelector(".bankOffer");
var prevOffers = document.getElementById("prevOffers");
var finished = document.getElementById("finished");
var chosenCase = 0;
var previousOffers = [];
var toRemove = [6,5,5,3,2,1,1,1];
var removed = [6]
removed.length = 8
for(i=1; i<removed.length; i++){
	removed[i] = removed[i-1] + toRemove[i];
}

var rounds = 0;
var yourNo = document.getElementById("yourNo");
var otherNo = document.getElementById("otherNo");
var winnings = document.getElementById("winnings");
var lastDeal = document.getElementById("lastDeal");	
var yourValue = document.getElementById("yourValue");
var otherValue = document.getElementById("otherValue");
var winningCase = 0;
var openedCases = 0;
var original = document.getElementById("original");
var tourn = document.getElementById("tourn");
var chooseCase = document.getElementById("chooseCase");
var chooseCaseButton = document.querySelectorAll(".chooseCaseButton");
var explain = document.getElementById("explain");
var seeExplainButton = document.getElementById("seeExplainButton");

var nos = [1];
nos.length = 26;
var thinking = new Audio('Choose case.mp3');
var badcase = new Audio('Wheel-of-fortune-bankrupt.mp3');
var goodcase = new Audio('Good case.mp3');

seeExplainButton.addEventListener("click", function(){
	show(explain);
})
explainButton.addEventListener("click", function(){
	hide(explain);
})

//money displays style
for(i = 0; i < 26; i++){
	var moneyDisplay = "$" + orig[i].toLocaleString('en-US');
	moneyShow[i].textContent = moneyDisplay;
	moneyShow[i].classList.add("gaps");
}
hide(leftMoneys);
hide(rightMoneys);
hide(caseContainer);

original.addEventListener("click", function(){
	setup();
})
tourn.addEventListener("click", function(){
	worldwide();
})
function setup(){
	show(leftMoneys);
	show(rightMoneys);
	hide(home);
	show(caseContainer);
	show(chooseCase);
	thinking.play();
	//choose a case
	for(var i = 0; i < chooseCaseButton.length; i++){
		nos[i] = caseNo[i].textContent;
		chooseCaseButton[i].addEventListener("click", function(){
			thinking.pause();
			chosenCase = this.textContent;
			yourNo.innerHTML = chosenCase;
			hide(chooseCase);
			main();
		})
	}
}

function shuffleArray(array){
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//shuffle values
var shuffledValues = shuffleArray(orig);

function average(array){
	var valuesSum = 0;
	array.forEach(element => {
        valuesSum = valuesSum + element;
    });  
	return (valuesSum/array.length);
}
//main game logic
function main(){
	for(var i = 0; i < cases.length; i++){
		//assign values to cases and hide them
		lefttoRemove.innerHTML = "CHOOSE 6 TO OPEN"; 
		caseValue[i].textContent = "$" + shuffledValues[i].toLocaleString('en-US');
		caseValue[i].classList.add("hideValue");
		yourValue.textContent = "$" + shuffledValues[chosenCase-1].toLocaleString('en-Us');											
		yourValue.classList.add("hideValue");
		
		//open cases other than chosen case
		(function(j){
			if(chosenCase !== caseNo[j].textContent){
				//opening cases logic
				cases[j].addEventListener("click", function(){					
					caseValue[j].classList.remove("hideValue"); 
					caseValue[j].classList.add("DisplayValue");
					caseNo[j].classList.add("hideValue");
					cases[j].classList.add("openedCase");
					//remove opened cases amounts from the array
					for(var i = 0; i < shuffledValues.length; i++){
						if("$" + shuffledValues[i].toLocaleString('en-US') === caseValue[j].textContent){
							//sound effect depending on whether amount is small or large
							setTimeout(() => {
								if (shuffledValues[i] >= 100000) {
								  badcase.play();
								} else {
								  goodcase.play();
								}  }, 5000);					
							shuffledValues.splice(i, 1);
							nos.splice(i, 1);				
						}
					}				

					openedCases++;
					//remove opened cases amounts from display
					for(var i = 0; i < moneyShow.length; i++){
						if(moneyShow[i].textContent === caseValue[j].textContent){
							moneyShow[i].classList.add("removeValue");
						}
					}
					console.log(openedCases);
					lefttoRemove.innerHTML = "CHOOSE " + (removed[rounds] - openedCases) + " TO OPEN";	
					//show bank offer and 30-second countdown
					if(openedCases === removed[rounds]){
						rounds++;
						calcOffer();
						show(bank);
						animateValue(bankOffer, 0, calcOffer(), 1000);
						var timer;	
						countDown(countdown, 30);		
						nextRound.innerHTML = (rounds <= 7) ? "Number of cases to open next round: " + toRemove[rounds] : "This is the banker's FINAL offer!";	
					}										
				}, {once: true});
			} else {
				cases[j].classList.add("chosenCase");
			}
		})(i);	
		//if two cases remain, prompt user to pick one of the cases
		if(openedCases === 24){
			show(lastDeal);		
		}
	}
}

function NoDeal(){
	clearInterval(timer);
	hide(bank);
	previousOffers.push("\n"+bankOffer.textContent);
	prevOffers.textContent = "Previous Offers: " + previousOffers;
	if(openedCases === 24){
		show(lastDeal);
		for(var i = 0; i < nos.length; i++){
			if(nos[i] !== chosenCase){
				otherNo.innerHTML = nos[i];	
				otherValue.textContent = "$" + shuffledValues[i].toLocaleString('en-US');											
				otherValue.classList.add("hideValue");
			}			
		}
		yourCase.addEventListener("click", function(){
			yourNo.classList.add("hideValue"); 
			yourValue.classList.add("DisplayValue");
		})
		otherCase.addEventListener("click", function(){
			otherNo.classList.add("hideValue"); 
			otherValue.classList.add("DisplayValue");
		})
	}
	else{
		lefttoRemove.innerHTML = "CHOOSE " + (removed[rounds] - openedCases) + " TO OPEN";
	}
}

//bank offer logic
noDeal.addEventListener("click", NoDeal);
Deal.addEventListener("click", function(){
	hide(bank);
	winnings.textContent = bankOffer.textContent;
	finish();
});

function calcOffer(){
	var bankOffer = average(shuffledValues) * openedCases/26
	return Math.round(bankOffer);
}

function animateValue(id, start, end, duration) {    
    var obj = id;
    var range = end - start;
    var stepTime = Math.abs(Math.floor(duration / range));
    
    stepTime = Math.max(stepTime, 100);

    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var animate;
     
    animate = setInterval(function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = "$" + value.toLocaleString('en-US');
        if (value == end) {
            clearInterval(animate);
        }
    }   , stepTime);
}

function countDown(id, duration){
    var duration;

    timer = setInterval(function run() {
		id.innerHTML = (duration < 10) ? ":0" + duration : ":" + duration;
		duration--;
        if (duration < 0) {
			NoDeal();
        }
    }   , 1000);
}

function show(div){
	div.style.display = "block";
}
function hide(div){
	div.style.display = "none"
}
function finish(){
	finished.style.display = "block";
}
