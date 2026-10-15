// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, ProgressBar, Table, Spinner } from 'react-bootstrap';
// import { FaFire, FaTint, FaAppleAlt, FaChartLine } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import { format } from 'date-fns';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import NutritionChart from '../components/NutritionChart';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [summary, setSummary] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [selectedDate]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const [summaryRes, waterRes] = await Promise.all([
//         api.get(`/meals/summary?date=${dateStr}`),
//         api.get(`/water?date=${dateStr}`)
//       ]);
//       setSummary(summaryRes.data);
//       setWaterIntake(waterRes.data.total || 0);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateProgress = (current, target) => target > 0 ? Math.min((current / target) * 100, 100) : 0;

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2>Dashboard</h2>
//           <p className="text-muted">{format(selectedDate, 'MMMM d, yyyy')}</p>
//         </Col>
//         <Col md="auto">
//           <DatePicker selected={selectedDate} onChange={setSelectedDate} className="form-control" />
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <FaFire className="text-danger mb-2" size={24} />
//               <Card.Title>{summary?.calories || 0} / {user?.dailyTargets?.calories || 2000}</Card.Title>
//               <Card.Text>Calories</Card.Text>
//               <ProgressBar now={calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000)} variant="danger" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <FaTint className="text-primary mb-2" size={24} />
//               <Card.Title>{waterIntake} / {user?.dailyTargets?.water || 2000} ml</Card.Title>
//               <Card.Text>Water</Card.Text>
//               <ProgressBar now={calculateProgress(waterIntake, user?.dailyTargets?.water || 2000)} variant="primary" />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <FaAppleAlt className="text-success mb-2" size={24} />
//               <Card.Title>{summary?.meals?.length || 0} Meals</Card.Title>
//               <Card.Text>Logged Today</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <FaChartLine className="text-warning mb-2" size={24} />
//               <Card.Title>BMI</Card.Title>
//               <Card.Text>
//                 {user?.profile?.weight && user?.profile?.height 
//                   ? ((user.profile.weight / ((user.profile.height/100) ** 2)).toFixed(1))
//                   : '--'}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={8}>
//           <Card>
//             <Card.Header><h5>Nutrition Summary</h5></Card.Header>
//             <Card.Body>
//               {summary && <NutritionChart summary={summary} targets={user.dailyTargets} />}
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Header><h5>Macronutrients</h5></Card.Header>
//             <Card.Body>
//               <Table borderless>
//                 <tbody>
//                   <tr><td><strong>Protein</strong></td><td className="text-end">{summary?.protein?.toFixed(1) || 0}g</td></tr>
//                   <tr><td><strong>Carbs</strong></td><td className="text-end">{summary?.carbs?.toFixed(1) || 0}g</td></tr>
//                   <tr><td><strong>Fat</strong></td><td className="text-end">{summary?.fat?.toFixed(1) || 0}g</td></tr>
//                   <tr><td><strong>Fiber</strong></td><td className="text-end">{summary?.fiber?.toFixed(1) || 0}g</td></tr>
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Card>
//             <Card.Header><h5>Today's Meals</h5></Card.Header>
//             <Card.Body>
//               {summary?.meals?.length > 0 ? (
//                 <Table responsive>
//                   <thead><tr><th>Meal</th><th>Food</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr></thead>
//                   <tbody>
//                     {summary.meals.map((meal, i) => (
//                       <tr key={i}>
//                         <td className="text-capitalize">{meal.mealType}</td>
//                         <td>{meal.entries.map(e => e.food?.name).join(', ')}</td>
//                         <td>{meal.totalNutrition.calories}</td>
//                         <td>{meal.totalNutrition.protein}g</td>
//                         <td>{meal.totalNutrition.carbs}g</td>
//                         <td>{meal.totalNutrition.fat}g</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : <p className="text-center text-muted">No meals logged</p>}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
// new
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, ProgressBar, Table, Spinner } from 'react-bootstrap';
// import { FaFire, FaTint, FaAppleAlt, FaChartLine } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import { format } from 'date-fns';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import NutritionChart from '../components/NutritionChart';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [summary, setSummary] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [selectedDate]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const [summaryRes, waterRes] = await Promise.all([
//         api.get(`/meals/summary?date=${dateStr}`),
//         api.get(`/water?date=${dateStr}`)
//       ]);
//       setSummary(summaryRes.data);
//       setWaterIntake(waterRes.data.total || 0);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate progress percentage (capped at 100%)
//   const calculateProgress = (current, target) => target > 0 ? Math.min((current / target) * 100, 100) : 0;

//   // Calculate BMI based on updated schema structure
//   const calculateBMI = () => {
//     if (!user?.profile?.weight?.value || !user?.profile?.height?.value) return null;
    
//     // Convert height to meters
//     let heightInMeters;
//     switch (user.profile.height.unit) {
//       case 'cm':
//         heightInMeters = user.profile.height.value / 100;
//         break;
//       case 'm':
//         heightInMeters = user.profile.height.value;
//         break;
//       case 'ft':
//         heightInMeters = user.profile.height.value * 0.3048;
//         break;
//       case 'in':
//         heightInMeters = user.profile.height.value * 0.0254;
//         break;
//       default:
//         heightInMeters = user.profile.height.value / 100; // Default to cm
//     }
    
//     // Convert weight to kg
//     let weightInKg;
//     switch (user.profile.weight.unit) {
//       case 'kg':
//         weightInKg = user.profile.weight.value;
//         break;
//       case 'lb':
//         weightInKg = user.profile.weight.value * 0.453592;
//         break;
//       default:
//         weightInKg = user.profile.weight.value; // Default to kg
//     }
    
//     if (heightInMeters === 0) return null;
//     return weightInKg / (heightInMeters * heightInMeters);
//   };

//   // Get BMI category
//   const getBMICategory = (bmi) => {
//     if (!bmi) return null;
//     if (bmi < 18.5) return { label: 'Underweight', variant: 'warning' };
//     if (bmi < 25) return { label: 'Normal', variant: 'success' };
//     if (bmi < 30) return { label: 'Overweight', variant: 'warning' };
//     return { label: 'Obese', variant: 'danger' };
//   };

//   // Get water target from user's daily targets
//   const getWaterTarget = () => {
//     return user?.dailyTargets?.water || 2000; // Default to 2000ml if not set
//   };

//   const bmi = calculateBMI();
//   const bmiCategory = getBMICategory(bmi);
//   const waterTarget = getWaterTarget();

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading dashboard data...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2>Dashboard</h2>
//           <p className="text-muted">{format(selectedDate, 'MMMM d, yyyy')}</p>
//         </Col>
//         <Col md="auto">
//           <DatePicker 
//             selected={selectedDate} 
//             onChange={setSelectedDate} 
//             className="form-control"
//             dateFormat="MMM d, yyyy"
//           />
//         </Col>
//       </Row>

