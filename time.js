window.onload = function(e){ 
	//perform a for loop to add the event handler
	Array.from(document.getElementsByClassName("time-input")).forEach(
		function(element, index, array) {
			//Add the event handler to the time input
			element.addEventListener("blur", inputTimeBlurEvent);
		}
	);
}

inputTimeBlurEvent = function(e){
	var newTime = "";
	var timeValue = e.target.value;
	var numbers = [];
	var splitTime = [];
	
	//1st condition: if the value entered is empty, we set the default value
	if(timeValue.trim() == ""){
		e.target.value = "00:00";
		return;
	}
	
	//2nd condition: only allow numbers, dot and double dot. If not match set the default value. Example => 23a55
	var regex = /^[0-9.:]+$/;
	if( !regex.test(timeValue) ) {
		e.target.value = "00:00";
		return;
	}
	
	//3rd condition: replace the dot with double dot. Example => 23.55
	e.target.value = e.target.value.replace(".", ":").replace(/\./g,"");
	timeValue = e.target.value;
	
	//4th condition: auto add double dot if the input entered by user contains numbers only (no dot or double dot symbol found)
	//example => 2344 or 933
	if(timeValue.indexOf(".") == -1 && timeValue.indexOf(":") == -1){
		//check if the length is more than 4 we strip it up to 4
		if(timeValue.trim().length > 4){
			timeValue = timeValue.substring(0,4);
		}
		var inputTimeLength = timeValue.trim().length;
		numbers = timeValue.split('');
		switch(inputTimeLength){
			//Example => 23
			case 2:
				if(parseInt(timeValue) <= 0){
					e.target.value = "00:00";
				}else if(parseInt(timeValue) >= 24){
					e.target.value = "00:00";
				}else{
					e.target.value = timeValue + ":00";
				}
				break;
			//Example => 234
			case 3:
				newTime = "0" + numbers[0] + ":";
				if(parseInt(numbers[1] + numbers[2]) > 59){
					newTime += "00";
				}else{
					newTime += numbers[1] + numbers[2];
				}
				e.target.value = newTime;
				break;
			//Example 2345
			case 4:
				if(parseInt(numbers[0] + numbers[1]) >= 24){
					newTime = "00:";
				}else{
					newTime = numbers[0] + numbers[1] + ":";
				}
				if(parseInt(numbers[2] + numbers[3]) > 59){
					newTime += "00";
				}else{
					newTime += numbers[2] + numbers[3];
				}
				e.target.value = newTime;
				break;
		}
		return;
	}
	
	//5th condition: if double dot found
	var doubleDotIndex = timeValue.indexOf(":");
	//if user doesnt enter the first part of hours example => :35
	if(doubleDotIndex == 0){
		newTime = "00:";
		splitTime = timeValue.split(':');
		numbers = splitTime[1].split('');
		if(parseInt(numbers[0] + numbers[1]) > 59){
			newTime += "00";
		}else{
			newTime += numbers[0] + numbers[1];
		}
		e.target.value = newTime;
		return;
	}else{
		//if user enter not full time example=> 9:3
		splitTime = timeValue.split(':');
		var partTime1 = splitTime[0].split('');
		if(partTime1.length == 1){
			newTime = "0" + partTime1[0] + ":";
		}else{
			if(parseInt(partTime1[0] + partTime1[1]) > 23){
				newTime = "00:";
			}else{
				newTime = partTime1[0] + partTime1[1] + ":";
			}
		}
		
		var partTime2 = splitTime[1].split('');
		if(partTime2.length == 1){
			newTime += "0" + partTime2[0];
		}else{
			if(parseInt(partTime2[0] + partTime2[1]) > 59){
				newTime += "00";
			}else{
				newTime += partTime2[0] + partTime2[1];
			}
		}
		e.target.value = newTime;
		return;

	}
}
