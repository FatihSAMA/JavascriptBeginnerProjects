
function Course(title, instructor, image){

    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;


}

function UI(){

}

UI.prototype.addCourseToList = (course) => {
    const list = document.getElementById("course-list");

    let html = `
        <tr>
            <td><img src="${course.image}" class="table-img" /></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;

    list.innerHTML += html;

}

UI.prototype.clearControls = () => {
    const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
}

UI.prototype.deleteCourse = (target) => {
    target.parentElement.parentElement.remove(); 
}

UI.prototype.showAlert = (msg, className) => {
    
    let alert =  `
        <div class= "alert alert-${className}">
            ${msg}
        </div>
    `;

    const row = document.querySelector(".row");
    row.insertAdjacentHTML("afterBegin", alert);

    setTimeout(()=>{
        document.querySelector(".alert").remove();
    }, 3000);

}



class Storage{

    //statik olduğu için obje oluşturulup çağırılamaz
    static getCourses(){
        let courses;

        if(localStorage.getItem("courses") === null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem("courses"));
        }


        return courses;
    }

    static displayCourses(){
        const courses = Storage.getCourses();
        
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });


    }

    static addCourse(course){
        const courses = Storage.getCourses();

        courses.push(course);

        localStorage.setItem("courses", JSON.stringify(courses));


    }

    static deleteCourse(element){
        
        const id = element.getAttribute("data-id");
        const courses = Storage.getCourses();


        courses.forEach( (course, index) => {
            
            if(course.courseId == id){
                courses.splice(index, 1);
            }

        });

        localStorage.setItem("courses", JSON.stringify(courses));


    }


}


document.addEventListener("DOMContentLoaded", Storage.displayCourses);





document.getElementById("new-course").addEventListener("submit",
function(e){
    
    e.preventDefault();

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;


    
    const course = new Course(title, instructor, image);
    // console.log(course);

    const ui = new UI();

    if(title === "" || instructor === "" || image === ""){
        ui.showAlert("Please complate the form", "warning");


    }
    else{

        ui.addCourseToList(course);

        Storage.addCourse(course);

        ui.clearControls(course);
        ui.showAlert("the course has been added." , "success")

    }


    
    

});



document.getElementById('course-list').addEventListener("click",function(e){

    const ui = new UI();
    

    if(e.target.classList.contains("delete")){
        
        ui.deleteCourse(e.target);

        Storage.deleteCourse(e.target);

        ui.showAlert("the course has been deleted.", "danger");

    }

});
