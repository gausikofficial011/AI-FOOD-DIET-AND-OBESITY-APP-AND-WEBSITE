// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert,Table,Badge } from 'react-bootstrap';
// import { FaUser, FaCog, FaBullseye, FaBell } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Allusers = () => {
//   const { user, updateProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('allusers');

//   const [profileData, setProfileData] = useState({
//     name: '',
//     age: '',
//     gender: 'male',
//     height: '',
//     weight: '',
//     activityLevel: 'moderate',
//     goal: 'maintenance'
//   });

//   const [targetsData, setTargetsData] = useState({
//     calories: 2000,
//     protein: 50,
//     carbs: 250,
//     fat: 70,
//     water: 2000
//   });
// const [users, setUsers] = useState([]);
// const [loadingUsers, setLoadingUsers] = useState(false);
// const fetchUsers = async () => {
//   try {
//     setLoadingUsers(true);
//     const { data } = await api.get('/auth/allusers');
//     setUsers(data);
//   } catch (err) {
//     toast.error('Failed to load users');
//   } finally {
//     setLoadingUsers(false);
//   }
// };
// useEffect(() => {
//   if (activeTab === 'allusers') {
//     fetchUsers();
//   }
// }, [activeTab]);

//   const [notificationSettings, setNotificationSettings] = useState({
//     mealReminders: true,
//     waterReminders: true,
//     weeklyReports: true,
//     emailNotifications: true,
//     pushNotifications: true
//   });

//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         name: user.profile?.name || '',
//         age: user.profile?.age || '',
//         gender: user.profile?.gender || 'male',
//         height: user.profile?.height || '',
//         weight: user.profile?.weight || '',
//         activityLevel: user.profile?.activityLevel || 'moderate',
//         goal: user.profile?.goal || 'maintenance'
//       });

//       setTargetsData({
//         calories: user.dailyTargets?.calories || 2000,
//         protein: user.dailyTargets?.protein || 50,
//         carbs: user.dailyTargets?.carbs || 250,
//         fat: user.dailyTargets?.fat || 70,
//         water: user.dailyTargets?.water || 2000
//       });
//     }
//   }, [user]);

//   const calculateBMI = () => {
//     if (profileData.height && profileData.weight) {
//       const heightInMeters = profileData.height / 100;
//       return (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1);
//     }
//     return null;
//   };

//   const calculateBMR = () => {
//     if (profileData.weight && profileData.height && profileData.age && profileData.gender) {
//       if (profileData.gender === 'male') {
//         return Math.round(10 * profileData.weight + 6.25 * profileData.height - 5 * profileData.age + 5);
//       } else {
//         return Math.round(10 * profileData.weight + 6.25 * profileData.height - 5 * profileData.age - 161);
//       }
//     }
//     return null;
//   };

//   const calculateTDEE = () => {
//     const bmr = calculateBMR();
//     if (bmr) {
//       const multipliers = {
//         sedentary: 1.2,
//         light: 1.375,
//         moderate: 1.55,
//         active: 1.725,
//         very_active: 1.9
//       };
//       return Math.round(bmr * (multipliers[profileData.activityLevel] || 1.55));
//     }
//     return null;
//   };

//   const handleSaveProfile = async () => {
//     setLoading(true);
//     try {
//       await api.put('/auth/profile', { profile: profileData });
//       toast.success('Profile updated successfully!');
//       updateProfile({ profile: profileData });
//     } catch (error) {
//       toast.error('Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveTargets = async () => {
//     setLoading(true);
//     try {
//       await api.put('/auth/profile', { dailyTargets: targetsData });
//       toast.success('Targets updated successfully!');
//       updateProfile({ dailyTargets: targetsData });
//     } catch (error) {
//       toast.error('Failed to update targets');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveNotifications = async () => {
//     setLoading(true);
//     try {
//       await api.put('/auth/profile', { notificationSettings });
//       toast.success('Notification settings updated!');
//     } catch (error) {
//       toast.error('Failed to update settings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBMICategory = (bmi) => {
//     if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
//     if (bmi < 25) return { label: 'Normal', color: 'success' };
//     if (bmi < 30) return { label: 'Overweight', color: 'warning' };
//     return { label: 'Obese', color: 'danger' };
//   };

