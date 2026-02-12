import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../../services/api';
import './StudentsView.css';

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.reg_no && student.reg_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.department && student.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="students-view">
      <div className="students-header">
        <h2>All Students ({students.length})</h2>
        <input
          type="text"
          placeholder="Search by name, email, reg no, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Year</th>
                <th>CGPA</th>
                <th>Timing</th>
                <th>Venue Details</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student._id}>
                  <td>{student.reg_no || 'N/A'}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone || 'N/A'}</td>
                  <td>{student.department || 'N/A'}</td>
                  <td>{student.year || 'N/A'}</td>
                  <td>{student.cgpa || 'N/A'}</td>
                  <td>{student.timing || 'N/A'}</td>
                  <td>{student.venue_details || 'N/A'}</td>
                  <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsView;
