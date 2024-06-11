import React from 'react';

const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>AGE</th>
            <th>ADDRESS</th>
            <th>EMAIL ADDRESS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.age}</td>
              <td>{contact.address}</td>
              <td>{contact.email}</td>
              <td>
                <button className='edit' onClick={() => onEdit(contact)}>Edit</button>
                <button className='delete' onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