//       {/* Stats Cards */}
//       <Row className="mb-4">
//         {/* Calories Card */}
//         <Col md={3}>
//           <Card className="text-center h-100">
//             <Card.Body>
//               <FaFire className="text-danger mb-2" size={24} />
//               <Card.Title>
//                 {summary?.calories || 0} / {user?.dailyTargets?.calories || 2000}
//               </Card.Title>
//               <Card.Text>Calories</Card.Text>
//               <ProgressBar 
//                 now={calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000)} 
//                 variant="danger"
//                 label={`${Math.round(calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000))}%`}
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Water Card */}
//         <Col md={3}>
//           <Card className="text-center h-100">
//             <Card.Body>
//               <FaTint className="text-primary mb-2" size={24} />
//               <Card.Title>
//                 {waterIntake} / {waterTarget} ml
//               </Card.Title>
//               <Card.Text>Water Intake</Card.Text>
//               <ProgressBar 
//                 now={calculateProgress(waterIntake, waterTarget)} 
//                 variant="primary"
//                 label={`${Math.round(calculateProgress(waterIntake, waterTarget))}%`}
//               />
//               {/* Water intake guidance */}
//               <small className="text-muted">
//                 {waterIntake >= waterTarget 
//                   ? 'Great job! You met your water goal! 💧'
//                   : `${waterTarget - waterIntake}ml more to reach your goal`
//                 }
//               </small>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Meals Card */}
//         <Col md={3}>
//           <Card className="text-center h-100">
//             <Card.Body>
//               <FaAppleAlt className="text-success mb-2" size={24} />
//               <Card.Title>{summary?.meals?.length || 0}</Card.Title>
//               <Card.Text>Meals Logged</Card.Text>
//               {/* Meals breakdown if available */}
//               {summary?.meals?.length > 0 && (
//                 <small className="text-muted d-block mt-2">
//                   {summary.meals.map(meal => meal.mealType).join(', ')}
//                 </small>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* BMI Card */}
//         <Col md={3}>
//           <Card className="text-center h-100">
//             <Card.Body>
//               <FaChartLine className="text-warning mb-2" size={24} />
//               <Card.Title>
//                 {bmi ? bmi.toFixed(1) : '--'}
//               </Card.Title>
//               <Card.Text>Body Mass Index</Card.Text>
//               {bmiCategory && (
//                 <>
//                   <span className={`badge bg-${bmiCategory.variant}`}>
//                     {bmiCategory.label}
//                   </span>
//                   {/* BMI Range Info */}
//                   <small className="text-muted d-block mt-2">
//                     Healthy range: 18.5 - 24.9
//                   </small>
//                 </>
//               )}
//               {!bmi && (
//                 <small className="text-muted d-block">
//                   Update profile to calculate
//                 </small>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts and Macros Section */}
//       <Row className="mb-4">
//         <Col md={8}>
//           <Card className="h-100">
//             <Card.Header>
//               <h5 className="mb-0">Nutrition Summary</h5>
//             </Card.Header>
//             <Card.Body>
//               {summary ? (
//                 <NutritionChart summary={summary} targets={user?.dailyTargets} />
//               ) : (
//                 <div className="text-center py-4">
//                   <p className="text-muted">No nutrition data available for this date</p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="h-100">
//             <Card.Header>
//               <h5 className="mb-0">Macronutrients</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table borderless className="mb-0">
//                 <tbody>
//                   <tr>
//                     <td><strong>Protein</strong></td>
//                     <td className="text-end">{summary?.protein?.toFixed(1) || 0}g</td>
//                     <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                       {user?.dailyTargets?.protein ? `${Math.round((summary?.protein || 0) / user.dailyTargets.protein * 100)}%` : '-'}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><strong>Carbs</strong></td>
//                     <td className="text-end">{summary?.carbs?.toFixed(1) || 0}g</td>
//                     <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                       {user?.dailyTargets?.carbs ? `${Math.round((summary?.carbs || 0) / user.dailyTargets.carbs * 100)}%` : '-'}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><strong>Fat</strong></td>
//                     <td className="text-end">{summary?.fat?.toFixed(1) || 0}g</td>
//                     <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                       {user?.dailyTargets?.fat ? `${Math.round((summary?.fat || 0) / user.dailyTargets.fat * 100)}%` : '-'}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td><strong>Fiber</strong></td>
//                     <td className="text-end">{summary?.fiber?.toFixed(1) || 0}g</td>
//                     <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                       -
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Water Section - Moved to separate card for better focus */}
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">
//                 <FaTint className="me-2 text-primary" />
//                 Hydration Today
//               </h5>
//             </Card.Header>
//             <Card.Body>
//               <Row>
//                 <Col md={8}>
//                   <ProgressBar 
//                     now={calculateProgress(waterIntake, waterTarget)} 
//                     variant="primary" 
//                     className="mb-3"
//                     style={{ height: '20px' }}
//                     label={`${waterIntake}ml / ${waterTarget}ml`}
//                   />
//                   <div className="d-flex justify-content-between text-muted">
//                     <small>0ml</small>
//                     <small>{waterTarget}ml</small>
//                   </div>
//                 </Col>
//                 <Col md={4} className="text-center">
//                   <h3 className="text-primary mb-2">{waterIntake}ml</h3>
//                   <p className="text-muted mb-0">Total consumed</p>
//                   {/* Water recommendation based on profile */}
//                   {user?.profile?.weight?.value && (
//                     <small className="text-muted">
//                       Recommended: {Math.round(user.profile.weight.value * 30)}ml/day
//                     </small>
//                   )}
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Meals Table */}
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">Today's Meals</h5>
//             </Card.Header>
//             <Card.Body>
//               {summary?.meals?.length > 0 ? (
//                 <div className="table-responsive">
//                   <Table hover>
//                     <thead>
//                       <tr>
//                         <th>Meal Type</th>
//                         <th>Food Items</th>
//                         <th>Calories</th>
//                         <th>Protein</th>
//                         <th>Carbs</th>
//                         <th>Fat</th>
//                         <th>Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {summary.meals.map((meal, i) => (
//                         <tr key={i}>
//                           <td className="text-capitalize">{meal.mealType}</td>
//                           <td>
//                             {meal.entries.map((e, idx) => (
//                               <span key={idx}>
//                                 {e.food?.name || 'Unknown Food'}
//                                 {idx < meal.entries.length - 1 ? ', ' : ''}
//                               </span>
//                             ))}
//                           </td>
//                           <td>{meal.totalNutrition.calories}</td>
//                           <td>{meal.totalNutrition.protein}g</td>
//                           <td>{meal.totalNutrition.carbs}g</td>
//                           <td>{meal.totalNutrition.fat}g</td>
//                           <td>
//                             {meal.timestamp ? format(new Date(meal.timestamp), 'h:mm a') : '--'}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               ) : (
//                 <div className="text-center py-4">
//                   <FaAppleAlt className="text-muted mb-3" size={48} />
//                   <p className="text-muted">No meals logged for today</p>
//                   <p className="text-muted small">
//                     Click the "Log Meal" button to start tracking your nutrition
//                   </p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

// new1
// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Card, ProgressBar, Table, Spinner, Button, Form } from 'react-bootstrap';
// import { FaFire, FaAppleAlt, FaChartLine, FaCalendarAlt, FaUtensils, FaChartPie } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import { format, startOfWeek, endOfWeek, eachDayOfInterval, subDays, addDays } from 'date-fns';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [summary, setSummary] = useState(null);
//   const [weekSummary, setWeekSummary] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeDay, setActiveDay] = useState(format(new Date(), 'EEE').toLowerCase());

//   useEffect(() => {
//     fetchDashboardData();
//     fetchWeekData();
//   }, [selectedDate]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const [summaryRes] = await Promise.all([
//         api.get(`/meals/summary?date=${dateStr}`)
//       ]);
//       setSummary(summaryRes.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWeekData = async () => {
//     try {
//       const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
//       const endDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
      
//       const weekData = [];
//       for (let i = 0; i < 7; i++) {
//         const currentDate = addDays(startDate, i);
//         try {
//           const response = await api.get(`/meals/summary?date=${format(currentDate, 'yyyy-MM-dd')}`);
//           weekData.push({
//             date: currentDate,
//             calories: response.data?.calories || 0,
//             meals: response.data?.meals?.length || 0,
//             dayName: format(currentDate, 'EEE').toUpperCase(),
//             fullDayName: format(currentDate, 'EEEE')
//           });
//         } catch (error) {
//           weekData.push({
//             date: currentDate,
//             calories: 0,
//             meals: 0,
//             dayName: format(currentDate, 'EEE').toUpperCase(),
//             fullDayName: format(currentDate, 'EEEE')
//           });
//         }
//       }
//       setWeekSummary(weekData);
//     } catch (error) {
//       console.error('Error fetching week data:', error);
//     }
//   };

//   const calculateProgress = (current, target) => target > 0 ? Math.min((current / target) * 100, 100) : 0;

//   const calculateBMI = () => {
//     if (!user?.profile?.weight?.value || !user?.profile?.height?.value) return null;
    
//     let heightInMeters;
//     switch (user.profile.height.unit) {
//       case 'cm':
//         heightInMeters = user.profile.height.value / 100;
//         break;
//       case 'm':
//         heightInMeters = user.profile.height.value;
//         break;
//       case 'ft':
//         heightInMeters = user.profile.height.value * 0.3048;
//         break;
//       case 'in':
//         heightInMeters = user.profile.height.value * 0.0254;
//         break;
//       default:
//         heightInMeters = user.profile.height.value / 100;
//     }
    
//     let weightInKg;
//     switch (user.profile.weight.unit) {
//       case 'kg':
//         weightInKg = user.profile.weight.value;
//         break;
//       case 'lb':
//         weightInKg = user.profile.weight.value * 0.453592;
//         break;
//       default:
//         weightInKg = user.profile.weight.value;
//     }
    
//     if (heightInMeters === 0) return null;
//     return weightInKg / (heightInMeters * heightInMeters);
//   };

//   const getBMICategory = (bmi) => {
//     if (!bmi) return null;
//     if (bmi < 18.5) return { label: 'Underweight', variant: 'warning' };
//     if (bmi < 25) return { label: 'Normal', variant: 'success' };
//     if (bmi < 30) return { label: 'Overweight', variant: 'warning' };
//     return { label: 'Obese', variant: 'danger' };
//   };

//   // Chart data for weekly calories
//   const weeklyChartData = {
//     labels: weekSummary.map(day => day.dayName),
//     datasets: [
//       {
//         label: 'Daily Calories',
//         data: weekSummary.map(day => day.calories),
//         backgroundColor: [
//           '#A7E8D283',
//           '#99DEC983',
//           '#8BD4BF83',
//           '#6FBFAB83',
//           '#53AA9783',
//           '#45A08D83',
//           '#37958383'
//         ],
//         borderColor: '#2c3e50',
//         borderWidth: 1,
//         borderRadius: 5,
//       }
//     ]
//   };

//   // Chart data for macronutrients pie chart
//   const macroChartData = {
//     labels: ['Protein', 'Carbs', 'Fat'],
//     datasets: [
//       {
//         data: [
//           summary?.protein || 0,
//           summary?.carbs || 0,
//           summary?.fat || 0
//         ],
//         backgroundColor: [
//           '#3498db',
//           '#2ecc71',
//           '#e74c3c'
//         ],
//         borderColor: '#fff',
//         borderWidth: 2,
//       }
//     ]
//   };

//   // Chart data for calorie trend line chart
//   const trendChartData = {
//     labels: weekSummary.map(day => day.dayName),
//     datasets: [
//       {
//         label: 'Calorie Trend',
//         data: weekSummary.map(day => day.calories),
//         borderColor: '#9b59b6',
//         backgroundColor: 'rgba(155, 89, 182, 0.2)',
//         tension: 0.4,
//         fill: true,
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: false,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0,0,0,0.1)'
//         }
//       },
//       x: {
//         grid: {
//           color: 'rgba(0,0,0,0.1)'
//         }
//       }
//     }
//   };

