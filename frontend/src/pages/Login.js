// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignInAlt } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       login(response.data);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid email or password');
//       toast.error('Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//       <Row className="w-100" style={{ maxWidth: '400px' }}>
//         <Col>
//           <Card className="shadow">
//             <Card.Header className="bg-primary text-white text-center">
//               <h4 className="mb-0"><FaSignInAlt className="me-2" />Login to NutriTrack</h4>
//             </Card.Header>
//             <Card.Body>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Enter your email"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                   {loading ? 'Logging in...' : 'Login'}
//                 </Button>
//               </Form>
//               <div className="text-center mt-3">
//                 <Link to="/register">Don't have an account? Register</Link>
//               </div>
//               <div className="text-center mt-2">
//                 <small className="text-muted">Demo: demo@nutritrack.com / demo123</small>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
// new--working
// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignInAlt, FaLock, FaUserAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//     setError(''); // Clear error when user starts typing
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!credentials.email || !credentials.password) {
//       setError('Please enter both email and password');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await api.post('/auth/login', credentials);
      
//       // Check if account is active
//       if (response.data.status && response.data.status !== 'active') {
//         setError(`Your account is ${response.data.status}. Please contact support.`);
//         toast.error(`Account ${response.data.status}`);
//         return;
//       }

//       // Check if admin account is active
//       if ((response.data.role === 'admin' || response.data.role === 'superAdmin') && 
//           response.data.adminDetails && !response.data.adminDetails.isActive) {
//         setError('Admin account is inactive. Please contact superAdmin.');
//         toast.error('Admin account inactive');
//         return;
//       }

//       login(response.data);
      
//       // Show welcome message based on role
//       const welcomeMessage = response.data.role === 'superAdmin' 
//         ? 'Welcome Super Admin!' 
//         : response.data.role === 'admin'
//         ? 'Welcome Admin!'
//         : 'Login successful!';
      
//       toast.success(welcomeMessage);
      
//       // Redirect based on role
//       if (response.data.role === 'superAdmin' || response.data.role === 'admin') {
//         navigate('/dashboard');
//       } else {
//         navigate('/dashboard');
//       }
      
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Invalid credentials';
//       setError(errorMessage);
      
//       // Show specific toast based on error
//       if (errorMessage.includes('locked')) {
//         toast.error('Account temporarily locked. Try again later.');
//       } else if (errorMessage.includes('credentials')) {
//         toast.error('Invalid email or password');
//       } else {
//         toast.error('Login failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//       <Row className="w-100" style={{ maxWidth: '450px' }}>
//         <Col>
//           <Card className="shadow-lg border-0">
//             <Card.Header className="bg-primary text-white text-center py-4">
//               <h3 className="mb-0"><FaSignInAlt className="me-2" />NutriTrack Login</h3>
//               <small className="opacity-75">Track your nutrition, transform your health</small>
//             </Card.Header>
//             <Card.Body className="p-4">
//               {error && (
//                 <Alert variant="danger" className="text-center">
//                   <FaLock className="me-2" />
//                   {error}
//                 </Alert>
//               )}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-bold">
//                     <FaUserAlt className="me-2" />
//                     Email or Username
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="email"
//                     value={credentials.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email or username"
//                     className="py-2"
//                   />
//                   <Form.Text className="text-muted">
//                     You can use your email or username to login
//                   </Form.Text>
//                 </Form.Group>
                
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-bold">
//                     <FaLock className="me-2" />
//                     Password
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={credentials.password}
//                       onChange={handleChange}
//                       required
//                       placeholder="Enter your password"
//                       className="py-2"
//                     />
//                     <Button
//                       variant="outline-secondary"
//                       onClick={togglePasswordVisibility}
//                       className="border-start-0"
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </Button>
//                   </InputGroup>
//                   {/* <div className="d-flex justify-content-between mt-2">
//                     <Link to="/forgot-password" className="text-decoration-none small">
//                       Forgot Password?
//                     </Link>
//                     <span className="small text-muted cursor-pointer" onClick={togglePasswordVisibility}>
//                       {showPassword ? 'Hide Password' : 'Show Password'}
//                     </span>
//                   </div> */}
//                 </Form.Group>
                
//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   className="w-100 py-2 fw-bold gradient-button"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Logging in...
//                     </>
//                   ) : (
//                     'Login'
//                   )}
//                 </Button>
//               </Form>
              
//               <div className="text-center mt-4">
//                 <p className="mb-2">
//                   <Link to="/register" className="text-decoration-none fw-bold">
//                     Don't have an account? Register Now
//                   </Link>
//                 </p>
                
//                 <div className="mt-3 p-3 bg-light rounded">
//                   <h6 className="text-muted mb-2">Demo Accounts:</h6>
//                   <div className="small text-start">
//                     <div className="mb-1">
//                       <strong>User:</strong> user@demo.com / demo123
//                     </div>
//                     <div className="mb-1">
//                       <strong>Admin:</strong> admin@demo.com / admin123
//                     </div>
//                     <div>
//                       <strong>Super Admin:</strong> superAdmin@demo.com / super123
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card.Body>
//             <Card.Footer className="text-center text-muted py-3 bg-light">
//               <small>© 2024 NutriTrack. All rights reserved.</small>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
// new3
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaLock, FaUserAlt, FaEye, FaEyeSlash, FaEnvelope, FaKey, FaCheck, FaTimes,  FaInfoCircle } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Forgot Password Modal States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email, 2: Set new password
  const [resetToken, setResetToken] = useState('');
