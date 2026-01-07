const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const errorMsg = document.getElementById("errorMsg");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display Notes on Page Load
displayNotes();

// Add Note
addNoteBtn.addEventListener("click", () => {
    const text = noteText.value.trim();

    if (text === "") {
        errorMsg.textContent = "⚠️ Note cannot be empty!";
        return;
    }

    errorMsg.textContent = "";

    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteText.value = "";
    displayNotes();
});

// Display Notes Function
function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <p>${note}</p>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;

        notesContainer.appendChild(noteCard);
    });
}

// Delete Note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Edit Note
function editNote(index) {
    const updatedNote = prompt("Edit your note:", notes[index]);

    if (updatedNote === null) return;

    if (updatedNote.trim() === "") {
        alert("Note cannot be empty!");
        return;
    }

    notes[index] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
