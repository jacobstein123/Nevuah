var mongojs = require("mongojs");
var db = mongojs("Nevuah");


var ranks = [];

function getDayRank(db, school, class_, date){
	var classes = db.collection("classes");
	var users = db.collection("user");
	var calendar = db.collection("calendar");
	var students;
	var difficultyList;
	classes.find({className:class_},{"students":1, _id:0},function(err,docs){ //get list of students in the class
		console.log(docs[0].students);
		students = docs[0].students;

		classes.find({className:"judaics 101"},{"difficultyList":1, _id:0},function(err,docs){ //get the difficulty chart of assignment types
			console.log(docs[0].difficultyList);
			difficultyList = docs[0].difficultyList;

			getClasses = function(student,isLast,endCallBack){ //add the list of classes of each student in the class to a master list
				if (!isLast){ //keep looping for all of the students until the last one
					users.find({"name":student},{"classes":1, _id:0},function(err,docs){
						console.log(docs[0].classes);
						studentClasses = studentClasses.concat(docs[0].classes);
					});
				}

				else{ //when it reaches the last student, run a function called addingUpAssignments to generate the rank point of the day
					users.find({"name":student},{"classes":1, _id:0},endCallBack);
				}
				
			};


			var studentClasses = [];
			var ranking = 0;

			console.log(studentClasses);
			for (i=0; i<students.length-1; i++){ //the actual loop to go through all except the last student's classes
				getClasses(students[i],false,addingUpAssignments);
			}
			
			getAssignmentRanking = function(i,isLast){ //cycles through the class master list (with repeats) to generate the rank points of the day
				//if it isn't the last class in the list, it will find the assignment difficulty of the class and add it to the ranking count
				calendar.find({class:i},{"assignment":1,"_id":0},function(err,docs){
					console.log("assignment: "+docs[0].assignment);
					var difficulty = difficultyList[docs[0].assignment];
					console.log("diff: "+difficulty);
					ranking += difficulty
					console.log("ranking: "+ranking);
					if (isLast){ //if it is the last class, push the ranking to the rankings list and then recursively call the getDayRank on the next date
						ranks = ranks.push(ranking);
						console.log("ranks: "+ranks);
						//getDayRank(db, school, class_, date)
					}
					
				});
				
			};
			var addingUpAssignments = function(err,docs){
				console.log(docs[0].classes);
				studentClasses = studentClasses.concat(docs[0].classes);
				console.log("THE FINAL LIST: "+studentClasses);

				
				for (i=0; i<studentClasses.length-1; i++){
					console.log("studentClasses[i]: "+studentClasses[i]);
					getAssignmentRanking(studentClasses[i],false);
				}

				getAssignmentRanking(studentClasses[studentClasses.length-1],true);

			};
			getClasses(students[students.length-1],true,addingUpAssignments);
		});
	});

}

getDayRank(db, "school", "judaics 101", "date");




