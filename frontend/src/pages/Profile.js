// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
// import { FaUser, FaCog, FaBullseye, FaBell } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');

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
//           <h2><FaUser className="me-2" />Profile Settings</h2>
//           <p className="text-muted">Manage your profile, targets, and notifications</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={9}>
//           <Card>
//             <Card.Header>
//               <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
//                 <Tab eventKey="profile" title={<><FaUser className="me-1" />Profile</>} />
//                 <Tab eventKey="targets" title={<><FaBullseye className="me-1" />Targets</>} />
//                 <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
//                 <Tab eventKey="settings" title={<><FaCog className="me-1" />Settings</>} />
                
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               {/* Profile Tab */}
//               {activeTab === 'profile' && (
//                 <Form>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Full Name</Form.Label>
//                         <Form.Control
//                           value={profileData.name}
//                           onChange={(e) => setProfileData({...profileData, name: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Age</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={profileData.age}
//                           onChange={(e) => setProfileData({...profileData, age: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={3}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Select
//                           value={profileData.gender}
//                           onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
//                         >
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Height (cm)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={profileData.height}
//                           onChange={(e) => setProfileData({...profileData, height: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Weight (kg)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={profileData.weight}
//                           onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Activity Level</Form.Label>
//                     <Form.Select
//                       value={profileData.activityLevel}
//                       onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
//                     >
//                       <option value="sedentary">Sedentary (little or no exercise)</option>
//                       <option value="light">Light (exercise 1-3 days/week)</option>
//                       <option value="moderate">Moderate (exercise 3-5 days/week)</option>
//                       <option value="active">Active (exercise 6-7 days/week)</option>
//                       <option value="very_active">Very Active (hard exercise daily)</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label>Goal</Form.Label>
//                     <Form.Select
//                       value={profileData.goal}
//                       onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
//                     >
//                       <option value="weight_loss">Weight Loss</option>
//                       <option value="maintenance">Maintenance</option>
//                       <option value="weight_gain">Weight Gain</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Button variant="primary" onClick={handleSaveProfile} disabled={loading}>
//                     {loading ? 'Saving...' : 'Save Profile'}
//                   </Button>
//                 </Form>
//               )}

//               {/* Targets Tab */}
//               {activeTab === 'targets' && (
//                 <div>
//                   {tdee && (
//                     <Alert variant="info" className="mb-4">
//                       <strong>Based on your profile:</strong>
//                       <div className="mt-2">
//                         <div>BMR (Basal Metabolic Rate): {calculateBMR()} calories/day</div>
//                         <div>TDEE (Total Daily Energy Expenditure): {tdee} calories/day</div>
//                         <div>Recommended daily calories: {tdee} calories</div>
//                       </div>
//                     </Alert>
//                   )}

//                   <Form>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Daily Calories</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={targetsData.calories}
//                         onChange={(e) => setTargetsData({...targetsData, calories: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: {tdee || '2000'} calories
//                       </Form.Text>
//                     </Form.Group>

//                     <h6 className="mt-4 mb-3">Macronutrients</h6>
//                     <Row>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Protein (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={targetsData.protein}
//                             onChange={(e) => setTargetsData({...targetsData, protein: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Carbs (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={targetsData.carbs}
//                             onChange={(e) => setTargetsData({...targetsData, carbs: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Fat (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             value={targetsData.fat}
//                             onChange={(e) => setTargetsData({...targetsData, fat: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Form.Group className="mb-4">
//                       <Form.Label>Daily Water Intake (ml)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={targetsData.water}
//                         onChange={(e) => setTargetsData({...targetsData, water: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: 2000-3000 ml per day
//                       </Form.Text>
//                     </Form.Group>

//                     <Button variant="primary" onClick={handleSaveTargets} disabled={loading}>
//                       {loading ? 'Saving...' : 'Save Targets'}
//                     </Button>
//                   </Form>
//                 </div>
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
//               {/* Permissions */}
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

// export default Profile;
// new
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, InputGroup } from 'react-bootstrap';
// import { FaUser, FaCog, FaBullseye, FaBell } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');

//   // Updated profile state structure to match backend schema
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     fullName: '',
//     dateOfBirth: '',
//     gender: '',
//     height: { value: '', unit: 'cm', lastUpdated: new Date() },
//     weight: { value: '', unit: 'kg', lastUpdated: new Date() },
//     activityLevel: '',
//     goal: '',
//     bio: '',
//     phoneNumber: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: '',
//       zipCode: ''
//     }
//   });

//   const [targetsData, setTargetsData] = useState({
//     calories: 2000,
//     protein: 50,
//     carbs: 250,
//     fat: 70,
//     water: 2000,
//     lastUpdated: new Date()
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     mealReminders: true,
//     waterReminders: true,
//     weeklyReports: true,
//     emailNotifications: true,
//     pushNotifications: true,
//     goalAchievements: true,
//     friendRequests: true,
//     systemUpdates: true
//   });

//   const [preferences, setPreferences] = useState({
//     theme: 'auto',
//     language: 'en',
//     measurementSystem: 'metric',
//     timezone: 'UTC',
//     privacyLevel: 'friends-only'
//   });

//   useEffect(() => {
//     if (user) {
//       // Update profile data with new schema structure
//       setProfileData({
//         firstName: user.profile?.firstName || '',
//         lastName: user.profile?.lastName || '',
//         fullName: user.profile?.fullName || '',
//         dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split('T')[0] : '',
//         gender: user.profile?.gender || 'prefer-not-to-say',
//         height: user.profile?.height || { value: '', unit: 'cm' },
//         weight: user.profile?.weight || { value: '', unit: 'kg' },
//         activityLevel: user.profile?.activityLevel || 'moderate',
//         goal: user.profile?.goal || 'maintenance',
//         bio: user.profile?.bio || '',
//         phoneNumber: user.profile?.phoneNumber || '',
//         address: user.profile?.address || {
//           street: '',
//           city: '',
//           state: '',
//           country: '',
//           zipCode: ''
//         }
//       });

//       setTargetsData({
//         calories: user.dailyTargets?.calories || 2000,
//         protein: user.dailyTargets?.protein || 50,
//         carbs: user.dailyTargets?.carbs || 250,
//         fat: user.dailyTargets?.fat || 70,
//         water: user.dailyTargets?.water || 2000,
//         lastUpdated: user.dailyTargets?.lastUpdated || new Date()
//       });

//       setNotificationSettings({
//         mealReminders: user.notificationSettings?.mealReminders || true,
//         waterReminders: user.notificationSettings?.waterReminders || true,
//         weeklyReports: user.notificationSettings?.weeklyReports || true,
//         emailNotifications: user.notificationSettings?.emailNotifications || true,
//         pushNotifications: user.notificationSettings?.pushNotifications || true,
//         goalAchievements: user.notificationSettings?.goalAchievements || true,
//         friendRequests: user.notificationSettings?.friendRequests || true,
//         systemUpdates: user.notificationSettings?.systemUpdates || true
//       });

//       setPreferences({
//         theme: user.preferences?.theme || 'auto',
//         language: user.preferences?.language || 'en',
//         measurementSystem: user.preferences?.measurementSystem || 'metric',
//         timezone: user.preferences?.timezone || 'UTC',
//         privacyLevel: user.preferences?.privacyLevel || 'friends-only'
//       });
//     }
//   }, [user]);

//   // Helper function to convert height to meters for BMI calculation
//   const convertHeightToMeters = (height) => {
//     if (!height?.value) return 0;
    
//     switch (height.unit) {
//       case 'cm':
//         return height.value / 100;
//       case 'm':
//         return height.value;
//       case 'ft':
//         return height.value * 0.3048;
//       case 'in':
//         return height.value * 0.0254;
//       default:
//         return height.value / 100; // Default to cm
//     }
//   };