//   const bmi = calculateBMI();
//   const bmiCategory = getBMICategory(bmi);

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading dashboard data...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="px-4">
//       {/* Header */}
//       <Row className="mb-4 align-items-center">
//         <Col>
//           <h2 className="mb-1">Nutrition Dashboard</h2>
//           <p className="text-muted mb-0">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
//         </Col>
//         <Col md="auto">
//           <div className="d-flex align-items-center gap-3">
//             <DatePicker 
//               selected={selectedDate} 
//               onChange={setSelectedDate} 
//               className="form-control"
//               dateFormat="MMM d, yyyy"
//             />
//             <Button variant="outline-secondary" size="sm" onClick={() => setSelectedDate(new Date())}>
//               <FaCalendarAlt className="me-1" />
//               Today
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Main Stats Cards */}
//       <Row className="mb-4">
//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaFire size={24} />
//               </div>
//               <h2 className="mb-1">{summary?.calories || 0}</h2>
//               <p className="mb-2">Calories Consumed</p>
//               <div className="w-100">
//                 <ProgressBar 
//                   now={calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000)} 
//                   variant="light"
//                   className="bg-white bg-opacity-25"
//                   style={{ height: '8px' }}
//                 />
//                 <small className="d-block mt-2">
//                   {Math.round(calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000))}% of target
//                 </small>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaAppleAlt size={24} />
//               </div>
//               <h2 className="mb-1">{summary?.meals?.length || 0}</h2>
//               <p className="mb-2">Meals Logged</p>
//               <small>
//                 {summary?.meals?.map((meal, i) => (
//                   <span key={i} className="me-2">
//                     {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
//                   </span>
//                 ))}
//               </small>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #ffd166 0%, #f9c74f 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaChartLine size={24} />
//               </div>
//               <h2 className="mb-1">{bmi ? bmi.toFixed(1) : '--'}</h2>
//               <p className="mb-2">BMI</p>
//               {bmiCategory ? (
//                 <span className={`badge bg-${bmiCategory.variant} px-3 py-2`}>
//                   {bmiCategory.label}
//                 </span>
//               ) : (
//                 <small>Update profile to calculate</small>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #118ab2 0%, #073b4c 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaUtensils size={24} />
//               </div>
//               <h2 className="mb-1">
//                 {user?.dailyTargets?.calories ? Math.round((summary?.calories || 0) / user.dailyTargets.calories * 100) : 0}%
//               </h2>
//               <p className="mb-2">Daily Goal</p>
//               <small>
//                 {user?.dailyTargets?.calories || 2000} cal target
//               </small>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts Section */}
//       <Row className="mb-4">
//         <Col lg={8}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
//               <h5 className="mb-0"><FaChartLine className="me-2" />Weekly Calorie Intake</h5>
//               <Form.Select size="sm" style={{ width: 'auto' }}>
//                 <option>This Week</option>
//                 <option>Last Week</option>
//                 <option>This Month</option>
//               </Form.Select>
//             </Card.Header>
//             <Card.Body className="p-3" style={{ height: '300px' }}>
//               <Bar data={weeklyChartData} options={chartOptions} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={4}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0"><FaChartPie className="me-2" />Macronutrient Distribution</h5>
//             </Card.Header>
//             <Card.Body className="p-3" style={{ height: '300px' }}>
//               <Pie data={macroChartData} options={{
//                 ...chartOptions,
//                 plugins: {
//                   ...chartOptions.plugins,
//                   legend: {
//                     position: 'bottom'
//                   }
//                 }
//               }} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Weekly Schedule Section */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Weekly Schedule</h5>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <div className="d-flex">
//                 {weekSummary.map((day, index) => {
//                   const isActive = day.dayName.toLowerCase() === format(selectedDate, 'EEE').toLowerCase();
//                   return (
//                     <div 
//                       key={index}
//                       className={`flex-fill text-center p-3 border-end ${isActive ? 'bg-light' : ''}`}
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => setSelectedDate(day.date)}
//                     >
//                       <div className="mb-2" style={{ 
//                         fontSize: '0.75rem',
//                         fontWeight: isActive ? 'bold' : 'normal',
//                         color: isActive ? '#3498db' : '#6c757d'
//                       }}>
//                         {day.dayName}
//                       </div>
//                       <div className="mb-2" style={{
//                         fontSize: '1.5rem',
//                         fontWeight: 'bold',
//                         color: isActive ? '#2c3e50' : '#95a5a6'
//                       }}>
//                         {day.calories}
//                       </div>
//                       <div style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
//                         {day.meals} meal{day.meals !== 1 ? 's' : ''}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Trend Chart and Nutrition Facts */}
//       <Row className="mb-4">
//         <Col lg={7}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Calorie Trend</h5>
//             </Card.Header>
//             <Card.Body className="p-3" style={{ height: '250px' }}>
//               <Line data={trendChartData} options={{
//                 ...chartOptions,
//                 scales: {
//                   ...chartOptions.scales,
//                   y: {
//                     ...chartOptions.scales.y,
//                     title: {
//                       display: true,
//                       text: 'Calories'
//                     }
//                   }
//                 }
//               }} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={5}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Nutrition Facts</h5>
//             </Card.Header>
//             <Card.Body>
//               <div className="nutrition-facts">
//                 <h4 className="border-bottom pb-2 mb-3">Amount Per Serving</h4>
                
//                 <div className="mb-4">
//                   <div className="d-flex justify-content-between align-items-end">
//                     <h3 className="mb-0">Calories</h3>
//                     <div className="text-end">
//                       <div className="display-4 fw-bold">{summary?.calories || 0}</div>
//                       <small className="text-muted">of {user?.dailyTargets?.calories || 2000} target</small>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-top pt-3">
//                   <div className="nutrient-row d-flex justify-content-between mb-2">
//                     <div>
//                       <strong>Total Fat</strong>
//                     </div>
//                     <div>
//                       <strong>{summary?.fat?.toFixed(1) || 0}g</strong>
//                       <span className="text-muted ms-2">
//                         {user?.dailyTargets?.fat ? `${Math.round((summary?.fat || 0) / user.dailyTargets.fat * 100)}%` : '-'}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="nutrient-row d-flex justify-content-between mb-2">
//                     <div>
//                       <strong>Total Carbohydrates</strong>
//                     </div>
//                     <div>
//                       <strong>{summary?.carbs?.toFixed(1) || 0}g</strong>
//                       <span className="text-muted ms-2">
//                         {user?.dailyTargets?.carbs ? `${Math.round((summary?.carbs || 0) / user.dailyTargets.carbs * 100)}%` : '-'}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="nutrient-row d-flex justify-content-between mb-2">
//                     <div>
//                       <strong>Protein</strong>
//                     </div>
//                     <div>
//                       <strong>{summary?.protein?.toFixed(1) || 0}g</strong>
//                       <span className="text-muted ms-2">
//                         {user?.dailyTargets?.protein ? `${Math.round((summary?.protein || 0) / user.dailyTargets.protein * 100)}%` : '-'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {summary?.meals?.length > 0 && (
//                   <div className="mt-4 pt-3 border-top">
//                     <h6>Today's Ingredients:</h6>
//                     <div className="ingredients-list">
//                       {summary.meals.flatMap(meal => 
//                         meal.entries.map((entry, idx) => (
//                           <span key={idx} className="badge bg-light text-dark me-2 mb-2">
//                             {entry.food?.name || 'Unknown'}
//                           </span>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Today's Meals Table */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Today's Meals</h5>
//               <Button variant="outline-primary" size="sm">
//                 + Add Meal
//               </Button>
//             </Card.Header>
//             <Card.Body className="p-0">
//               {summary?.meals?.length > 0 ? (
//                 <Table hover className="mb-0">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>Meal Type</th>
//                       <th>Food Items</th>
//                       <th>Calories</th>
//                       <th>Protein</th>
//                       <th>Carbs</th>
//                       <th>Fat</th>
//                       <th>Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {summary.meals.map((meal, i) => (
//                       <tr key={i}>
//                         <td className="text-capitalize fw-bold">
//                           {meal.mealType}
//                         </td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-1">
//                             {meal.entries.map((e, idx) => (
//                               <span key={idx} className="badge bg-secondary">
//                                 {e.food?.name || 'Unknown Food'}
//                               </span>
//                             ))}
//                           </div>
//                         </td>
//                         <td className="fw-bold">{meal.totalNutrition.calories}</td>
//                         <td>{meal.totalNutrition.protein}g</td>
//                         <td>{meal.totalNutrition.carbs}g</td>
//                         <td>{meal.totalNutrition.fat}g</td>
//                         <td>
//                           <small className="text-muted">
//                             {meal.timestamp ? format(new Date(meal.timestamp), 'h:mm a') : '--'}
//                           </small>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-5">
//                   <FaAppleAlt className="text-muted mb-3" size={48} />
//                   <p className="text-muted">No meals logged for today</p>
//                   <Button variant="primary">
//                     + Log Your First Meal
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

// new2
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, ProgressBar, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
// import { FaFire, FaAppleAlt, FaChartLine, FaCalendarAlt, FaUtensils, FaChartPie, FaPlus, FaTrash } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [summary, setSummary] = useState(null);
//   const [weekSummary, setWeekSummary] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [foodInput, setFoodInput] = useState('');
//   const [mealType, setMealType] = useState('breakfast');
//   const [processingFood, setProcessingFood] = useState(false);
//   const [nutritionData, setNutritionData] = useState(null);
//   const [weeklyMeals, setWeeklyMeals] = useState({
//     Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//     Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
//   });

//   useEffect(() => {
//     fetchDashboardData();
//     fetchWeekData();
//   }, [selectedDate]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const [summaryRes] = await Promise.all([
//         api.get(`/meals/summary?date=${dateStr}`)
//       ]);
//       setSummary(summaryRes.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWeekData = async () => {
//     try {
//       const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
//       const endDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
      
//       const weekData = [];
//       for (let i = 0; i < 7; i++) {
//         const currentDate = addDays(startDate, i);
//         try {
//           const response = await api.get(`/meals/summary?date=${format(currentDate, 'yyyy-MM-dd')}`);
//           const calories = response.data?.calories || 0;
//           weekData.push({
//             date: currentDate,
//             calories: calories,
//             meals: response.data?.meals?.length || 0,
//             dayName: format(currentDate, 'EEE').toUpperCase(),
//             fullDayName: format(currentDate, 'EEEE')
//           });
//         } catch (error) {
//           weekData.push({
//             date: currentDate,
//             calories: 0,
//             meals: 0,
//             dayName: format(currentDate, 'EEE').toUpperCase(),
//             fullDayName: format(currentDate, 'EEEE')
//           });
//         }
//       }
//       setWeekSummary(weekData);
//     } catch (error) {
//       console.error('Error fetching week data:', error);
//     }
//   };

//   // Food API Integration
//   const analyzeFood = async () => {
//     if (!foodInput.trim()) {
//       alert('Please enter food description');
//       return;
//     }

//     setProcessingFood(true);
//     try {
//       const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${foodInput}`, {
//         headers: {
//           'X-Api-Key': 'QoMyRTp5iThrCA1lK5JxQA==9qY9LyZsd0WiNkXu'
//         }
//       });
      
//       const data = await response.json();
// console.log("dataataa",data);

//       debugger;
//       setNutritionData(data);
      
//       // Calculate total nutrition
//       let totalCalories = 0;
//       let totalProtein = 0;
//       let totalCarbs = 0;
//       let totalFat = 0;
      
//       if (data.items && data.items.length > 0) {
//         data.items.forEach(item => {
//           totalCalories += item.calories || 0;
//           totalProtein += item.protein_g || 0;
//           totalCarbs += item.carbohydrates_total_g || 0;
//           totalFat += item.fat_total_g || 0;
//         });
        
//         // Prepare meal data for submission
//         const mealData = {
//           mealType: mealType,
//           entries: data.items.map(item => ({
//             food: {
//               name: item.name,
//               calories: item.calories,
//               protein: item.protein_g,
//               carbs: item.carbohydrates_total_g,
//               fat: item.fat_total_g,
//               serving_size_g: item.serving_size_g
//             },
//             quantity: 1
//           })),
//           timestamp: new Date().toISOString(),
//           totalNutrition: {
//             calories: totalCalories,
//             protein: totalProtein,
//             carbs: totalCarbs,
//             fat: totalFat
//           }
//         };
        
//         // Submit to backend
//         await api.post('/meals', mealData);
        
//         // Update weekly meals
//         const dayName = format(selectedDate, 'EEEE');
//         setWeeklyMeals(prev => ({
//           ...prev,
//           [dayName]: {
//             ...prev[dayName],
//             [mealType]: (prev[dayName][mealType] || 0) + totalCalories,
//             total: (prev[dayName].total || 0) + totalCalories
//           }
//         }));
        
//         // Refresh dashboard data
//         fetchDashboardData();
//         setFoodInput('');
//         setNutritionData(null);
//       }
//     } catch (error) {
//       console.error('Error analyzing food:', error);
//       alert('Failed to analyze food. Please try again.');
//     } finally {
//       setProcessingFood(false);
//     }
//   };

//   const calculateProgress = (current, target) => target > 0 ? Math.min((current / target) * 100, 100) : 0;

//   const calculateBMI = () => {
//     if (!user?.profile?.weight?.value || !user?.profile?.height?.value) return null;
    
//     let heightInMeters;
//     switch (user.profile.height.unit) {
//       case 'cm':
//         heightInMeters = user.profile.height.value / 100;
//         break;
//       case 'm':
//         heightInMeters = user.profile.height.value;
//         break;
//       case 'ft':
//         heightInMeters = user.profile.height.value * 0.3048;
//         break;
//       case 'in':
//         heightInMeters = user.profile.height.value * 0.0254;
//         break;
//       default:
//         heightInMeters = user.profile.height.value / 100;
//     }
    
//     let weightInKg;
//     switch (user.profile.weight.unit) {
//       case 'kg':
//         weightInKg = user.profile.weight.value;
//         break;
//       case 'lb':
//         weightInKg = user.profile.weight.value * 0.453592;
//         break;
//       default:
//         weightInKg = user.profile.weight.value;
//     }
    
//     if (heightInMeters === 0) return null;
//     return weightInKg / (heightInMeters * heightInMeters);
//   };

//   const getBMICategory = (bmi) => {
//     if (!bmi) return null;
//     if (bmi < 18.5) return { label: 'Underweight', color: '#ffc107' };
//     if (bmi < 25) return { label: 'Normal', color: '#28a745' };
//     if (bmi < 30) return { label: 'Overweight', color: '#ffc107' };
//     return { label: 'Obese', color: '#dc3545' };
//   };

//   const bmi = calculateBMI();
//   const bmiCategory = getBMICategory(bmi);

//   const getDayColor = (index) => {
//     const colors = [
//       '#A7E8D283', '#99DEC983', '#8BD4BF83', 
//       '#6FBFAB83', '#53AA9783', '#45A08D83', '#37958383'
//     ];
//     return colors[index % colors.length];
//   };

//   const clearWeekData = () => {
//     if (window.confirm('Are you sure you want to clear all week data?')) {
//       setWeeklyMeals({
//         Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
//         Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading dashboard data...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="px-4">
//       {/* Header with Food Input */}
//       <Row className="mb-4 align-items-center">
//         <Col>
//           <h2 className="mb-1">Nutrition Dashboard</h2>
//           <p className="text-muted mb-0">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
//         </Col>
//         <Col md="auto">
//           <div className="d-flex align-items-center gap-3">
//             <DatePicker 
//               selected={selectedDate} 
//               onChange={setSelectedDate} 
//               className="form-control"
//               dateFormat="MMM d, yyyy"
//             />
//             <Button variant="outline-secondary" size="sm" onClick={() => setSelectedDate(new Date())}>
//               <FaCalendarAlt className="me-1" />
//               Today
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Food Input Section */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Food Analysis</h5>
//             </Card.Header>
//             <Card.Body>
//               <Row>
//                 <Col md={8}>
//                   <Form.Group>
//                     <Form.Label>Describe your meal</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       placeholder="e.g., 4oz of carrots and a Chicken sandwich"
//                       value={foodInput}
//                       onChange={(e) => setFoodInput(e.target.value)}
//                       disabled={processingFood}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group>
//                     <Form.Label>Meal Type</Form.Label>
//                     <div className="d-flex gap-2 mb-3">
//                       {['breakfast', 'lunch', 'dinner'].map((type) => (
//                         <Button
//                           key={type}
//                           variant={mealType === type ? 'primary' : 'outline-primary'}
//                           onClick={() => setMealType(type)}
//                           className="text-capitalize"
//                         >
//                           {type}
//                         </Button>
//                       ))}
//                     </div>
//                     <Button 
//                       variant="success" 
//                       onClick={analyzeFood}
//                       disabled={processingFood || !foodInput.trim()}
//                       className="w-100"
//                     >
//                       {processingFood ? (
//                         <>
//                           <Spinner animation="border" size="sm" className="me-2" />
//                           Analyzing...
//                         </>
//                       ) : (
//                         <>
//                           <FaPlus className="me-2" />
//                           Analyze & Add Meal
//                         </>
//                       )}
//                     </Button>
//                   </Form.Group>
//                 </Col>
//               </Row>
              
//               {nutritionData && nutritionData.items && (
//                 <Alert variant="info" className="mt-3">
//                   <h6>Nutrition Analysis Results:</h6>
//                   <ul className="mb-0">
//                     {nutritionData.items.map((item, idx) => (
//                       <li key={idx}>
//                         <strong>{item.name}</strong>: {item.calories} cal, 
//                         Protein: {item.protein_g}g, 
//                         Carbs: {item.carbohydrates_total_g}g, 
//                         Fat: {item.fat_total_g}g
//                       </li>
//                     ))}
//                   </ul>
//                 </Alert>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Main Stats Cards */}
//       <Row className="mb-4">
//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaFire size={24} />
//               </div>
//               <h2 className="mb-1">{summary?.calories || 0}</h2>
//               <p className="mb-2">Calories Consumed</p>
//               <div className="w-100">
//                 <ProgressBar 
//                   now={calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000)} 
//                   variant="light"
//                   className="bg-white bg-opacity-25"
//                   style={{ height: '8px' }}
//                 />
//                 <small className="d-block mt-2">
//                   {Math.round(calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000))}% of target
//                 </small>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaAppleAlt size={24} />
//               </div>
//               <h2 className="mb-1">{summary?.meals?.length || 0}</h2>
//               <p className="mb-2">Meals Logged</p>
//               <small>
//                 {summary?.meals?.map((meal, i) => (
//                   <span key={i} className="me-2">
//                     {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
//                   </span>
//                 ))}
//               </small>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #ffd166 0%, #f9c74f 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaChartLine size={24} />
//               </div>
//               <h2 className="mb-1">{bmi ? bmi.toFixed(1) : '--'}</h2>
//               <p className="mb-2">BMI</p>
//               {bmiCategory ? (
//                 <span className="badge px-3 py-2" style={{ backgroundColor: bmiCategory.color }}>
//                   {bmiCategory.label}
//                 </span>
//               ) : (
//                 <small>Update profile to calculate</small>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={3} md={6}>
//           <Card className="h-100 shadow-sm border-0" style={{ 
//             background: 'linear-gradient(135deg, #118ab2 0%, #073b4c 100%)',
//             color: 'white'
//           }}>
//             <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
//               <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
//                 style={{ width: '60px', height: '60px' }}>
//                 <FaUtensils size={24} />
//               </div>
//               <h2 className="mb-1">
//                 {user?.dailyTargets?.calories ? Math.round((summary?.calories || 0) / user.dailyTargets.calories * 100) : 0}%
//               </h2>
//               <p className="mb-2">Daily Goal</p>
//               <small>
//                 {user?.dailyTargets?.calories || 2000} cal target
//               </small>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Weekly Schedule */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Weekly Schedule</h5>
//               <Button variant="outline-danger" size="sm" onClick={clearWeekData}>
//                 <FaTrash className="me-1" />
//                 Reset Week
//               </Button>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <div className="d-flex">
//                 {Object.entries(weeklyMeals).map(([day, data], index) => {
//                   const isActive = day.toLowerCase() === format(selectedDate, 'EEEE').toLowerCase();
//                   return (
//                     <div 
//                       key={day}
//                       className={`flex-fill text-center p-3 border-end ${isActive ? 'bg-light' : ''}`}
//                       style={{ 
//                         backgroundColor: getDayColor(index),
//                         cursor: 'pointer',
//                         borderRight: index < 6 ? '1px solid #dee2e6' : 'none'
//                       }}
//                       onClick={() => {
//                         // Find the date for this day
//                         const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//                         const dayIndex = days.indexOf(day);
//                         const today = new Date();
//                         const currentDayIndex = today.getDay();
//                         const diff = dayIndex - currentDayIndex;
//                         const newDate = addDays(today, diff);
//                         setSelectedDate(newDate);
//                       }}
//                     >
//                       <div className="mb-2" style={{ 
//                         fontSize: '0.75rem',
//                         fontWeight: isActive ? 'bold' : 'normal',
//                         color: isActive ? '#3498db' : '#2c3e50'
//                       }}>
//                         {day.toUpperCase().substring(0, 3)}
//                       </div>
                      
