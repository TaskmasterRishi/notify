document.addEventListener("DOMContentLoaded", showNote);

let noteForm = document.getElementById("notesForm");
let editMode = false;

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
    if (editMode) {
        let editIndex = localStorage.getItem("editIndex");
        notes[editIndex] = {
            noteTitle: title,
            noteDescription: description,
            isPinned: false
        };
        localStorage.removeItem("editIndex");
        editMode = false;
        document.getElementById("submitButton").innerText = "Add Note";
    } else {
        notes.push({
            noteTitle: title,
            noteDescription: description,
            isPinned: false
        });
    }
    
    localStorage.setItem("notes", JSON.stringify(notes));
    noteForm.reset();
    showNote();
});

function showNote() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesContainer = document.getElementById("showNotes");
    notesContainer.innerHTML = "";
    toggleHeading(notes.length);
    
    notes.forEach((item, index) => {
        notesContainer.innerHTML += `
            <div class="note">
                <ul class="noteBar">
                    <li><i class="fa-regular fa-thumbtack icon pin"></i></li>
                    <li><i class="fa-regular fa-pen-to-square icon edit" onclick="editNote(${index}, true)"></i></li>
                    <li><i class="fa-regular fa-trash icon delete" onclick="deleteNote(${index})"></i></li>
                </ul>
                <h2 class="noteTitle">${item.noteTitle}</h2>
                <p class="noteDescription">${item.noteDescription.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    });
}

function editNote(index, isEditMode) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let note = notes[index];
    document.getElementById("title").value = note.noteTitle;
    document.getElementById("description").value = note.noteDescription;
    if (isEditMode) {
        editMode = true;
        document.getElementById("submitButton").innerText = "Update Note";
        localStorage.setItem("editIndex", index);
    }
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); 
    localStorage.setItem("notes", JSON.stringify(notes)); 
    showNote();
}

function toggleHeading(noteCount) {
    let contentId = document.getElementById("heading");
    contentId.style.display = noteCount > 0 ? "block" : "none";
}