//   // Helper function to convert weight to kg for BMI calculation
//   const convertWeightToKg = (weight) => {
//     if (!weight?.value) return 0;
    
//     switch (weight.unit) {
//       case 'kg':
//         return weight.value;
//       case 'lb':
//         return weight.value * 0.453592;
//       default:
//         return weight.value; // Default to kg
//     }
//   };

//   const calculateBMI = () => {
//     if (profileData.height?.value && profileData.weight?.value) {
//       const heightInMeters = convertHeightToMeters(profileData.height);
//       const weightInKg = convertWeightToKg(profileData.weight);
      
//       if (heightInMeters === 0) return null;
//       return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
//     }
//     return null;
//   };

//   const calculateBMR = () => {
//     const weightInKg = convertWeightToKg(profileData.weight);
//     const heightInCm = profileData.height?.unit === 'cm' 
//       ? profileData.height.value 
//       : profileData.height?.unit === 'm'
//         ? profileData.height.value * 100
//         : profileData.height?.value || 0;
    
//     const age = profileData.dateOfBirth 
//       ? new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear()
//       : profileData.age || 0;
    
//     if (weightInKg && heightInCm && age && profileData.gender) {
//       if (profileData.gender === 'male') {
//         return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age + 5);
//       } else if (profileData.gender === 'female') {
//         return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age - 161);
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
//         'very-active': 1.9
//       };
//       return Math.round(bmr * (multipliers[profileData.activityLevel] || 1.55));
//     }
//     return null;
//   };

//   const handleSaveProfile = async () => {
//     setLoading(true);
//     try {
//       // Calculate fullName if firstName or lastName provided
//       const updatedProfile = { ...profileData };
//       if (profileData.firstName || profileData.lastName) {
//         updatedProfile.fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
//       }
      
//       // Add lastUpdated timestamps
//       updatedProfile.height = {
//         ...updatedProfile.height,
//         lastUpdated: new Date()
//       };
//       updatedProfile.weight = {
//         ...updatedProfile.weight,
//         lastUpdated: new Date()
//       };
      
//       await api.put('/auth/profile', { profile: updatedProfile });
//       toast.success('Profile updated successfully!');
//       updateProfile({ profile: updatedProfile });
//     } catch (error) {
//       toast.error('Failed to update profile');
//       console.error('Profile update error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveTargets = async () => {
//     setLoading(true);
//     try {
//       const updatedTargets = {
//         ...targetsData,
//         lastUpdated: new Date()
//       };
//       await api.put('/auth/profile', { dailyTargets: updatedTargets });
//       toast.success('Targets updated successfully!');
//       updateProfile({ dailyTargets: updatedTargets });
//     } catch (error) {
//       toast.error('Failed to update targets');
//       console.error('Targets update error:', error);
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
//       console.error('Notifications update error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePreferences = async () => {
//     setLoading(true);
//     try {
//       await api.put('/auth/profile', { preferences });
//       toast.success('Preferences updated!');
//       updateProfile({ preferences });
//     } catch (error) {
//       toast.error('Failed to update preferences');
//       console.error('Preferences update error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHeightUnitChange = (unit) => {
//     setProfileData({
//       ...profileData,
//       height: {
//         ...profileData.height,
//         unit
//       }
//     });
//   };

//   const handleWeightUnitChange = (unit) => {
//     setProfileData({
//       ...profileData,
//       weight: {
//         ...profileData.weight,
//         unit
//       }
//     });
//   };

//   const getBMICategory = (bmi) => {
//     if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
//     if (bmi < 25) return { label: 'Normal', color: 'success' };
//     if (bmi < 30) return { label: 'Overweight', color: 'warning' };
//     return { label: 'Obese', color: 'danger' };
//   };

//   const getAgeFromDOB = () => {
//     if (!profileData.dateOfBirth) return null;
//     const today = new Date();
//     const birthDate = new Date(profileData.dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const bmi = calculateBMI();
//   const bmiCategory = bmi ? getBMICategory(bmi) : null;
//   const tdee = calculateTDEE();
//   const calculatedAge = getAgeFromDOB();

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaUser className="me-2" />Profile Settings</h2>
//           <p className="text-muted">Manage your profile, targets, and notifications</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={9}>
//           <Card>
//             <Card.Header>
//               <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
//                 <Tab eventKey="profile" title={<><FaUser className="me-1" />Profile</>} />
//                 <Tab eventKey="targets" title={<><FaBullseye className="me-1" />Targets</>} />
//                 <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
//                 <Tab eventKey="preferences" title={<><FaCog className="me-1" />Preferences</>} />
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               {/* Profile Tab */}
//               {activeTab === 'profile' && (
//                 <Form>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                           value={profileData.firstName}
//                           onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                           value={profileData.lastName}
//                           onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Date of Birth</Form.Label>
//                         <Form.Control
//                           type="date"
//                           value={profileData.dateOfBirth}
//                           onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
//                         />
//                         {calculatedAge && (
//                           <Form.Text className="text-muted">
//                             Age: {calculatedAge} years
//                           </Form.Text>
//                         )}
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Select
//                           value={profileData.gender}
//                           onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
//                         >
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                           <option value="prefer-not-to-say">Prefer not to say</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Height</Form.Label>
//                         <InputGroup>
//                           <Form.Control
//                             type="number"
//                             value={profileData.height?.value || ''}
//                             onChange={(e) => setProfileData({
//                               ...profileData, 
//                               height: {...profileData.height, value: e.target.value}
//                             })}
//                           />
//                           <Form.Select
//                             value={profileData.height?.unit || 'cm'}
//                             onChange={(e) => handleHeightUnitChange(e.target.value)}
//                             style={{ maxWidth: '100px' }}
//                           >
//                             <option value="cm">cm</option>
//                             <option value="m">m</option>
//                             <option value="ft">ft</option>
//                             <option value="in">in</option>
//                           </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Weight</Form.Label>
//                         <InputGroup>
//                           <Form.Control
//                             type="number"
//                             value={profileData.weight?.value || ''}
//                             onChange={(e) => setProfileData({
//                               ...profileData, 
//                               weight: {...profileData.weight, value: e.target.value}
//                             })}
//                           />
//                           <Form.Select
//                             value={profileData.weight?.unit || 'kg'}
//                             onChange={(e) => handleWeightUnitChange(e.target.value)}
//                             style={{ maxWidth: '100px' }}
//                           >
//                             <option value="kg">kg</option>
//                             <option value="lb">lb</option>
//                           </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Activity Level</Form.Label>
//                     <Form.Select
//                       value={profileData.activityLevel}
//                       onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
//                     >
//                       <option value="sedentary">Sedentary (little or no exercise)</option>
//                       <option value="light">Light (exercise 1-3 days/week)</option>
//                       <option value="moderate">Moderate (exercise 3-5 days/week)</option>
//                       <option value="active">Active (exercise 6-7 days/week)</option>
//                       <option value="very-active">Very Active (hard exercise daily)</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Goal</Form.Label>
//                     <Form.Select
//                       value={profileData.goal}
//                       onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
//                     >
//                       <option value="weight-loss">Weight Loss</option>
//                       <option value="maintenance">Maintenance</option>
//                       <option value="muscle-gain">Muscle Gain</option>
//                       <option value="improve-health">Improve Health</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Bio</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       value={profileData.bio}
//                       onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
//                       maxLength={500}
//                     />
//                     <Form.Text className="text-muted">
//                       {profileData.bio.length}/500 characters
//                     </Form.Text>
//                   </Form.Group>

//                   <h6 className="mt-4 mb-3">Contact Information</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                           value={profileData.phoneNumber}
//                           onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <h6 className="mt-4 mb-3">Address</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Street</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.street || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, street: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.city || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, city: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>State</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.state || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, state: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Country</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.country || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, country: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Zip Code</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.zipCode || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, zipCode: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Button variant="primary" onClick={handleSaveProfile} disabled={loading}>
//                     {loading ? 'Saving...' : 'Save Profile'}
//                   </Button>
//                 </Form>
//               )}

