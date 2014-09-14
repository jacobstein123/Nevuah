var mongojs = require("mongojs");
var db = mongojs("Nevuah");

function findBestDay(db, school, class_, type, startDate, endDate){
	//db.classes.class.student_list
	//db.classes.class.credits
	//db.classes.class.difficulty_chart
}



var classes = db.collection("classes");
var users = db.collection("user");
var students;
var difficultyList;
classes.find({className:"judaics 101"},{"students":1, _id:0},function(err,docs){
	console.log(docs[0].students);
	students = docs[0].students;

	classes.find({className:"judaics 101"},{"difficultyList":1, _id:0},function(err,docs){
		console.log(docs[0].difficultyList);
		difficultyList = docs[0].difficultyList;

		getClasses = function(student,isLast){
			if (!isLast){
				users.find({"name":student},{"classes":1, _id:0},function(err,docs){
					console.log(docs[0].classes);
					studentClasses.push(docs[0].classes);
					//console.log("hello: "+studentClasses);
					//return docs[0].classes;
				});
			}

			else{
				users.find({"name":student},{"classes":1, _id:0},function(err,docs){
					console.log(docs[0].classes);
					studentClasses.push(docs[0].classes);
					console.log("THE FINAL LIST: "+studentClasses);
				});
			}
			
		};


		var studentClasses = [];
		

		console.log(studentClasses);
		for (i=0; i<students.length-1; i++){
			getClasses(students[i],false);
		}
		getClasses(students[students.length-1],true);

		
	});
});



