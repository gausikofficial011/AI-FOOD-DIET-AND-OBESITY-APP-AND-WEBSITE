import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Tabs, Tab, Table, Badge, Alert } from 'react-bootstrap';
import { FaChartLine, FaDownload, FaShareAlt, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await api.post('/reports/weekly', {
        startDate: startDate.toISOString().split('T')[0]
      });
      setReports([response.data, ...reports]);
      setSelectedReport(response.data);
      toast.success('Report generated!');
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col><h2>Nutrition Reports</h2></Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header><h5>Generate Report</h5></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <DatePicker selected={startDate} onChange={setStartDate} className="form-control" />
              </Form.Group>
              <Button variant="primary" onClick={generateReport} disabled={loading} className="w-100">
                {loading ? 'Generating...' : <><FaChartLine className="me-2" />Generate Weekly Report</>}
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header><h5>Recent Reports</h5></Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {reports.length > 0 ? reports.map(report => (
                <Card key={report._id} className={`mb-2 cursor-pointer ${selectedReport?._id === report._id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedReport(report)}>
                  <Card.Body className="py-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-0">Weekly Report</h6>
                        <small className="text-muted">{new Date(report.startDate).toLocaleDateString()}</small>
                      </div>
                      <Badge bg="info">{report.summary.daysTracked} days</Badge>
                    </div>
                  </Card.Body>
                </Card>
              )) : <p className="text-muted text-center">No reports</p>}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          {selectedReport ? (
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between">
                <div>
                  <h5 className="mb-0">Weekly Report</h5>
                  <small>{new Date(selectedReport.startDate).toLocaleDateString()} - {new Date(selectedReport.endDate).toLocaleDateString()}</small>
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2"><FaFilePdf className="me-1" />PDF</Button>
                  <Button variant="outline-success" size="sm" className="me-2"><FaFileExcel className="me-1" />Excel</Button>
                  <Button variant="outline-info" size="sm"><FaShareAlt className="me-1" />Share</Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-4">
                  {['Total Calories', 'Avg Daily', 'Meals', 'Water'].map((title, i) => (
                    <Col md={3} key={i}>
                      <Card className="text-center">
                        <Card.Body>
                          <h3>{[selectedReport.summary.totalCalories?.toLocaleString(), 
                               Math.round(selectedReport.summary.averageCalories),
                               selectedReport.summary.mealsLogged,
                               Math.round(selectedReport.summary.waterIntake)][i]}</h3>
                          <p className="text-muted mb-0">{title}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row className="mb-4">
                  <Col md={6}>
                    <h6>Daily Calorie Intake</h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={selectedReport.chartData || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col md={6}>
                    <h6>Macronutrient Distribution</h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={[
                          { name: 'Protein', value: selectedReport.summary.totalProtein },
                          { name: 'Carbs', value: selectedReport.summary.totalCarbs },
                          { name: 'Fat', value: selectedReport.summary.totalFat }
                        ]} cx="50%" cy="50%" outerRadius={80} label>
                          {[selectedReport.summary.totalProtein, selectedReport.summary.totalCarbs, selectedReport.summary.totalFat].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
                <Table responsive striped>
                  <thead><tr><th>Metric</th><th>Total</th><th>Average</th><th>vs Target</th></tr></thead>
                  <tbody>
                    <tr><td>Calories</td><td>{selectedReport.summary.totalCalories?.toLocaleString()}</td>
                      <td>{Math.round(selectedReport.summary.averageCalories)}</td>
                      <td><Badge bg={selectedReport.summary.averageCalories > user.dailyTargets.calories ? 'danger' : 'success'}>
                        {selectedReport.summary.averageCalories > user.dailyTargets.calories ? 'Above' : 'Below'}
                      </Badge></td></tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <Card><Card.Body className="text-center py-5">
              <FaChartLine size={48} className="text-muted mb-3" />
              <h4>Select a Report</h4>
              <p className="text-muted">Choose from the list or generate a new report</p>
            </Card.Body></Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;