//               {/* Targets Tab */}
//               {activeTab === 'targets' && (
//                 <div>
//                   {tdee && (
//                     <Alert variant="info" className="mb-4">
//                       <strong>Based on your profile:</strong>
//                       <div className="mt-2">
//                         <div>BMR (Basal Metabolic Rate): {calculateBMR()} calories/day</div>
//                         <div>TDEE (Total Daily Energy Expenditure): {tdee} calories/day</div>
//                         <div>Recommended daily calories: {tdee} calories</div>
//                       </div>
//                     </Alert>
//                   )}

//                   <Form>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Daily Calories</Form.Label>
//                       <Form.Control
//                         type="number"
//                         min="0"
//                         value={targetsData.calories}
//                         onChange={(e) => setTargetsData({...targetsData, calories: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: {tdee || '2000'} calories
//                       </Form.Text>
//                     </Form.Group>

//                     <h6 className="mt-4 mb-3">Macronutrients</h6>
//                     <Row>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Protein (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.protein}
//                             onChange={(e) => setTargetsData({...targetsData, protein: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Carbs (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.carbs}
//                             onChange={(e) => setTargetsData({...targetsData, carbs: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Fat (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.fat}
//                             onChange={(e) => setTargetsData({...targetsData, fat: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Form.Group className="mb-4">
//                       <Form.Label>Daily Water Intake (ml)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         min="0"
//                         value={targetsData.water}
//                         onChange={(e) => setTargetsData({...targetsData, water: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: 2000-3000 ml per day
//                       </Form.Text>
//                     </Form.Group>

//                     <Button variant="primary" onClick={handleSaveTargets} disabled={loading}>
//                       {loading ? 'Saving...' : 'Save Targets'}
//                     </Button>
//                   </Form>
//                 </div>
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

//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Goal Achievements"
//                       checked={notificationSettings.goalAchievements}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         goalAchievements: e.target.checked
//                       })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Friend Requests"
//                       checked={notificationSettings.friendRequests}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         friendRequests: e.target.checked
//                       })}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="System Updates"
//                       checked={notificationSettings.systemUpdates}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         systemUpdates: e.target.checked
//                       })}
//                     />
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

//               {/* Preferences Tab */}
//               {activeTab === 'preferences' && (
//                 <Form>
//                   <h6 className="mb-3">Display Settings</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Theme</Form.Label>
//                         <Form.Select
//                           value={preferences.theme}
//                           onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
//                         >
//                           <option value="light">Light</option>
//                           <option value="dark">Dark</option>
//                           <option value="auto">Auto (System)</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Language</Form.Label>
//                         <Form.Select
//                           value={preferences.language}
//                           onChange={(e) => setPreferences({...preferences, language: e.target.value})}
//                         >
//                           <option value="en">English</option>
//                           <option value="es">Spanish</option>
//                           <option value="fr">French</option>
//                           <option value="de">German</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Measurement System</Form.Label>
//                         <Form.Select
//                           value={preferences.measurementSystem}
//                           onChange={(e) => setPreferences({...preferences, measurementSystem: e.target.value})}
//                         >
//                           <option value="metric">Metric (kg, cm)</option>
//                           <option value="imperial">Imperial (lb, ft/in)</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Privacy Level</Form.Label>
//                         <Form.Select
//                           value={preferences.privacyLevel}
//                           onChange={(e) => setPreferences({...preferences, privacyLevel: e.target.value})}
//                         >
//                           <option value="public">Public</option>
//                           <option value="friends-only">Friends Only</option>
//                           <option value="private">Private</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Timezone</Form.Label>
//                     <Form.Select
//                       value={preferences.timezone}
//                       onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
//                     >
//                       <option value="UTC">UTC</option>
//                       <option value="America/New_York">Eastern Time</option>
//                       <option value="America/Chicago">Central Time</option>
//                       <option value="America/Denver">Mountain Time</option>
//                       <option value="America/Los_Angeles">Pacific Time</option>
//                       <option value="Europe/London">London</option>
//                       <option value="Europe/Paris">Paris</option>
//                       <option value="Asia/Tokyo">Tokyo</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Button variant="primary" onClick={handleSavePreferences} disabled={loading}>
//                     {loading ? 'Saving...' : 'Save Preferences'}
//                   </Button>
//                 </Form>
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
//                 <h5 className="mt-3 mb-0">
//                   {profileData.fullName || profileData.firstName || user?.username}
//                 </h5>
//                 <p className="text-muted">{user?.email}</p>
//               </div>

//               {calculatedAge && (
//                 <div className="mb-3">
//                   <h6>Age</h6>
//                   <div className="text-center">
//                     <h4>{calculatedAge} years</h4>
//                   </div>
//                 </div>
//               )}

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

//               <div className="mb-3">
//                 <h6>Measurements</h6>
//                 <ul className="list-unstyled">
//                   {profileData.height?.value && (
//                     <li className="mb-2">
//                       <small className="text-muted">Height</small>
//                       <div>
//                         <strong>
//                           {profileData.height.value} {profileData.height.unit}
//                         </strong>
//                       </div>
//                     </li>
//                   )}
//                   {profileData.weight?.value && (
//                     <li className="mb-2">
//                       <small className="text-muted">Weight</small>
//                       <div>
//                         <strong>
//                           {profileData.weight.value} {profileData.weight.unit}
//                         </strong>
//                       </div>
//                     </li>
//                   )}
//                 </ul>
//               </div>

//               <div>
//                 <h6>Current Targets</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2">
//                     <small className="text-muted">Calories</small>
//                     <div><strong>{targetsData.calories}</strong></div>
//                   </li>
//                   <li className="mb-2">
//                     <small className="text-muted">Protein</small>
//                     <div><strong>{targetsData.protein}g</strong></div>
//                   </li>
//                   {/* <li className="mb-2">
//                     <small className="text-muted">Water</small>
//                     <div><strong>{targetsData.water}ml</strong></div>
//                   </li> */}
//                 </ul>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Profile;
// new2--working only sendemailproblm 
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, InputGroup, Spinner } from 'react-bootstrap';
// import { FaUser, FaCog, FaBullseye, FaBell } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { user } = useAuth(); // Only get user data, not updateProfile
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');

//   // Profile state structure
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     fullName: '',
//     dateOfBirth: '',
//     gender: '',
//     height: { value: '', unit: 'cm', lastUpdated: new Date() },
//     weight: { value: '', unit: 'kg', lastUpdated: new Date() },
//     activityLevel: '',
//     goal: '',
//     bio: '',
//     phoneNumber: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: '',
//       zipCode: ''
//     }
//   });

//   const [targetsData, setTargetsData] = useState({
//     calories: 2000,
//     protein: 50,
//     carbs: 250,
//     fat: 70,
//     water: 2000,
//     lastUpdated: new Date()
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     mealReminders: true,
//     // waterReminders: true,
//     weeklyReports: true,
//     emailNotifications: true,
//     // pushNotifications: true,
//     // goalAchievements: true,
//     // friendRequests: true,
//     // systemUpdates: true
//   });

//   const [preferences, setPreferences] = useState({
//     theme: 'auto',
//     language: 'en',
//     measurementSystem: 'metric',
//     timezone: 'UTC',
//     privacyLevel: 'friends-only'
//   });

//   // Fetch profile data on component mount
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       setLoading(true);
//       try {
//         const response = await api.get('/auth/profile');
//         const userData = response.data;
        
