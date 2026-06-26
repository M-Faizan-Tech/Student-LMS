// =====================================
// Student & Library Management System
// Part 1
// =====================================

// Arrays
let students = JSON.parse(localStorage.getItem("students")) || [];
let books = JSON.parse(localStorage.getItem("books")) || [];

// ===============================
// Save Data
// ===============================

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// ===============================
// Grade Calculation
// ===============================

function calculateGrade(percent) {

    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B";
    if (percent >= 60) return "C";
    if (percent >= 50) return "D";

    return "Fail";
}

// ===============================
// Attendance Status
// ===============================

function attendanceStatus(attendance) {

    if (attendance >= 75)
        return "Eligible";

    return "Not Eligible";
}

// ===============================
// Add Student
// ===============================

document
.getElementById("studentForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let english =
    Number(document.getElementById("english").value);

    let math =
    Number(document.getElementById("math").value);

    let computer =
    Number(document.getElementById("computer").value);

    let physics =
    Number(document.getElementById("physics").value);

    let total =
    english + math + computer + physics;

    let percentage =
    total / 400 * 100;

    let student = {

        name:
        document.getElementById("name").value,

        roll:
        Number(document.getElementById("roll").value),

        age:
        Number(document.getElementById("age").value),

        department:
        document.getElementById("department").value,

        attendance:
        Number(document.getElementById("attendance").value),

        english,
        math,
        computer,
        physics,

        percentage,

        grade:
        calculateGrade(percentage),

        status:
        attendanceStatus(
            Number(document.getElementById("attendance").value)
        )

    };

    students.push(student);

    saveStudents();

    displayStudents();

    updateTopper();

    this.reset();

});

// ===============================
// Display Students
// ===============================

function displayStudents(){

    let table =
    document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student,index){

        table.innerHTML += `

<tr>

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${student.age}</td>

<td>${student.department}</td>

<td>${student.attendance}%</td>

<td>${student.grade}</td>

<td>${student.percentage.toFixed(2)}%</td>

<td>

<button
class="action-btn edit-btn"
onclick="editStudent(${index})">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteStudent(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ===============================
// Delete Student
// ===============================

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        saveStudents();

        displayStudents();

        updateTopper();

    }

}

// ===============================
// Load Existing Data
// ===============================

displayStudents();
// =====================================
// Search Student
// =====================================

function searchStudent() {

    let roll = Number(document.getElementById("searchRoll").value);

    let result = document.getElementById("studentResult");

    let student = students.find(s => s.roll === roll);

    if (student) {

        result.innerHTML = `
        <h3>Student Found</h3>

        <p><strong>Name:</strong> ${student.name}</p>

        <p><strong>Roll No:</strong> ${student.roll}</p>

        <p><strong>Department:</strong> ${student.department}</p>

        <p><strong>Attendance:</strong> ${student.attendance}%</p>

        <p><strong>Grade:</strong> ${student.grade}</p>

        <p><strong>Percentage:</strong> ${student.percentage.toFixed(2)}%</p>

        <p><strong>Status:</strong> ${student.status}</p>
        `;

    } else {

        result.innerHTML =
        "<h3 style='color:red'>Student Not Found</h3>";

    }

}

// =====================================
// Edit Student
// =====================================

function editStudent(index){

    let s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("roll").value = s.roll;
    document.getElementById("age").value = s.age;
    document.getElementById("department").value = s.department;
    document.getElementById("attendance").value = s.attendance;

    document.getElementById("english").value = s.english;
    document.getElementById("math").value = s.math;
    document.getElementById("computer").value = s.computer;
    document.getElementById("physics").value = s.physics;

    students.splice(index,1);

    saveStudents();

    displayStudents();

}

// =====================================
// Topper
// =====================================

function updateTopper(){

    if(students.length===0){

        document.getElementById("topperCard").innerHTML =
        "No Student Added";

        return;
    }

    let topper = students[0];

    students.forEach(student=>{

        if(student.percentage > topper.percentage){

            topper = student;

        }

    });

    document.getElementById("topperCard").innerHTML=`

    <h2>${topper.name}</h2>

    <p>Roll No : ${topper.roll}</p>

    <p>Percentage : ${topper.percentage.toFixed(2)}%</p>

    <p>Grade : ${topper.grade}</p>

    `;

}

updateTopper();

// =====================================
// Add Book
// =====================================

document.getElementById("bookForm")
.addEventListener("submit",function(e){

e.preventDefault();

let book={

id:Number(document.getElementById("bookID").value),

title:document.getElementById("title").value,

author:document.getElementById("author").value,

category:document.getElementById("category").value,

isbn:document.getElementById("isbn").value

};

books.push(book);

saveBooks();

displayBooks();

this.reset();

});

// =====================================
// Display Books
// =====================================

function displayBooks(){

let table=document.getElementById("bookTable");

table.innerHTML="";

books.forEach(function(book,index){

table.innerHTML+=`

<tr>

<td>${book.id}</td>

<td>${book.title}</td>

<td>${book.author}</td>

<td>${book.category}</td>

<td>${book.isbn}</td>

<td>

<button
class="action-btn edit-btn"
onclick="editBook(${index})">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteBook(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

displayBooks();
// =====================================
// Search Book
// =====================================

function searchBook() {

    let id = Number(document.getElementById("searchBook").value);

    let result = document.getElementById("bookResult");

    let book = books.find(b => b.id === id);

    if (book) {

        result.innerHTML = `
            <h3>Book Found</h3>

            <p><strong>Book ID:</strong> ${book.id}</p>
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
        `;

    } else {

        result.innerHTML =
        "<h3 style='color:red;'>Book Not Found</h3>";

    }

}

// =====================================
// Edit Book
// =====================================

function editBook(index){

    let b = books[index];

    document.getElementById("bookID").value = b.id;
    document.getElementById("title").value = b.title;
    document.getElementById("author").value = b.author;
    document.getElementById("category").value = b.category;
    document.getElementById("isbn").value = b.isbn;

    books.splice(index,1);

    saveBooks();

    displayBooks();

}

// =====================================
// Delete Book
// =====================================

function deleteBook(index){

    if(confirm("Delete this book?")){

        books.splice(index,1);

        saveBooks();

        displayBooks();

    }

}

// =====================================
// Prevent Duplicate Student Roll Number
// =====================================

function studentExists(roll){

    return students.some(student => student.roll === roll);

}

// =====================================
// Prevent Duplicate Book ID
// =====================================

function bookExists(id){

    return books.some(book => book.id === id);

}

// =====================================
// Refresh Data
// =====================================

displayStudents();
displayBooks();
updateTopper();

// =====================================
// Welcome Message
// =====================================

console.log("Student & Library Management System Loaded Successfully!");