//   const bmi = calculateBMI();
//   const bmiCategory = bmi ? getBMICategory(bmi) : null;
//   const tdee = calculateTDEE();

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaUser className="me-2" />All Users</h2>
//           <p className="text-muted">Manage your Users, Permission, and notifications</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={9}>
//           <Card>
//             <Card.Header>
//               <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
//                 <Tab eventKey="allusers" title={<><FaUser className="me-1" />All Users</>} />
//                 <Tab eventKey="permission" title={<><FaBullseye className="me-1" />Permission</>} />
//                 <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
//                 <Tab eventKey="settings" title={<><FaCog className="me-1" />Settings</>} />
                
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               {/* Profile Tab */}
//               {activeTab === 'allusers' && (
//                 <>
//                  <h5 className="mb-3">All Users</h5>
//                    {loadingUsers ? (
//       <p>Loading users...</p>
//     ) : (
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>Age</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.profile?.name || user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.profile?.gender || '-'}</td>
//                 <td>{user.profile?.age || '-'}</td>
//                 <td>
//                   <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
//                     {user.role}
//                   </Badge>
//                 </td>
//                 <td>
//                   <Button
//                     size="sm"
//                     variant="outline-danger"
//                     onClick={() => handleDeleteUser(user._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     )}
                
//                 </>
//               )}

//               {/* Targets Tab */}
//               {activeTab === 'permission' && (
//               <>
//                  <h5 className="mb-3">Permission</h5>
//                    {loadingUsers ? (
//       <p>Loading users...</p>
//     ) : (
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>Age</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.profile?.name || user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.profile?.gender || '-'}</td>
//                 <td>{user.profile?.age || '-'}</td>
//                 <td>
//                   <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
//                     {user.role}
//                   </Badge>
//                 </td>
//                 <td>
//                   <Button
//                     size="sm"
//                     variant="outline-danger"
//                     onClick={() => handleDeleteUser(user._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     )}
                
//                 </>
//               )}

//               {/* Notifications Tab */}
//               {activeTab === 'notifications' && (
//                 <Form>
//                   <h6 className="mb-3">Reminders</h6>
//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Meal Reminders"
//                       checked={notificationSettings.mealReminders}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         mealReminders: e.target.checked
//                       })}
//                     />
//                     <Form.Text className="text-muted">
//                       Get reminders to log your meals
//                     </Form.Text>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Water Reminders"
//                       checked={notificationSettings.waterReminders}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         waterReminders: e.target.checked
//                       })}
//                     />
//                     <Form.Text className="text-muted">
//                       Get reminders to drink water
//                     </Form.Text>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Weekly Reports"
//                       checked={notificationSettings.weeklyReports}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         weeklyReports: e.target.checked
//                       })}
//                     />
//                     <Form.Text className="text-muted">
//                       Receive weekly nutrition reports
//                     </Form.Text>
//                   </Form.Group>

//                   <h6 className="mt-4 mb-3">Notification Channels</h6>
//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Email Notifications"
//                       checked={notificationSettings.emailNotifications}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         emailNotifications: e.target.checked
//                       })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Check
//                       type="switch"
//                       label="Push Notifications"
//                       checked={notificationSettings.pushNotifications}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         pushNotifications: e.target.checked
//                       })}
//                     />
//                   </Form.Group>

//                   <Button variant="primary" onClick={handleSaveNotifications} disabled={loading}>
//                     {loading ? 'Saving...' : 'Save Notification Settings'}
//                   </Button>
//                 </Form>
//               )}

//               {/* Settings Tab */}
//               {activeTab === 'settings' && (
//                 <div>
//                   <h6 className="mb-3">Account Information</h6>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control value={user?.username || ''} readOnly />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control value={user?.email || ''} readOnly />
//                   </Form.Group>

//                   <Alert variant="warning" className="mt-4">
//                     <h6>Account Actions</h6>
//                     <div className="d-flex gap-2 mt-2">
//                       <Button variant="outline-primary" size="sm">
//                         Change Password
//                       </Button>
//                       <Button variant="outline-secondary" size="sm">
//                         Export Data
//                       </Button>
//                       <Button variant="outline-danger" size="sm">
//                         Delete Account
//                       </Button>
//                     </div>
//                   </Alert>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3}>
//           <Card className="mb-4">
//             <Card.Header>
//               <h5 className="mb-0">Profile Summary</h5>
//             </Card.Header>
//             <Card.Body>
//               <div className="text-center mb-3">
//                 <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
//                   style={{ width: '80px', height: '80px' }}>
//                   <FaUser size={40} className="text-white" />
//                 </div>
//                 <h5 className="mt-3 mb-0">{user?.username}</h5>
//                 <p className="text-muted">{user?.email}</p>
//               </div>