//         // Set local state from fetched data - DON'T use updateProfile
//         setProfileData({
//           firstName: userData.profile?.firstName || '',
//           lastName: userData.profile?.lastName || '',
//           fullName: userData.profile?.fullName || '',
//           dateOfBirth: userData.profile?.dateOfBirth ? new Date(userData.profile.dateOfBirth).toISOString().split('T')[0] : '',
//           gender: userData.profile?.gender || 'prefer-not-to-say',
//           height: userData.profile?.height || { value: '', unit: 'cm' },
//           weight: userData.profile?.weight || { value: '', unit: 'kg' },
//           activityLevel: userData.profile?.activityLevel || 'moderate',
//           goal: userData.profile?.goal || 'maintenance',
//           bio: userData.profile?.bio || '',
//           phoneNumber: userData.profile?.phoneNumber || '',
//           address: userData.profile?.address || {
//             street: '',
//             city: '',
//             state: '',
//             country: '',
//             zipCode: ''
//           }
//         });

//         setTargetsData({
//           calories: userData.dailyTargets?.calories || 2000,
//           protein: userData.dailyTargets?.protein || 50,
//           carbs: userData.dailyTargets?.carbs || 250,
//           fat: userData.dailyTargets?.fat || 70,
//           water: userData.dailyTargets?.water || 2000,
//           lastUpdated: userData.dailyTargets?.lastUpdated || new Date()
//         });

//         setNotificationSettings({
//           mealReminders: userData.notificationSettings?.mealReminders || true,
//           waterReminders: userData.notificationSettings?.waterReminders || true,
//           weeklyReports: userData.notificationSettings?.weeklyReports || true,
//           emailNotifications: userData.notificationSettings?.emailNotifications || true,
//           pushNotifications: userData.notificationSettings?.pushNotifications || true,
//           goalAchievements: userData.notificationSettings?.goalAchievements || true,
//           friendRequests: userData.notificationSettings?.friendRequests || true,
//           systemUpdates: userData.notificationSettings?.systemUpdates || true
//         });

//         setPreferences({
//           theme: userData.preferences?.theme || 'auto',
//           language: userData.preferences?.language || 'en',
//           measurementSystem: userData.preferences?.measurementSystem || 'metric',
//           timezone: userData.preferences?.timezone || 'UTC',
//           privacyLevel: userData.preferences?.privacyLevel || 'friends-only'
//         });

//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         toast.error('Failed to load profile data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []); // Empty dependency array - run only once on mount

//   // Helper functions remain the same...
//   const convertHeightToMeters = (height) => {
//     if (!height?.value) return 0;
    
//     switch (height.unit) {
//       case 'cm':
//         return height.value / 100;
//       case 'm':
//         return height.value;
//       case 'ft':
//         return height.value * 0.3048;
//       case 'in':
//         return height.value * 0.0254;
//       default:
//         return height.value / 100;
//     }
//   };

//   const convertWeightToKg = (weight) => {
//     if (!weight?.value) return 0;
    
//     switch (weight.unit) {
//       case 'kg':
//         return weight.value;
//       case 'lb':
//         return weight.value * 0.453592;
//       default:
//         return weight.value;
//     }
//   };

//   const calculateBMI = () => {
//     if (profileData.height?.value && profileData.weight?.value) {
//       const heightInMeters = convertHeightToMeters(profileData.height);
//       const weightInKg = convertWeightToKg(profileData.weight);
      
//       if (heightInMeters === 0) return null;
//       return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
//     }
//     return null;
//   };

//   const calculateBMR = () => {
//     const weightInKg = convertWeightToKg(profileData.weight);
//     const heightInCm = profileData.height?.unit === 'cm' 
//       ? profileData.height.value 
//       : profileData.height?.unit === 'm'
//         ? profileData.height.value * 100
//         : profileData.height?.value || 0;
    
//     const age = profileData.dateOfBirth 
//       ? new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear()
//       : profileData.age || 0;
    
//     if (weightInKg && heightInCm && age && profileData.gender) {
//       if (profileData.gender === 'male') {
//         return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age + 5);
//       } else if (profileData.gender === 'female') {
//         return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age - 161);
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
//         'very-active': 1.9
//       };
//       return Math.round(bmr * (multipliers[profileData.activityLevel] || 1.55));
//     }
//     return null;
//   };

//   const handleSaveProfile = async () => {
//     setSaving(true);
//     try {
//       const updatedProfile = { ...profileData };
//       if (profileData.firstName || profileData.lastName) {
//         updatedProfile.fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
//       }
      
//       updatedProfile.height = {
//         ...updatedProfile.height,
//         lastUpdated: new Date()
//       };
//       updatedProfile.weight = {
//         ...updatedProfile.weight,
//         lastUpdated: new Date()
//       };
      
//       const response = await api.put('/auth/profile', { profile: updatedProfile });
      
//       if (response.data && response.data.user) {
//         // Update local state from response - DON'T use updateProfile
//         setProfileData({
//           ...profileData,
//           ...response.data.user.profile
//         });
        
//         toast.success('Profile updated successfully!');
//       }
      
//     } catch (error) {
//       toast.error('Failed to update profile');
//       console.error('Profile update error:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSaveTargets = async () => {
//     setSaving(true);
//     try {
//       const updatedTargets = {
//         ...targetsData,
//         lastUpdated: new Date()
//       };
      
//       const response = await api.put('/auth/profile', { dailyTargets: updatedTargets });
      
//       if (response.data && response.data.user) {
//         // Update local state only
//         setTargetsData(response.data.user.dailyTargets);
//         toast.success('Targets updated successfully!');
//       }
      
//     } catch (error) {
//       toast.error('Failed to update targets');
//       console.error('Targets update error:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSaveNotifications = async () => {
//     setSaving(true);
//     try {
//       const response = await api.put('/auth/profile', { notificationSettings });
      
//       if (response.data && response.data.user) {
//         // Update local state only
//         setNotificationSettings(response.data.user.notificationSettings);
//         toast.success('Notification settings updated!');
//       }
      
//     } catch (error) {
//       toast.error('Failed to update settings');
//       console.error('Notifications update error:', error);
//     } finally {
//       setSaving(false);
//     }
//   };
//   const exportOptions = [
//       { value: 'excel', label: 'Excel', icon: <FaFileExcel />, color: 'success' },
//       // { value: 'pdf', label: 'PDF', icon: <FaFilePdf />, color: 'danger' },
//       // { value: 'csv', label: 'CSV', icon: <FaFileCsv />, color: 'info' },
//       // { value: 'json', label: 'JSON', icon: <FaFileCode />, color: 'warning' }
//     ]
// const handleExport = async () => {
//   setLoading(true);
//   try {
//     const response = await api.post('/export/email', {
//       format: exportFormat,
//       startDate: format(startDate, 'yyyy-MM-dd'),
//       endDate: format(endDate, 'yyyy-MM-dd')
//     }, { 
//       responseType: 'blob',
//       timeout: 60000 // 60 seconds timeout for large exports
//     });
    
//     // Determine file extension based on format
//     const extensions = {
//       excel: 'xlsx',
//       pdf: 'pdf',
//       csv: 'csv',
//       json: 'json'
//     };
    
//     const extension = extensions[exportFormat] || 'xlsx';
//     const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
    
//     const url = window.URL.createObjectURL(response.data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `nutrition-data-${timestamp}.${extension}`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
    
//     // Log export in history
//     const newHistory = {
//       date: new Date(),
//       format: exportFormat,
//       period: `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`,
//       records: 0, // You can calculate this from response if needed
//       status: 'Completed'
//     };
    
//     toast.success(`Data exported successfully! File: nutrition-data-${timestamp}.${extension}`);
    
