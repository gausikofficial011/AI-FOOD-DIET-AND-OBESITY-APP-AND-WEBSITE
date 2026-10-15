// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserPlus } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//     age: '',
//     gender: 'male',
//     role:'',
//     height: '',
//     weight: '',
//     activityLevel: 'moderate',
//     goal: 'maintenance'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     const userData = {
//       username: formData.username.trim(),
//       email: formData.email.trim(),
//       password: formData.password.trim(),
//       role:formData.role.trim(),
//       profile: {
//         name: formData.name.trim(),
        
//         age: parseInt(formData.age),
//         gender: formData.gender.trim(),
//         height: parseInt(formData.height),
//         weight: parseInt(formData.weight),
//         activityLevel: formData.activityLevel.trim(),
//         goal: formData.goal.trim()
//       }
//     };

//     try {
//       const response = await api.post('/auth/register', userData);
//       register(response.data);
//       toast.success('Registration successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//       toast.error('Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
//       <Row className="w-100" style={{ maxWidth: '800px' }}>
//         <Col>
//           <Card className="shadow">
//             <Card.Header className="bg-success text-white text-center">
//               <h4 className="mb-0"><FaUserPlus className="me-2" />Register for NutriTrack</h4>
//             </Card.Header>
//             <Card.Body>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <h5>Account Information</h5>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Username *</Form.Label>
//                       <Form.Control name="username" value={formData.username} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Email *</Form.Label>
//                       <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Password *</Form.Label>
//                       <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Confirm Password *</Form.Label>
//                       <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <h5>Profile Information</h5>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Full Name</Form.Label>
//                       <Form.Control name="name" value={formData.name} onChange={handleChange} />
//                     </Form.Group>
//                     <Row>
//                       <Col>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Age</Form.Label>
//                           <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Gender</Form.Label>
//                           <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Height (cm)</Form.Label>
//                           <Form.Control type="number" name="height" value={formData.height} onChange={handleChange} />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Weight (kg)</Form.Label>
//                           <Form.Control type="number" name="weight" value={formData.weight} onChange={handleChange} />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity Level</Form.Label>
//                       <Form.Select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
//                         <option value="sedentary">Sedentary (little or no exercise)</option>
//                         <option value="light">Light (exercise 1-3 days/week)</option>
//                         <option value="moderate">Moderate (exercise 3-5 days/week)</option>
//                         <option value="active">Active (exercise 6-7 days/week)</option>
//                         <option value="very_active">Very Active (hard exercise daily)</option>
//                       </Form.Select>
//                     </Form.Group>
                   
                    
                 
//                   </Col>
//                      {/* //Role */}
//                         <Row>
//                       <Col>
//                        <Form.Group className="mb-3">
//                           <Form.Label>Role</Form.Label>
//                           <Form.Select name="role" value={formData.role} onChange={handleChange}>
//                             <option value="user">User</option>
//                             <option value="admin">Admin</option>
              
//                           </Form.Select>
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                          <Form.Group className="mb-3">
//                       <Form.Label>Goal</Form.Label>
//                       <Form.Select name="goal" value={formData.goal} onChange={handleChange}>
//                         <option value="weight_loss">Weight Loss</option>
//                         <option value="maintenance">Maintenance</option>
//                         <option value="weight_gain">Weight Gain</option>
//                       </Form.Select>
//                     </Form.Group>
//                       </Col>
//                     </Row>
//                 </Row>

//                 <Button variant="success" type="submit" className="w-100" disabled={loading}>
//                   {loading ? 'Creating Account...' : 'Register'}
//                 </Button>
//               </Form>

