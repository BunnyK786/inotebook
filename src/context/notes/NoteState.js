import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
const host = "http://localhost:5000";
// const notesInitial = []
// const [notes, setNotes] = useState(notesInitial);

const [notes, setNotes] = useState([]);


  //GET all Note
  const getNotes=async () => {
    //TODO: API Call
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        }
      });
const json  = await response.json()

setNotes(json)

    }
  //Add a Note
  // const addNote =async (title, description, tag) => {
  //   //TODO: API Call
  //   //API call
  //   const response = await fetch(`${host}/api/notes/addnote`, {
  //       method: "POST",
  
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token":
  //         localStorage.getItem('token'),
  //       },
  //       body: JSON.stringify(title, description, tag),
  //     });
     

  //     const json =await response.json()
  //   console.log(json);
  //   const note = await response.json();
  //   setNotes(notes.concat(note));
  // };


  const addNote = async (title, description, tag) => {
    //TODO: API Call
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // Send an object with properties
    });
  
    const data = await response.json(); // Parse the response JSON
    console.log(data); // Log the response from the server
  
    // Check if the response is successful before updating state
    if (response.ok) {
      setNotes([...notes, data]); // Update state with the new note
    } else {
      console.error("Failed to add note:", data.error); // Log the error message from the server
    }
  };
  



  // //Delete a Note
  const deleteNote = async(id) => {
    //TODO: API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      });
      const json = response.json();
      console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editdNote = async (id, title, description, tag) => {
    //TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json =await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editdNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// ,deleteNote,editdNote


//corrected code 
// import NoteContext from "./noteContext";
// import React, { useState } from "react";

// const NoteState = (props) => {
//   const host = "http://localhost:5000";
//   const notesInitial = [];
//   const [notes, setNotes] = useState(notesInitial);

//   // GET all Note
//   const getNotes = async () => {
//     try {
//       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       });
//       const json = await response.json();
//       setNotes(json);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     try {
//       const response = await fetch(`${host}/api/notes/addnote`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ title, description, tag }), // Corrected the body format
//       });

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         setNotes([...notes, json.note]); // Assuming the response contains the new note object
//       } else {
//         console.error("Failed to add note:", json.error);
//       }
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };

//   // Delete a Note
//   const deleteNote = async (id) => {
//     try {
//       await fetch(`${host}/api/notes/deletenote/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       });

//       const newNotes = notes.filter((note) => note._id !== id);
//       setNotes(newNotes);
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     try {
//       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ title, description, tag }),
//       });

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         const updatedNotes = notes.map((note) =>
//           note._id === id ? { ...note, title, description, tag } : note
//         );
//         setNotes(updatedNotes);
//       } else {
//         console.error("Failed to edit note:", json.error);
//       }
//     } catch (error) {
//       console.error("Error editing note:", error);
//     }
//   };

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;
