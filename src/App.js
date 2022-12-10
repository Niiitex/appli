import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import '@aws-amplify/ui-react/styles.css';

const initialFormState = { name: ''}

function App() {
  const { signOut } = useAuthenticator();
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
      if (!e.target.files[0]) return
      const file = e.target.files[0];
      setFormData({ ...formData, image: file.name });
      await Storage.put(file.name, file);
      fetchNotes();
    }
    
  async function fetchNotes() {
      const apiData = await API.graphql({ query: listNotes });
      const notesFromAPI = apiData.data.listNotes.items;
      await Promise.all(notesFromAPI.map(async note => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      }))
      setNotes(apiData.data.listNotes.items);
    }

  async function createNote() {
      if (!formData.name) return;
      await API.graphql({ query: createNoteMutation, variables: { input: formData } });
      if (formData.image) {
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setNotes([ ...notes, formData ]);
      setFormData(initialFormState);
    }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    fetchNotes();
  }

  return (
    <div className="App">
      <h1>Mes Notes</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Nom du fichier"
        value={formData.name}
      />
      <input
          type="file"
          onChange={onChange}
        />
      <button onClick={createNote}>Publier le fichier</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              {
               note.image && <img src={'https://www.icone-png.com/png/54/54079.png'} style={{width: 50}} />
              }
              <div><a href={note.image}>Télécharger</a></div>
              <div><button onClick={() => deleteNote(note)}>Supprimer</button></div>
            </div>
          ))
        }
      </div>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
}

export default withAuthenticator(App, true);