import React, { useState, useEffect } from 'react';
import ContactList from './ContactList.js';
import ContactForm from './ContactForm.js';
import axios from 'axios';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/contact-api/get_contacts.php')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the contacts!", error);
      });
  }, []);

  const addOrUpdateContact = (contact) => {
    console.log("Submitting contact: ", contact);
    if (contact.id) {
      axios.post('http://localhost/contact-api/update_contact.php', contact)
        .then(response => {
          console.log("Update response: ", response.data);
          if (response.data.success) {
            setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error("There was an error updating the contact!", error);
        });
    } else {
      axios.post('http://localhost/contact-api/add_contact.php', contact)
        .then(response => {
          console.log("Add response: ", response.data);
          if (response.data.success) {
            setContacts([...contacts, { ...contact, id: response.data.id }]);
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error("There was an error adding the contact!", error);
        });
    }
    setSelectedContact(null);
    setShowForm(false);
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
    setShowForm(true);
  };

  const deleteContact = (id) => {
    axios.post('http://localhost/contact-api/delete_contact.php', { id })
      .then(response => {
        if (response.data.success) {
          setContacts(contacts.filter(contact => contact.id !== id));
        }
      })
      .catch(error => {
        console.error("There was an error deleting the contact!", error);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedContact(null);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Contact Management System</h1>
      </div>
      <button className="contacts-button" onClick={toggleForm}>
        {showForm ? 'Close Form' : 'Add Contact'}
      </button>
      {showForm && (
        <ContactForm
          onSave={addOrUpdateContact}
          selectedContact={selectedContact}
        />
      )}
      <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
    </div>
  );
};

export default App;