//   } catch (error) {
//     console.error('Export error:', error);
//     if (error.code === 'ECONNABORTED') {
//       toast.error('Export timed out. Try a smaller date range.');
//     } else {
//       toast.error(`Export failed: ${error.response?.data?.message || error.message}`);
//     }
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleSavePreferences = async () => {
//     setSaving(true);
//     try {
//       const response = await api.put('/auth/profile', { preferences });
      
//       if (response.data && response.data.user) {
//         // Update local state only
//         setPreferences(response.data.user.preferences);
//         toast.success('Preferences updated!');
//       }
      
//     } catch (error) {
//       toast.error('Failed to update preferences');
//       console.error('Preferences update error:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleHeightUnitChange = (unit) => {
//     setProfileData({
//       ...profileData,
//       height: {
//         ...profileData.height,
//         unit
//       }
//     });
//   };

//   const handleWeightUnitChange = (unit) => {
//     setProfileData({
//       ...profileData,
//       weight: {
//         ...profileData.weight,
//         unit
//       }
//     });
//   };

//   const getBMICategory = (bmi) => {
//     if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
//     if (bmi < 25) return { label: 'Normal', color: 'success' };
//     if (bmi < 30) return { label: 'Overweight', color: 'warning' };
//     return { label: 'Obese', color: 'danger' };
//   };

//   const getAgeFromDOB = () => {
//     if (!profileData.dateOfBirth) return null;
//     const today = new Date();
//     const birthDate = new Date(profileData.dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Show loading spinner
//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Loading profile data...</p>
//       </Container>
//     );
//   }

//   const bmi = calculateBMI();
//   const bmiCategory = bmi ? getBMICategory(bmi) : null;
//   const tdee = calculateTDEE();
//   const calculatedAge = getAgeFromDOB();

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaUser className="me-2" />Profile Settings</h2>
//           <p className="text-muted">Manage your profile, targets, and notifications</p>
//         </Col>
//       </Row>

//       <Row>
//         <Col lg={9}>
//           <Card>
//             <Card.Header>
//               <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
//                 <Tab eventKey="profile" title={<><FaUser className="me-1" />Profile</>} />
//                 <Tab eventKey="targets" title={<><FaBullseye className="me-1" />Targets</>} />
//                 <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
//                 {/* <Tab eventKey="preferences" title={<><FaCog className="me-1" />Preferences</>} /> */}
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               {/* Profile Tab */}
//               {activeTab === 'profile' && (
//                 <Form>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                           value={profileData.firstName}
//                           onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                           value={profileData.lastName}
//                           onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Date of Birth</Form.Label>
//                         <Form.Control
//                           type="date"
//                           value={profileData.dateOfBirth}
//                           onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
//                         />
//                         {calculatedAge && (
//                           <Form.Text className="text-muted">
//                             Age: {calculatedAge} years
//                           </Form.Text>
//                         )}
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Select
//                           value={profileData.gender}
//                           onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
//                         >
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                           <option value="prefer-not-to-say">Prefer not to say</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Height</Form.Label>
//                         <InputGroup>
//                           <Form.Control
//                             type="number"
//                             value={profileData.height?.value || ''}
//                             onChange={(e) => setProfileData({
//                               ...profileData, 
//                               height: {...profileData.height, value: e.target.value}
//                             })}
//                           />
//                           <Form.Select
//                             value={profileData.height?.unit || 'cm'}
//                             onChange={(e) => handleHeightUnitChange(e.target.value)}
//                             style={{ maxWidth: '100px' }}
//                           >
//                             <option value="cm">cm</option>
//                             <option value="m">m</option>
//                             <option value="ft">ft</option>
//                             <option value="in">in</option>
//                           </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Weight</Form.Label>
//                         <InputGroup>
//                           <Form.Control
//                             type="number"
//                             value={profileData.weight?.value || ''}
//                             onChange={(e) => setProfileData({
//                               ...profileData, 
//                               weight: {...profileData.weight, value: e.target.value}
//                             })}
//                           />
//                           <Form.Select
//                             value={profileData.weight?.unit || 'kg'}
//                             onChange={(e) => handleWeightUnitChange(e.target.value)}
//                             style={{ maxWidth: '100px' }}
//                           >
//                             <option value="kg">kg</option>
//                             <option value="lb">lb</option>
//                           </Form.Select>
//                         </InputGroup>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Activity Level</Form.Label>
//                     <Form.Select
//                       value={profileData.activityLevel}
//                       onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
//                     >
//                       <option value="sedentary">Sedentary (little or no exercise)</option>
//                       <option value="light">Light (exercise 1-3 days/week)</option>
//                       <option value="moderate">Moderate (exercise 3-5 days/week)</option>
//                       <option value="active">Active (exercise 6-7 days/week)</option>
//                       <option value="very-active">Very Active (hard exercise daily)</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Goal</Form.Label>
//                     <Form.Select
//                       value={profileData.goal}
//                       onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
//                     >
//                       <option value="weight-loss">Weight Loss</option>
//                       <option value="maintenance">Maintenance</option>
//                       <option value="muscle-gain">Muscle Gain</option>
//                       <option value="improve-health">Improve Health</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Bio</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       value={profileData.bio}
//                       onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
//                       maxLength={500}
//                     />
//                     <Form.Text className="text-muted">
//                       {profileData.bio.length}/500 characters
//                     </Form.Text>
//                   </Form.Group>

//                   <h6 className="mt-4 mb-3">Contact Information</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                           value={profileData.phoneNumber}
//                           onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <h6 className="mt-4 mb-3">Address</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Street</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.street || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, street: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.city || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, city: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>State</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.state || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, state: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Country</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.country || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, country: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Zip Code</Form.Label>
//                         <Form.Control
//                           value={profileData.address?.zipCode || ''}
//                           onChange={(e) => setProfileData({
//                             ...profileData,
//                             address: {...profileData.address, zipCode: e.target.value}
//                           })}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
//                     {saving ? 'Saving...' : 'Save Profile'}
//                   </Button>
//                 </Form>
//               )}

//               {/* Targets Tab */}
//               {activeTab === 'targets' && (
//                 <div>
//                   {tdee && (
//                     <Alert variant="info" className="mb-4">
//                       <strong>Based on your profile:</strong>
//                       <div className="mt-2">
//                         <div>BMR (Basal Metabolic Rate): {calculateBMR()} calories/day</div>
//                         <div>TDEE (Total Daily Energy Expenditure): {tdee} calories/day</div>
//                         <div>Recommended daily calories: {tdee} calories</div>
//                       </div>
//                     </Alert>
//                   )}

//                   <Form>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Daily Calories</Form.Label>
//                       <Form.Control
//                         type="number"
//                         min="0"
//                         value={targetsData.calories}
//                         onChange={(e) => setTargetsData({...targetsData, calories: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: {tdee || '2000'} calories
//                       </Form.Text>
//                     </Form.Group>

//                     <h6 className="mt-4 mb-3">Macronutrients</h6>
//                     <Row>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Protein (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.protein}
//                             onChange={(e) => setTargetsData({...targetsData, protein: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Carbs (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.carbs}
//                             onChange={(e) => setTargetsData({...targetsData, carbs: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={4}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>Fat (g)</Form.Label>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             value={targetsData.fat}
//                             onChange={(e) => setTargetsData({...targetsData, fat: e.target.value})}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Form.Group className="mb-4">
//                       <Form.Label>Daily Water Intake (ml)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         min="0"
//                         value={targetsData.water}
//                         onChange={(e) => setTargetsData({...targetsData, water: e.target.value})}
//                       />
//                       <Form.Text className="text-muted">
//                         Recommended: 2000-3000 ml per day
//                       </Form.Text>
//                     </Form.Group>

//                     <Button variant="primary" onClick={handleSaveTargets} disabled={saving}>
//                       {saving ? 'Saving...' : 'Save Targets'}
//                     </Button>
//                   </Form>
//                 </div>
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

//                   {/* <Form.Group className="mb-3">
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
//                   </Form.Group> */}

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
// {/* 
//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Goal Achievements"
//                       checked={notificationSettings.goalAchievements}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         goalAchievements: e.target.checked
//                       })}
//                     />
//                   </Form.Group> */}
// {/* 
//                   <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="Friend Requests"
//                       checked={notificationSettings.friendRequests}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         friendRequests: e.target.checked
//                       })}
//                     />
//                   </Form.Group> */}

//                   {/* <Form.Group className="mb-3">
//                     <Form.Check
//                       type="switch"
//                       label="System Updates"
//                       checked={notificationSettings.systemUpdates}
//                       onChange={(e) => setNotificationSettings({
//                         ...notificationSettings,
//                         systemUpdates: e.target.checked
//                       })}
//                     />
//                   </Form.Group> */}

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
                    
// {/* 
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
//                   </Form.Group> */}

//                   <Button variant="primary" onClick={handleSaveNotifications} disabled={saving}>
//                     {saving ? 'Saving...' : 'Save Notification Settings'}
//                   </Button>
// <br/>
//                   <Button variant="primary" className="mt-4 mb-3" onClick={handleExport}>
//                     Send Mail
//                   </Button>
//                 </Form>
//               )}

//               {/* Preferences Tab */}
//               {/* {activeTab === 'preferences' && (
//                 <Form>
//                   <h6 className="mb-3">Display Settings</h6>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Theme</Form.Label>
//                         <Form.Select
//                           value={preferences.theme}
//                           onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
//                         >
//                           <option value="light">Light</option>
//                           <option value="dark">Dark</option>
//                           <option value="auto">Auto (System)</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Language</Form.Label>
//                         <Form.Select
//                           value={preferences.language}
//                           onChange={(e) => setPreferences({...preferences, language: e.target.value})}
//                         >
//                           <option value="en">English</option>
//                           <option value="es">Spanish</option>
//                           <option value="fr">French</option>
//                           <option value="de">German</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Measurement System</Form.Label>
//                         <Form.Select
//                           value={preferences.measurementSystem}
//                           onChange={(e) => setPreferences({...preferences, measurementSystem: e.target.value})}
//                         >
//                           <option value="metric">Metric (kg, cm)</option>
//                           <option value="imperial">Imperial (lb, ft/in)</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Privacy Level</Form.Label>
//                         <Form.Select
//                           value={preferences.privacyLevel}
//                           onChange={(e) => setPreferences({...preferences, privacyLevel: e.target.value})}
//                         >
//                           <option value="public">Public</option>
//                           <option value="friends-only">Friends Only</option>
//                           <option value="private">Private</option>
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Timezone</Form.Label>
//                     <Form.Select
//                       value={preferences.timezone}
//                       onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
//                     >
//                       <option value="UTC">UTC</option>
//                       <option value="America/New_York">Eastern Time</option>
//                       <option value="America/Chicago">Central Time</option>
//                       <option value="America/Denver">Mountain Time</option>
//                       <option value="America/Los_Angeles">Pacific Time</option>
//                       <option value="Europe/London">London</option>
//                       <option value="Europe/Paris">Paris</option>
//                       <option value="Asia/Tokyo">Tokyo</option>
//                     </Form.Select>
//                   </Form.Group>

//                   <Button variant="primary" onClick={handleSavePreferences} disabled={saving}>
//                     {saving ? 'Saving...' : 'Save Preferences'}
//                   </Button>
//                 </Form>
//               )} */}
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
//                 <h5 className="mt-3 mb-0">
//                   {profileData.fullName || profileData.firstName || user?.username}
//                 </h5>
//                 <p className="text-muted">{user?.email}</p>
//               </div>

//               {calculatedAge && (
//                 <div className="mb-3">
//                   <h6>Age</h6>
//                   <div className="text-center">
//                     <h4>{calculatedAge} years</h4>
//                   </div>
//                 </div>
//               )}

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

//               <div className="mb-3">
//                 <h6>Measurements</h6>
//                 <ul className="list-unstyled">
//                   {profileData.height?.value && (
//                     <li className="mb-2">
//                       <small className="text-muted">Height</small>
//                       <div>
//                         <strong>
//                           {profileData.height.value} {profileData.height.unit}
//                         </strong>
//                       </div>
//                     </li>
//                   )}
//                   {profileData.weight?.value && (
//                     <li className="mb-2">
//                       <small className="text-muted">Weight</small>
//                       <div>
//                         <strong>
//                           {profileData.weight.value} {profileData.weight.unit}
//                         </strong>
//                       </div>
//                     </li>
//                   )}
//                 </ul>
//               </div>

//               <div>
//                 <h6>Current Targets</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2">
//                     <small className="text-muted">Calories</small>
//                     <div><strong>{targetsData.calories}</strong></div>
//                   </li>
//                   <li className="mb-2">
//                     <small className="text-muted">Protein</small>
//                     <div><strong>{targetsData.protein}g</strong></div>
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

// export default Profile;

// new4
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, InputGroup, Spinner, Modal, Badge } from 'react-bootstrap';
import { FaUser, FaCog, FaBullseye, FaBell, FaEnvelope, FaFileExcel, FaCalendarAlt, FaDownload, FaPaperPlane } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [sendToEmail, setSendToEmail] = useState(true);
  const [customEmail, setCustomEmail] = useState('');

  // Profile state structure
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    height: { value: '', unit: 'cm', lastUpdated: new Date() },
    weight: { value: '', unit: 'kg', lastUpdated: new Date() },
    activityLevel: '',
    goal: '',
    bio: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  });

  const [targetsData, setTargetsData] = useState({
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 70,
    water: 2000,
    lastUpdated: new Date()
  });

  const [notificationSettings, setNotificationSettings] = useState({
    mealReminders: true,
    weeklyReports: true,
    emailNotifications: true,
    exportEmailSettings: {
      mealReminders: {
        enabled: false,
        frequency: 'weekly',
        format: 'excel'
      },
      weeklyReports: {
        enabled: false,
        frequency: 'weekly',
        format: 'excel'
      }
    }
  });

  const [preferences, setPreferences] = useState({
    theme: 'auto',
    language: 'en',
    measurementSystem: 'metric',
    timezone: 'UTC',
    privacyLevel: 'friends-only'
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/auth/profile');
        const userData = response.data;
        
        setProfileData({
          firstName: userData.profile?.firstName || '',
          lastName: userData.profile?.lastName || '',
          fullName: userData.profile?.fullName || '',
          dateOfBirth: userData.profile?.dateOfBirth ? new Date(userData.profile.dateOfBirth).toISOString().split('T')[0] : '',
          gender: userData.profile?.gender || 'prefer-not-to-say',
          height: userData.profile?.height || { value: '', unit: 'cm' },
          weight: userData.profile?.weight || { value: '', unit: 'kg' },
          activityLevel: userData.profile?.activityLevel || 'moderate',
          goal: userData.profile?.goal || 'maintenance',
          bio: userData.profile?.bio || '',
          phoneNumber: userData.profile?.phoneNumber || '',
          address: userData.profile?.address || {
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
          }
        });

        setTargetsData({
          calories: userData.dailyTargets?.calories || 2000,
          protein: userData.dailyTargets?.protein || 50,
          carbs: userData.dailyTargets?.carbs || 250,
          fat: userData.dailyTargets?.fat || 70,
          water: userData.dailyTargets?.water || 2000,
          lastUpdated: userData.dailyTargets?.lastUpdated || new Date()
        });

        setNotificationSettings({
          mealReminders: userData.notificationSettings?.mealReminders || true,
          weeklyReports: userData.notificationSettings?.weeklyReports || true,
          emailNotifications: userData.notificationSettings?.emailNotifications || true,
          exportEmailSettings: userData.notificationSettings?.exportEmailSettings || {
            mealReminders: {
              enabled: false,
              frequency: 'weekly',
              format: 'excel'
            },
            weeklyReports: {
              enabled: false,
              frequency: 'weekly',
              format: 'excel'
            }
          }
        });

        setPreferences({
          theme: userData.preferences?.theme || 'auto',
          language: userData.preferences?.language || 'en',
          measurementSystem: userData.preferences?.measurementSystem || 'metric',
          timezone: userData.preferences?.timezone || 'UTC',
          privacyLevel: userData.preferences?.privacyLevel || 'friends-only'
        });

      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Helper functions
  const convertHeightToMeters = (height) => {
    if (!height?.value) return 0;
    
    switch (height.unit) {
      case 'cm':
        return height.value / 100;
      case 'm':
        return height.value;
      case 'ft':
        return height.value * 0.3048;
      case 'in':
        return height.value * 0.0254;
      default:
        return height.value / 100;
    }
  };

  const convertWeightToKg = (weight) => {
    if (!weight?.value) return 0;
    
    switch (weight.unit) {
      case 'kg':
        return weight.value;
      case 'lb':
        return weight.value * 0.453592;
      default:
        return weight.value;
    }
  };

  const calculateBMI = () => {
    if (profileData.height?.value && profileData.weight?.value) {
      const heightInMeters = convertHeightToMeters(profileData.height);
      const weightInKg = convertWeightToKg(profileData.weight);
      
      if (heightInMeters === 0) return null;
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const calculateBMR = () => {
    const weightInKg = convertWeightToKg(profileData.weight);
    const heightInCm = profileData.height?.unit === 'cm' 
      ? profileData.height.value 
      : profileData.height?.unit === 'm'
        ? profileData.height.value * 100
        : profileData.height?.value || 0;
    
    const age = profileData.dateOfBirth 
      ? new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear()
      : profileData.age || 0;
    
    if (weightInKg && heightInCm && age && profileData.gender) {
      if (profileData.gender === 'male') {
        return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age + 5);
      } else if (profileData.gender === 'female') {
        return Math.round(10 * weightInKg + 6.25 * heightInCm - 5 * age - 161);
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
        'very-active': 1.9
      };
      return Math.round(bmr * (multipliers[profileData.activityLevel] || 1.55));
    }
    return null;
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updatedProfile = { ...profileData };
      if (profileData.firstName || profileData.lastName) {
        updatedProfile.fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
      }
      
      updatedProfile.height = {
        ...updatedProfile.height,
        lastUpdated: new Date()
      };
      updatedProfile.weight = {
        ...updatedProfile.weight,
        lastUpdated: new Date()
      };
      
      const response = await api.put('/auth/profile', { profile: updatedProfile });
      
      if (response.data && response.data.user) {
        setProfileData({
          ...profileData,
          ...response.data.user.profile
        });
        toast.success('Profile updated successfully!');
      }
      
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTargets = async () => {
    setSaving(true);
    try {
      const updatedTargets = {
        ...targetsData,
        lastUpdated: new Date()
      };
      
      const response = await api.put('/auth/profile', { dailyTargets: updatedTargets });
      
      if (response.data && response.data.user) {
        setTargetsData(response.data.user.dailyTargets);
        toast.success('Targets updated successfully!');
      }
      
    } catch (error) {
      toast.error('Failed to update targets');
      console.error('Targets update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const response = await api.put('/auth/profile', { notificationSettings });
      
      if (response.data && response.data.user) {
        setNotificationSettings(response.data.user.notificationSettings);
        toast.success('Notification settings updated!');
      }
      
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Notifications update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      const response = await api.put('/auth/profile', { preferences });
      
      if (response.data && response.data.user) {
        setPreferences(response.data.user.preferences);
        toast.success('Preferences updated!');
      }
      
    } catch (error) {
      toast.error('Failed to update preferences');
      console.error('Preferences update error:', error);
    } finally {
      setSaving(false);
    }
  };

  // Email Export Functions
  const handleEmailExport = async () => {
    setExporting(true);
    try {
      const exportData = {
        format: exportFormat,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        email: customEmail || user.email,
        sendToEmail: true
      };

      const response = await api.post('/export/email', exportData);
      
      if (response.data.success) {
        toast.success(`Report sent to ${exportData.email}!`);
        setShowExportModal(false);
      } else {
        toast.error('Failed to send report via email');
      }
      
    } catch (error) {
      console.error('Email export error:', error);
      toast.error(`Export failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setExporting(false);
    }
  };

  // Direct Download Export
  const handleDirectExport = async () => {
    setExporting(true);
    try {
      const response = await api.post('/export/export', {
        format: exportFormat,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }, { 
        responseType: 'blob',
        timeout: 60000
      });
      
      // Determine file extension
      const extension = exportFormat === 'excel' ? 'xlsx' : 'json';
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      
      // Create download link
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `nutrition-report-${timestamp}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully!');
      setShowExportModal(false);
      
    } catch (error) {
      console.error('Direct export error:', error);
      if (error.code === 'ECONNABORTED') {
        toast.error('Export timed out. Try a smaller date range.');
      } else {
        toast.error(`Export failed: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setExporting(false);
    }
  };

  // Handle export based on selection
  const handleExport = async () => {
    if (sendToEmail) {
      await handleEmailExport();
    } else {
      await handleDirectExport();
    }
  };

  // Quick export functions for each toggle
  const handleQuickEmailExport = async (type) => {
    setExporting(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      
      const exportData = {
        format: 'excel',
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        email: user.email,
        reportType: type
      };

      const response = await api.post('/export/email', exportData);
      
      if (response.data.success) {
        toast.success(`${type === 'mealReminders' ? 'Meal reminders' : 'Weekly'} report sent to ${user.email}!`);
      } else {
        toast.error('Failed to send report');
      }
      
    } catch (error) {
      console.error('Quick export error:', error);
      toast.error(`Failed to send report: ${error.response?.data?.message || error.message}`);
    } finally {
      setExporting(false);
    }
  };

  const handleHeightUnitChange = (unit) => {
    setProfileData({
      ...profileData,
      height: {
        ...profileData.height,
        unit
      }
    });
  };

  const handleWeightUnitChange = (unit) => {
    setProfileData({
      ...profileData,
      weight: {
        ...profileData.weight,
        unit
      }
    });
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'warning' };
    if (bmi < 25) return { label: 'Normal', color: 'success' };
    if (bmi < 30) return { label: 'Overweight', color: 'warning' };
    return { label: 'Obese', color: 'danger' };
  };

  const getAgeFromDOB = () => {
    if (!profileData.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(profileData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Show loading spinner
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading profile data...</p>
      </Container>
    );
  }

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const tdee = calculateTDEE();
  const calculatedAge = getAgeFromDOB();

  return (
    <>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2><FaUser className="me-2" />Profile Settings</h2>
            <p className="text-muted">Manage your profile, targets, and notifications</p>
          </Col>
        </Row>

        <Row>
          <Col lg={9}>
            <Card>
              <Card.Header>
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-0">
                  <Tab eventKey="profile" title={<><FaUser className="me-1" />Profile</>} />
                  <Tab eventKey="targets" title={<><FaBullseye className="me-1" />Targets</>} />
                  <Tab eventKey="notifications" title={<><FaBell className="me-1" />Notifications</>} />
                </Tabs>
              </Card.Header>
              <Card.Body>
                {/* Profile Tab (unchanged) */}
                {activeTab === 'profile' && (
                  <Form>
                      <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        />
                        {calculatedAge && (
                          <Form.Text className="text-muted">
                            Age: {calculatedAge} years
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          value={profileData.gender}
                          onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Height</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            value={profileData.height?.value || ''}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              height: {...profileData.height, value: e.target.value}
                            })}
                          />
                          <Form.Select
                            value={profileData.height?.unit || 'cm'}
                            onChange={(e) => handleHeightUnitChange(e.target.value)}
                            style={{ maxWidth: '100px' }}
                          >
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                            <option value="ft">ft</option>
                            <option value="in">in</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Weight</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            value={profileData.weight?.value || ''}
                            onChange={(e) => setProfileData({
                              ...profileData, 
                              weight: {...profileData.weight, value: e.target.value}
                            })}
                          />
                          <Form.Select
                            value={profileData.weight?.unit || 'kg'}
                            onChange={(e) => handleWeightUnitChange(e.target.value)}
                            style={{ maxWidth: '100px' }}
                          >
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Activity Level</Form.Label>
                    <Form.Select
                      value={profileData.activityLevel}
                      onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
                    >
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Light (exercise 1-3 days/week)</option>
                      <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                      <option value="active">Active (exercise 6-7 days/week)</option>
                      <option value="very-active">Very Active (hard exercise daily)</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Goal</Form.Label>
                    <Form.Select
                      value={profileData.goal}
                      onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="improve-health">Improve Health</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      maxLength={500}
                    />
                    <Form.Text className="text-muted">
                      {profileData.bio.length}/500 characters
                    </Form.Text>
                  </Form.Group>

                  <h6 className="mt-4 mb-3">Contact Information</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          value={profileData.phoneNumber}
                          onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h6 className="mt-4 mb-3">Address</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          value={profileData.address?.street || ''}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: {...profileData.address, street: e.target.value}
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          value={profileData.address?.city || ''}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: {...profileData.address, city: e.target.value}
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          value={profileData.address?.state || ''}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: {...profileData.address, state: e.target.value}
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          value={profileData.address?.country || ''}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: {...profileData.address, country: e.target.value}
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          value={profileData.address?.zipCode || ''}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: {...profileData.address, zipCode: e.target.value}
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                    <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </Form>
                )}

                {/* Targets Tab (unchanged) */}
                {activeTab === 'targets' && (
                  <div>
                    {tdee && (
                      <Alert variant="info" className="mb-4">
                        <strong>Based on your profile:</strong>
                        <div className="mt-2">
                          <div>BMR (Basal Metabolic Rate): {calculateBMR()} calories/day</div>
                          <div>TDEE (Total Daily Energy Expenditure): {tdee} calories/day</div>
                          <div>Recommended daily calories: {tdee} calories</div>
                        </div>
                      </Alert>
                    )}

                    <Form>
                        <Form.Group className="mb-3">
                      <Form.Label>Daily Calories</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={targetsData.calories}
                        onChange={(e) => setTargetsData({...targetsData, calories: e.target.value})}
                      />
                      <Form.Text className="text-muted">
                        Recommended: {tdee || '2000'} calories
                      </Form.Text>
                    </Form.Group>

                    <h6 className="mt-4 mb-3">Macronutrients</h6>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Protein (g)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            value={targetsData.protein}
                            onChange={(e) => setTargetsData({...targetsData, protein: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Carbs (g)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            value={targetsData.carbs}
                            onChange={(e) => setTargetsData({...targetsData, carbs: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Fat (g)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            value={targetsData.fat}
                            onChange={(e) => setTargetsData({...targetsData, fat: e.target.value})}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Daily Water Intake (ml)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={targetsData.water}
                        onChange={(e) => setTargetsData({...targetsData, water: e.target.value})}
                      />
                      <Form.Text className="text-muted">
                        Recommended: 2000-3000 ml per day
                      </Form.Text>
                    </Form.Group>
                      <Button variant="primary" onClick={handleSaveTargets} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Targets'}
                      </Button>
                    </Form>
                  </div>
                )}

                {/* Notifications Tab - UPDATED with email buttons */}
                {activeTab === 'notifications' && (
                  <Form>
                    <h6 className="mb-3">Reminders</h6>
                    
                    {/* Meal Reminders with Email Button */}
                    <Form.Group className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Check
                          type="switch"
                          label="Meal Reminders"
                          checked={notificationSettings.mealReminders}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            mealReminders: e.target.checked
                          })}
                        />
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleQuickEmailExport('mealReminders')}
                          disabled={exporting || !notificationSettings.emailNotifications}
                          title="Send meal report via email"
                        >
                          <FaEnvelope className="me-1" /> Send Report
                        </Button>
                      </div>
                      <Form.Text className="text-muted">
                        Get reminders to log your meals
                      </Form.Text>
                    </Form.Group>

                    {/* Weekly Reports with Email Button */}
                    <Form.Group className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Check
                          type="switch"
                          label="Weekly Reports"
                          checked={notificationSettings.weeklyReports}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            weeklyReports: e.target.checked
                          })}
                        />
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleQuickEmailExport('weeklyReports')}
                          disabled={exporting || !notificationSettings.emailNotifications}
                          title="Send weekly report via email"
                        >
                          <FaEnvelope className="me-1" /> Send Report
                        </Button>
                      </div>
                      <Form.Text className="text-muted">
                        Receive weekly nutrition reports
                      </Form.Text>
                    </Form.Group>

                    {/* Email Notifications */}
                    <h6 className="mt-4 mb-3">Notification Channels</h6>
                    <Form.Group className="mb-4">
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

                    <div className="d-flex gap-2">
                      <Button variant="primary" onClick={handleSaveNotifications} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Notification Settings'}
                      </Button>
                      
                      <Button 
                        variant="success" 
                        onClick={() => setShowExportModal(true)}
                        disabled={exporting}
                      >
                        <FaPaperPlane className="me-1" /> Export Data
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3}>
            {/* ... Profile Summary Card (same as before) ... */}
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
                <h5 className="mt-3 mb-0">
                  {profileData.fullName || profileData.firstName || user?.username}
                </h5>
                <p className="text-muted">{user?.email}</p>
              </div>

              {calculatedAge && (
                <div className="mb-3">
                  <h6>Age</h6>
                  <div className="text-center">
                    <h4>{calculatedAge} years</h4>
                  </div>
                </div>
              )}

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

              <div className="mb-3">
                <h6>Measurements</h6>
                <ul className="list-unstyled">
                  {profileData.height?.value && (
                    <li className="mb-2">
                      <small className="text-muted">Height</small>
                      <div>
                        <strong>
                          {profileData.height.value} {profileData.height.unit}
                        </strong>
                      </div>
                    </li>
                  )}
                  {profileData.weight?.value && (
                    <li className="mb-2">
                      <small className="text-muted">Weight</small>
                      <div>
                        <strong>
                          {profileData.weight.value} {profileData.weight.unit}
                        </strong>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h6>Current Targets</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <small className="text-muted">Calories</small>
                    <div><strong>{targetsData.calories}</strong></div>
                  </li>
                  <li className="mb-2">
                    <small className="text-muted">Protein</small>
                    <div><strong>{targetsData.protein}g</strong></div>
                  </li>
                </ul>
              </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Export Modal */}
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title><FaPaperPlane className="me-2" />Export Nutrition Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label><FaCalendarAlt className="me-1" />Start Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    maxDate={endDate}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label><FaCalendarAlt className="me-1" />End Date</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    minDate={startDate}
                    maxDate={new Date()}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Export Format</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={exportFormat === 'excel' ? 'success' : 'outline-success'}
                  onClick={() => setExportFormat('excel')}
                  className="flex-grow-1"
                >
                  <FaFileExcel className="me-1" /> Excel
                </Button>
                <Button
                  variant={exportFormat === 'json' ? 'warning' : 'outline-warning'}
                  onClick={() => setExportFormat('json')}
                  className="flex-grow-1"
                >
                  JSON
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Send via Email"
                checked={sendToEmail}
                onChange={(e) => setSendToEmail(e.target.checked)}
                id="send-email-switch"
              />
              <Form.Text className="text-muted">
                {sendToEmail 
                  ? `Report will be sent to ${customEmail || user.email}`
                  : 'Report will be downloaded directly'}
              </Form.Text>
            </Form.Group>

            {sendToEmail && (
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Leave empty to use your account email: {user.email}
                </Form.Text>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExportModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {sendToEmail ? 'Sending...' : 'Exporting...'}
              </>
            ) : (
              <>
                {sendToEmail ? <FaPaperPlane className="me-1" /> : <FaDownload className="me-1" />}
                {sendToEmail ? 'Send via Email' : 'Download'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;