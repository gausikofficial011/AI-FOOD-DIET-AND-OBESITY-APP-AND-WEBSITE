import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaCamera, FaQrcode, FaSearch } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import api from '../services/api';
import { toast } from 'react-toastify';

const BarcodeScanner = () => {
  const [mode, setMode] = useState('manual');
  const [barcode, setBarcode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!barcode.trim()) {
      setError('Enter barcode');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/barcode/scan', { barcode: barcode.trim() });
      setResult(response.data);
    } catch (err) {
      setError('Barcode not found');
    } finally {
      setLoading(false);
    }
  };

  const addToFoodLog = async () => {
    if (!result) return;
    try {
      await api.post('/meals', {
        date: new Date(), mealType: 'snack',
        entries: [{ food: result._id, servingAmount: result.servingSize.amount }]
      });
      toast.success('Food added!');
    } catch (err) {
      toast.error('Failed to add');
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col><h2>Barcode Scanner</h2></Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header><h5>Scan Barcode</h5></Card.Header>
            <Card.Body>
              <div className="d-flex mb-4">
                <Button variant={mode === 'camera' ? 'primary' : 'outline-primary'} className="me-2"
                  onClick={() => setMode('camera')}><FaCamera className="me-2" />Camera</Button>
                <Button variant={mode === 'manual' ? 'primary' : 'outline-primary'}
                  onClick={() => setMode('manual')}><FaSearch className="me-2" />Manual</Button>
              </div>
              
              {mode === 'manual' && (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter barcode</Form.Label>
                    <Form.Control type="text" placeholder="e.g., 0123456789012" value={barcode} 
                      onChange={(e) => setBarcode(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" onClick={handleScan} disabled={loading}>
                    {loading ? <><Spinner size="sm" className="me-2" />Searching...</> : <><FaSearch className="me-2" />Search</>}
                  </Button>
                </div>
              )}
              {mode === 'camera' && (
                <div className="text-center">
                  <p className="text-muted">Camera scanning requires device permissions</p>
                  <Button variant="outline-secondary" disabled><FaCamera className="me-2" />Enable Camera</Button>
                </div>
              )}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          {result && (
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Header className="bg-success text-white"><h5>Result</h5></Card.Header>
              <Card.Body>
                <h4>{result.name}</h4>
                <p><strong>Nutrition per {result.servingSize.amount}{result.servingSize.unit}:</strong></p>
                <ul className="list-unstyled">
                  <li>Calories: {result.nutrition.calories}</li>
                  <li>Protein: {result.nutrition.protein}g</li>
                  <li>Carbs: {result.nutrition.carbs}g</li>
                  <li>Fat: {result.nutrition.fat}g</li>
                </ul>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={addToFoodLog}>Add to Food Log</Button>
                  <div className="text-center mt-3">
                    <QRCode value={JSON.stringify(result)} size={100} />
                    <small className="d-block mt-2">Scan QR to save</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BarcodeScanner;