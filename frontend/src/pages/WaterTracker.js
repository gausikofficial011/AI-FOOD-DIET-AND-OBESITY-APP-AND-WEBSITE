import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, ListGroup, Form, Alert } from 'react-bootstrap';
import { FaTint, FaPlus, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const WaterTracker = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState([]);
  const [totalWater, setTotalWater] = useState(0);
  const [amount, setAmount] = useState(250);
  const [unit, setUnit] = useState('ml');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWaterIntake();
  }, [selectedDate]);

  const fetchWaterIntake = async () => {
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await api.get(`/water?date=${dateStr}`);
      setWaterIntake(response.data.intakes || []);
      setTotalWater(response.data.total || 0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddWater = async () => {
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await api.post('/water', {
        date: selectedDate,
        amount: parseFloat(amount),
        unit
      });
      toast.success('Water intake added!');
      setAmount(250);
      fetchWaterIntake();
    } catch (error) {
      toast.error('Failed to add water intake');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this entry?')) {
      try {
        await api.delete(`/water/${id}`);
        toast.success('Entry deleted');
        fetchWaterIntake();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const getProgress = () => {
    const target = user?.dailyTargets?.water || 2000;
    return Math.min((totalWater / target) * 100, 100);
  };

  const getProgressColor = () => {
    const progress = getProgress();
    if (progress >= 100) return 'success';
    if (progress >= 75) return 'info';
    if (progress >= 50) return 'primary';
    if (progress >= 25) return 'warning';
    return 'danger';
  };

  const quickAddAmounts = [
    { amount: 250, label: 'Glass (250ml)' },
    { amount: 500, label: 'Bottle (500ml)' },
    { amount: 1000, label: 'Liter' },
  ];

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2><FaTint className="me-2" />Water Tracker</h2>
          <p className="text-muted">Track your daily water intake</p>
        </Col>
        <Col md="auto">
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="form-control"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Today's Water Intake</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <FaTint size={64} className="text-primary mb-3" />
                <h1>{totalWater} ml</h1>
                <p className="text-muted">
                  {getProgress() >= 100 ? '🎉 Goal achieved!' : `${user?.dailyTargets?.water || 2000} ml daily goal`}
                </p>

                <ProgressBar
                  now={getProgress()}
                  variant={getProgressColor()}
                  className="mb-3"
                  style={{ height: '20px' }}
                />

                <div className="d-flex justify-content-between">
                  <small>0%</small>
                  <small>{Math.round(getProgress())}%</small>
                  <small>100%</small>
                </div>
              </div>

              <Alert variant={getProgress() >= 100 ? 'success' : 'info'}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Progress:</strong> {totalWater}ml / {user?.dailyTargets?.water || 2000}ml
                  </div>
                  <div>
                    {user?.dailyTargets?.water - totalWater > 0
                      ? `${user.dailyTargets.water - totalWater}ml remaining`
                      : 'Goal achieved! 🎉'}
                  </div>
                </div>
              </Alert>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Add Water Intake</h5>
            </Card.Header>
            <Card.Body>
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Unit</Form.Label>
                    <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                      <option value="ml">Milliliters (ml)</option>
                      <option value="oz">Ounces (oz)</option>
                      <option value="cups">Cups</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleAddWater}
                    disabled={loading}
                  >
                    <FaPlus className="me-2" />
                    {loading ? 'Adding...' : 'Add Intake'}
                  </Button>
                </Col>
              </Row>

              <div className="mt-4">
                <h6>Quick Add</h6>
                <div className="d-flex gap-2">
                  {quickAddAmounts.map(item => (
                    <Button
                      key={item.amount}
                      variant="outline-primary"
                      onClick={() => {
                        setAmount(item.amount);
                        setUnit('ml');
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Today's Log</h5>
            </Card.Header>
            <Card.Body>
              {waterIntake.length > 0 ? (
                <ListGroup variant="flush">
                  {waterIntake.map((intake, index) => (
                    <ListGroup.Item key={intake._id || index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{intake.amount} {intake.unit}</strong>
                        <div className="text-muted small">
                          {new Date(intake.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(intake._id)}
                      >
                        <FaTrash />
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-4">
                  <FaTint size={48} className="text-muted mb-3" />
                  <h5>No entries yet</h5>
                  <p className="text-muted">Add your first water intake above</p>
                </div>
              )}

              <div className="mt-4">
                <h6>Water Tips</h6>
                <ul className="text-muted small">
                  <li>Drink a glass of water first thing in the morning</li>
                  <li>Keep a water bottle with you throughout the day</li>
                  <li>Drink water before meals to aid digestion</li>
                  <li>Monitor urine color - pale yellow is ideal</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Weekly Water History</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <p className="text-muted">Weekly history chart would appear here</p>
                <div className="d-flex justify-content-around mt-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center">
                      <div>{day}</div>
                      <div className="mt-2">
                        <div
                          style={{
                            height: '50px',
                            width: '30px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '5px',
                            margin: '0 auto'
                          }}
                        />
                      </div>
                      <small className="text-muted">0ml</small>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WaterTracker;