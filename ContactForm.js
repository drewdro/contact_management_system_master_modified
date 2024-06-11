import React, { useState, useEffect } from 'react';

//Note: wala pa database (Sqlite3 or depende) so needed pa change or add... ito kasi for testing lang 
const ContactForm = ({ onSave, selectedContact }) => {
  const [contact, setContact] = useState({ name: '', age: '', address: '', email: '' });

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
    setContact({name: '', age: '', address: '', email: ''});
  };
  
  return (
    <div>
      <h2>{selectedContact ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='information'>Name</label>
          <input
            className='box'
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='information'>Age</label>
          <input
            className='box'
            type="text"
            name="age"
            value={contact.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='information'>Address</label>
          <input
            className='box'
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='information'>Email</label>
          <input 
            className='box'
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className='submit' type="submit">Save</button>
      </form>
      <div className='contact-border'></div>
    </div>
  );
};

export default ContactForm;