const [showNewPassword, setShowNewPassword] = useState(false); // Add this
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add this
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const toggleNewPasswordVisibility = () => { // Add this
  setShowNewPassword(!showNewPassword);
};

const toggleConfirmPasswordVisibility = () => { // Add this
  setShowConfirmPassword(!showConfirmPassword);
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Check if account is active
      if (response.data.status && response.data.status !== 'active') {
        setError(`Your account is ${response.data.status}. Please contact support.`);
        toast.error(`Account ${response.data.status}`);
        return;
      }

      // Check if admin account is active
      if ((response.data.role === 'admin' || response.data.role === 'superAdmin') && 
          response.data.adminDetails && !response.data.adminDetails.isActive) {
        setError('Admin account is inactive. Please contact superAdmin.');
        toast.error('Admin account inactive');
        return;
      }

      login(response.data);
      
      // Show welcome message based on role
      const welcomeMessage = response.data.role === 'superAdmin' 
        ? 'Welcome Super Admin!' 
        : response.data.role === 'admin'
        ? 'Welcome Admin!'
        : 'Login successful!';
      
      toast.success(welcomeMessage);
      
      // Redirect based on role
      if (response.data.role === 'superAdmin' || response.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      
      // Show specific toast based on error
      if (errorMessage.includes('locked')) {
        toast.error('Account temporarily locked. Try again later.');
      } else if (errorMessage.includes('credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password Step 1: Request reset
  const handleForgotPasswordRequest = async () => {
    if (!forgotEmail) {
      setForgotError('Please enter your email address');
      return;
    }

    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    try {
      const response = await api.post('/auth/forgot-password/request', { email: forgotEmail });
      
      if (response.data.token) {
        setResetToken(response.data.token);
        setStep(2); // Move to password set step
        setForgotSuccess('Enter your new password below');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Password reset request failed';
      setForgotError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setForgotLoading(false);
    }
  };

  // Handle Forgot Password Step 2: Set new password
  // const handleSetNewPassword = async () => {
  //   if (!newPassword || !confirmPassword) {
  //     setForgotError('Please enter and confirm your new password');
  //     return;
  //   }

  //   if (newPassword.length < 6) {
  //     setForgotError('Password must be at least 6 characters long');
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setForgotError('Passwords do not match');
  //     return;
  //   }

  //   setForgotLoading(true);
  //   setForgotError('');

  //   try {
  //     const response = await api.post('/auth/forgot-password/reset', {
  //       token: resetToken,
  //       newPassword: newPassword
  //     });
      
  //     setForgotSuccess('Password reset successful! You can now login with your new password.');
  //     toast.success('Password reset successful!');
      
  //     // Close modal after 3 seconds
  //     setTimeout(() => {
  //       handleCloseForgotPassword();
  //     }, 3000);
      
  //   } catch (err) {
  //     const errorMessage = err.response?.data?.message || 'Password reset failed';
  //     setForgotError(errorMessage);
  //     toast.error(errorMessage);
  //   } finally {
  //     setForgotLoading(false);
  //   }
  // };
// Handle Forgot Password Step 2: Set new password
const handleSetNewPassword = async () => {
  if (!newPassword || !confirmPassword) {
    setForgotError('Please enter and confirm your new password');
    return;
  }

  if (newPassword.length < 6) {
    setForgotError('Password must be at least 6 characters long');
    return;
  }

  if (newPassword !== confirmPassword) {
    setForgotError('Passwords do not match');
    return;
  }

  setForgotLoading(true);
  setForgotError('');
  setForgotSuccess(''); // Clear any previous success messages

  try {
    const response = await api.post('/auth/forgot-password/reset', {
      token: resetToken,
      newPassword: newPassword
    });
    
    setForgotSuccess('Password reset successful! You can now login with your new password.');
    toast.success('Password reset successful!');
    
    // Close modal after 3 seconds
    setTimeout(() => {
      handleCloseForgotPassword();
    }, 3000);
    
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Password reset failed';
    setForgotError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setForgotLoading(false);
  }
};
  // Handle modal close - Cancel reset request
  const handleCloseForgotPassword = async () => {
    // If user started the reset process but didn't complete it,
    // cancel the reset and set default password
    if (resetToken && step === 2 && !forgotSuccess) {
      try {
        await api.post('/auth/forgot-password/cancel', { 
          token: resetToken,
          email: forgotEmail 
        });
        console.log('Reset cancelled, password set to admin@123');
      } catch (err) {
        console.error('Failed to cancel reset:', err);
      }
    }
    
    // Reset all states
    setShowForgotPassword(false);
    setForgotEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
    setForgotSuccess('');
    setStep(1);
    setResetToken('');
      setShowNewPassword(false); // Add this
  setShowConfirmPassword(false); // Add this
  };

  // Handle modal backdrop click
  const handleBackdropClick = async () => {
    // Same logic as handleCloseForgotPassword
    if (resetToken && step === 2 && !forgotSuccess) {
      try {
        await api.post('/auth/forgot-password/cancel', { 
          token: resetToken,
          email: forgotEmail 
        });
        console.log('Reset cancelled via backdrop click');
      } catch (err) {
        console.error('Failed to cancel reset:', err);
      }
    }
    handleCloseForgotPassword();
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: 'text-muted' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strength = [
      { text: 'Very Weak', color: 'text-danger' },
      { text: 'Weak', color: 'text-danger' },
      { text: 'Fair', color: 'text-warning' },
      { text: 'Good', color: 'text-info' },
      { text: 'Strong', color: 'text-success' },
      { text: 'Very Strong', color: 'text-success' }
    ][Math.min(score, 5)];
    
    return { score, ...strength };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Row className="w-100" style={{ maxWidth: '450px' }}>
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h3 className="mb-0"><FaSignInAlt className="me-2" />AI NutriTrack Login</h3>
                <small className="opacity-75">Track your nutrition, transform your health</small>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" className="text-center">
                    <FaLock className="me-2" />
                    {error}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <FaUserAlt className="me-2" />
                      Email or Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email or username"
                      className="py-2"
                    />
                    <Form.Text className="text-muted">
                      You can use your email or username to login
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="py-2"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="border-start-0"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    <div className="d-flex justify-content-between mt-2">
                      <Button
                        variant="link"
                        className="text-decoration-none small p-0"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </Button>
                      <span 
                        className="small text-muted cursor-pointer" 
                        style={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? 'Hide Password' : 'Show Password'}
                      </span>
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2 fw-bold gradient-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>
                
                <div className="text-center mt-4">
                  <p className="mb-2">
                    <Link to="/register" className="text-decoration-none fw-bold">
                      Don't have an account? Register Now
                    </Link>
                  </p>
                  
                  {/* <div className="mt-3 p-3 bg-light rounded">
                    <h6 className="text-muted mb-2">Demo Accounts:</h6>
                    <div className="small text-start">
                      <div className="mb-1">
                        <strong>User:</strong> user@demo.com / demo123
                      </div>
                      <div className="mb-1">
                        <strong>Admin:</strong> admin@demo.com / admin123
                      </div>
                      <div>
                        <strong>Super Admin:</strong> superAdmin@demo.com / super123
                      </div>
                    </div>
                  </div> */}
                </div>
              </Card.Body>
              <Card.Footer className="text-center text-muted py-3 bg-light">
                <small>© 2024 NutriTrack. All rights reserved.</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Forgot Password Modal */}
      {/* <Modal 
        show={showForgotPassword} 
        onHide={handleBackdropClick}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center">
            <FaKey className="me-2 text-primary" />
            Reset Password
            {step === 2 && (
              <div className="mt-2">
                <div className="progress" style={{ height: '5px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <small className="text-muted">Step 2 of 2</small>
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotSuccess ? (
            <Alert variant="success" className="text-center">
              <FaCheck className="me-2" />
              {forgotSuccess}
            </Alert>
          ) : step === 1 ? (
            <>
              {forgotError && (
                <Alert variant="danger" className="text-center">
                  <FaTimes className="me-2" />
                  {forgotError}
                </Alert>
              )}
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  <FaEnvelope className="me-2" />
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="py-2"
                  disabled={forgotLoading}
                />
                <Form.Text className="text-muted">
                  Enter your email to start password reset process
                </Form.Text>
              </Form.Group>
            </>
          ) : (
            // Step 2: Set new password
            <>
              {forgotError && (
                <Alert variant="danger" className="text-center">
                  <FaTimes className="me-2" />
                  {forgotError}
                </Alert>
              )}
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  <FaLock className="me-2" />
                  New Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="py-2"
                    disabled={forgotLoading}
                  />
                </InputGroup>
                {newPassword && (
                  <div className="mt-2">
                    <small className={passwordStrength.color}>
                      Password strength: {passwordStrength.text}
                    </small>
                    <div className="progress mt-1" style={{ height: '3px' }}>
                      <div 
                        className={`progress-bar ${passwordStrength.color.replace('text-', 'bg-')}`}
                        role="progressbar" 
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <Form.Text className="text-muted">
                  Must be at least 6 characters long
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  <FaLock className="me-2" />
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="py-2"
                  disabled={forgotLoading}
                />
                {confirmPassword && newPassword === confirmPassword && (
                  <small className="text-success">
                    <FaCheck className="me-1" />
                    Passwords match
                  </small>
                )}
              </Form.Group>
              
              <Alert variant="warning" className="text-center small">
                <strong>Note:</strong> If you close this modal without completing, 
                your password will be reset to the default 'admin@123'
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          {step === 1 ? (
            <>
              <Button 
                variant="secondary" 
                onClick={handleCloseForgotPassword}
                disabled={forgotLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleForgotPasswordRequest}
                disabled={forgotLoading || !forgotEmail}
              >
                {forgotLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Request Reset'
                )}
              </Button>
            </>
          ) : step === 2 && !forgotSuccess ? (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setStep(1)}
                disabled={forgotLoading}
              >
                <FaEnvelope className="me-1" />
                Back
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSetNewPassword}
                disabled={forgotLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              >
                {forgotLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Setting...
                  </>
                ) : (
                  'Set New Password'
                )}
              </Button>
            </>
          ) : null}
        </Modal.Footer>
      </Modal> */}
      {/* Forgot Password Modal */}
{/* Forgot Password Modal */}
<Modal 
  show={showForgotPassword} 
  onHide={handleBackdropClick}
  backdrop="static"
  keyboard={false}
  centered
>
  <Modal.Header closeButton className="border-0">
    <Modal.Title className="w-100 text-center">
      <FaKey className="me-2 text-primary" />
      Reset Password
      {step === 2 && (
        <div className="mt-2">
          <div className="progress" style={{ height: '5px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: '100%' }}
            ></div>
          </div>
          <small className="text-muted">Step 2 of 2</small>
        </div>
      )}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Show success alert only for final success message */}
    {forgotSuccess && forgotSuccess.includes('successful') ? (
      <Alert variant="success" className="text-center">
        <FaCheck className="me-2" />
        {forgotSuccess}
      </Alert>
    ) : step === 1 ? (
      <>
        {forgotError && (
          <Alert variant="danger" className="text-center">
            <FaTimes className="me-2" />
            {forgotError}
          </Alert>
        )}
        
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">
            <FaEnvelope className="me-2" />
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="py-2"
            disabled={forgotLoading}
          />
          <Form.Text className="text-muted">
            Enter your email to start password reset process
          </Form.Text>
        </Form.Group>
      </>
    ) : (
      // Step 2: Set new password
      <>
        {/* Show info message instead of success alert */}
        {forgotSuccess && forgotSuccess.includes('Enter your new password') && (
          <Alert variant="info" className="text-center small">
            <FaInfoCircle className="me-2" />
            {forgotSuccess}
          </Alert>
        )}
        
        {forgotError && (
          <Alert variant="danger" className="text-center">
            <FaTimes className="me-2" />
            {forgotError}
          </Alert>
        )}
        
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">
            <FaLock className="me-2" />
            New Password
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="py-2"
              disabled={forgotLoading}
            />
            <Button
              variant="outline-secondary"
              onClick={toggleNewPasswordVisibility}
              className="border-start-0"
              disabled={forgotLoading}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {newPassword && (
            <div className="mt-2">
              <small className={passwordStrength.color}>
                Password strength: {passwordStrength.text}
              </small>
              <div className="progress mt-1" style={{ height: '3px' }}>
                <div 
                  className={`progress-bar ${passwordStrength.color.replace('text-', 'bg-')}`}
                  role="progressbar" 
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          <Form.Text className="text-muted">
            Must be at least 6 characters long
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">
            <FaLock className="me-2" />
            Confirm Password
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="py-2"
              disabled={forgotLoading}
            />
            <Button
              variant="outline-secondary"
              onClick={toggleConfirmPasswordVisibility}
              className="border-start-0"
              disabled={forgotLoading}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {confirmPassword && newPassword === confirmPassword && (
            <small className="text-success">
              <FaCheck className="me-1" />
              Passwords match
            </small>
          )}
        </Form.Group>
        
        <Alert variant="warning" className="text-center small">
          <strong>Note:</strong> If you close this modal without completing, 
          your password will be reset to the default 'admin@123'
        </Alert>
      </>
    )}
  </Modal.Body>
  <Modal.Footer className="border-0">
    {step === 1 ? (
      <>
        <Button 
          variant="secondary" 
          onClick={handleCloseForgotPassword}
          disabled={forgotLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleForgotPasswordRequest}
          disabled={forgotLoading || !forgotEmail}
        >
          {forgotLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Sending...
            </>
          ) : (
            'Request Reset'
          )}
        </Button>
      </>
    ) : step === 2 && !forgotSuccess.includes('successful') ? (
      <>
        <Button 
          variant="secondary" 
          onClick={() => setStep(1)}
          disabled={forgotLoading}
        >
          <FaEnvelope className="me-1" />
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSetNewPassword}
          disabled={forgotLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
        >
          {forgotLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Setting...
            </>
          ) : (
            'Set New Password'
          )}
        </Button>
      </>
    ) : null}
  </Modal.Footer>
</Modal>
    </>
  );
};

export default Login;