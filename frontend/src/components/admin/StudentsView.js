import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../../services/api';
import './StudentsView.css';

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [cgpaFilter, setCgpaFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.reg_no && student.reg_no.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDept = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'all' || student.year === parseInt(yearFilter);
    const matchesCgpa = cgpaFilter === 'all' || 
      (cgpaFilter === '9+' && student.cgpa >= 9) ||
      (cgpaFilter === '8-9' && student.cgpa >= 8 && student.cgpa < 9) ||
      (cgpaFilter === '7-8' && student.cgpa >= 7 && student.cgpa < 8) ||
      (cgpaFilter === '<7' && student.cgpa < 7);
    
    return matchesSearch && matchesDept && matchesYear && matchesCgpa;
  });

  const departments = [...new Set(students.map(s => s.department).filter(Boolean))];
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const getStatusBadge = (cgpa) => {
    if (cgpa >= 9) return <span className="status-badge excellent">Excellent</span>;
    if (cgpa >= 8) return <span className="status-badge good">Good</span>;
    if (cgpa >= 7) return <span className="status-badge average">Average</span>;
    return <span className="status-badge below">Below Avg</span>;
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="students-view">
      <div className="filters-section">
        <input
          type="text"
          placeholder="🔍 Search by name, email, or reg no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="filter-select">
          <option value="all">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
        
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="filter-select">
          <option value="all">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        
        <select value={cgpaFilter} onChange={(e) => setCgpaFilter(e.target.value)} className="filter-select">
          <option value="all">All CGPA</option>
          <option value="9+">9.0+</option>
          <option value="8-9">8.0 - 9.0</option>
          <option value="7-8">7.0 - 8.0</option>
          <option value="<7">&lt; 7.0</option>
        </select>
      </div>

      <div className="results-info">
        Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
      </div>

      {currentStudents.length === 0 ? (
        <p className="no-data">No students found</p>
      ) : (
        <>
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>CGPA</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map(student => (
                  <tr key={student._id}>
                    <td><strong>{student.reg_no || 'N/A'}</strong></td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td><span className="dept-badge">{student.department || 'N/A'}</span></td>
                    <td>{student.year || 'N/A'}</td>
                    <td><strong>{student.cgpa || 'N/A'}</strong></td>
                    <td>{getStatusBadge(student.cgpa)}</td>
                    <td>
                      <button className="action-btn view" title="View Profile">👁️</button>
                      <button className="action-btn edit" title="Edit">✏️</button>
                      <button className="action-btn delete" title="Delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentsView;
