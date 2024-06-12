document.addEventListener("DOMContentLoaded", showNote);

let noteForm = document.getElementById("notesForm");

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let discription = document.getElementById("discription").value;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({
        noteTitle: title,
        noteDiscription: discription,
        isPinned: false
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    noteForm.reset();
    showNote();
});

function showNote() {
    let notes = JSON.parse(localStorage.getItem("notes"))
    notes.forEach((item) => {
        document.getElementById("noteTitle").innerHTML += item.noteTitle;
        document.getElementById("noteDiscription").innerHTML += item.noteDiscription;
    });
}