import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Badge } from 'react-bootstrap';
import { FaFileExport, FaFileImport, FaFilePdf, FaFileExcel, FaFileCsv, FaFileCode, FaDownload, FaUpload } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import api from '../services/api';
import { toast } from 'react-toastify';

const ExportData = () => {
  const [exportFormat, setExportFormat] = useState('excel');
  const [importFormat, setImportFormat] = useState('json');
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // const handleExport = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await api.post('/export/export', {
  //       format: exportFormat,
  //       startDate: format(startDate, 'yyyy-MM-dd'),
  //       endDate: format(endDate, 'yyyy-MM-dd')
  //     }, { responseType: 'blob' });
      
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `nutrition-data.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`);
  //     link.click();
  //     toast.success('Exported!');
  //   } catch (error) {
  //     toast.error('Export failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleExport = async () => {
  setLoading(true);
  try {
    const response = await api.post('/export/export', {
      format: exportFormat,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    }, { 
      responseType: 'blob',
      timeout: 60000 // 60 seconds timeout for large exports
    });
    
    // Determine file extension based on format
    const extensions = {
      excel: 'xlsx',
      pdf: 'pdf',
      csv: 'csv',
      json: 'json'
    };
    
    const extension = extensions[exportFormat] || 'xlsx';
    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
    
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nutrition-data-${timestamp}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    // Log export in history
    const newHistory = {
      date: new Date(),
      format: exportFormat,
      period: `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`,
      records: 0, // You can calculate this from response if needed
      status: 'Completed'
    };
    
    toast.success(`Data exported successfully! File: nutrition-data-${timestamp}.${extension}`);
    
  } catch (error) {
    console.error('Export error:', error);
    if (error.code === 'ECONNABORTED') {
      toast.error('Export timed out. Try a smaller date range.');
    } else {
      toast.error(`Export failed: ${error.response?.data?.message || error.message}`);
    }
  } finally {
    setLoading(false);
  }
};
  const exportOptions = [
    { value: 'excel', label: 'Excel', icon: <FaFileExcel />, color: 'success' },
    // { value: 'pdf', label: 'PDF', icon: <FaFilePdf />, color: 'danger' },
    // { value: 'csv', label: 'CSV', icon: <FaFileCsv />, color: 'info' },
    // { value: 'json', label: 'JSON', icon: <FaFileCode />, color: 'warning' }
  ];

  return (
    <Container>
      <Row className="mb-4"><Col><h2>Export Data</h2></Col></Row>
      <Row>
        <Col lg={12}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5><FaFileExport className="me-2" />Export Data</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Row>
                  <Col><DatePicker selected={startDate} onChange={setStartDate} className="form-control mb-2" /></Col>
                  <Col><DatePicker selected={endDate} onChange={setEndDate} className="form-control" /></Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Format</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {exportOptions.map(opt => (
                    <Button key={opt.value} variant={exportFormat === opt.value ? opt.color : `outline-${opt.color}`}
                      onClick={() => setExportFormat(opt.value)} className="d-flex align-items-center">
                      {opt.icon}<span className="ms-2">{opt.label}</span>
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Alert variant="info">
                <strong>Includes:</strong> BMI info,Meals, nutrition info,summaries
              </Alert>
              <Button variant="primary" onClick={handleExport} disabled={loading} className="w-100">
                {loading ? 'Exporting...' : <><FaDownload className="me-2" />Export Data</>}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col lg={6}>
          <Card className="mb-4">
            <Card.Header className="bg-success text-white">
              <h5><FaFileImport className="me-2" />Import Data</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Import Format</Form.Label>
                <div className="d-flex gap-2">
                  <Button variant={importFormat === 'json' ? 'success' : 'outline-success'}
                    onClick={() => setImportFormat('json')}><FaFileCode className="me-2" />JSON</Button>
                  <Button variant={importFormat === 'csv' ? 'success' : 'outline-success'}
                    onClick={() => setImportFormat('csv')}><FaFileCsv className="me-2" />CSV</Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select File</Form.Label>
                <Form.Control type="file" accept={importFormat === 'json' ? '.json' : '.csv'} />
              </Form.Group>
              <Alert variant="warning">
                <strong>Note:</strong> Backup data before importing
              </Alert>
              <Button variant="success" className="w-100"><FaUpload className="me-2" />Import Data</Button>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header><h5>Export History</h5></Card.Header>
            <Card.Body>
              <Table responsive>
                <thead><tr><th>Date</th><th>Format</th><th>Period</th><th>Records</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>{format(new Date(), 'MMM d, yyyy')}</td>
                    <td><Badge bg="success">Excel</Badge></td><td>Last 30 days</td><td>142</td>
                    <td><Badge bg="success">Completed</Badge></td></tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExportData;