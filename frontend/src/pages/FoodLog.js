// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Modal, Badge, Alert } from 'react-bootstrap';
// import { FaPlus, FaSearch, FaUtensils } from 'react-icons/fa';
// import DatePicker from 'react-datepicker';
// import { format } from 'date-fns';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const FoodLog = () => {
//   const { user } = useAuth();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [meals, setMeals] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [foods, setFoods] = useState([]);
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [mealType, setMealType] = useState('breakfast');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchMeals();
//     fetchFoods();
//   }, [selectedDate]);

//   const fetchMeals = async () => {
//     try {
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const response = await api.get(`/meals?date=${dateStr}`);
//       setMeals(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchFoods = async () => {
//     try {
//       const response = await api.get('/foods');
//       setFoods(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleAddFood = (food) => {
//     if (!selectedFoods.find(f => f._id === food._id)) {
//       setSelectedFoods([...selectedFoods, { ...food, servingAmount: food.servingSize.amount }]);
//     }
//   };

//   const handleRemoveFood = (foodId) => {
//     setSelectedFoods(selectedFoods.filter(f => f._id !== foodId));
//   };

//   const handleServingChange = (foodId, amount) => {
//     setSelectedFoods(selectedFoods.map(f =>
//       f._id === foodId ? { ...f, servingAmount: amount } : f
//     ));
//   };

//   const handleSaveMeal = async () => {
//     if (selectedFoods.length === 0) {
//       toast.error('Please add at least one food item');
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post('/meals', {
//         date: selectedDate,
//         mealType,
//         entries: selectedFoods.map(food => ({
//           food: food._id,
//           servingAmount: food.servingAmount
//         }))
//       });

//       toast.success('Meal logged successfully!');
//       setShowAddModal(false);
//       setSelectedFoods([]);
//       fetchMeals();
//     } catch (error) {
//       toast.error('Failed to log meal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteMeal = async (mealId) => {
//     if (window.confirm('Delete this meal?')) {
//       try {
//         await api.delete(`/meals/${mealId}`);
//         toast.success('Meal deleted');
//         fetchMeals();
//       } catch (error) {
//         toast.error('Failed to delete');
//       }
//     }
//   };

//   const filteredFoods = foods.filter(food =>
//     food.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getMealIcon = (type) => {
//     switch(type) {
//       case 'breakfast': return '🌅';
//       case 'lunch': return '☀️';
//       case 'dinner': return '🌙';
//       default: return '🍴';
//     }
//   };

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2>Food Log</h2>
//           <p className="text-muted">Track your daily meals and nutrition</p>
//         </Col>
//         <Col md="auto">
//           <DatePicker selected={selectedDate} onChange={setSelectedDate} className="form-control" />
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Header className="d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">
//                 <FaUtensils className="me-2" />
//                 Meals for {format(selectedDate, 'MMMM d, yyyy')}
//               </h5>
//               <Button variant="primary" onClick={() => setShowAddModal(true)}>
//                 <FaPlus className="me-2" /> Add Meal
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               {meals.length > 0 ? (
//                 <Table responsive>
//                   <thead>
//                     <tr>
//                       <th>Meal</th>
//                       <th>Food Items</th>
//                       <th>Calories</th>
//                       <th>Protein</th>
//                       <th>Carbs</th>
//                       <th>Fat</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {meals.map(meal => (
//                       <tr key={meal._id}>
//                         <td>
//                           <span className="me-2">{getMealIcon(meal.mealType)}</span>
//                           <span className="text-capitalize">{meal.mealType}</span>
//                         </td>
//                         <td>
//                           {meal.entries?.map((entry, i) => (
//                             <Badge key={i} bg="light" text="dark" className="me-1">
//                               {entry.food?.name} ({entry.servingAmount}g)
//                             </Badge>
//                           ))}
//                         </td>
//                         <td>{meal.totalNutrition?.calories || 0}</td>
//                         <td>{meal.totalNutrition?.protein || 0}g</td>
//                         <td>{meal.totalNutrition?.carbs || 0}g</td>
//                         <td>{meal.totalNutrition?.fat || 0}g</td>
//                         <td>
//                           <Button size="sm" variant="outline-danger" onClick={() => deleteMeal(meal._id)}>
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <Alert variant="info" className="text-center">
//                   No meals logged for today. Click "Add Meal" to get started!
//                 </Alert>
//               )}

//               <div className="mt-4">
//                 <h6>Daily Summary</h6>
//                 <Row>
//                   <Col>
//                     <Card className="text-center">
//                       <Card.Body>
//                         <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.calories || 0), 0)}</h5>
//                         <p className="text-muted mb-0">Total Calories</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="text-center">
//                       <Card.Body>
//                         <h5>{meals.length}</h5>
//                         <p className="text-muted mb-0">Meals</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="text-center">
//                       <Card.Body>
//                         <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.protein || 0), 0).toFixed(1)}g</h5>
//                         <p className="text-muted mb-0">Total Protein</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   <Col>
//                     <Card className="text-center">
//                       <Card.Body>
//                         <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.carbs || 0), 0).toFixed(1)}g</h5>
//                         <p className="text-muted mb-0">Total Carbs</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 </Row>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Add Meal Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Meal</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Meal Type</Form.Label>
//             <Form.Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
//               <option value="breakfast">Breakfast</option>
//               <option value="lunch">Lunch</option>
//               <option value="dinner">Dinner</option>
//               <option value="snack">Snack</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Search Foods</Form.Label>
//             <div className="input-group">
//               <span className="input-group-text"><FaSearch /></span>
//               <Form.Control
//                 type="text"
//                 placeholder="Search food database..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </Form.Group>

//           <div className="mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//             <h6>Available Foods</h6>
//             <div className="d-flex flex-wrap gap-2">
//               {filteredFoods.slice(0, 20).map(food => (
//                 <Badge
//                   key={food._id}
//                   bg="info"
//                   className="cursor-pointer"
//                   onClick={() => handleAddFood(food)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {food.name} ({food.nutrition.calories} cal)
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <h6>Selected Foods ({selectedFoods.length})</h6>
//             {selectedFoods.length > 0 ? (
//               <Table striped size="sm">
//                 <thead>
//                   <tr>
//                     <th>Food</th>
//                     <th>Serving (g)</th>
//                     <th>Calories</th>
//                     <th>Protein</th>
//                     <th>Carbs</th>
//                     <th>Fat</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedFoods.map(food => (
//                     <tr key={food._id}>
//                       <td>{food.name}</td>
//                       <td>
//                         <Form.Control
//                           type="number"
//                           size="sm"
//                           value={food.servingAmount}
//                           onChange={(e) => handleServingChange(food._id, e.target.value)}
//                           style={{ width: '80px' }}
//                         />
//                       </td>
//                       <td>{Math.round(food.nutrition.calories * (food.servingAmount / food.servingSize.amount))}</td>
//                       <td>{(food.nutrition.protein * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
//                       <td>{(food.nutrition.carbs * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
//                       <td>{(food.nutrition.fat * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
//                       <td>
//                         <Button size="sm" variant="outline-danger" onClick={() => handleRemoveFood(food._id)}>
//                           Remove
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             ) : (
//               <Alert variant="warning">No foods selected. Click on food items above to add them.</Alert>
//             )}
//           </div>

//           {selectedFoods.length > 0 && (
//             <Card className="mb-3">
//               <Card.Body>
//                 <h6>Meal Summary</h6>
//                 <Row>
//                   <Col>
//                     <strong>Total Calories:</strong> {selectedFoods.reduce((sum, food) =>
//                       sum + Math.round(food.nutrition.calories * (food.servingAmount / food.servingSize.amount)), 0)}
//                   </Col>
//                   <Col>
//                     <strong>Protein:</strong> {selectedFoods.reduce((sum, food) =>
//                       sum + (food.nutrition.protein * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
//                   </Col>
//                   <Col>
//                     <strong>Carbs:</strong> {selectedFoods.reduce((sum, food) =>
//                       sum + (food.nutrition.carbs * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
//                   </Col>
//                   <Col>
//                     <strong>Fat:</strong> {selectedFoods.reduce((sum, food) =>
//                       sum + (food.nutrition.fat * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAddModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveMeal} disabled={loading || selectedFoods.length === 0}>
//             {loading ? 'Saving...' : 'Save Meal'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default FoodLog;
// new
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaPlus, FaSearch, FaUtensils, FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const FoodLog = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [foods, setFoods] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealType, setMealType] = useState('breakfast');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  useEffect(() => {
    fetchMeals();
    fetchRecipes();
  }, [selectedDate]);

  const fetchMeals = async () => {
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await api.get(`/meals?date=${dateStr}`);
      setMeals(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRecipes = async () => {
    try {
      setLoadingRecipes(true);
      
      // Fetch tags
      const tagsResponse = await fetch('https://dummyjson.com/recipes/tags');
      const tagsData = await tagsResponse.json();
      setAvailableTags(tagsData);
      
      // Get total count
      const initialResponse = await fetch('https://dummyjson.com/recipes?limit=0');
      const initialData = await initialResponse.json();
      const total = initialData.total;
      
      // Fetch all recipes
      const response = await fetch(`https://dummyjson.com/recipes?limit=${total}`);
      const data = await response.json();
      
      // Map recipes to food items
      const mappedFoods = data.recipes.map(recipe => ({
        _id: `recipe-${recipe.id}`,
        name: recipe.name,
        category: mapCuisineToCategory(recipe.cuisine, recipe.tags, recipe.mealType),
        servingSize: { amount: 1, unit: 'serving' },
        nutrition: {
          calories: recipe.caloriesPerServing,
          protein: estimateProtein(recipe.tags),
          carbs: estimateCarbs(recipe.tags),
          fat: estimateFat(recipe.tags),
          fiber: 0,
          sugar: 0
        },
        isRecipe: true,
        image: recipe.image,
        difficulty: recipe.difficulty,
        mealType: recipe.mealType,
        tags: recipe.tags
      }));
      
      setFoods(mappedFoods);
      setLoadingRecipes(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to load recipes');
      setLoadingRecipes(false);
    }
  };

  const mapCuisineToCategory = (cuisine, tags, mealType) => {
    const lowerTags = tags.map(t => t.toLowerCase());
    const lowerMealType = mealType.map(m => m.toLowerCase());
    
    if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
    if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
    if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
    if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
    if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
    
    return 'other';
  };

  const estimateProtein = (tags) => {
    const lowerTags = tags.map(t => t.toLowerCase());
    if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
    if (lowerTags.includes('vegetarian')) return 8;
    return 15;
  };

  const estimateCarbs = (tags) => {
    const lowerTags = tags.map(t => t.toLowerCase());
    if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
    if (lowerTags.includes('dessert')) return 35;
    return 20;
  };

  const estimateFat = (tags) => {
    const lowerTags = tags.map(t => t.toLowerCase());
    if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
    return 12;
  };

  const handleAddFood = (food) => {
    if (!selectedFoods.find(f => f._id === food._id)) {
      setSelectedFoods([...selectedFoods, { ...food, servingAmount: food.servingSize.amount }]);
    }
  };

  const handleRemoveFood = (foodId) => {
    setSelectedFoods(selectedFoods.filter(f => f._id !== foodId));
  };

  const handleServingChange = (foodId, amount) => {
    setSelectedFoods(selectedFoods.map(f =>
      f._id === foodId ? { ...f, servingAmount: amount } : f
    ));
  };

  const handleSaveMeal = async () => {
    if (selectedFoods.length === 0) {
      toast.error('Please add at least one food item');
      return;
    }

    setLoading(true);
    try {
      await api.post('/meals', {
        date: selectedDate,
        mealType,
        entries: selectedFoods.map(food => ({
          food: food._id,
          servingAmount: food.servingAmount
        }))
      });

      toast.success('Meal logged successfully!');
      setShowAddModal(false);
      setSelectedFoods([]);
      setCategoryFilter('all');
      setMealTypeFilter('all');
      setSelectedTag('all');
      setSearchTerm('');
      fetchMeals();
    } catch (error) {
      toast.error('Failed to log meal');
    } finally {
      setLoading(false);
    }
  };

  const deleteMeal = async (mealId) => {
    if (window.confirm('Delete this meal?')) {
      try {
        await api.delete(`/meals/${mealId}`);
        toast.success('Meal deleted');
        fetchMeals();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const categories = ['all', 'fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other'];
  const mealTypes = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'beverage', 'appetizer', 'side dish'];

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || food.category === categoryFilter;
    const matchesMealType = mealTypeFilter === 'all' || 
      (food.mealType && food.mealType.some(mt => mt.toLowerCase() === mealTypeFilter.toLowerCase()));
    const matchesTag = selectedTag === 'all' || 
      (food.tags && food.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));
    return matchesSearch && matchesCategory && matchesMealType && matchesTag;
  });

  const clearFilters = () => {
    setCategoryFilter('all');
    setMealTypeFilter('all');
    setSelectedTag('all');
    setSearchTerm('');
  };

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'fruit': return 'success';
      case 'vegetable': return 'success';
      case 'protein': return 'danger';
      case 'grains': return 'warning';
      case 'dairy': return 'info';
      case 'fats': return 'secondary';
      case 'beverage': return 'dark';
      default: return 'primary';
    }
  };

  const getMealIcon = (type) => {
    switch(type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍴';
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Food Log</h2>
          <p className="text-muted">Track your daily meals and nutrition</p>
        </Col>
        <Col md="auto">
          <DatePicker selected={selectedDate} onChange={setSelectedDate} className="form-control" />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaUtensils className="me-2" />
                Meals for {format(selectedDate, 'MMMM d, yyyy')}
              </h5>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <FaPlus className="me-2" /> Add Meal
              </Button>
            </Card.Header>
            <Card.Body>
              {meals.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Food Items</th>
                      <th>Calories</th>
                      <th>Protein</th>
                      <th>Carbs</th>
                      <th>Fat</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map(meal => (
                      <tr key={meal._id}>
                        <td>
                          <span className="me-2">{getMealIcon(meal.mealType)}</span>
                          <span className="text-capitalize">{meal.mealType}</span>
                        </td>
                        <td>
                          {meal.entries?.map((entry, i) => (
                            <Badge key={i} bg="light" text="dark" className="me-1">
                              {entry.food?.name} ({entry.servingAmount}g)
                            </Badge>
                          ))}
                        </td>
                        <td>{meal.totalNutrition?.calories || 0}</td>
                        <td>{meal.totalNutrition?.protein || 0}g</td>
                        <td>{meal.totalNutrition?.carbs || 0}g</td>
                        <td>{meal.totalNutrition?.fat || 0}g</td>
                        <td>
                          <Button size="sm" variant="outline-danger" onClick={() => deleteMeal(meal._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info" className="text-center">
                  No meals logged for today. Click "Add Meal" to get started!
                </Alert>
              )}

              <div className="mt-4">
                <h6>Daily Summary</h6>
                <Row>
                  <Col>
                    <Card className="text-center">
                      <Card.Body>
                        <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.calories || 0), 0)}</h5>
                        <p className="text-muted mb-0">Total Calories</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="text-center">
                      <Card.Body>
                        <h5>{meals.length}</h5>
                        <p className="text-muted mb-0">Meals</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="text-center">
                      <Card.Body>
                        <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.protein || 0), 0).toFixed(1)}g</h5>
                        <p className="text-muted mb-0">Total Protein</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="text-center">
                      <Card.Body>
                        <h5>{meals.reduce((sum, meal) => sum + (meal.totalNutrition?.carbs || 0), 0).toFixed(1)}g</h5>
                        <p className="text-muted mb-0">Total Carbs</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Meal Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add New Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Meal Type</Form.Label>
            <Form.Select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </Form.Select>
          </Form.Group>

          {loadingRecipes ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading recipes...</p>
            </div>
          ) : (
            <>
              {/* Filters Section */}
              <Card className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaSearch className="me-2" />Search Foods</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Search food database..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-muted">Food Category</Form.Label>
                        <Form.Select 
                          size="sm" 
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-muted">Meal Type</Form.Label>
                        <Form.Select 
                          size="sm" 
                          value={mealTypeFilter}
                          onChange={(e) => setMealTypeFilter(e.target.value)}
                        >
                          {mealTypes.map(mt => (
                            <option key={mt} value={mt}>
                              {mt.charAt(0).toUpperCase() + mt.slice(1)}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold text-muted">
                          <FaFilter className="me-1" />Tags
                        </Form.Label>
                        <Form.Select 
                          size="sm" 
                          value={selectedTag}
                          onChange={(e) => setSelectedTag(e.target.value)}
                        >
                          <option value="all">All Tags</option>
                          {availableTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {(categoryFilter !== 'all' || mealTypeFilter !== 'all' || selectedTag !== 'all' || searchTerm) && (
                    <div className="text-end">
                      <Button variant="link" size="sm" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Available Foods */}
              <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '4px', padding: '10px' }}>
                <h6 className="mb-3">
                  Available Recipes ({filteredFoods.length})
                </h6>
                <Row>
                  {filteredFoods.slice(0, 50).map(food => (
                    <Col md={6} lg={4} key={food._id} className="mb-2">
                      <Card 
                        className="h-100 cursor-pointer border" 
                        onClick={() => handleAddFood(food)}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                      >
                        <Card.Body className="p-2">
                          <div className="d-flex align-items-center gap-2">
                            {food.image && (
                              <img 
                                src={food.image} 
                                alt={food.name}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  objectFit: 'cover',
                                  borderRadius: '6px'
                                }}
                              />
                            )}
                            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                              <div className="fw-bold text-truncate" style={{ fontSize: '0.85rem' }}>
                                {food.name}
                              </div>
                              <div className="d-flex gap-1 flex-wrap">
                                <Badge bg={getCategoryColor(food.category)} style={{ fontSize: '0.65rem' }}>
                                  {food.category}
                                </Badge>
                                <Badge bg="light" text="dark" style={{ fontSize: '0.65rem' }}>
                                  {food.nutrition.calories} cal
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {filteredFoods.length === 0 && (
                  <Alert variant="warning" className="text-center">
                    No recipes match your filters. Try adjusting your search.
                  </Alert>
                )}
              </div>
            </>
          )}

          {/* Selected Foods */}
          <div className="mb-4">
            <h6>Selected Foods ({selectedFoods.length})</h6>
            {selectedFoods.length > 0 ? (
              <Table striped size="sm" responsive>
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Serving</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFoods.map(food => (
                    <tr key={food._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {food.image && (
                            <img 
                              src={food.image} 
                              alt={food.name}
                              style={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          )}
                          <span>{food.name}</span>
                        </div>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          size="sm"
                          value={food.servingAmount}
                          onChange={(e) => handleServingChange(food._id, e.target.value)}
                          style={{ width: '80px' }}
                        /> {food.servingSize.unit}
                      </td>
                      <td>{Math.round(food.nutrition.calories * (food.servingAmount / food.servingSize.amount))}</td>
                      <td>{(food.nutrition.protein * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
                      <td>{(food.nutrition.carbs * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
                      <td>{(food.nutrition.fat * (food.servingAmount / food.servingSize.amount)).toFixed(1)}g</td>
                      <td>
                        <Button size="sm" variant="outline-danger" onClick={() => handleRemoveFood(food._id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="warning">No foods selected. Click on recipe cards above to add them.</Alert>
            )}
          </div>

          {selectedFoods.length > 0 && (
            <Card className="mb-3 bg-light">
              <Card.Body>
                <h6>Meal Summary</h6>
                <Row>
                  <Col>
                    <strong>Total Calories:</strong> {selectedFoods.reduce((sum, food) =>
                      sum + Math.round(food.nutrition.calories * (food.servingAmount / food.servingSize.amount)), 0)}
                  </Col>
                  <Col>
                    <strong>Protein:</strong> {selectedFoods.reduce((sum, food) =>
                      sum + (food.nutrition.protein * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
                  </Col>
                  <Col>
                    <strong>Carbs:</strong> {selectedFoods.reduce((sum, food) =>
                      sum + (food.nutrition.carbs * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
                  </Col>
                  <Col>
                    <strong>Fat:</strong> {selectedFoods.reduce((sum, food) =>
                      sum + (food.nutrition.fat * (food.servingAmount / food.servingSize.amount)), 0).toFixed(1)}g
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveMeal} disabled={loading || selectedFoods.length === 0}>
            {loading ? 'Saving...' : 'Save Meal'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FoodLog;