//                       {/* Meal breakdown */}
//                       <div className="mb-3">
//                         <div className="d-flex justify-content-around mb-1">
//                           <div>
//                             <small className="d-block text-muted">B</small>
//                             <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(data.breakfast)}</div>
//                           </div>
//                           <div>
//                             <small className="d-block text-muted">L</small>
//                             <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(data.lunch)}</div>
//                           </div>
//                           <div>
//                             <small className="d-block text-muted">D</small>
//                             <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(data.dinner)}</div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="border-top pt-2">
//                         <div className="mb-1" style={{
//                           fontSize: '1.2rem',
//                           fontWeight: 'bold',
//                           color: '#2c3e50'
//                         }}>
//                           {Math.round(data.total)}
//                         </div>
//                         <div style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
//                           Total Calories
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Nutrition Facts */}
//       <Row className="mb-4">
//         <Col lg={7}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Daily Summary</h5>
//             </Card.Header>
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                   <h3 className="mb-0">{summary?.calories || 0}</h3>
//                   <small className="text-muted">Calories Today</small>
//                 </div>
//                 <div>
//                   <h3 className="mb-0">{summary?.meals?.length || 0}</h3>
//                   <small className="text-muted">Meals</small>
//                 </div>
//                 <div>
//                   <h3 className="mb-0">{user?.dailyTargets?.calories || 2000}</h3>
//                   <small className="text-muted">Daily Target</small>
//                 </div>
//               </div>
              
//               <div className="border-top pt-3">
//                 <h6>Macronutrients</h6>
//                 <Table borderless className="mb-0">
//                   <tbody>
//                     <tr>
//                       <td><strong>Protein</strong></td>
//                       <td className="text-end">{summary?.protein?.toFixed(1) || 0}g</td>
//                       <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                         {user?.dailyTargets?.protein ? `${Math.round((summary?.protein || 0) / user.dailyTargets.protein * 100)}%` : '-'}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td><strong>Carbs</strong></td>
//                       <td className="text-end">{summary?.carbs?.toFixed(1) || 0}g</td>
//                       <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                         {user?.dailyTargets?.carbs ? `${Math.round((summary?.carbs || 0) / user.dailyTargets.carbs * 100)}%` : '-'}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td><strong>Fat</strong></td>
//                       <td className="text-end">{summary?.fat?.toFixed(1) || 0}g</td>
//                       <td className="text-muted" style={{ fontSize: '0.8rem' }}>
//                         {user?.dailyTargets?.fat ? `${Math.round((summary?.fat || 0) / user.dailyTargets.fat * 100)}%` : '-'}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col lg={5}>
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header className="bg-white border-0">
//               <h5 className="mb-0">Nutrition Facts</h5>
//             </Card.Header>
//             <Card.Body>
//               <div className="nutrition-facts">
//                 <h4 className="border-bottom pb-2 mb-3">Amount Per Serving</h4>
                
//                 <div className="mb-4">
//                   <div className="d-flex justify-content-between align-items-end">
//                     <h3 className="mb-0">Calories</h3>
//                     <div className="text-end">
//                       <div className="display-4 fw-bold">{summary?.calories || 0}</div>
//                       <small className="text-muted">of {user?.dailyTargets?.calories || 2000} target</small>
//                     </div>
//                   </div>
//                 </div>

//                 {summary?.meals?.length > 0 && (
//                   <div className="mt-4 pt-3 border-top">
//                     <h6>Today's Ingredients:</h6>
//                     <div className="ingredients-list">
//                       {summary.meals.flatMap(meal => 
//                         meal.entries.map((entry, idx) => (
//                           <span key={idx} className="badge bg-light text-dark me-2 mb-2">
//                             {entry.food?.name || 'Unknown'}
//                           </span>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Today's Meals */}
//       <Row>
//         <Col>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Today's Meals</h5>
//               <Button variant="outline-primary" size="sm" onClick={() => document.getElementById('food-input')?.focus()}>
//                 <FaPlus className="me-1" />
//                 Add Meal
//               </Button>
//             </Card.Header>
//             <Card.Body className="p-0">
//               {summary?.meals?.length > 0 ? (
//                 <Table hover className="mb-0">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>Meal Type</th>
//                       <th>Food Items</th>
//                       <th>Calories</th>
//                       <th>Protein</th>
//                       <th>Carbs</th>
//                       <th>Fat</th>
//                       <th>Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {summary.meals.map((meal, i) => (
//                       <tr key={i}>
//                         <td className="text-capitalize fw-bold">
//                           {meal.mealType}
//                         </td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-1">
//                             {meal.entries.map((e, idx) => (
//                               <span key={idx} className="badge bg-secondary">
//                                 {e.food?.name || 'Unknown Food'}
//                               </span>
//                             ))}
//                           </div>
//                         </td>
//                         <td className="fw-bold">{meal.totalNutrition.calories}</td>
//                         <td>{meal.totalNutrition.protein}g</td>
//                         <td>{meal.totalNutrition.carbs}g</td>
//                         <td>{meal.totalNutrition.fat}g</td>
//                         <td>
//                           <small className="text-muted">
//                             {meal.timestamp ? format(new Date(meal.timestamp), 'h:mm a') : '--'}
//                           </small>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <div className="text-center py-5">
//                   <FaAppleAlt className="text-muted mb-3" size={48} />
//                   <p className="text-muted">No meals logged for today</p>
//                   <p className="text-muted small">Enter food above to get started</p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
// new3
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { FaFire, FaAppleAlt, FaChartLine, FaCalendarAlt, FaUtensils, FaChartPie, FaPlus, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summary, setSummary] = useState(null);
  const [weekSummary, setWeekSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodInput, setFoodInput] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [processingFood, setProcessingFood] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [weeklyMeals, setWeeklyMeals] = useState({
    Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
    Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
  });

  useEffect(() => {
    fetchDashboardData();
    fetchWeekData();
  }, [selectedDate]);
// Add this useEffect to fetch user profile when dashboard loads
useEffect(() => {
  fetchUserProfile();
}, []);

