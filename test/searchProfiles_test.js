//Testing the functionality of the search bar logic 

//Search by First Name
function searchByFirstName() {
    const search_text = 'a';
    let listOfFirstNames = [ 'Adam', 'Adelyn', 'Evan', 'Aidan'];

    let results = [];
    for(var name in listOfFirstNames){
        let profile = listOfFirstNames[name];
        let testName = listOfFirstNames[name].substring(0, search_text.length);
        testName = testName.toLowerCase();
        if(testName.includes(search_text.toLowerCase())){
            results.push(profile);
        }
    }
    let expected = [ 'Adam', 'Adelyn', 'Aidan' ];
    console.log('\n Search by name...');
    console.log("Expected Results: " + expected);
    console.log("Actual Results: " + results);   
    //console.log(results === expected);
}

function searchByMajor(){
    const search_text = 'Computer';
    let listOfMajors = ['Computer Science', 'Nursing', 'Biology', 'Sociology', 'Science'];
    let results = [];
    for(var major in listOfMajors){
        let profile = listOfMajors[major];
        let testMajor = profile.substring(0, search_text.length);
        testMajor = testMajor.toLowerCase();
        if(testMajor.includes(search_text.toLowerCase())){
            results.push(profile);
        }
    }
    let expected = ['Computer Science'];
    console.log('\n Search by major...');
    console.log("Expected Results: " + expected);
    console.log("Actual Results: " + results);   
    //console.log(results === expected);
}


function searchByCourseID(){
    const search_text = 'MTH';
    let listOfCourseIds = ['CS', 'BIO', 'NRS', 'MTH'];
    let results = [];
    for(var courseId in listOfCourseIds){
        let course = listOfCourseIds[courseId];

        if(course.toLowerCase() == search_text.toLowerCase()){
            results.push(course);
        }
    }
    let expected = ['MTH'];
    console.log('\n Search by courseId...');
    console.log("Expected Results: " + expected);
    console.log("Actual Results: " + results);   
    //console.log(results === expected);
}

function searchByCourseNumber(){
    const search_text = '301';
    let listOfCourses = ['CS 301', 'CS 201', 'MTH 101', 'MTH 301'];
    let results = [];

    for(var course in listOfCourses){
        let testCourse = listOfCourses[course];

         //combo of the two above... ex: CS301 or CS 301
         if(testCourse.toLowerCase().includes(search_text)){
            results.push(testCourse);
        }
    }
    let expected = ['CS 301', 'MTH 301'];
    console.log('\n Search by course number...');
    console.log("Expected Results: " + expected);
    console.log("Actual Results: " + results);   
    //console.log(results === expected);
}

searchByFirstName();
searchByMajor();
searchByCourseID();
searchByCourseNumber();
