document.addEventListener("DOMContentLoaded", showNote);

let noteForm = document.getElementById("notesForm");

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({
        noteTitle: title,
        noteDescription: description,
        isPinned: false
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    noteForm.reset();
    showNote();
});

function showNote() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesContainer = document.getElementById("showNotes");
    notesContainer.innerHTML = "";

    notes.forEach((item) => {
        notesContainer.innerHTML += `
            <div class="note" id="note">
                <h2 id="noteTitle" class="noteTitle">${item.noteTitle}</h2>
                <p id="noteDescription" class="noteDescription">${item.noteDescription.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    });
}
