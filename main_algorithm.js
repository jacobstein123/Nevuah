var mongojs = require("mongojs");
var db = mongojs("Nevuah");

function findBestDay(db, school, class_, type, startDate, endDate){
	//db.classes.class.student_list
	//db.classes.class.credits
	//db.classes.class.difficulty_chart
}



var classes = db.collection("classes");
var users = db.collection("user");
var calendar = db.collection("calendar");
var students;
var difficultyList;
classes.find({className:"judaics 101"},{"students":1, _id:0},function(err,docs){
	console.log(docs[0].students);
	students = docs[0].students;

	classes.find({className:"judaics 101"},{"difficultyList":1, _id:0},function(err,docs){
		console.log(docs[0].difficultyList);
		difficultyList = docs[0].difficultyList;

		getClasses = function(student,isLast,endCallBack){
			if (!isLast){
				users.find({"name":student},{"classes":1, _id:0},function(err,docs){
					console.log(docs[0].classes);
					studentClasses.push(docs[0].classes);
					//console.log("hello: "+studentClasses);
					//return docs[0].classes;
				});
			}

			else{
				users.find({"name":student},{"classes":1, _id:0},endCallBack);
			}
			
		};


		var studentClasses = [];
		var ranking = 0;

		console.log(studentClasses);
		for (i=0; i<students.length-1; i++){
			getClasses(students[i],false,addingUpAssignments);
		}
		
		getAssignmentRanking = function(i,isLast){
			if (!isLast){ //WARNING: DOESN"T TAKE CLASS INTO ACCOUNT, JUST CYCLES
				calendar.find({},function(err,docs){
					console.log("assignment: "+docs[i].assignment);
					var difficulty = difficultyList[docs[i].assignment];
					console.log("diff: "+difficulty);
					ranking += difficulty
					console.log("ranking: "+ranking);
					
				});
			}
			
		};
		var addingUpAssignments = function(err,docs){
			console.log(docs[0].classes);
			studentClasses.push(docs[0].classes);
			console.log("THE FINAL LIST: "+studentClasses);

			
			for (i=0; i<studentClasses.length-1; i++){
				getAssignmentRanking(i,false);
			}

			getAssignmentRanking(studentClasses.length-1,true);

		};
		getClasses(students[students.length-1],true,addingUpAssignments);
	});
});