//               <div className="text-center mt-3">
//                 <Link to="/login">Already have an account? Login</Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;
// new
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaInfoCircle, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    // Account Information
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    
    // Personal Information
    profile: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'male',
      phone: '',
      
      // Physical Details
      height: { value: '', unit: 'cm' },
      weight: { value: '', unit: 'kg' },
      
      // Health & Fitness
      activityLevel: 'moderate',
      fitnessGoal: 'maintenance',
      targetWeight: { value: '', unit: 'kg' },
      
      // Additional
      occupation: '',
      address: {
        city: '',
        country: ''
      }
    },
    
    // Admin specific (if registering as admin)
    adminDetails: {
      department: 'General',
      position: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('profile.')) {
      const field = name.replace('profile.', '');
      
      // Handle nested profile fields
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setFormData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            [parent]: {
              ...prev.profile[parent],
              [child]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            [field]: value
          }
        }));
      }
    } else if (name.startsWith('adminDetails.')) {
      const field = name.replace('adminDetails.', '');
      setFormData(prev => ({
        ...prev,
        adminDetails: {
          ...prev.adminDetails,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateStep1 = () => {
    const errors = [];
    
    if (!formData.username.trim()) errors.push('Username is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.password) errors.push('Password is required');
    if (formData.password.length < 6) errors.push('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  };

  const validateStep2 = () => {
    const errors = [];
    
    if (!formData.profile.firstName.trim()) errors.push('First name is required');
    if (!formData.profile.dateOfBirth) errors.push('Date of birth is required');
    
    // Age validation (must be at least 13)
    if (formData.profile.dateOfBirth) {
      const birthDate = new Date(formData.profile.dateOfBirth);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 13) errors.push('You must be at least 13 years old to register');
    }
    
    return errors;
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      adminDetails: role === 'admin' ? prev.adminDetails : undefined
    }));
    setShowAdminFields(role === 'admin');
  };

  const nextStep = () => {
    if (step === 1) {
      const errors = validateStep1();
      if (errors.length > 0) {
        setError(errors.join(', '));
        return;
      }
    }
    setStep(step + 1);
    setError('');
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = [...step1Errors, ...step2Errors];
    
    if (allErrors.length > 0) {
      setError(allErrors.join(', '));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare user data for API
      const userData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        profile: {
          firstName: formData.profile.firstName.trim(),
          lastName: formData.profile.lastName.trim(),
          dateOfBirth: formData.profile.dateOfBirth,
          gender: formData.profile.gender,
          phone: formData.profile.phone,
          height: {
            value: parseFloat(formData.profile.height.value) || undefined,
            unit: formData.profile.height.unit
          },
          weight: {
            value: parseFloat(formData.profile.weight.value) || undefined,
            unit: formData.profile.weight.unit
          },
          activityLevel: formData.profile.activityLevel,
          fitnessGoal: formData.profile.fitnessGoal,
          targetWeight: formData.profile.targetWeight.value ? {
            value: parseFloat(formData.profile.targetWeight.value),
            unit: formData.profile.targetWeight.unit
          } : undefined,
          occupation: formData.profile.occupation,
          address: formData.profile.address
        }
      };

      // Add admin details if registering as admin
      if (formData.role === 'admin' && formData.adminDetails) {
        userData.adminDetails = formData.adminDetails;
      }

      const response = await api.post('/auth/register', userData);
      
      // Show success message based on role
      let successMessage = 'Registration successful!';
      if (response.data.role === 'admin') {
        successMessage = 'Admin registration submitted! Awaiting superAdmin approval.';
      } else if (response.data.role === 'superAdmin') {
        successMessage = 'Super Admin registration successful!';
      }
      
      toast.success(successMessage);
      
      // Auto-login if it's a regular user
      if (response.data.role === 'user') {
        register(response.data);
        navigate('/dashboard');
      } else {
        // For admin/superAdmin, redirect to login or approval page
        navigate('/login', { 
          state: { 
            message: `Your ${response.data.role} account has been created. ${response.data.role === 'admin' ? 'Awaiting approval from superAdmin.' : 'You can now login.'}` 
          } 
        });
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h5 className="mb-4 border-bottom pb-2">
        <FaUserPlus className="me-2" />
        Account Information
      </h5>
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Username *</Form.Label>
        <Form.Control
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Choose a unique username"
          minLength={3}
          maxLength={30}
        />
        <Form.Text className="text-muted">3-30 characters, letters and numbers only</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Email Address *</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password *</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                minLength={6}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                className="border-start-0"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Form.Text className="text-muted">At least 6 characters</Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Confirm Password *</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                minLength={6}
              />
              <Button
                variant="outline-secondary"
                onClick={toggleConfirmPasswordVisibility}
                className="border-start-0"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            <Form.Text className="text-muted">
              {formData.password && formData.confirmPassword && 
               formData.password !== formData.confirmPassword && 
               <span className="text-danger">Passwords don't match</span>}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Account Type *</Form.Label>
        <div className="d-flex gap-3">
          <Button
            variant={formData.role === 'user' ? 'primary' : 'outline-primary'}
            onClick={() => handleRoleChange('user')}
            className="flex-grow-1"
          >
            Regular User
          </Button>
          <Button
            variant={formData.role === 'admin' ? 'warning' : 'outline-warning'}
            onClick={() => handleRoleChange('admin')}
            className="flex-grow-1"
          >
            <FaUserShield className="me-1" />
            Admin
          </Button>
        </div>
        <Form.Text className="text-muted">
          {formData.role === 'admin' 
            ? 'Admin accounts require superAdmin approval before activation'
            : 'Regular user accounts are activated immediately'}
        </Form.Text>
      </Form.Group>
    </>
  );

  const renderStep2 = () => (
    <>
      <h5 className="mb-4 border-bottom pb-2">Personal Information</h5>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">First Name *</Form.Label>
            <Form.Control
              name="profile.firstName"
              value={formData.profile.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="profile.lastName"
              value={formData.profile.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Date of Birth *</Form.Label>
            <Form.Control
              type="date"
              name="profile.dateOfBirth"
              value={formData.profile.dateOfBirth}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
            <Form.Text className="text-muted">You must be at least 13 years old</Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="profile.gender"
              value={formData.profile.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="profile.phone"
          value={formData.profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </Form.Group>

      <h6 className="mt-4 mb-3">Physical Details</h6>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Height</Form.Label>
            <Row>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="profile.height.value"
                  value={formData.profile.height.value}
                  onChange={handleChange}
                  placeholder="Enter height"
                  min={50}
                  max={250}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="profile.height.unit"
                  value={formData.profile.height.unit}
                  onChange={handleChange}
                >
                  <option value="cm">cm</option>
                  <option value="feet">feet</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Weight</Form.Label>
            <Row>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="profile.weight.value"
                  value={formData.profile.weight.value}
                  onChange={handleChange}
                  placeholder="Enter weight"
                  min={20}
                  max={300}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="profile.weight.unit"
                  value={formData.profile.weight.unit}
                  onChange={handleChange}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      {showAdminFields && (
        <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded">
          <h6 className="mb-3 text-warning">
            <FaUserShield className="me-2" />
            Admin Information
          </h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  name="adminDetails.department"
                  value={formData.adminDetails.department}
                  onChange={handleChange}
                  placeholder="e.g., Operations, Marketing"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  name="adminDetails.position"
                  value={formData.adminDetails.position}
                  onChange={handleChange}
                  placeholder="e.g., Manager, Supervisor"
                />
              </Form.Group>
            </Col>
          </Row>
          <Alert variant="warning" className="small">
            <FaInfoCircle className="me-2" />
            Admin accounts require superAdmin approval before activation. 
            You'll be notified via email when your account is approved.
          </Alert>
        </div>
      )}
    </>
  );

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-success text-white py-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-1"><FaUserPlus className="me-2" />Create Your Account</h3>
                  <small className="opacity-75">Join thousands tracking their nutrition journey</small>
                </div>
                <Badge bg="light" text="dark" className="px-3 py-2">
                  Step {step} of 2
                </Badge>
              </div>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" className="d-flex align-items-center">
                  <FaInfoCircle className="me-2 flex-shrink-0" />
                  <div className="flex-grow-1">{error}</div>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {step === 1 ? renderStep1() : renderStep2()}
                
                <div className="d-flex justify-content-between mt-5 pt-3 border-top">
                  {step === 1 ? (
                    <Link to="/login" className="btn btn-outline-secondary">
                      Back to Login
                    </Link>
                  ) : (
                    <Button variant="outline-secondary" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  
                  {step === 1 ? (
                    <Button variant="primary" onClick={nextStep} disabled={loading}>
                      Next Step →
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      type="submit" 
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </Button>
                  )}
                </div>
              </Form>
              
              <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Login here
                  </Link>
                </p>
                <small className="text-muted">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;