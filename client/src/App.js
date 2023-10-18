import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5005/students')
      .then((response) => setStudents(response.data.students))
      .catch((error) => console.error(error));
  }, []);

  const addStudent = () => {
    axios.post('http://localhost:5005/students', { name, rollNumber })
      .then((response) => {
        setStudents([...students, { id: response.data.studentId, name, roll_number: rollNumber }]);
        setName('');
        setRollNumber('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Student Database</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Roll Number: {student.roll_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