//               {bmi && (
//                 <div className="mb-3">
//                   <h6>BMI Calculator</h6>
//                   <div className="text-center">
//                     <h2>{bmi}</h2>
//                     <span className={`badge bg-${bmiCategory?.color}`}>
//                       {bmiCategory?.label}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <h6>Current Targets</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2">
//                     <small className="text-muted">Calories</small>
//                     <div><strong>{user?.dailyTargets?.calories || 2000}</strong></div>
//                   </li>
//                   <li className="mb-2">
//                     <small className="text-muted">Protein</small>
//                     <div><strong>{user?.dailyTargets?.protein || 50}g</strong></div>
//                   </li>
//                   <li className="mb-2">
//                     <small className="text-muted">Water</small>
//                     <div><strong>{user?.dailyTargets?.water || 2000}ml</strong></div>
//                   </li>
//                 </ul>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Allusers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, Table, Badge, Modal } from 'react-bootstrap';
import { FaUser, FaCog, FaBullseye, FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Allusers = () => {
  const { user: currentUser, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('allusers');
  
  // For users list
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // For permission requests (only for superAdmin)
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  
  // For delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });

  const [targetsData, setTargetsData] = useState({
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 70,
    water: 2000
  });

  const [notificationSettings, setNotificationSettings] = useState({
    mealReminders: true,
    waterReminders: true,
    weeklyReports: true,
    emailNotifications: true,
    pushNotifications: true
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await api.get('/auth/allusers');
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch permission requests (only for superAdmin)
  const fetchPermissionRequests = async () => {
    if (currentUser?.role !== 'superAdmin') return;
    
    try {
      setLoadingRequests(true);
      const { data } = await api.get('/auth/permission-requests');
      setPermissionRequests(data);
    } catch (err) {
      toast.error('Failed to load permission requests');
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'allusers') {
      fetchUsers();
    } else if (activeTab === 'permission' && currentUser?.role === 'superAdmin') {
      fetchPermissionRequests();
    }
  }, [activeTab, currentUser?.role]);

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.profile?.name || '',
        age: currentUser.profile?.age || '',
        gender: currentUser.profile?.gender || 'male',
        height: currentUser.profile?.height || '',
        weight: currentUser.profile?.weight || '',
        activityLevel: currentUser.profile?.activityLevel || 'moderate',
        goal: currentUser.profile?.goal || 'maintenance'
      });

      setTargetsData({
        calories: currentUser.dailyTargets?.calories || 2000,
        protein: currentUser.dailyTargets?.protein || 50,
        carbs: currentUser.dailyTargets?.carbs || 250,
        fat: currentUser.dailyTargets?.fat || 70,
        water: currentUser.dailyTargets?.water || 2000
      });
    }
  }, [currentUser]);

  // Handle permission update (approve/reject)
  const handleUpdatePermission = async (userId, permission) => {
    try {
      await api.put(`/auth/permission/${userId}`, { permission });
      toast.success(`Permission ${permission} successfully`);
      
      // Refresh both lists
      fetchPermissionRequests();
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update permission');
    }
  };

  // Handle delete user
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // const handleDeleteUser = async () => {
  //   if (!userToDelete) return;
    
  //   try {
  //     await api.delete(`/auth/user/${userToDelete._id}`);
  //     toast.success('User deleted successfully');
  //     setShowDeleteModal(false);
  //     setUserToDelete(null);
  //     fetchUsers();
  //   } catch (error) {
  //     toast.error('Failed to delete user');
  //   }
  // };
// In Allusers.js - handleDeleteUser function
const handleDeleteUser = async () => {
  if (!userToDelete) return;
  
  try {
    // Change from /auth/users/... to /auth/user/... to match backend
    // await api.delete(`/auth/user/${userToDelete._id}`);
    // toast.success('User deleted successfully');
    // setShowDeleteModal(false);
    // setUserToDelete(null);
    // fetchUsers();
     await api.delete(`/auth/user/${userToDelete._id}`, {
      data: { currentUserId: currentUser }
    });

    toast.success('User deleted successfully');
    setShowDeleteModal(false);
    setUserToDelete(null);
    fetchUsers();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete user');
  }
};
  const getPermissionBadgeVariant = (permission) => {
    switch (permission) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };
// In Allusers.js - Add this function
const handleUpdateStatus = async (userId, status) => {
  try {
    await api.put(`/auth/user/${userId}/status`, { status });
    toast.success(`User ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
    fetchUsers();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update status');
  }
};
  const calculateBMI = () => {
    if (profileData.height && profileData.weight) {
      const heightInMeters = profileData.height / 100;
      return (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const calculateBMR = () => {
    if (profileData.weight && profileData.height && profileData.age && profileData.gender) {
      if (profileData.gender === 'male') {
        return Math.round(10 * profileData.weight + 6.25 * profileData.height - 5 * profileData.age + 5);
      } else {
        return Math.round(10 * profileData.weight + 6.25 * profileData.height - 5 * profileData.age - 161);
      }
    }
    return null;
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    if (bmr) {
      const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
      };
      return Math.round(bmr * (multipliers[profileData.activityLevel] || 1.55));
    }
    return null;
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await api.put('/auth/profile', { profile: profileData });
      toast.success('Profile updated successfully!');
      updateProfile({ profile: profileData });
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTargets = async () => {
    setLoading(true);
    try {
      await api.put('/auth/profile', { dailyTargets: targetsData });
      toast.success('Targets updated successfully!');
      updateProfile({ dailyTargets: targetsData });
    } catch (error) {
      toast.error('Failed to update targets');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await api.put('/auth/profile', { notificationSettings });
      toast.success('Notification settings updated!');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
    if (bmi < 25) return { label: 'Normal', color: 'success' };
    if (bmi < 30) return { label: 'Overweight', color: 'warning' };
    return { label: 'Obese', color: 'danger' };
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const tdee = calculateTDEE();
  
//  const [file, setFile] = useState(null);
//   const [nutrition, setNutrition] = useState(null);

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) return alert('Please select an image');
// const formData = new FormData();
// formData.append('image', file);

// const res = await axios.post('http://localhost:5000/api/upload', formData, {
//   headers: { 'Content-Type': 'multipart/form-data' }
// });
// console.log(res.data); // nutrition info

    // const formData = new FormData();
    // formData.append('image', file);

    // try {
    //   const res = await axios.post('http://localhost:5000/upload', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   setNutrition(res.data);
    // } catch (err) {
    //   console.error(err);
    //   alert('Failed to process image');
    // }
  


  return (
    <>
    <Container>
      <Row className="mb-4">
        <Col>
          <h2><FaUser className="me-2" />User Management</h2>
          <p className="text-muted">
            {currentUser?.role === 'superAdmin' 
              ? 'Manage users and admin permission requests' 
              : 'View user information'}
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
                <Tab eventKey="allusers" title={<><FaUser className="me-1" />All Users</>} />
                {currentUser?.role === 'superAdmin' && (
                  <Tab eventKey="permission" title={<><FaBullseye className="me-1" />Permission Requests</>} />
                )}
                <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
                <Tab eventKey="settings" title={<><FaCog className="me-1" />Settings</>} />
              </Tabs>
            </Card.Header>
            <Card.Body>
              {/* All Users Tab */}
              {activeTab === 'allusers' && (
                <>
                  <h5 className="mb-3">All Users</h5>
                  {loadingUsers ? (
                    <p>Loading users...</p>
                  ) : (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                           <th>Status</th>
                          <th>Permission</th>
                          <th>Profile Name</th>
                          <th>Created</th>
                          {/* {currentUser?.role === 'superAdmin' && <th>Actions</th>} */}
                          {(currentUser?.role === 'admin' || currentUser?.role === 'superAdmin') && <th>Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {users.length === 0 ? (
                          <tr>
                            <td colSpan={currentUser?.role === 'superAdmin' ? 8 : 7} className="text-center">
                              No users found
                            </td>
                          </tr>
                        ) : (
                          users.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>
                                <Badge bg={user.role === 'admin' ? 'danger' : 
                                          user.role === 'superAdmin' ? 'dark' : 'secondary'}>
                                  {user.role}
                                </Badge>
                              </td>
                              <td>
  <Badge bg={
    user.status === 'active' ? 'success' :
    user.status === 'inactive' ? 'warning' :
    user.status === 'suspended' ? 'danger' : 'secondary'
  }>
    {user.status}
  </Badge>
</td>
                              <td>
                                {user.role === 'admin' ? (
                                  <Badge bg={getPermissionBadgeVariant(user.permission)}>
                                    {user.permission}
                                  </Badge>
                                ) : (
                                  'N/A'
                                )}
                              </td>
                              <td>{user.profile?.name || '-'}</td>
                              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                 {/* Actions column */}
    {(currentUser?.role === 'admin' || currentUser?.role === 'superAdmin') && (
      <td>
        {user.role !== 'superAdmin' && (
          <>
            {/* Admin can only see status buttons for non-superAdmins */}
            {(currentUser?.role === 'admin' || currentUser?.role === 'superAdmin') && user.role !== 'superAdmin' && (
              <div className="d-flex gap-2 mb-2">
                <Button
                  size="sm"
                  variant="outline-success"
                  onClick={() => handleUpdateStatus(user._id, 'active')}
                  disabled={user.status === 'active'}
                >
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline-warning"
                  onClick={() => handleUpdateStatus(user._id, 'inactive')}
                  disabled={user.status === 'inactive'}
                >
                  Deactivate
                </Button>
              </div>
            )}
            
            {/* Only superAdmin can delete */}
            {currentUser?.role === 'superAdmin' && user.role !== 'superAdmin' && (
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => confirmDeleteUser(user)}
              >
                Delete
              </Button>
            )}
          </>
        )}
      </td>
    )}
                              {/* {currentUser?.role === 'superAdmin' && (
                                <td>
                                  {user.role !== 'superAdmin' && (
                                    <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => confirmDeleteUser(user)}
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </td>
                              )} */}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  )}
                </>
              )}

              {/* Permission Requests Tab (only for superAdmin) */}
              {activeTab === 'permission' && (
                <>
                  <h5 className="mb-3">Admin Permission Requests</h5>
                  {currentUser?.role !== 'superAdmin' ? (
                    <Alert variant="warning">
                      You are not authorized to view permission requests. Only super admins can access this section.
                    </Alert>
                  ) : (
                    <>
                      {loadingRequests ? (
                        <p>Loading permission requests...</p>
                      ) : permissionRequests.length === 0 ? (
                        <Alert variant="info">No pending admin permission requests</Alert>
                      ) : (
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Profile Name</th>
                              <th>Requested</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {permissionRequests.map((admin, index) => (
                              <tr key={admin._id}>
                                <td>{index + 1}</td>
                                <td>{admin.username}</td>
                                <td>{admin.email}</td>
                                <td>{admin.profile?.name || '-'}</td>
                                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="success"
                                      onClick={() => handleUpdatePermission(admin._id, 'approved')}
                                    >
                                      <FaCheck className="me-1" /> Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="danger"
                                      onClick={() => handleUpdatePermission(admin._id, 'rejected')}
                                    >
                                      <FaTimes className="me-1" /> Reject
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <Form>
                  <h6 className="mb-3">Reminders</h6>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Meal Reminders"
                      checked={notificationSettings.mealReminders}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        mealReminders: e.target.checked
                      })}
                    />
                    <Form.Text className="text-muted">
                      Get reminders to log your meals
                    </Form.Text>
                  </Form.Group>

                  {/* <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Water Reminders"
                      checked={notificationSettings.waterReminders}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        waterReminders: e.target.checked
                      })}
                    />
                    <Form.Text className="text-muted">
                      Get reminders to drink water
                    </Form.Text>
                  </Form.Group> */}

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Weekly Reports"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        weeklyReports: e.target.checked
                      })}
                    />
                    <Form.Text className="text-muted">
                      Receive weekly nutrition reports
                    </Form.Text>
                  </Form.Group>

                  <h6 className="mt-4 mb-3">Notification Channels</h6>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      label="Email Notifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked
                      })}
                    />
                  </Form.Group>
{/* 
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="switch"
                      label="Push Notifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked
                      })}
                    />
                  </Form.Group> */}

                  <Button variant="primary" onClick={handleSaveNotifications} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Notification Settings'}
                  </Button>
                </Form>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h6 className="mb-3">Account Information</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={currentUser?.username || ''} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={currentUser?.email || ''} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control value={currentUser?.role || ''} readOnly />
                  </Form.Group>

                  {/* <Alert variant="warning" className="mt-4">
                    <h6>Account Actions</h6>
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="outline-primary" size="sm">
                        Change Password
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        Export Data
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </Alert> */}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* <Col lg={3}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Profile Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}>
                  <FaUser size={40} className="text-white" />
                </div>
                <h5 className="mt-3 mb-0">{currentUser?.username}</h5>
                <p className="text-muted">{currentUser?.email}</p>
                <Badge bg={currentUser?.role === 'superAdmin' ? 'dark' : 
                          currentUser?.role === 'admin' ? 'danger' : 'secondary'}>
                  {currentUser?.role}
                </Badge>
              </div>

              {bmi && (
                <div className="mb-3">
                  <h6>BMI Calculator</h6>
                  <div className="text-center">
                    <h2>{bmi}</h2>
                    <span className={`badge bg-${bmiCategory?.color}`}>
                      {bmiCategory?.label}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h6>Current Targets</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <small className="text-muted">Calories</small>
                    <div><strong>{currentUser?.dailyTargets?.calories || 2000}</strong></div>
                  </li>
                  <li className="mb-2">
                    <small className="text-muted">Protein</small>
                    <div><strong>{currentUser?.dailyTargets?.protein || 50}g</strong></div>
                  </li>
               
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user <strong>{userToDelete?.username}</strong>?
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
    </>
  );
};

export default Allusers;