const fetchUserProfile = async () => {
  try {
    // Fetch updated user profile from backend
    const { data } = await api.get('/auth/profile');
    
    // Update user in context (if you have updateProfile function)
    if (updateProfile) {
      updateProfile(data);
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const [summaryRes] = await Promise.all([
        api.get(`/meals/summary?date=${dateStr}`)
      ]);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchWeekData = async () => {
  //   try {
  //     const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  //     const endDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
      
  //     const weekData = [];
  //     for (let i = 0; i < 7; i++) {
  //       const currentDate = addDays(startDate, i);
  //       try {
  //         const response = await api.get(`/meals/summary?date=${format(currentDate, 'yyyy-MM-dd')}`);
  //         const calories = response.data?.calories || 0;
  //         weekData.push({
  //           date: currentDate,
  //           calories: calories,
  //           meals: response.data?.meals?.length || 0,
  //           dayName: format(currentDate, 'EEE').toUpperCase(),
  //           fullDayName: format(currentDate, 'EEEE')
  //         });
  //       } catch (error) {
  //         weekData.push({
  //           date: currentDate,
  //           calories: 0,
  //           meals: 0,
  //           dayName: format(currentDate, 'EEE').toUpperCase(),
  //           fullDayName: format(currentDate, 'EEEE')
  //         });
  //       }
  //     }
  //     setWeekSummary(weekData);
  //   } catch (error) {
  //     console.error('Error fetching week data:', error);
  //   }
  // };

  // Prepare chart data from nutrition analysis
  const prepareNutritionChartData = (data) => {
    if (!data?.items || data.items.length === 0) return null;

    const items = data.items;
    
    // Bar Chart: Calories per food item
    const barChartData = {
      labels: items.map(item => item.name),
      datasets: [
        {
          label: 'Calories',
          data: items.map(item => item.calories),
          backgroundColor: [
            '#A7E8D283',
            '#99DEC983',
            '#8BD4BF83',
            '#6FBFAB83',
            '#53AA9783',
          ],
          borderColor: '#2c3e50',
          borderWidth: 1,
          borderRadius: 5,
        }
      ]
    };

    // Pie Chart: Macronutrient distribution for the entire meal
    const totalProtein = items.reduce((sum, item) => sum + (item.protein_g || 0), 0);
    const totalCarbs = items.reduce((sum, item) => sum + (item.carbohydrates_total_g || 0), 0);
    const totalFat = items.reduce((sum, item) => sum + (item.fat_total_g || 0), 0);
    const totalSugar = items.reduce((sum, item) => sum + (item.sugar_g || 0), 0);
    const totalFiber = items.reduce((sum, item) => sum + (item.fiber_g || 0), 0);

    const pieChartData = {
      labels: ['Protein', 'Carbs', 'Fat', 'Sugar', 'Fiber'],
      datasets: [
        {
          data: [totalProtein, totalCarbs, totalFat, totalSugar, totalFiber],
          backgroundColor: [
            '#3498db', // Blue for protein
            '#2ecc71', // Green for carbs
            '#e74c3c', // Red for fat
            '#f1c40f', // Yellow for sugar
            '#9b59b6', // Purple for fiber
          ],
          borderColor: '#fff',
          borderWidth: 2,
        }
      ]
    };

    // Doughnut Chart: Food item weight distribution
    const doughnutChartData = {
      labels: items.map(item => item.name),
      datasets: [
        {
          data: items.map(item => item.serving_size_g || 0),
          backgroundColor: [
            '#A7E8D2',
            '#99DEC9',
            '#8BD4BF',
            '#6FBFAB',
            '#53AA97',
            '#45A08D',
            '#379583'
          ],
          borderColor: '#fff',
          borderWidth: 2,
        }
      ]
    };

    // Nutrition Facts Summary
    const totalCalories = items.reduce((sum, item) => sum + (item.calories || 0), 0);
    const totalSodium = items.reduce((sum, item) => sum + (item.sodium_mg || 0), 0);
    const totalCholesterol = items.reduce((sum, item) => sum + (item.cholesterol_mg || 0), 0);
    const totalPotassium = items.reduce((sum, item) => sum + (item.potassium_mg || 0), 0);

    return {
      barChartData,
      pieChartData,
      doughnutChartData,
      summary: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalSugar,
        totalFiber,
        totalSodium,
        totalCholesterol,
        totalPotassium
      },
      items
    };
  };

  // Food API Integration
  // const analyzeFood = async () => {
  //   if (!foodInput.trim()) {
  //     alert('Please enter food description');
  //     return;
  //   }

  //   setProcessingFood(true);
  //   try {
  //     const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${foodInput}`, {
  //       headers: {
  //         'X-Api-Key': 'QoMyRTp5iThrCA1lK5JxQA==9qY9LyZsd0WiNkXu'
  //       }
  //     });
      
  //     const data = await response.json();
  //     console.log("Nutrition data:", data);
      
  //     setNutritionData(prepareNutritionChartData(data));
      
  //     if (data.items && data.items.length > 0) {
  //       // Prepare meal data for submission
  //       const totalCalories = data.items.reduce((sum, item) => sum + (item.calories || 0), 0);
  //       const totalProtein = data.items.reduce((sum, item) => sum + (item.protein_g || 0), 0);
  //       const totalCarbs = data.items.reduce((sum, item) => sum + (item.carbohydrates_total_g || 0), 0);
  //       const totalFat = data.items.reduce((sum, item) => sum + (item.fat_total_g || 0), 0);
        
  //       const mealData = {
  //         mealType: mealType,
  //         entries: data.items.map(item => ({
  //           food: {
  //             name: item.name,
  //             calories: item.calories,
  //             protein: item.protein_g,
  //             carbs: item.carbohydrates_total_g,
  //             fat: item.fat_total_g,
  //             serving_size_g: item.serving_size_g,
  //             sugar_g: item.sugar_g,
  //             fiber_g: item.fiber_g,
  //             sodium_mg: item.sodium_mg,
  //             cholesterol_mg: item.cholesterol_mg,
  //             potassium_mg: item.potassium_mg
  //           },
  //           quantity: 1
  //         })),
  //         timestamp: new Date().toISOString(),
  //         totalNutrition: {
  //           calories: totalCalories,
  //           protein: totalProtein,
  //           carbs: totalCarbs,
  //           fat: totalFat
  //         }
  //       };
        
  //       // Submit to backend
  //       await api.post('/meals', mealData);
        
  //       // Update weekly meals
  //       const dayName = format(selectedDate, 'EEEE');
  //       setWeeklyMeals(prev => ({
  //         ...prev,
  //         [dayName]: {
  //           ...prev[dayName],
  //           [mealType]: (prev[dayName][mealType] || 0) + totalCalories,
  //           total: (prev[dayName].total || 0) + totalCalories
  //         }
  //       }));
        
  //       // Refresh dashboard data
  //       fetchDashboardData();
  //       // Don't clear food input immediately, let user see the results
  //     }
  //   } catch (error) {
  //     console.error('Error analyzing food:', error);
  //     alert('Failed to analyze food. Please try again.');
  //   } finally {
  //     setProcessingFood(false);
  //   }
  // };
// Food API Integration
// const analyzeFood = async () => {
//   if (!foodInput.trim()) {
//     alert('Please enter food description');
//     return;
//   }

//   setProcessingFood(true);
//   try {
//     // 1. Fetch nutrition data from CalorieNinjas API
//     const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodInput)}`, {
//       headers: {
//         'X-Api-Key': 'QoMyRTp5iThrCA1lK5JxQA==9qY9LyZsd0WiNkXu'
//       }
//     });
    
//     const data = await response.json();
//     console.log("Nutrition data from API:", data);
    
//     // 2. Prepare chart data for display
//     const chartData = prepareNutritionChartData(data);
//     setNutritionData(chartData);
    
//     if (data.items && data.items.length > 0) {
//       // 3. Save each food item to your database
//       const savedFoodIds = [];
//       let totalCalories = 0;
      
//       for (const item of data.items) {
//         try {
//           totalCalories += item.calories || 0;
          
//           // Determine category based on food name
//           const category = determineFoodCategory(item.name);
          
//           // Prepare food data according to your Food schema
//           const foodData = {
//             name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize first letter
//             category: category,
//             servingSize: {
//               amount: item.serving_size_g || 100,
//               unit: 'grams'
//             },
//             nutrition: {
//               calories: item.calories || 0,
//               protein: item.protein_g || 0,
//               carbs: item.carbohydrates_total_g || 0,
//               fat: item.fat_total_g || 0,
//               fiber: item.fiber_g || 0,
//               sugar: item.sugar_g || 0
//             },
//             isCustom: true,
//             isRecipe: false,
//             source: 'custom', // Using 'custom' for CalorieNinjas foods
//             tags: [category.toLowerCase()], // Add category as tag
//             mealType: [mealType], // Add current meal type
//             createdBy: user._id,
//             // Optional: You could add more fields if needed
//             ingredients: [
//               {
//                 name: item.name,
//                 quantity: `${item.serving_size_g || 100}g`
//               }
//             ]
//           };
          
//           console.log("Saving food data:", foodData);
          
//           // Save food to your database
//           const savedFood = await api.post('/foods', foodData);
//           savedFoodIds.push(savedFood.data._id);
//           console.log(`✅ Saved food: "${item.name}" with ID: ${savedFood.data._id}`);
          
//         } catch (foodError) {
//           console.error(`❌ Error saving food item "${item.name}":`, foodError);
//           // You could show a more specific error to the user
//           if (foodError.response?.data?.message) {
//             console.error("Server error:", foodError.response.data.message);
//           }
//         }
//       }
      
//       // 4. Create meal with the saved food IDs
//       if (savedFoodIds.length > 0) {
//         const mealData = {
//           mealType: mealType,
//           date: selectedDate.toISOString(),
//           entries: savedFoodIds.map(foodId => ({
//             food: foodId, // This is now a valid MongoDB ObjectId
//             servingAmount: 1
//           })),
//           notes: `Added via food analysis: ${foodInput}`
//         };
        
//         console.log("Submitting meal data:", mealData);
        
//         try {
//           // Submit to meals endpoint
//           const savedMeal = await api.post('/meals', mealData);
//           console.log("✅ Meal saved successfully:", savedMeal.data);
          
//           // 5. Update UI state
//           // Clear the input after successful save
//           setFoodInput('');
          
//           // Update weekly meals in frontend state
//           const dayName = format(selectedDate, 'EEEE');
//           setWeeklyMeals(prev => ({
//             ...prev,
//             [dayName]: {
//               ...prev[dayName],
//               [mealType]: (prev[dayName][mealType] || 0) + totalCalories,
//               total: (prev[dayName].total || 0) + totalCalories
//             }
//           }));
          
//           // 6. Refresh dashboard data to show the new meal
//           await fetchDashboardData();
//           await fetchWeekData();
          
//           // Show success message
//           alert(`✅ Successfully saved ${savedFoodIds.length} food item(s) and meal!`);
          
//         } catch (mealError) {
//           console.error('❌ Error saving meal:', mealError);
//           console.error('Meal error details:', mealError.response?.data);
//           alert(`Failed to save meal: ${mealError.response?.data?.message || mealError.message}`);
//         }
//       } else {
//         alert('⚠️ Failed to save any food items. Please try again.');
//       }
//     } else {
//       alert('⚠️ No food items found in the query. Please try a different description.');
//     }
//   } catch (error) {
//     console.error('❌ Error analyzing food:', error);
//     alert('❌ Failed to analyze food. Please try again.');
//   } finally {
//     setProcessingFood(false);
//   }
// };

// new
const analyzeFood = async () => {
  if (!foodInput.trim()) {
    alert('Please enter food description');
    return;
  }

  setProcessingFood(true);
  try {
    // 1. Fetch from CalorieNinjas
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodInput)}`, {
      headers: {
        'X-Api-Key': 'QoMyRTp5iThrCA1lK5JxQA==9qY9LyZsd0WiNkXu'
      }
    });
    
    const data = await response.json();
    console.log("CalorieNinjas data:", data);
    
    if (!data.items || data.items.length === 0) {
      alert('No food items found. Please try a different description.');
      return;
    }
    
    // 2. Prepare chart data for display
    const chartData = prepareNutritionChartData(data);
    setNutritionData(chartData);
          const savedFoodIds = [];
                let totalCaloriess = 0;
      for (const item of data.items) {
        try {
          totalCaloriess += item.calories || 0;
          
          // Determine category based on food name
          const category = determineFoodCategory(item.name);
          
          // Prepare food data according to your Food schema
          const foodData = {
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize first letter
            category: category,
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2jkIKkkOoCoAwxGGU9_qw0zZEfP8lshgO3Q&s",
            servingSize: {
              amount: item.serving_size_g || 100,
              unit: 'grams'
            },
            nutrition: {
              calories: item.calories || 0,
              protein: item.protein_g || 0,
              carbs: item.carbohydrates_total_g || 0,
              fat: item.fat_total_g || 0,
              fiber: item.fiber_g || 0,
              sugar: item.sugar_g || 0
            },
            isCustom: true,
            isRecipe: false,
            source: 'custom', // Using 'custom' for CalorieNinjas foods
            tags: [category.toLowerCase()], // Add category as tag
            mealType: [mealType], // Add current meal type
            createdBy: user._id,
            // Optional: You could add more fields if needed
            ingredients: [
              {
                name: item.name,
                quantity: `${item.serving_size_g || 100}g`
              }
            ]
          };
          
          console.log("Saving food data:", foodData);
          
          // Save food to your database
          const savedFood = await api.post('/foods', foodData);
          savedFoodIds.push(savedFood.data._id);
          console.log(`✅ Saved food: "${item.name}" with ID: ${savedFood.data._id}`);
          
        } catch (foodError) {
          console.error(`❌ Error saving food item "${item.name}":`, foodError);
          // You could show a more specific error to the user
          if (foodError.response?.data?.message) {
            console.error("Server error:", foodError.response.data.message);
          }
        }
      }
    // 3. Calculate total calories for UI
    const totalCalories = data.items.reduce((sum, item) => sum + (item.calories || 0), 0);
    
    // 4. Send to CalorieNinjas endpoint (NO FOOD DB SAVING)
    const mealData = {
      items: data.items,
      mealType: mealType,
      date: selectedDate.toISOString(),
      foodInput: foodInput
    };
    
    console.log("Sending to CalorieNinjas endpoint:", mealData);
    
    const savedMeal = await api.post('/meals/calorieninjas', mealData);
    console.log("✅ CalorieNinjas meal saved:", savedMeal.data);
    
    // 5. Update UI
    setFoodInput('');
    
    // Update weekly meals in state
    const dayName = format(selectedDate, 'EEEE');
    setWeeklyMeals(prev => ({
      ...prev,
      [dayName]: {
        ...prev[dayName],
        [mealType]: (prev[dayName][mealType] || 0) + totalCalories,
        total: (prev[dayName].total || 0) + totalCalories
      }
    }));
    
    // 6. Refresh ALL data from backend
    await fetchDashboardData();
    await fetchWeekData();
    
    alert(`✅ Successfully saved "${foodInput}" (${totalCalories.toFixed(0)} calories)`);
    
  } catch (error) {
    console.error('❌ Error analyzing food:', error);
    
    if (error.response?.data?.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert('Failed to analyze food. Please try again.');
    }
  } finally {
    setProcessingFood(false);
  }
};

// Update fetchWeekData to use the new endpoint
const fetchWeekData = async () => {
  try {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
    
    // Fetch weekly data from backend
    const response = await api.get(`/meals/weekly-data?startDate=${startDate.toISOString()}`);
    
    if (response.data && response.data.weekData) {
      setWeeklyMeals(response.data.weekData);
    }
    
    // Also fetch daily summaries for the week view
    const endDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
    const weekData = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startDate, i);
      try {
        const summaryRes = await api.get(`/meals/summary?date=${format(currentDate, 'yyyy-MM-dd')}`);
        const calories = summaryRes.data?.calories || 0;
        weekData.push({
          date: currentDate,
          calories: calories,
          meals: summaryRes.data?.meals?.length || 0,
          dayName: format(currentDate, 'EEE').toUpperCase(),
          fullDayName: format(currentDate, 'EEEE')
        });
      } catch (error) {
        weekData.push({
          date: currentDate,
          calories: 0,
          meals: 0,
          dayName: format(currentDate, 'EEE').toUpperCase(),
          fullDayName: format(currentDate, 'EEEE')
        });
      }
    }
    setWeekSummary(weekData);
    
  } catch (error) {
    console.error('Error fetching week data:', error);
  }
};
// Helper function to determine food category based on name
const determineFoodCategory = (foodName) => {
  const name = foodName.toLowerCase();
  
  // Check for protein sources
  if (name.includes('chicken') || name.includes('beef') || name.includes('pork') || 
      name.includes('mutton') || name.includes('lamb') || name.includes('fish') || 
      name.includes('salmon') || name.includes('tuna') || name.includes('egg') ||
      name.includes('meat') || name.includes('steak') || name.includes('burger') ||
      name.includes('sausage') || name.includes('bacon') || name.includes('ham') ||
      name.includes('turkey') || name.includes('duck') || name.includes('shrimp') ||
      name.includes('prawn') || name.includes('crab') || name.includes('lobster') ||
      name.includes('tofu') || name.includes('tempeh') || name.includes('seitan')) {
    return 'protein';
  }
  
  // Check for fruits
  if (name.includes('apple') || name.includes('banana') || name.includes('orange') || 
      name.includes('berry') || name.includes('strawberry') || name.includes('blueberry') ||
      name.includes('raspberry') || name.includes('grape') || name.includes('mango') ||
      name.includes('pineapple') || name.includes('watermelon') || name.includes('melon') ||
      name.includes('peach') || name.includes('pear') || name.includes('plum') ||
      name.includes('cherry') || name.includes('kiwi') || name.includes('papaya') ||
      name.includes('fruit')) {
    return 'fruit';
  }
  
  // Check for vegetables
  if (name.includes('carrot') || name.includes('broccoli') || name.includes('spinach') || 
      name.includes('lettuce') || name.includes('tomato') || name.includes('potato') ||
      name.includes('onion') || name.includes('garlic') || name.includes('cucumber') ||
      name.includes('pepper') || name.includes('bell pepper') || name.includes('chili') ||
      name.includes('zucchini') || name.includes('eggplant') || name.includes('pumpkin') ||
      name.includes('squash') || name.includes('corn') || name.includes('pea') ||
      name.includes('bean') || name.includes('celery') || name.includes('asparagus') ||
      name.includes('cauliflower') || name.includes('cabbage') || name.includes('kale') ||
      name.includes('vegetable')) {
    return 'vegetable';
  }
  
  // Check for grains
  if (name.includes('bread') || name.includes('rice') || name.includes('pasta') || 
      name.includes('noodle') || name.includes('oat') || name.includes('oatmeal') ||
      name.includes('cereal') || name.includes('wheat') || name.includes('flour') ||
      name.includes('barley') || name.includes('quinoa') || name.includes('couscous') ||
      name.includes('buckwheat') || name.includes('millet') || name.includes('rye') ||
      name.includes('corn') || name.includes('tortilla') || name.includes('wrap') ||
      name.includes('bagel') || name.includes('muffin') || name.includes('cracker') ||
      name.includes('cookie') || name.includes('cake') || name.includes('pastry')) {
    return 'grains';
  }
  
  // Check for dairy
  if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt') ||
      name.includes('yoghurt') || name.includes('butter') || name.includes('cream') ||
      name.includes('ice cream') || name.includes('custard') || name.includes('pudding') ||
      name.includes('curd') || name.includes('ghee') || name.includes('buttermilk')) {
    return 'dairy';
  }
  
  // Check for fats/oils
  if (name.includes('oil') || name.includes('olive oil') || name.includes('coconut oil') ||
      name.includes('avocado') || name.includes('nut') || name.includes('almond') ||
      name.includes('walnut') || name.includes('peanut') || name.includes('cashew') ||
      name.includes('hazelnut') || name.includes('pecan') || name.includes('pistachio') ||
      name.includes('seed') || name.includes('sunflower seed') || name.includes('pumpkin seed') ||
      name.includes('chia seed') || name.includes('flaxseed') || name.includes('mayonnaise') ||
      name.includes('dressing') || name.includes('sauce') || name.includes('gravy')) {
    return 'fats';
  }
  
  // Check for beverages
  if (name.includes('juice') || name.includes('soda') || name.includes('water') || 
      name.includes('coffee') || name.includes('tea') || name.includes('smoothie') ||
      name.includes('shake') || name.includes('milkshake') || name.includes('cocktail') ||
      name.includes('beer') || name.includes('wine') || name.includes('liquor') ||
      name.includes('spirit') || name.includes('lemonade') || name.includes('iced tea')) {
    return 'beverage';
  }
  
  // Default to 'other' for unknown items
  return 'other';
};
  const calculateProgress = (current, target) => target > 0 ? Math.min((current / target) * 100, 100) : 0;

  const calculateBMI = () => {
    if (!user?.profile?.weight?.value || !user?.profile?.height?.value) return null;
    
    let heightInMeters;
    switch (user.profile.height.unit) {
      case 'cm':
        heightInMeters = user.profile.height.value / 100;
        break;
      case 'm':
        heightInMeters = user.profile.height.value;
        break;
      case 'ft':
        heightInMeters = user.profile.height.value * 0.3048;
        break;
      case 'in':
        heightInMeters = user.profile.height.value * 0.0254;
        break;
      default:
        heightInMeters = user.profile.height.value / 100;
    }
    
    let weightInKg;
    switch (user.profile.weight.unit) {
      case 'kg':
        weightInKg = user.profile.weight.value;
        break;
      case 'lb':
        weightInKg = user.profile.weight.value * 0.453592;
        break;
      default:
        weightInKg = user.profile.weight.value;
    }
    
    if (heightInMeters === 0) return null;
    return weightInKg / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return null;
    if (bmi < 18.5) return { label: 'Underweight', color: '#ffc107' };
    if (bmi < 25) return { label: 'Normal', color: '#28a745' };
    if (bmi < 30) return { label: 'Overweight', color: '#ffc107' };
    return { label: 'Obese', color: '#dc3545' };
  };

  const getDayColor = (index) => {
    const colors = [
      '#A7E8D283', '#99DEC983', '#8BD4BF83', 
      '#6FBFAB83', '#53AA9783', '#45A08D83', '#37958383'
    ];
    return colors[index % colors.length];
  };

  // const clearWeekData = () => {
  //   if (window.confirm('Are you sure you want to clear all week data?')) {
  //     setWeeklyMeals({
  //       Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
  //       Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
  //     });
  //   }
  // };
const clearWeekData = async () => {
  if (window.confirm('Are you sure you want to delete all meals for this week? This action cannot be undone.')) {
    try {
      // Get the start of the current week
      const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
      
      // Call backend API to delete meals for the week
      const response = await api.delete(`/meals/week/${startDate.toISOString()}`);
      
      // Update UI state
      setWeeklyMeals({
        Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
        Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
      });
      
      // Refresh dashboard data
      await fetchDashboardData();
      await fetchWeekData();
      
      alert(response.data.message);
      
    } catch (error) {
      console.error('Error clearing week data:', error);
      alert('Failed to clear week data. Please try again.');
    }
  }
};
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nutrition Analysis'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      }
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading dashboard data...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-1">Nutrition Dashboard</h2>
          <p className="text-muted mb-0">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
        </Col>
        <Col md="auto">
          <div className="d-flex align-items-center gap-3">
            <DatePicker 
              selected={selectedDate} 
              onChange={setSelectedDate} 
              className="form-control"
              dateFormat="MMM d, yyyy"
            />
            <Button variant="outline-secondary" size="sm" onClick={() => setSelectedDate(new Date())}>
              <FaCalendarAlt className="me-1" />
              Today
            </Button>
          </div>
        </Col>
      </Row>

      {/* Food Input Section */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Food Analysis</h5>
              {nutritionData && (
                <Button variant="outline-secondary" size="sm" onClick={() => setNutritionData(null)}>
                  Clear Analysis
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Describe your meal</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="e.g., 4oz of carrots and a Chicken sandwich"
                      value={foodInput}
                      onChange={(e) => setFoodInput(e.target.value)}
                      disabled={processingFood}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Meal Type</Form.Label>
                    <div className="d-flex gap-2 mb-3">
                      {['breakfast', 'lunch', 'dinner'].map((type) => (
                        <Button
                          key={type}
                          variant={mealType === type ? 'primary' : 'outline-primary'}
                          onClick={() => setMealType(type)}
                          className="text-capitalize"
                        >
                          {type.charAt(0).toUpperCase()}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      variant="success" 
                      onClick={analyzeFood}
                      disabled={processingFood || !foodInput.trim()}
                      className="w-100"
                    >
                      {processingFood ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaPlus className="me-2" />
                          Analyze Food
                        </>
                      )}
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
              
              {/* Nutrition Charts Section */}
              {nutritionData && (
                <div className="mt-4">
                  <h5>Nutrition Analysis Results</h5>
                  
                  {/* Summary Stats */}
                  <Row className="mb-4">
                    <Col md={3}>
                      <Card className="text-center">
                        <Card.Body>
                          <h6 className="text-muted">Total Calories</h6>
                          <h3>{nutritionData.summary.totalCalories.toFixed(0)}</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="text-center">
                        <Card.Body>
                          <h6 className="text-muted">Protein</h6>
                          <h3>{nutritionData.summary.totalProtein.toFixed(1)}g</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="text-center">
                        <Card.Body>
                          <h6 className="text-muted">Carbs</h6>
                          <h3>{nutritionData.summary.totalCarbs.toFixed(1)}g</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="text-center">
                        <Card.Body>
                          <h6 className="text-muted">Fat</h6>
                          <h3>{nutritionData.summary.totalFat.toFixed(1)}g</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  
                  {/* Charts Row */}
                  <Row className="mb-4">
                    <Col md={4}>
                      <Card>
                        <Card.Body style={{ height: '300px' }}>
                          <h6 className="text-center mb-3">Calories per Item</h6>
                          <Bar 
                            data={nutritionData.barChartData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  display: false
                                }
                              }
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <Card.Body style={{ height: '300px' }}>
                          <h6 className="text-center mb-3">Macronutrient Distribution</h6>
                          <Pie 
                            data={nutritionData.pieChartData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                legend: {
                                  position: 'right'
                                },
                                title: {
                                  display: false
                                }
                              }
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <Card.Body style={{ height: '300px' }}>
                          <h6 className="text-center mb-3">Serving Size Distribution</h6>
                          <Doughnut 
                            data={nutritionData.doughnutChartData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                legend: {
                                  position: 'right'
                                },
                                title: {
                                  display: false
                                }
                              }
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  
                  {/* Detailed Nutrition Table */}
                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Detailed Nutrition Information</h6>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Food Item</th>
                            <th>Calories</th>
                            <th>Protein (g)</th>
                            <th>Carbs (g)</th>
                            <th>Fat (g)</th>
                            <th>Sugar (g)</th>
                            <th>Fiber (g)</th>
                            <th>Serving (g)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nutritionData.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.calories?.toFixed(0)}</td>
                              <td>{item.protein_g?.toFixed(1)}</td>
                              <td>{item.carbohydrates_total_g?.toFixed(1)}</td>
                              <td>{item.fat_total_g?.toFixed(1)}</td>
                              <td>{item.sugar_g?.toFixed(1)}</td>
                              <td>{item.fiber_g?.toFixed(1)}</td>
                              <td>{item.serving_size_g?.toFixed(0)}</td>
                            </tr>
                          ))}
                          <tr className="table-active fw-bold">
                            <td>Total</td>
                            <td>{nutritionData.summary.totalCalories.toFixed(0)}</td>
                            <td>{nutritionData.summary.totalProtein.toFixed(1)}</td>
                            <td>{nutritionData.summary.totalCarbs.toFixed(1)}</td>
                            <td>{nutritionData.summary.totalFat.toFixed(1)}</td>
                            <td>{nutritionData.summary.totalSugar.toFixed(1)}</td>
                            <td>{nutritionData.summary.totalFiber.toFixed(1)}</td>
                            <td>{nutritionData.items.reduce((sum, item) => sum + (item.serving_size_g || 0), 0).toFixed(0)}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Stats Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ 
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white'
          }}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
                style={{ width: '60px', height: '60px' }}>
                <FaFire size={24} />
              </div>
              <h2 className="mb-1">{summary?.calories || 0}</h2>
              <p className="mb-2">Calories Consumed</p>
              <div className="w-100">
                <ProgressBar 
                  now={calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000)} 
                  variant="light"
                  className="bg-white bg-opacity-25"
                  style={{ height: '8px' }}
                />
                <small className="d-block mt-2">
                  {Math.round(calculateProgress(summary?.calories || 0, user?.dailyTargets?.calories || 2000))}% of target
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ 
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white'
          }}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
                style={{ width: '60px', height: '60px' }}>
                <FaAppleAlt size={24} />
              </div>
              <h2 className="mb-1">{summary?.meals?.length || 0}</h2>
              <p className="mb-2">Meals Logged</p>
              <small>
                {summary?.meals?.map((meal, i) => (
                  <span key={i} className="me-2">
                    {meal.mealType.charAt(0).toUpperCase()}
                  </span>
                ))}
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ 
            background: 'linear-gradient(135deg, #ffd166 0%, #f9c74f 100%)',
            color: 'white'
          }}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
                style={{ width: '60px', height: '60px' }}>
                <FaChartLine size={24} />
              </div>
              <h2 className="mb-1">{bmi ? bmi.toFixed(1) : '--'}</h2>
              <p className="mb-2">BMI</p>
              {bmiCategory ? (
                <span className="badge px-3 py-2" style={{ backgroundColor: bmiCategory.color }}>
                  {bmiCategory.label}
                </span>
              ) : (
                <small>Update profile to calculate</small>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ 
            background: 'linear-gradient(135deg, #118ab2 0%, #073b4c 100%)',
            color: 'white'
          }}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mb-3"
                style={{ width: '60px', height: '60px' }}>
                <FaUtensils size={24} />
              </div>
              <h2 className="mb-1">
                {user?.dailyTargets?.calories ? Math.round((summary?.calories || 0) / user.dailyTargets.calories * 100) : 0}%
              </h2>
              <p className="mb-2">Daily Goal</p>
              <small>
                {user?.dailyTargets?.calories || 2000} cal target
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Weekly Schedule */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Weekly Schedule</h5>
              <Button variant="outline-danger" size="sm" onClick={clearWeekData}>
                <FaTrash className="me-1" />
                Reset Week
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="d-flex">
                {Object.entries(weeklyMeals).map(([day, data], index) => {
                  const isActive = day.toLowerCase() === format(selectedDate, 'EEEE').toLowerCase();
                  return (
                    <div 
                      key={day}
                      className={`flex-fill text-center p-3 border-end ${isActive ? 'bg-light' : ''}`}
                      style={{ 
                        backgroundColor: getDayColor(index),
                        cursor: 'pointer',
                        borderRight: index < 6 ? '1px solid #dee2e6' : 'none'
                      }}
                      onClick={() => {
                        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const dayIndex = days.indexOf(day);
                        const today = new Date();
                        const currentDayIndex = today.getDay();
                        const diff = dayIndex - currentDayIndex;
                        const newDate = addDays(today, diff);
                        setSelectedDate(newDate);
                      }}
                    >
                      <div className="mb-2" style={{ 
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: isActive ? '#3498db' : '#2c3e50'
                      }}>
                        {day.toUpperCase().substring(0, 3)}
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-around mb-1">
                          <div>
                            <small className="d-block text-muted">B</small>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(data.breakfast)}</div>
                          </div>
                          <div>
                            <small className="d-block text-muted">L</small>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(data.lunch)}</div>
                          </div>
                          <div>
                            <small className="d-block text-muted">D</small>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {/* {Math.round(data.dinner)} */}
                              {data.dinner}
                              </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-top pt-2">
                        <div className="mb-1" style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: '#2c3e50'
                        }}>
                          {Math.round(data.total)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
                          Total Calories
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Today's Meals */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Today's Meals</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {summary?.meals?.length > 0 ? (
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Meal Type</th>
                      <th>Food Items</th>
                      <th>Calories</th>
                      <th>Protein</th>
                      <th>Carbs</th>
                      <th>Fat</th>
                      {/* <th>Time</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.meals.map((meal, i) => (
                      <tr key={i}>
                        <td className="text-capitalize fw-bold">
                          {meal.mealType}
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {meal.entries.map((e, idx) => (
                              <span key={idx} className="badge bg-secondary">
                                {e.food?.name || 'Unknown Food'}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="fw-bold">{meal.totalNutrition.calories}</td>
                        <td>{meal.totalNutrition.protein}g</td>
                        <td>{meal.totalNutrition.carbs}g</td>
                        <td>{meal.totalNutrition.fat}g</td>
                        {/* <td>
                          <small className="text-muted">
                            {meal.timestamp ? format(new Date(meal.timestamp), 'h:mm a') : '--'}
                          </small>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  <FaAppleAlt className="text-muted mb-3" size={48} />
                  <p className="text-muted">No meals logged for today</p>
                  <p className="text-muted small">Enter food above to get started</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;