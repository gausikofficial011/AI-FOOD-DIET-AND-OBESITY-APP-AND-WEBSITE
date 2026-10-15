// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Alert } from 'react-bootstrap';
// // import { FaUtensils, FaHeart, FaClock, FaFire, FaFilter } from 'react-icons/fa';
// // import api from '../services/api';
// // import { useAuth } from '../context/AuthContext';
// // import { toast } from 'react-toastify';

// // const Recipes = () => {
// //   const { user } = useAuth();
// //   const [recipes, setRecipes] = useState([]);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [filters, setFilters] = useState({
// //     category: 'all',
// //     difficulty: 'all',
// //     maxTime: '',
// //     search: ''
// //   });

// //   useEffect(() => {
// //     fetchRecipes();
// //     fetchSuggestions();
// //   }, []);

// //   const fetchRecipes = async () => {
// //     try {
// //       const response = await api.get('/recipes');
// //       setRecipes(response.data);
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const fetchSuggestions = async () => {
// //     try {
// //       const response = await api.get('/recipes/suggestions');
// //       setSuggestions(response.data);
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleLike = async (recipeId) => {
// //     try {
// //       await api.post(`/recipes/${recipeId}/like`);
// //       toast.success('Recipe liked!');
// //       fetchRecipes();
// //     } catch (error) {
// //       toast.error('Failed to like recipe');
// //     }
// //   };

// //   const handleSave = async (recipeId) => {
// //     try {
// //       await api.post(`/recipes/${recipeId}/save`);
// //       toast.success('Recipe saved to your meal plan!');
// //     } catch (error) {
// //       toast.error('Failed to save recipe');
// //     }
// //   };

// //   const filteredRecipes = recipes.filter(recipe => {
// //     if (filters.category !== 'all' && recipe.category !== filters.category) return false;
// //     if (filters.difficulty !== 'all' && recipe.difficulty !== filters.difficulty) return false;
// //     if (filters.maxTime && (recipe.preparationTime + recipe.cookingTime) > parseInt(filters.maxTime)) return false;
// //     if (filters.search && !recipe.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
// //     return true;
// //   });

// //   const getDifficultyColor = (difficulty) => {
// //     switch(difficulty) {
// //       case 'easy': return 'success';
// //       case 'medium': return 'warning';
// //       case 'hard': return 'danger';
// //       default: return 'secondary';
// //     }
// //   };

// //   const getCategoryIcon = (category) => {
// //     switch(category) {
// //       case 'breakfast': return '☕';
// //       case 'lunch': return '🍽️';
// //       case 'dinner': return '🍛';
// //       case 'snack': return '🍎';
// //       case 'dessert': return '🍰';
// //       default: return '🍴';
// //     }
// //   };

// //   return (
// //     <Container>
// //       <Row className="mb-4">
// //         <Col>
// //           <h2><FaUtensils className="me-2" />Recipes</h2>
// //           <p className="text-muted">Discover healthy recipes and meal suggestions</p>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col lg={3}>
// //           <Card className="mb-4">
// //             <Card.Header>
// //               <h5 className="mb-0"><FaFilter className="me-2" />Filters</h5>
// //             </Card.Header>
// //             <Card.Body>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Search</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="Search recipes..."
// //                   value={filters.search}
// //                   onChange={(e) => setFilters({...filters, search: e.target.value})}
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Category</Form.Label>
// //                 <Form.Select
// //                   value={filters.category}
// //                   onChange={(e) => setFilters({...filters, category: e.target.value})}
// //                 >
// //                   <option value="all">All Categories</option>
// //                   <option value="breakfast">Breakfast</option>
// //                   <option value="lunch">Lunch</option>
// //                   <option value="dinner">Dinner</option>
// //                   <option value="snack">Snack</option>
// //                   <option value="dessert">Dessert</option>
// //                 </Form.Select>
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Difficulty</Form.Label>
// //                 <Form.Select
// //                   value={filters.difficulty}
// //                   onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
// //                 >
// //                   <option value="all">All Levels</option>
// //                   <option value="easy">Easy</option>
// //                   <option value="medium">Medium</option>
// //                   <option value="hard">Hard</option>
// //                 </Form.Select>
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Max Preparation Time (min)</Form.Label>
// //                 <Form.Control
// //                   type="number"
// //                   placeholder="e.g., 30"
// //                   value={filters.maxTime}
// //                   onChange={(e) => setFilters({...filters, maxTime: e.target.value})}
// //                 />
// //               </Form.Group>

// //               <Button variant="outline-secondary" className="w-100" onClick={() => setFilters({
// //                 category: 'all',
// //                 difficulty: 'all',
// //                 maxTime: '',
// //                 search: ''
// //               })}>
// //                 Clear Filters
// //               </Button>
// //             </Card.Body>
// //           </Card>

// //           {suggestions.length > 0 && (
// //             <Card>
// //               <Card.Header>
// //                 <h5 className="mb-0">Suggested for You</h5>
// //               </Card.Header>
// //               <Card.Body>
// //                 <ListGroup variant="flush">
// //                   {suggestions.slice(0, 5).map(recipe => (
// //                     <ListGroup.Item key={recipe._id} className="d-flex align-items-center py-2">
// //                       <span className="me-2">{getCategoryIcon(recipe.category)}</span>
// //                       <div className="flex-grow-1">
// //                         <div className="small">{recipe.title}</div>
// //                         <Badge bg={getDifficultyColor(recipe.difficulty)} size="sm">
// //                           {recipe.difficulty}
// //                         </Badge>
// //                       </div>
// //                     </ListGroup.Item>
// //                   ))}
// //                 </ListGroup>
// //               </Card.Body>
// //             </Card>
// //           )}
// //         </Col>

// //         <Col lg={9}>
// //           <div className="d-flex justify-content-between mb-4">
// //             <h5>Showing {filteredRecipes.length} recipes</h5>
// //             <Button variant="primary">
// //               <FaUtensils className="me-2" /> Add Recipe
// //             </Button>
// //           </div>

// //           {filteredRecipes.length > 0 ? (
// //             <Row>
// //               {filteredRecipes.map(recipe => (
// //                 <Col md={6} lg={4} key={recipe._id} className="mb-4">
// //                   <Card className="h-100">
// //                     <Card.Img
// //                       variant="top"
// //                       src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe+Image'}
// //                       style={{ height: '150px', objectFit: 'cover' }}
// //                     />
// //                     <Card.Body>
// //                       <div className="d-flex justify-content-between align-items-start mb-2">
// //                         <div>
// //                           <Badge bg="light" text="dark" className="me-1">
// //                             {getCategoryIcon(recipe.category)} {recipe.category}
// //                           </Badge>
// //                           <Badge bg={getDifficultyColor(recipe.difficulty)}>
// //                             {recipe.difficulty}
// //                           </Badge>
// //                         </div>
// //                         <Button
// //                           variant="link"
// //                           className="p-0"
// //                           onClick={() => handleLike(recipe._id)}
// //                         >
// //                           <FaHeart className={recipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
// //                           <small className="ms-1">{recipe.likes?.length || 0}</small>
// //                         </Button>
// //                       </div>

// //                       <Card.Title className="mb-2">{recipe.title}</Card.Title>

// //                       {recipe.description && (
// //                         <Card.Text className="small text-muted mb-3">
// //                           {recipe.description.length > 100
// //                             ? `${recipe.description.substring(0, 100)}...`
// //                             : recipe.description}
// //                         </Card.Text>
// //                       )}

// //                       <div className="d-flex justify-content-between small mb-3">
// //                         <div>
// //                           <FaClock className="me-1" />
// //                           {recipe.preparationTime + recipe.cookingTime} min
// //                         </div>
// //                         <div>
// //                           <FaFire className="me-1" />
// //                           {recipe.nutrition?.calories || 0} cal
// //                         </div>
// //                         <div>
// //                           {recipe.servings} servings
// //                         </div>
// //                       </div>

// //                       <div className="d-grid gap-2">
// //                         <Button variant="outline-primary" size="sm">
// //                           View Recipe
// //                         </Button>
// //                         <Button
// //                           variant="outline-success"
// //                           size="sm"
// //                           onClick={() => handleSave(recipe._id)}
// //                         >
// //                           Save to Meal Plan
// //                         </Button>
// //                       </div>
// //                     </Card.Body>
// //                   </Card>
// //                 </Col>
// //               ))}
// //             </Row>
// //           ) : (
// //             <Alert variant="info" className="text-center py-5">
// //               <FaUtensils size={48} className="mb-3" />
// //               <h4>No recipes found</h4>
// //               <p className="text-muted">Try adjusting your filters or check back later</p>
// //             </Alert>
// //           )}

// //           <Card className="mt-4">
// //             <Card.Header>
// //               <h5 className="mb-0">Meal Planning Tips</h5>
// //             </Card.Header>
// //             <Card.Body>
// //               <Row>
// //                 <Col md={4}>
// //                   <div className="text-center">
// //                     <div className="display-4">📋</div>
// //                     <h6>Plan Ahead</h6>
// //                     <p className="small text-muted">Plan your meals for the week to save time and money</p>
// //                   </div>
// //                 </Col>
// //                 <Col md={4}>
// //                   <div className="text-center">
// //                     <div className="display-4">🥦</div>
// //                     <h6>Balance Nutrients</h6>
// //                     <p className="small text-muted">Include protein, carbs, and healthy fats in every meal</p>
// //                   </div>
// //                 </Col>
// //                 <Col md={4}>
// //                   <div className="text-center">
// //                     <div className="display-4">⏰</div>
// //                     <h6>Prep in Advance</h6>
// //                     <p className="small text-muted">Prepare ingredients ahead of time for quick cooking</p>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default Recipes;
// // api integrt
// import React, { useState, useEffect } from 'react';
// import {
//   Container, Row, Col, Card, Button, Form,
//   Badge, ListGroup, Alert, Modal, InputGroup,
//   Spinner, Tab, Tabs, Dropdown
// } from 'react-bootstrap';
// import {
//   FaUtensils, FaHeart, FaClock, FaFire, FaFilter,
//   FaPlus, FaStar, FaSearch, FaTrash, FaEdit,
//   FaTimes, FaCheck, FaUser, FaList, FaAppleAlt,
//   FaExclamationTriangle, FaInfoCircle
// } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Recipes = () => {
//   const { user } = useAuth();
//   const [recipes, setRecipes] = useState([]);
//   const [foods, setFoods] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingFoods, setLoadingFoods] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [activeTab, setActiveTab] = useState('browse');
//   const [foodSearch, setFoodSearch] = useState('');
//   const [newRecipe, setNewRecipe] = useState({
//     title: '',
//     description: '',
//     category: 'breakfast',
//     difficulty: 'easy',
//     preparationTime: 15,
//     cookingTime: 20,
//     servings: 1,
//     ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
//     instructions: [''],
//     nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const [filters, setFilters] = useState({
//     category: 'all',
//     difficulty: 'all',
//     maxTime: '',
//     search: ''
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchRecipes();
//     fetchFoods();
//   }, []);

//   // Fetch all recipes
//   const fetchRecipes = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/recipes');
//       setRecipes(response.data);

//       // Update suggestions with top recipes
//       if (response.data.length > 0) {
//         setSuggestions(response.data.slice(0, 3));
//       }
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       toast.error('Failed to load recipes');
//       // Load demo data if API fails
//       loadDemoData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all foods for dropdown
//   const fetchFoods = async () => {
//     setLoadingFoods(true);
//     try {
//       const response = await api.get('/foods');
//       setFoods(response.data);
//     } catch (error) {
//       console.error('Error fetching foods:', error);
//       toast.error('Failed to load foods');
//     } finally {
//       setLoadingFoods(false);
//     }
//   };

//   // Demo data fallback
//   const loadDemoData = () => {
//     const demoRecipes = [
//       {
//         _id: '1',
//         title: "Greek Yogurt Breakfast Bowl",
//         description: "Protein-packed breakfast with fresh fruits and nuts",
//         preparationTime: 5,
//         cookingTime: 0,
//         servings: 1,
//         nutrition: { calories: 320, protein: 20, carbs: 35, fat: 12 },
//         difficulty: "easy",
//         category: "breakfast",
//         image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
//         likes: [],
//         saves: [],
//         createdBy: { _id: 'demo', username: 'DemoUser' },
//         ingredients: [
//           { food: { _id: '1', name: 'Greek Yogurt' }, amount: 200, unit: 'grams' },
//           { food: { _id: '2', name: 'Banana' }, amount: 1, unit: 'piece' }
//         ]
//       }
//     ];
//     setRecipes(demoRecipes);
//     setSuggestions(demoRecipes.slice(0, 3));
//   };

//   // Validate recipe form
//   const validateRecipeForm = () => {
//     const errors = {};

//     // Validate title
//     if (!newRecipe.title.trim()) {
//       errors.title = 'Recipe title is required';
//     }

//     // Validate ingredients
//     const ingredientErrors = [];
//     newRecipe.ingredients.forEach((ingredient, index) => {
//       if (!ingredient.foodId) {
//         ingredientErrors[index] = { ...ingredientErrors[index], food: 'Please select a food' };
//       }
//       if (!ingredient.amount || parseFloat(ingredient.amount) <= 0) {
//         ingredientErrors[index] = {
//           ...ingredientErrors[index],
//           amount: 'Please enter a valid amount'
//         };
//       }
//     });

//     if (ingredientErrors.length > 0) {
//       errors.ingredients = ingredientErrors;
//     }

//     // Validate instructions
//     const validInstructions = newRecipe.instructions.filter(inst => inst.trim() !== '');
//     if (validInstructions.length === 0) {
//       errors.instructions = 'At least one instruction is required';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle like/unlike recipe
//   const handleLike = async (recipeId) => {
//     try {
//       await api.post(`/recipes/${recipeId}/like`);
//       toast.success('Recipe liked!');
//       fetchRecipes(); // Refresh recipes list
//     } catch (error) {
//       console.error('Error liking recipe:', error);
//       toast.error('Failed to like recipe');
//     }
//   };

//   // Handle save/unsave recipe
//   const handleSave = async (recipeId) => {
//     try {
//       await api.post(`/recipes/${recipeId}/save`);
//       toast.success('Recipe saved to meal plan!');
//       fetchRecipes(); // Refresh recipes list
//     } catch (error) {
//       console.error('Error saving recipe:', error);
//       toast.error('Failed to save recipe');
//     }
//   };

//   // Handle add new recipe
//   const handleAddRecipe = async () => {
//     // Validate form
//     if (!validateRecipeForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     // Prepare ingredients data for API
//     const ingredientsForAPI = newRecipe.ingredients.map(ingredient => ({
//       food: ingredient.foodId, // Send food ID
//       amount: parseFloat(ingredient.amount) || 0,
//       unit: ingredient.unit || 'grams'
//     }));

//     // Filter out empty instructions
//     const validInstructions = newRecipe.instructions.filter(inst => inst.trim() !== '');

//     // Prepare recipe data for API
//     const recipeData = {
//       title: newRecipe.title,
//       description: newRecipe.description,
//       category: newRecipe.category,
//       difficulty: newRecipe.difficulty,
//       preparationTime: parseInt(newRecipe.preparationTime) || 0,
//       cookingTime: parseInt(newRecipe.cookingTime) || 0,
//       servings: parseInt(newRecipe.servings) || 1,
//       ingredients: ingredientsForAPI,
//       instructions: validInstructions,
//       nutrition: {
//         calories: parseInt(newRecipe.nutrition.calories) || 0,
//         protein: parseInt(newRecipe.nutrition.protein) || 0,
//         carbs: parseInt(newRecipe.nutrition.carbs) || 0,
//         fat: parseInt(newRecipe.nutrition.fat) || 0
//       }
//     };

//     console.log('Sending recipe data:', recipeData);

//     setLoading(true);
//     try {
//       const response = await api.post('/recipes', recipeData);
//       toast.success('Recipe added successfully!');
//       setShowAddModal(false);
//       // Reset form
//       resetRecipeForm();
//       fetchRecipes(); // Refresh list
//     } catch (error) {
//       console.error('Error adding recipe:', error.response?.data || error.message);
//       const errorMsg = error.response?.data?.message || 'Failed to add recipe';

//       if (errorMsg.includes('Cast to ObjectId failed')) {
//         toast.error('Invalid food ID. Please select foods from the dropdown.');
//       } else if (errorMsg.includes('validation failed')) {
//         toast.error('Recipe validation failed. Please check all fields.');
//       } else {
//         toast.error(errorMsg);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset recipe form
//   const resetRecipeForm = () => {
//     setNewRecipe({
//       title: '',
//       description: '',
//       category: 'breakfast',
//       difficulty: 'easy',
//       preparationTime: 15,
//       cookingTime: 20,
//       servings: 1,
//       ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
//       instructions: [''],
//       nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     });
//     setFormErrors({});
//     setFoodSearch('');
//   };

//   // Handle delete recipe
//   const handleDeleteRecipe = async (recipeId) => {
//     if (!window.confirm('Are you sure you want to delete this recipe?')) {
//       return;
//     }

//     try {
//       await api.delete(`/recipes/${recipeId}`);
//       toast.success('Recipe deleted!');
//       fetchRecipes(); // Refresh list
//     } catch (error) {
//       console.error('Error deleting recipe:', error);
//       toast.error('Failed to delete recipe');
//     }
//   };

//   // Handle view recipe details
//   const handleViewRecipe = (recipe) => {
//     setSelectedRecipe(recipe);
//     setShowViewModal(true);
//   };

//   // Helper function to check if food is selected
//   const isFoodSelected = (ingredient) => {
//     return ingredient.foodId && ingredient.foodName;
//   };

//   // Handle food selection for an ingredient
//   const handleFoodSelect = (index, foodId, foodName) => {
//     console.log('Selected food:', { foodId, foodName, index });

//     const newIngredients = [...newRecipe.ingredients];
//     newIngredients[index] = {
//       ...newIngredients[index],
//       foodId: foodId,
//       foodName: foodName
//     };

//     setNewRecipe({
//       ...newRecipe,
//       ingredients: newIngredients
//     });

//     // Clear error for this ingredient
//     if (formErrors.ingredients && formErrors.ingredients[index]) {
//       const newErrors = { ...formErrors };
//       delete newErrors.ingredients[index].food;
//       if (Object.keys(newErrors.ingredients[index]).length === 0) {
//         delete newErrors.ingredients[index];
//       }
//       if (Object.keys(newErrors.ingredients).length === 0) {
//         delete newErrors.ingredients;
//       }
//       setFormErrors(newErrors);
//     }

//     // Clear food search when item is selected
//     setFoodSearch('');

//     // Calculate nutrition automatically when food is selected and amount is set
//     if (newIngredients[index].amount) {
//       calculateNutrition();
//     }
//   };

//   // Add ingredient field
//   const addIngredient = () => {
//     setNewRecipe({
//       ...newRecipe,
//       ingredients: [...newRecipe.ingredients, { foodId: '', foodName: '', amount: '', unit: 'grams' }]
//     });
//   };

//   // Remove ingredient field
//   const removeIngredient = (index) => {
//     if (newRecipe.ingredients.length <= 1) {
//       toast.error('Recipe must have at least one ingredient');
//       return;
//     }

//     const newIngredients = [...newRecipe.ingredients];
//     newIngredients.splice(index, 1);
//     setNewRecipe({ ...newRecipe, ingredients: newIngredients });

//     // Remove error for this ingredient if it exists
//     if (formErrors.ingredients && formErrors.ingredients[index]) {
//       const newErrors = { ...formErrors };
//       delete newErrors.ingredients[index];
//       // Re-index the errors array
//       const filteredErrors = newErrors.ingredients.filter((_, i) => i !== index);
//       newErrors.ingredients = filteredErrors;
//       setFormErrors(newErrors);
//     }
//   };

//   // Update ingredient field
//   const updateIngredient = (index, field, value) => {
//     const newIngredients = [...newRecipe.ingredients];
//     newIngredients[index] = { ...newIngredients[index], [field]: value };
//     setNewRecipe({ ...newRecipe, ingredients: newIngredients });

//     // Clear amount error if fixed
//     if (field === 'amount' && value && parseFloat(value) > 0) {
//       if (formErrors.ingredients && formErrors.ingredients[index] && formErrors.ingredients[index].amount) {
//         const newErrors = { ...formErrors };
//         delete newErrors.ingredients[index].amount;
//         if (Object.keys(newErrors.ingredients[index]).length === 0) {
//           delete newErrors.ingredients[index];
//         }
//         setFormErrors(newErrors);
//       }
//     }
//   };

//   // Calculate nutrition based on ingredients
//   const calculateNutrition = () => {
//     let totalCalories = 0;
//     let totalProtein = 0;
//     let totalCarbs = 0;
//     let totalFat = 0;

//     newRecipe.ingredients.forEach(ingredient => {
//       if (ingredient.foodId && ingredient.amount) {
//         const food = foods.find(f => f._id === ingredient.foodId);
//         if (food) {
//           const multiplier = parseFloat(ingredient.amount) / food.servingSize.amount;
//           totalCalories += food.nutrition.calories * multiplier;
//           totalProtein += food.nutrition.protein * multiplier;
//           totalCarbs += food.nutrition.carbs * multiplier;
//           totalFat += food.nutrition.fat * multiplier;
//         }
//       }
//     });

//     setNewRecipe({
//       ...newRecipe,
//       nutrition: {
//         calories: Math.round(totalCalories),
//         protein: Math.round(totalProtein * 10) / 10,
//         carbs: Math.round(totalCarbs * 10) / 10,
//         fat: Math.round(totalFat * 10) / 10
//       }
//     });
//   };

//   // Add instruction field
//   const addInstruction = () => {
//     setNewRecipe({
//       ...newRecipe,
//       instructions: [...newRecipe.instructions, '']
//     });
//   };

//   // Remove instruction field
//   const removeInstruction = (index) => {
//     if (newRecipe.instructions.length <= 1) {
//       toast.error('Recipe must have at least one instruction');
//       return;
//     }

//     const newInstructions = [...newRecipe.instructions];
//     newInstructions.splice(index, 1);
//     setNewRecipe({ ...newRecipe, instructions: newInstructions });
//   };

//   // Update instruction field
//   const updateInstruction = (index, value) => {
//     const newInstructions = [...newRecipe.instructions];
//     newInstructions[index] = value;
//     setNewRecipe({ ...newRecipe, instructions: newInstructions });

//     // Clear instructions error if fixed
//     if (value.trim() !== '' && formErrors.instructions) {
//       const newErrors = { ...formErrors };
//       delete newErrors.instructions;
//       setFormErrors(newErrors);
//     }
//   };

//   // Filter recipes based on active tab and filters
//   const getFilteredRecipes = () => {
//     let filtered = recipes;

//     // Apply tab filter
//     if (activeTab === 'my') {
//       filtered = filtered.filter(recipe => recipe.createdBy?._id === user?._id);
//     } else if (activeTab === 'saved') {
//       filtered = filtered.filter(recipe => recipe.saves?.includes(user?._id));
//     }

//     // Apply search filters
//     if (filters.search) {
//       filtered = filtered.filter(recipe =>
//         recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         recipe.description?.toLowerCase().includes(filters.search.toLowerCase())
//       );
//     }

//     if (filters.category !== 'all') {
//       filtered = filtered.filter(recipe => recipe.category === filters.category);
//     }

//     if (filters.difficulty !== 'all') {
//       filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
//     }

//     if (filters.maxTime) {
//       const maxTime = parseInt(filters.maxTime);
//       filtered = filtered.filter(recipe =>
//         (recipe.preparationTime + recipe.cookingTime) <= maxTime
//       );
//     }

//     return filtered;
//   };

//   // Helper functions
//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty) {
//       case 'easy': return 'success';
//       case 'medium': return 'warning';
//       case 'hard': return 'danger';
//       default: return 'secondary';
//     }
//   };

//   const getCategoryIcon = (category) => {
//     switch(category) {
//       case 'breakfast': return '🥞';
//       case 'lunch': return '🍱';
//       case 'dinner': return '🍛';
//       case 'snack': return '🍎';
//       case 'dessert': return '🍰';
//       default: return '🍴';
//     }
//   };

//   const filteredRecipes = getFilteredRecipes();
//   const myRecipes = recipes.filter(recipe => recipe.createdBy?._id === user?._id);
//   const savedRecipes = recipes.filter(recipe => recipe.saves?.includes(user?._id));

//   // Render Add Recipe Modal
//   const renderAddRecipeModal = () => (
//     <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetRecipeForm(); }} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Recipe</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Recipe Title *</Form.Label>
//             <Form.Control
//               value={newRecipe.title}
//               onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
//               placeholder="Enter recipe title"
//               required
//               isInvalid={!!formErrors.title}
//             />
//             {formErrors.title && (
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.title}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               value={newRecipe.description}
//               onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
//               placeholder="Brief description of the recipe"
//             />
//           </Form.Group>

//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={newRecipe.category}
//                   onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
//                 >
//                   <option value="breakfast">Breakfast</option>
//                   <option value="lunch">Lunch</option>
//                   <option value="dinner">Dinner</option>
//                   <option value="snack">Snack</option>
//                   <option value="dessert">Dessert</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Difficulty</Form.Label>
//                 <Form.Select
//                   value={newRecipe.difficulty}
//                   onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Servings</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.servings}
//                   onChange={(e) => setNewRecipe({...newRecipe, servings: e.target.value})}
//                   min="1"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Prep Time (minutes)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.preparationTime}
//                   onChange={(e) => setNewRecipe({...newRecipe, preparationTime: e.target.value})}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Cook Time (minutes)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.cookingTime}
//                   onChange={(e) => setNewRecipe({...newRecipe, cookingTime: e.target.value})}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <h6 className="mt-4 mb-3">
//             Ingredients *
//             {loadingFoods ? (
//               <Badge bg="info" className="ms-2">
//                 <Spinner size="sm" animation="border" className="me-1" />
//                 Loading foods...
//               </Badge>
//             ) : foods.length === 0 ? (
//               <Badge bg="warning" className="ms-2">
//                 <FaExclamationTriangle className="me-1" />
//                 No foods available. Add foods first from Food Database.
//               </Badge>
//             ) : (
//               <Badge bg="success" className="ms-2">
//                 {foods.length} foods available
//               </Badge>
//             )}
//           </h6>

//           {newRecipe.ingredients.map((ingredient, index) => (
//             <div key={index} className="mb-3 p-3 border rounded">
//               <Row className="align-items-center">
//                 <Col md={5}>
//                   <Form.Group>
//                     <Form.Label className="small">Food *</Form.Label>
//                     {loadingFoods ? (
//                       <Alert variant="info" size="sm" className="mb-0">
//                         <Spinner size="sm" animation="border" className="me-2" />
//                         Loading foods...
//                       </Alert>
//                     ) : foods.length > 0 ? (
//                       <>
//                         <Dropdown
//                           onSelect={(eventKey) => {
//                             if (eventKey) {
//                               const [foodId, foodName] = eventKey.split('|||');
//                               handleFoodSelect(index, foodId, foodName);
//                             }
//                           }}
//                           onToggle={(isOpen) => {
//                             if (!isOpen) {
//                               setFoodSearch('');
//                             }
//                           }}
//                         >
//                           <Dropdown.Toggle
//                             variant={isFoodSelected(ingredient) ? "outline-success" : "outline-secondary"}
//                             size="sm"
//                             className="w-100 text-start d-flex align-items-center justify-content-between"
//                           >
//                             <span className="text-truncate">
//                               {isFoodSelected(ingredient) ? ingredient.foodName : 'Select Food *'}
//                             </span>
//                           </Dropdown.Toggle>
//                           <Dropdown.Menu style={{ maxHeight: '250px', overflowY: 'auto', minWidth: '300px' }}>
//                             <div className="p-2">
//                               <InputGroup size="sm">
//                                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                                 <Form.Control
//                                   placeholder="Search foods..."
//                                   value={foodSearch}
//                                   onChange={(e) => setFoodSearch(e.target.value)}
//                                   onClick={(e) => e.stopPropagation()}
//                                 />
//                                 {foodSearch && (
//                                   <Button
//                                     variant="outline-secondary"
//                                     size="sm"
//                                     onClick={() => setFoodSearch('')}
//                                   >
//                                     <FaTimes />
//                                   </Button>
//                                 )}
//                               </InputGroup>
//                             </div>
//                             <Dropdown.Divider />
//                             {foods
//                               .filter(food =>
//                                 food.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
//                                 foodSearch === ''
//                               )
//                               .map(food => (
//                                 <Dropdown.Item
//                                   key={food._id}
//                                   eventKey={`${food._id}|||${food.name}`}
//                                   active={ingredient.foodId === food._id}
//                                   className="py-2"
//                                 >
//                                   <div className="d-flex align-items-center">
//                                     <FaAppleAlt className="me-2 text-success" />
//                                     <div className="flex-grow-1">
//                                       <div className="fw-bold">{food.name}</div>
//                                       <div className="small text-muted">
//                                         {food.nutrition.calories} cal • {food.nutrition.protein}g protein
//                                       </div>
//                                       <div className="small text-muted">
//                                         Serving: {food.servingSize.amount}{food.servingSize.unit}
//                                       </div>
//                                     </div>
//                                     {ingredient.foodId === food._id && (
//                                       <FaCheck className="ms-2 text-success" />
//                                     )}
//                                   </div>
//                                 </Dropdown.Item>
//                               ))
//                             }
//                           </Dropdown.Menu>
//                         </Dropdown>
//                         {isFoodSelected(ingredient) && (
//                           <div className="small text-success mt-1">
//                             <FaCheck className="me-1" />
//                             Selected: {ingredient.foodName}
//                           </div>
//                         )}
//                         {formErrors.ingredients && formErrors.ingredients[index] && formErrors.ingredients[index].food && (
//                           <div className="text-danger small mt-1">
//                             <FaExclamationTriangle className="me-1" />
//                             {formErrors.ingredients[index].food}
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <Alert variant="warning" size="sm" className="mb-0">
//                         <FaExclamationTriangle className="me-2" />
//                         No foods available. Please add foods first from the Food Database page.
//                       </Alert>
//                     )}
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label className="small">Amount *</Form.Label>
//                     <Form.Control
//                       type="number"
//                       placeholder="Amount"
//                       value={ingredient.amount}
//                       onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
//                       min="0"
//                       step="0.1"
//                       isInvalid={!!(formErrors.ingredients && formErrors.ingredients[index] && formErrors.ingredients[index].amount)}
//                     />
//                     {formErrors.ingredients && formErrors.ingredients[index] && formErrors.ingredients[index].amount && (
//                       <Form.Text className="text-danger">
//                         {formErrors.ingredients[index].amount}
//                       </Form.Text>
//                     )}
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label className="small">Unit</Form.Label>
//                     <Form.Select
//                       value={ingredient.unit}
//                       onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
//                     >
//                       <option value="grams">Grams (g)</option>
//                       <option value="ml">Milliliters (ml)</option>
//                       <option value="cups">Cups</option>
//                       <option value="tbsp">Tablespoons</option>
//                       <option value="tsp">Teaspoons</option>
//                       <option value="pieces">Pieces</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={1}>
//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={() => removeIngredient(index)}
//                     disabled={newRecipe.ingredients.length === 1}
//                     title="Remove ingredient"
//                   >
//                     <FaTimes />
//                   </Button>
//                 </Col>
//               </Row>
//               {ingredient.foodId && (
//                 <div className="mt-2 small text-muted">
//                   <FaInfoCircle className="me-1" />
//                   Selected: <strong>{ingredient.foodName}</strong>
//                   {(() => {
//                     const food = foods.find(f => f._id === ingredient.foodId);
//                     if (food && ingredient.amount) {
//                       const multiplier = parseFloat(ingredient.amount) / food.servingSize.amount;
//                       const calories = Math.round(food.nutrition.calories * multiplier);
//                       const protein = (food.nutrition.protein * multiplier).toFixed(1);
//                       const carbs = (food.nutrition.carbs * multiplier).toFixed(1);
//                       const fat = (food.nutrition.fat * multiplier).toFixed(1);
//                       return ` • ${calories} cal, ${protein}g protein, ${carbs}g carbs, ${fat}g fat`;
//                     }
//                     return '';
//                   })()}
//                 </div>
//               )}
//             </div>
//           ))}

//           <div className="d-flex gap-2 mb-3">
//             <Button variant="outline-secondary" size="sm" onClick={addIngredient}>
//               <FaPlus className="me-1" /> Add Ingredient
//             </Button>
//             <Button
//               variant="outline-info"
//               size="sm"
//               onClick={calculateNutrition}
//               disabled={!newRecipe.ingredients.some(ing => ing.foodId && ing.amount)}
//             >
//               Calculate Nutrition
//             </Button>
//           </div>

//           <h6 className="mt-4 mb-3">Instructions *</h6>
//           {newRecipe.instructions.map((instruction, index) => (
//             <Form.Group key={index} className="mb-2">
//               <InputGroup>
//                 <InputGroup.Text>{index + 1}</InputGroup.Text>
//                 <Form.Control
//                   as="textarea"
//                   rows={2}
//                   placeholder={`Step ${index + 1}`}
//                   value={instruction}
//                   onChange={(e) => updateInstruction(index, e.target.value)}
//                   isInvalid={!!formErrors.instructions && instruction.trim() === ''}
//                 />
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => removeInstruction(index)}
//                   disabled={newRecipe.instructions.length === 1}
//                 >
//                   <FaTimes />
//                 </Button>
//               </InputGroup>
//             </Form.Group>
//           ))}
//           {formErrors.instructions && (
//             <Form.Text className="text-danger">
//               {formErrors.instructions}
//             </Form.Text>
//           )}
//           <Button variant="outline-secondary" size="sm" onClick={addInstruction} className="mb-3">
//             <FaPlus className="me-1" /> Add Step
//           </Button>

//           <h6 className="mt-4 mb-3">Nutrition Information (per serving)</h6>
//           <Row>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Calories</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.calories}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, calories: e.target.value}
//                   })}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Protein (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.protein}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, protein: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Carbs (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.carbs}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, carbs: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Fat (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.fat}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, fat: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => { setShowAddModal(false); resetRecipeForm(); }}>
//           Cancel
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleAddRecipe}
//           disabled={loading || foods.length === 0 || newRecipe.ingredients.some(ing => !ing.foodId)}
//         >
//           {loading ? (
//             <>
//               <Spinner size="sm" animation="border" className="me-2" />
//               Saving...
//             </>
//           ) : foods.length === 0 ? (
//             'Add Foods First'
//           ) : newRecipe.ingredients.some(ing => !ing.foodId) ? (
//             'Select All Foods'
//           ) : (
//             'Save Recipe'
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   // Render View Recipe Modal
//   const renderViewRecipeModal = () => (
//     <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
//       {selectedRecipe && (
//         <>
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedRecipe.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Row>
//               <Col md={6}>
//                 <img
//                   src={selectedRecipe.image || 'https://via.placeholder.com/400x300?text=Recipe+Image'}
//                   alt={selectedRecipe.title}
//                   className="img-fluid rounded mb-3"
//                 />
//               </Col>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <Badge bg="light" text="dark" className="me-2">
//                     {getCategoryIcon(selectedRecipe.category)} {selectedRecipe.category}
//                   </Badge>
//                   <Badge bg={getDifficultyColor(selectedRecipe.difficulty)}>
//                     {selectedRecipe.difficulty}
//                   </Badge>
//                 </div>

//                 {selectedRecipe.description && (
//                   <p className="mb-3">{selectedRecipe.description}</p>
//                 )}

//                 <div className="mb-3">
//                   <div><FaClock className="me-2" /> Prep: {selectedRecipe.preparationTime} min</div>
//                   <div><FaFire className="me-2" /> Cook: {selectedRecipe.cookingTime} min</div>
//                   <div>🍽️ Servings: {selectedRecipe.servings}</div>
//                 </div>

//                 <div className="mb-3">
//                   <h6>Nutrition (per serving)</h6>
//                   <Row>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.calories || 0}</div>
//                         <small className="text-muted">Calories</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.protein || 0}g</div>
//                         <small className="text-muted">Protein</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.carbs || 0}g</div>
//                         <small className="text-muted">Carbs</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.fat || 0}g</div>
//                         <small className="text-muted">Fat</small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>
//               </Col>
//             </Row>

//             {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
//               <div className="mt-4">
//                 <h6>Ingredients</h6>
//                 <ul className="list-group">
//                   {selectedRecipe.ingredients.map((ingredient, index) => (
//                     <li key={index} className="list-group-item">
//                       {ingredient.food?.name || 'Unknown food'} - {ingredient.amount} {ingredient.unit}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 && (
//               <div className="mt-4">
//                 <h6>Instructions</h6>
//                 <ol>
//                   {selectedRecipe.instructions.map((instruction, index) => (
//                     <li key={index} className="mb-2">{instruction}</li>
//                   ))}
//                 </ol>
//               </div>
//             )}

//             <div className="mt-4">
//               <h6>Created by: {selectedRecipe.createdBy?.username || 'Unknown'}</h6>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="outline-secondary" onClick={() => setShowViewModal(false)}>
//               Close
//             </Button>
//             <Button variant="outline-primary" onClick={() => handleLike(selectedRecipe._id)}>
//               <FaHeart className={selectedRecipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
//               Like ({selectedRecipe.likes?.length || 0})
//             </Button>
//             <Button
//               variant={selectedRecipe.saves?.includes(user?._id) ? "success" : "outline-success"}
//               onClick={() => handleSave(selectedRecipe._id)}
//             >
//               {selectedRecipe.saves?.includes(user?._id) ? 'Saved' : 'Save to Meal Plan'}
//             </Button>
//           </Modal.Footer>
//         </>
//       )}
//     </Modal>
//   );

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaUtensils className="me-2" />Recipes</h2>
//           <p className="text-muted">Discover, create, and share healthy recipes</p>
//         </Col>
//       </Row>

//       <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
//         <Tab eventKey="browse" title={<><FaList className="me-1" /> Browse Recipes ({recipes.length})</>} />
//         <Tab eventKey="my" title={<><FaUser className="me-1" /> My Recipes ({myRecipes.length})</>} />
//         <Tab eventKey="saved" title={<><FaStar className="me-1" /> Saved Recipes ({savedRecipes.length})</>} />
//       </Tabs>

//       <Row>
//         <Col lg={3}>
//           <Card className="mb-4">
//             <Card.Header>
//               <h5 className="mb-0"><FaFilter className="me-2" />Filters</h5>
//             </Card.Header>
//             <Card.Body>
//               <Form.Group className="mb-3">
//                 <Form.Label>Search</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaSearch /></InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Search recipes..."
//                     value={filters.search}
//                     onChange={(e) => setFilters({...filters, search: e.target.value})}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={filters.category}
//                   onChange={(e) => setFilters({...filters, category: e.target.value})}
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="breakfast">Breakfast</option>
//                   <option value="lunch">Lunch</option>
//                   <option value="dinner">Dinner</option>
//                   <option value="snack">Snack</option>
//                   <option value="dessert">Dessert</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Difficulty</Form.Label>
//                 <Form.Select
//                   value={filters.difficulty}
//                   onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//                 >
//                   <option value="all">All Levels</option>
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Max Preparation Time (min)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="e.g., 30"
//                   value={filters.maxTime}
//                   onChange={(e) => setFilters({...filters, maxTime: e.target.value})}
//                 />
//               </Form.Group>

//               <Button
//                 variant="outline-secondary"
//                 className="w-100"
//                 onClick={() => setFilters({
//                   category: 'all',
//                   difficulty: 'all',
//                   maxTime: '',
//                   search: ''
//                 })}
//               >
//                 Clear Filters
//               </Button>
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Header>
//               <h5 className="mb-0">Quick Actions</h5>
//             </Card.Header>
//             <Card.Body>
//               <Button
//                 variant="success"
//                 className="w-100 mb-2"
//                 onClick={() => setShowAddModal(true)}
//                 disabled={foods.length === 0}
//               >
//                 <FaPlus className="me-2" /> Add New Recipe
//               </Button>
//               <Button
//                 variant="outline-primary"
//                 className="w-100 mb-2"
//                 onClick={fetchRecipes}
//                 disabled={loading}
//               >
//                 {loading ? <Spinner size="sm" /> : 'Refresh Recipes'}
//               </Button>
//               <Button
//                 variant="outline-info"
//                 className="w-100"
//                 onClick={fetchFoods}
//                 disabled={loadingFoods}
//               >
//                 {loadingFoods ? <Spinner size="sm" /> : 'Reload Foods'}
//               </Button>
//             </Card.Body>
//           </Card>

//           {suggestions.length > 0 && (
//             <Card>
//               <Card.Header>
//                 <h5 className="mb-0">Suggested for You</h5>
//               </Card.Header>
//               <Card.Body>
//                 <ListGroup variant="flush">
//                   {suggestions.slice(0, 5).map(recipe => (
//                     <ListGroup.Item
//                       key={recipe._id}
//                       className="d-flex align-items-center py-2 cursor-pointer"
//                       onClick={() => handleViewRecipe(recipe)}
//                     >
//                       <span className="me-2">{getCategoryIcon(recipe.category)}</span>
//                       <div className="flex-grow-1">
//                         <div className="small">{recipe.title}</div>
//                         <Badge bg={getDifficultyColor(recipe.difficulty)} size="sm">
//                           {recipe.difficulty}
//                         </Badge>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//           )}
//         </Col>

//         <Col lg={9}>
//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3">Loading recipes...</p>
//             </div>
//           ) : (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h5 className="mb-0">
//                   {activeTab === 'browse' && `Showing ${filteredRecipes.length} recipes`}
//                   {activeTab === 'my' && `My Recipes (${myRecipes.length})`}
//                   {activeTab === 'saved' && `Saved Recipes (${savedRecipes.length})`}
//                 </h5>
//                 <div>
//                   <Badge bg="info" className="me-2">
//                     {foods.length} foods available
//                   </Badge>
//                 </div>
//               </div>

//               {(() => {
//                 const displayRecipes = activeTab === 'browse' ? filteredRecipes :
//                                       activeTab === 'my' ? myRecipes :
//                                       savedRecipes;

//                 return displayRecipes.length > 0 ? (
//                   <Row>
//                     {displayRecipes.map(recipe => (
//                       <Col md={6} lg={4} key={recipe._id} className="mb-4">
//                         <Card className="h-100 shadow-sm hover-shadow">
//                           <Card.Img
//                             variant="top"
//                             src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe+Image'}
//                             style={{ height: '150px', objectFit: 'cover' }}
//                             onClick={() => handleViewRecipe(recipe)}
//                             className="cursor-pointer"
//                           />
//                           <Card.Body className="d-flex flex-column">
//                             <div className="d-flex justify-content-between align-items-start mb-2">
//                               <div>
//                                 <Badge bg="light" text="dark" className="me-1">
//                                   {getCategoryIcon(recipe.category)} {recipe.category}
//                                 </Badge>
//                                 <Badge bg={getDifficultyColor(recipe.difficulty)}>
//                                   {recipe.difficulty}
//                                 </Badge>
//                               </div>
//                               {recipe.createdBy?._id === user?._id && (
//                                 <Button
//                                   size="sm"
//                                   variant="outline-danger"
//                                   onClick={() => handleDeleteRecipe(recipe._id)}
//                                   title="Delete recipe"
//                                 >
//                                   <FaTrash />
//                                 </Button>
//                               )}
//                             </div>

//                             <Card.Title
//                               className="mb-2 cursor-pointer flex-grow-1"
//                               onClick={() => handleViewRecipe(recipe)}
//                             >
//                               {recipe.title}
//                             </Card.Title>

//                             {recipe.description && (
//                               <Card.Text className="small text-muted mb-3">
//                                 {recipe.description.length > 100
//                                   ? `${recipe.description.substring(0, 100)}...`
//                                   : recipe.description}
//                               </Card.Text>
//                             )}

//                             <div className="d-flex justify-content-between small mb-3">
//                               <div>
//                                 <FaClock className="me-1" />
//                                 {recipe.preparationTime + recipe.cookingTime} min
//                               </div>
//                               <div>
//                                 <FaFire className="me-1" />
//                                 {recipe.nutrition?.calories || 0} cal
//                               </div>
//                               <div>
//                                 {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}
//                               </div>
//                             </div>

//                             <div className="d-flex justify-content-between mt-auto">
//                               <Button
//                                 variant="link"
//                                 className="p-0"
//                                 onClick={() => handleLike(recipe._id)}
//                               >
//                                 <FaHeart className={recipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
//                                 <small className="ms-1">{recipe.likes?.length || 0}</small>
//                               </Button>

//                               <div className="d-flex gap-2">
//                                 <Button
//                                   variant="outline-primary"
//                                   size="sm"
//                                   onClick={() => handleViewRecipe(recipe)}
//                                 >
//                                   View
//                                 </Button>
//                                 <Button
//                                   variant={recipe.saves?.includes(user?._id) ? "success" : "outline-success"}
//                                   size="sm"
//                                   onClick={() => handleSave(recipe._id)}
//                                 >
//                                   {recipe.saves?.includes(user?._id) ? 'Saved' : 'Save'}
//                                 </Button>
//                               </div>
//                             </div>
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info" className="text-center py-5">
//                     <FaUtensils size={48} className="mb-3" />
//                     <h4>No recipes found</h4>
//                     <p className="text-muted mb-3">
//                       {activeTab === 'my'
//                         ? "You haven't created any recipes yet"
//                         : activeTab === 'saved'
//                         ? "You haven't saved any recipes yet"
//                         : "Try adjusting your filters or create a new recipe"
//                       }
//                     </p>
//                     {foods.length > 0 ? (
//                       <Button variant="primary" onClick={() => setShowAddModal(true)}>
//                         <FaPlus className="me-2" /> Create Your First Recipe
//                       </Button>
//                     ) : (
//                       <Alert variant="warning">
//                         <FaExclamationTriangle className="me-2" />
//                         No foods available. Add foods first from the Food Database page.
//                       </Alert>
//                     )}
//                   </Alert>
//                 );
//               })()}
//             </>
//           )}
//         </Col>
//       </Row>

//       {renderAddRecipeModal()}
//       {renderViewRecipeModal()}
//     </Container>
//   );
// };

// export default Recipes;

// new
// import React, { useState, useEffect } from 'react';
// import {
//   Container, Row, Col, Card, Button, Form,
//   Badge, ListGroup, Alert, Modal, InputGroup,
//   Spinner, Tab, Tabs, Dropdown, Pagination
// } from 'react-bootstrap';
// import {
//   FaUtensils, FaHeart, FaClock, FaFire, FaFilter,
//   FaPlus, FaStar, FaSearch, FaTrash, FaEdit,
//   FaTimes, FaCheck, FaUser, FaList, FaAppleAlt,
//   FaExclamationTriangle, FaInfoCircle
// } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Recipes = () => {
//   const { user } = useAuth();
//   const [recipes, setRecipes] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [availableTags, setAvailableTags] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingFoods, setLoadingFoods] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [activeTab, setActiveTab] = useState('browse');
//   const [foodSearch, setFoodSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalRecipes, setTotalRecipes] = useState(0);
//   const itemsPerPage = 9;
  
//   const [newRecipe, setNewRecipe] = useState({
//     title: '',
//     description: '',
//     category: 'breakfast',
//     difficulty: 'easy',
//     preparationTime: 15,
//     cookingTime: 20,
//     servings: 1,
//     ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
//     instructions: [''],
//     nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const [filters, setFilters] = useState({
//     category: 'all',
//     difficulty: 'all',
//     maxTime: '',
//     search: '',
//     tag: 'all'
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchRecipes();
//     fetchAvailableTags();
//   }, []);

//   // Fetch all recipes from DummyJSON API
//   const fetchRecipes = async () => {
//     setLoading(true);
//     try {
//       // First, get the total count
//       const initialResponse = await fetch('https://dummyjson.com/recipes?limit=0');
//       const initialData = await initialResponse.json();
//       const total = initialData.total;
//       setTotalRecipes(total);
      
//       // Fetch all recipes
//       const response = await fetch(`https://dummyjson.com/recipes?limit=${total}`);
//       const data = await response.json();
      
//       // Map API data to our recipe format
//       const mappedRecipes = data.recipes.map(recipe => ({
//         _id: `recipe-${recipe.id}`,
//         title: recipe.name,
//         description: recipe.review || '',
//         preparationTime: recipe.prepTimeMinutes,
//         cookingTime: recipe.cookTimeMinutes,
//         servings: recipe.servings,
//         nutrition: {
//           calories: recipe.caloriesPerServing,
//           protein: estimateProtein(recipe.tags),
//           carbs: estimateCarbs(recipe.tags),
//           fat: estimateFat(recipe.tags)
//         },
//         difficulty: recipe.difficulty,
//         category: mapMealTypeToCategory(recipe.mealType),
//         image: recipe.image,
//         tags: recipe.tags,
//         mealType: recipe.mealType,
//         cuisine: recipe.cuisine,
//         instructions: recipe.instructions,
//         ingredients: recipe.ingredients.map((ing, index) => ({
//           food: {
//             _id: `ingredient-${recipe.id}-${index}`,
//             name: ing
//           },
//           amount: 100,
//           unit: 'grams'
//         })),
//         rating: recipe.rating,
//         reviewCount: recipe.reviewCount,
//         likes: Array(Math.floor(Math.random() * 100)).fill(''),
//         saves: [],
//         createdBy: {
//           _id: 'dummy-user',
//           username: 'Chef User'
//         }
//       }));
      
//       setAllRecipes(mappedRecipes);
//       setRecipes(mappedRecipes);
      
//       // Update suggestions with top-rated recipes
//       const topRecipes = [...mappedRecipes]
//         .sort((a, b) => (b.rating || 0) - (a.rating || 0))
//         .slice(0, 3);
//       setSuggestions(topRecipes);
      
//       toast.success(`Loaded ${mappedRecipes.length} recipes successfully!`);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       toast.error('Failed to load recipes');
//       // Load demo data if API fails
//       loadDemoData();
//     } finally {
//       setLoading(false);
//     }
//   };
// // db data
//   // Fetch available tags
//   const fetchAvailableTags = async () => {
//     try {
//       const response = await fetch('https://dummyjson.com/recipes/tags');
//       const data = await response.json();
//       setAvailableTags(data);
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//     }
//   };

//   // Helper functions for mapping and estimation
//   const mapMealTypeToCategory = (mealTypes) => {
//     if (!mealTypes || mealTypes.length === 0) return 'other';
//     const firstType = mealTypes[0].toLowerCase();
//     switch(firstType) {
//       case 'breakfast': return 'breakfast';
//       case 'lunch': return 'lunch';
//       case 'dinner': return 'dinner';
//       case 'dessert': return 'dessert';
//       case 'snack': return 'snack';
//       default: return 'other';
//     }
//   };

//   const estimateProtein = (tags) => {
//     if (!tags) return 15;
//     const lowerTags = tags.map(t => t.toLowerCase());
//     if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//     if (lowerTags.includes('vegetarian')) return 8;
//     return 15;
//   };

//   const estimateCarbs = (tags) => {
//     if (!tags) return 20;
//     const lowerTags = tags.map(t => t.toLowerCase());
//     if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//     if (lowerTags.includes('dessert')) return 35;
//     return 20;
//   };

//   const estimateFat = (tags) => {
//     if (!tags) return 12;
//     const lowerTags = tags.map(t => t.toLowerCase());
//     if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//     return 12;
//   };

//   // Demo data fallback
//   const loadDemoData = () => {
//     const demoRecipes = [
//       {
//         _id: '1',
//         title: "Greek Yogurt Breakfast Bowl",
//         description: "Protein-packed breakfast with fresh fruits and nuts",
//         preparationTime: 5,
//         cookingTime: 0,
//         servings: 1,
//         nutrition: { calories: 320, protein: 20, carbs: 35, fat: 12 },
//         difficulty: "easy",
//         category: "breakfast",
//         image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
//         tags: ['healthy', 'breakfast', 'protein'],
//         likes: [],
//         saves: [],
//         createdBy: { _id: 'demo', username: 'DemoUser' },
//         ingredients: [
//           { food: { _id: '1', name: 'Greek Yogurt' }, amount: 200, unit: 'grams' },
//           { food: { _id: '2', name: 'Banana' }, amount: 1, unit: 'piece' }
//         ],
//         instructions: ['Mix yogurt with fruits', 'Add nuts on top']
//       }
//     ];
//     setRecipes(demoRecipes);
//     setSuggestions(demoRecipes.slice(0, 3));
//   };

//   // Validate recipe form
//   const validateRecipeForm = () => {
//     const errors = {};

//     // Validate title
//     if (!newRecipe.title.trim()) {
//       errors.title = 'Recipe title is required';
//     }

//     // Validate ingredients
//     const ingredientErrors = [];
//     newRecipe.ingredients.forEach((ingredient, index) => {
//       if (!ingredient.foodId) {
//         ingredientErrors[index] = { ...ingredientErrors[index], food: 'Please select a food' };
//       }
//       if (!ingredient.amount || parseFloat(ingredient.amount) <= 0) {
//         ingredientErrors[index] = {
//           ...ingredientErrors[index],
//           amount: 'Please enter a valid amount'
//         };
//       }
//     });

//     if (ingredientErrors.length > 0) {
//       errors.ingredients = ingredientErrors;
//     }

//     // Validate instructions
//     const validInstructions = newRecipe.instructions.filter(inst => inst.trim() !== '');
//     if (validInstructions.length === 0) {
//       errors.instructions = 'At least one instruction is required';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle like/unlike recipe
//   const handleLike = async (recipeId) => {
//     try {
//       // For demo purposes, we'll simulate the API call
//       const updatedRecipes = recipes.map(recipe => {
//         if (recipe._id === recipeId) {
//           const isLiked = recipe.likes?.includes(user?._id);
//           return {
//             ...recipe,
//             likes: isLiked 
//               ? recipe.likes.filter(id => id !== user?._id)
//               : [...(recipe.likes || []), user?._id]
//           };
//         }
//         return recipe;
//       });
//       setRecipes(updatedRecipes);
//       toast.success(isLiked ? 'Recipe unliked!' : 'Recipe liked!');
//     } catch (error) {
//       console.error('Error liking recipe:', error);
//       toast.error('Failed to like recipe');
//     }
//   };

//   // Handle save/unsave recipe
//   const handleSave = async (recipeId) => {
//     try {
//       // For demo purposes, we'll simulate the API call
//       const updatedRecipes = recipes.map(recipe => {
//         if (recipe._id === recipeId) {
//           const isSaved = recipe.saves?.includes(user?._id);
//           return {
//             ...recipe,
//             saves: isSaved 
//               ? recipe.saves.filter(id => id !== user?._id)
//               : [...(recipe.saves || []), user?._id]
//           };
//         }
//         return recipe;
//       });
//       setRecipes(updatedRecipes);
//       toast.success(isSaved ? 'Recipe removed from meal plan!' : 'Recipe saved to meal plan!');
//     } catch (error) {
//       console.error('Error saving recipe:', error);
//       toast.error('Failed to save recipe');
//     }
//   };

//   // Handle add new recipe
//   const handleAddRecipe = async () => {
//     // Validate form
//     if (!validateRecipeForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     // For demo, create a new recipe object
//     const newRecipeId = `custom-${Date.now()}`;
//     const customRecipe = {
//       _id: newRecipeId,
//       title: newRecipe.title,
//       description: newRecipe.description,
//       category: newRecipe.category,
//       difficulty: newRecipe.difficulty,
//       preparationTime: parseInt(newRecipe.preparationTime) || 0,
//       cookingTime: parseInt(newRecipe.cookingTime) || 0,
//       servings: parseInt(newRecipe.servings) || 1,
//       nutrition: newRecipe.nutrition,
//       image: 'https://via.placeholder.com/400x300?text=Custom+Recipe',
//       tags: ['custom', newRecipe.category],
//       ingredients: newRecipe.ingredients.map(ing => ({
//         food: { _id: ing.foodId, name: ing.foodName },
//         amount: parseFloat(ing.amount) || 0,
//         unit: ing.unit || 'grams'
//       })),
//       instructions: newRecipe.instructions.filter(inst => inst.trim() !== ''),
//       likes: [],
//       saves: [],
//       createdBy: user || { _id: 'demo-user', username: 'You' },
//       rating: 0,
//       reviewCount: 0
//     };

//     // Add to recipes
//     const updatedRecipes = [customRecipe, ...recipes];
//     setRecipes(updatedRecipes);
//     setAllRecipes(updatedRecipes);
    
//     toast.success('Recipe added successfully!');
//     setShowAddModal(false);
//     resetRecipeForm();
//   };

//   // Reset recipe form
//   const resetRecipeForm = () => {
//     setNewRecipe({
//       title: '',
//       description: '',
//       category: 'breakfast',
//       difficulty: 'easy',
//       preparationTime: 15,
//       cookingTime: 20,
//       servings: 1,
//       ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
//       instructions: [''],
//       nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     });
//     setFormErrors({});
//     setFoodSearch('');
//   };

//   // Handle delete recipe (only for custom recipes)
//   const handleDeleteRecipe = async (recipeId) => {
//     if (!window.confirm('Are you sure you want to delete this recipe?')) {
//       return;
//     }

//     // Remove from recipes
//     const updatedRecipes = recipes.filter(recipe => recipe._id !== recipeId);
//     setRecipes(updatedRecipes);
//     setAllRecipes(updatedRecipes);
//     toast.success('Recipe deleted!');
//   };

//   // Handle view recipe details
//   const handleViewRecipe = (recipe) => {
//     setSelectedRecipe(recipe);
//     setShowViewModal(true);
//   };

//   // Filter recipes based on active tab and filters
//   const getFilteredRecipes = () => {
//     let filtered = recipes;

//     // Apply tab filter
//     if (activeTab === 'my') {
//       filtered = filtered.filter(recipe => recipe.createdBy?._id === user?._id);
//     } else if (activeTab === 'saved') {
//       filtered = filtered.filter(recipe => recipe.saves?.includes(user?._id));
//     }

//     // Apply search filters
//     if (filters.search) {
//       filtered = filtered.filter(recipe =>
//         recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         recipe.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
//         recipe.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
//       );
//     }

//     if (filters.category !== 'all') {
//       filtered = filtered.filter(recipe => recipe.category === filters.category);
//     }

//     if (filters.difficulty !== 'all') {
//       filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
//     }

//     if (filters.maxTime) {
//       const maxTime = parseInt(filters.maxTime);
//       filtered = filtered.filter(recipe =>
//         (recipe.preparationTime + recipe.cookingTime) <= maxTime
//       );
//     }

//     if (filters.tag !== 'all') {
//       filtered = filtered.filter(recipe => 
//         recipe.tags?.some(tag => tag.toLowerCase() === filters.tag.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   // Pagination
//   const filteredRecipes = getFilteredRecipes();
//   const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters, activeTab]);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     let items = [];
//     const maxVisible = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisible - 1);

//     if (endPage - startPage < maxVisible - 1) {
//       startPage = Math.max(1, endPage - maxVisible + 1);
//     }

//     if (startPage > 1) {
//       items.push(
//         <Pagination.First key="first" onClick={() => setCurrentPage(1)} />
//       );
//       items.push(
//         <Pagination.Prev key="prev" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
//       );
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       items.push(
//         <Pagination.Item
//           key={page}
//           active={page === currentPage}
//           onClick={() => setCurrentPage(page)}
//         >
//           {page}
//         </Pagination.Item>
//       );
//     }

//     if (endPage < totalPages) {
//       items.push(
//         <Pagination.Next key="next" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
//       );
//       items.push(
//         <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} />
//       );
//     }

//     return (
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <div className="text-muted">
//           Showing {startIndex + 1} to {Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
//         </div>
//         <Pagination className="mb-0">{items}</Pagination>
//       </div>
//     );
//   };

//   // Helper functions
//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty) {
//       case 'easy': return 'success';
//       case 'medium': return 'warning';
//       case 'hard': return 'danger';
//       default: return 'secondary';
//     }
//   };

//   const getCategoryIcon = (category) => {
//     switch(category) {
//       case 'breakfast': return '🥞';
//       case 'lunch': return '🍱';
//       case 'dinner': return '🍛';
//       case 'snack': return '🍎';
//       case 'dessert': return '🍰';
//       default: return '🍴';
//     }
//   };

//   const myRecipes = recipes.filter(recipe => recipe.createdBy?._id === user?._id);
//   const savedRecipes = recipes.filter(recipe => recipe.saves?.includes(user?._id));

//   // Render Add Recipe Modal (simplified for demo)
//   const renderAddRecipeModal = () => (
//     <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetRecipeForm(); }} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Recipe</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Recipe Title *</Form.Label>
//             <Form.Control
//               value={newRecipe.title}
//               onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
//               placeholder="Enter recipe title"
//               required
//               isInvalid={!!formErrors.title}
//             />
//             {formErrors.title && (
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.title}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               value={newRecipe.description}
//               onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
//               placeholder="Brief description of the recipe"
//             />
//           </Form.Group>

//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={newRecipe.category}
//                   onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
//                 >
//                   <option value="breakfast">Breakfast</option>
//                   <option value="lunch">Lunch</option>
//                   <option value="dinner">Dinner</option>
//                   <option value="snack">Snack</option>
//                   <option value="dessert">Dessert</option>
//                   <option value="other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Difficulty</Form.Label>
//                 <Form.Select
//                   value={newRecipe.difficulty}
//                   onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Servings</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.servings}
//                   onChange={(e) => setNewRecipe({...newRecipe, servings: e.target.value})}
//                   min="1"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Prep Time (minutes)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.preparationTime}
//                   onChange={(e) => setNewRecipe({...newRecipe, preparationTime: e.target.value})}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Cook Time (minutes)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.cookingTime}
//                   onChange={(e) => setNewRecipe({...newRecipe, cookingTime: e.target.value})}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <h6 className="mt-4 mb-3">Instructions *</h6>
//           {newRecipe.instructions.map((instruction, index) => (
//             <Form.Group key={index} className="mb-2">
//               <InputGroup>
//                 <InputGroup.Text>{index + 1}</InputGroup.Text>
//                 <Form.Control
//                   as="textarea"
//                   rows={2}
//                   placeholder={`Step ${index + 1}`}
//                   value={instruction}
//                   onChange={(e) => {
//                     const newInstructions = [...newRecipe.instructions];
//                     newInstructions[index] = e.target.value;
//                     setNewRecipe({...newRecipe, instructions: newInstructions});
//                   }}
//                   isInvalid={!!formErrors.instructions && instruction.trim() === ''}
//                 />
//                 <Button
//                   variant="outline-danger"
//                   onClick={() => {
//                     if (newRecipe.instructions.length <= 1) {
//                       toast.error('Recipe must have at least one instruction');
//                       return;
//                     }
//                     const newInstructions = [...newRecipe.instructions];
//                     newInstructions.splice(index, 1);
//                     setNewRecipe({...newRecipe, instructions: newInstructions});
//                   }}
//                   disabled={newRecipe.instructions.length === 1}
//                 >
//                   <FaTimes />
//                 </Button>
//               </InputGroup>
//             </Form.Group>
//           ))}
//           {formErrors.instructions && (
//             <Form.Text className="text-danger">
//               {formErrors.instructions}
//             </Form.Text>
//           )}
//           <Button 
//             variant="outline-secondary" 
//             size="sm" 
//             onClick={() => setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, '']})} 
//             className="mb-3"
//           >
//             <FaPlus className="me-1" /> Add Step
//           </Button>

//           <h6 className="mt-4 mb-3">Nutrition Information (per serving)</h6>
//           <Row>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Calories</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.calories}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, calories: e.target.value}
//                   })}
//                   min="0"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Protein (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.protein}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, protein: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Carbs (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.carbs}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, carbs: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Fat (g)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={newRecipe.nutrition.fat}
//                   onChange={(e) => setNewRecipe({
//                     ...newRecipe,
//                     nutrition: {...newRecipe.nutrition, fat: e.target.value}
//                   })}
//                   min="0"
//                   step="0.1"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => { setShowAddModal(false); resetRecipeForm(); }}>
//           Cancel
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleAddRecipe}
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <Spinner size="sm" animation="border" className="me-2" />
//               Saving...
//             </>
//           ) : (
//             'Save Recipe'
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   // Render View Recipe Modal
//   const renderViewRecipeModal = () => (
//     <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
//       {selectedRecipe && (
//         <>
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedRecipe.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Row>
//               <Col md={6}>
//                 <img
//                   src={selectedRecipe.image || 'https://via.placeholder.com/400x300?text=Recipe+Image'}
//                   alt={selectedRecipe.title}
//                   className="img-fluid rounded mb-3"
//                   style={{ height: '250px', width: '100%', objectFit: 'cover' }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <Badge bg="light" text="dark" className="me-2">
//                     {getCategoryIcon(selectedRecipe.category)} {selectedRecipe.category}
//                   </Badge>
//                   <Badge bg={getDifficultyColor(selectedRecipe.difficulty)}>
//                     {selectedRecipe.difficulty}
//                   </Badge>
//                   {selectedRecipe.rating && (
//                     <Badge bg="warning" text="dark" className="ms-2">
//                       ⭐ {selectedRecipe.rating}/5 ({selectedRecipe.reviewCount || 0} reviews)
//                     </Badge>
//                   )}
//                 </div>

//                 {selectedRecipe.description && (
//                   <p className="mb-3">{selectedRecipe.description}</p>
//                 )}

//                 <div className="mb-3">
//                   <div><FaClock className="me-2" /> Prep: {selectedRecipe.preparationTime} min</div>
//                   <div><FaFire className="me-2" /> Cook: {selectedRecipe.cookingTime} min</div>
//                   <div>🍽️ Servings: {selectedRecipe.servings}</div>
//                 </div>

//                 <div className="mb-3">
//                   <h6>Nutrition (per serving)</h6>
//                   <Row>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.calories || 0}</div>
//                         <small className="text-muted">Calories</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.protein || 0}g</div>
//                         <small className="text-muted">Protein</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.carbs || 0}g</div>
//                         <small className="text-muted">Carbs</small>
//                       </div>
//                     </Col>
//                     <Col>
//                       <div className="text-center p-2 bg-light rounded">
//                         <div className="fw-bold">{selectedRecipe.nutrition?.fat || 0}g</div>
//                         <small className="text-muted">Fat</small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>

//                 {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
//                   <div className="mb-3">
//                     <h6>Tags</h6>
//                     <div className="d-flex flex-wrap gap-1">
//                       {selectedRecipe.tags.map((tag, index) => (
//                         <Badge key={index} bg="light" text="dark">
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Col>
//             </Row>

//             {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
//               <div className="mt-4">
//                 <h6>Ingredients</h6>
//                 <ul className="list-group">
//                   {selectedRecipe.ingredients.map((ingredient, index) => (
//                     <li key={index} className="list-group-item">
//                       {ingredient.food?.name || ingredient.name || 'Unknown ingredient'} - {ingredient.amount} {ingredient.unit}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 && (
//               <div className="mt-4">
//                 <h6>Instructions</h6>
//                 <ol>
//                   {selectedRecipe.instructions.map((instruction, index) => (
//                     <li key={index} className="mb-2">{instruction}</li>
//                   ))}
//                 </ol>
//               </div>
//             )}

//             <div className="mt-4">
//               <h6>Created by: {selectedRecipe.createdBy?.username || 'Unknown'}</h6>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="outline-secondary" onClick={() => setShowViewModal(false)}>
//               Close
//             </Button>
//             <Button variant="outline-primary" onClick={() => handleLike(selectedRecipe._id)}>
//               <FaHeart className={selectedRecipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
//               Like ({selectedRecipe.likes?.length || 0})
//             </Button>
//             <Button
//               variant={selectedRecipe.saves?.includes(user?._id) ? "success" : "outline-success"}
//               onClick={() => handleSave(selectedRecipe._id)}
//             >
//               {selectedRecipe.saves?.includes(user?._id) ? 'Saved' : 'Save to Meal Plan'}
//             </Button>
//           </Modal.Footer>
//         </>
//       )}
//     </Modal>
//   );

//   const clearAllFilters = () => {
//     setFilters({
//       category: 'all',
//       difficulty: 'all',
//       maxTime: '',
//       search: '',
//       tag: 'all'
//     });
//     setCurrentPage(1);
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaUtensils className="me-2" />Recipes</h2>
//           <p className="text-muted">Discover, create, and share healthy recipes</p>
//         </Col>
//       </Row>

//       <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
//         <Tab eventKey="browse" title={<><FaList className="me-1" /> Browse Recipes ({recipes.length})</>} />
//         <Tab eventKey="my" title={<><FaUser className="me-1" /> My Recipes ({myRecipes.length})</>} />
//         <Tab eventKey="saved" title={<><FaStar className="me-1" /> Saved Recipes ({savedRecipes.length})</>} />
//       </Tabs>

//       <Row>
//         <Col lg={3}>
//           <Card className="mb-4">
//             <Card.Header>
//               <h5 className="mb-0"><FaFilter className="me-2" />Filters</h5>
//             </Card.Header>
//             <Card.Body>
//               <Form.Group className="mb-3">
//                 <Form.Label>Search</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaSearch /></InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Search recipes..."
//                     value={filters.search}
//                     onChange={(e) => setFilters({...filters, search: e.target.value})}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={filters.category}
//                   onChange={(e) => setFilters({...filters, category: e.target.value})}
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="breakfast">Breakfast</option>
//                   <option value="lunch">Lunch</option>
//                   <option value="dinner">Dinner</option>
//                   <option value="snack">Snack</option>
//                   <option value="dessert">Dessert</option>
//                   <option value="other">Other</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Difficulty</Form.Label>
//                 <Form.Select
//                   value={filters.difficulty}
//                   onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//                 >
//                   <option value="all">All Levels</option>
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Max Preparation Time (min)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="e.g., 30"
//                   value={filters.maxTime}
//                   onChange={(e) => setFilters({...filters, maxTime: e.target.value})}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Filter by Tag</Form.Label>
//                 <Form.Select
//                   value={filters.tag}
//                   onChange={(e) => setFilters({...filters, tag: e.target.value})}
//                 >
//                   <option value="all">All Tags</option>
//                   {availableTags.map(tag => (
//                     <option key={tag} value={tag}>{tag}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               <Button
//                 variant="outline-secondary"
//                 className="w-100"
//                 onClick={clearAllFilters}
//                 disabled={filters.category === 'all' && filters.difficulty === 'all' && !filters.maxTime && !filters.search && filters.tag === 'all'}
//               >
//                 Clear Filters
//               </Button>
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Header>
//               <h5 className="mb-0">Quick Actions</h5>
//             </Card.Header>
//             <Card.Body>
//               <Button
//                 variant="success"
//                 className="w-100 mb-2"
//                 onClick={() => setShowAddModal(true)}
//               >
//                 <FaPlus className="me-2" /> Add New Recipe
//               </Button>
//               <Button
//                 variant="outline-primary"
//                 className="w-100 mb-2"
//                 onClick={fetchRecipes}
//                 disabled={loading}
//               >
//                 {loading ? <Spinner size="sm" /> : 'Refresh Recipes'}
//               </Button>
//             </Card.Body>
//           </Card>

//           {suggestions && suggestions.length > 0 && (
//             <Card>
//               <Card.Header>
//                 <h5 className="mb-0">Suggested for You</h5>
//               </Card.Header>
//               <Card.Body>
//                 <ListGroup variant="flush">
//                   {suggestions.slice(0, 5).map(recipe => (
//                     <ListGroup.Item
//                       key={recipe._id}
//                       className="d-flex align-items-center py-2 cursor-pointer"
//                       onClick={() => handleViewRecipe(recipe)}
//                     >
//                       <span className="me-2">{getCategoryIcon(recipe.category)}</span>
//                       <div className="flex-grow-1">
//                         <div className="small">{recipe.title}</div>
//                         <div className="d-flex gap-1">
//                           <Badge bg={getDifficultyColor(recipe.difficulty)} size="sm">
//                             {recipe.difficulty}
//                           </Badge>
//                           {recipe.rating && (
//                             <Badge bg="light" text="dark" size="sm">
//                               ⭐ {recipe.rating}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//           )}
//         </Col>

//         <Col lg={9}>
//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3">Loading recipes...</p>
//             </div>
//           ) : (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h5 className="mb-0">
//                   {activeTab === 'browse' && `Showing ${filteredRecipes.length} recipes`}
//                   {activeTab === 'my' && `My Recipes (${myRecipes.length})`}
//                   {activeTab === 'saved' && `Saved Recipes (${savedRecipes.length})`}
//                 </h5>
//                 <div className="d-flex gap-2">
//                   <Badge bg="info">
//                     {recipes.length} recipes available
//                   </Badge>
//                   {availableTags.length > 0 && (
//                     <Badge bg="secondary">
//                       {availableTags.length} tags
//                     </Badge>
//                   )}
//                 </div>
//               </div>

//               {currentRecipes.length > 0 ? (
//                 <>
//                   <Row>
//                     {currentRecipes.map(recipe => (
//                       <Col md={6} lg={4} key={recipe._id} className="mb-4">
//                         <Card className="h-100 shadow-sm hover-shadow">
//                           <Card.Img
//                             variant="top"
//                             src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe+Image'}
//                             style={{ height: '150px', objectFit: 'cover' }}
//                             onClick={() => handleViewRecipe(recipe)}
//                             className="cursor-pointer"
//                           />
//                           <Card.Body className="d-flex flex-column">
//                             <div className="d-flex justify-content-between align-items-start mb-2">
//                               <div>
//                                 <Badge bg="light" text="dark" className="me-1">
//                                   {getCategoryIcon(recipe.category)} {recipe.category}
//                                 </Badge>
//                                 <Badge bg={getDifficultyColor(recipe.difficulty)}>
//                                   {recipe.difficulty}
//                                 </Badge>
//                                 {recipe.rating && (
//                                   <Badge bg="warning" text="dark" className="ms-1">
//                                     ⭐ {recipe.rating}
//                                   </Badge>
//                                 )}
//                               </div>
//                               {recipe.createdBy?._id === user?._id && (
//                                 <Button
//                                   size="sm"
//                                   variant="outline-danger"
//                                   onClick={() => handleDeleteRecipe(recipe._id)}
//                                   title="Delete recipe"
//                                 >
//                                   <FaTrash />
//                                 </Button>
//                               )}
//                             </div>

//                             <Card.Title
//                               className="mb-2 cursor-pointer flex-grow-1"
//                               onClick={() => handleViewRecipe(recipe)}
//                             >
//                               {recipe.title}
//                             </Card.Title>

//                             {recipe.description && (
//                               <Card.Text className="small text-muted mb-3">
//                                 {recipe.description.length > 100
//                                   ? `${recipe.description.substring(0, 100)}...`
//                                   : recipe.description}
//                               </Card.Text>
//                             )}

//                             {recipe.tags && recipe.tags.length > 0 && (
//                               <div className="mb-2">
//                                 <div className="d-flex flex-wrap gap-1">
//                                   {recipe.tags.slice(0, 3).map((tag, index) => (
//                                     <Badge key={index} bg="light" text="dark" style={{fontSize: '0.7rem'}}>
//                                       {tag}
//                                     </Badge>
//                                   ))}
//                                   {recipe.tags.length > 3 && (
//                                     <Badge bg="light" text="dark" style={{fontSize: '0.7rem'}}>
//                                       +{recipe.tags.length - 3}
//                                     </Badge>
//                                   )}
//                                 </div>
//                               </div>
//                             )}

//                             <div className="d-flex justify-content-between small mb-3">
//                               <div>
//                                 <FaClock className="me-1" />
//                                 {recipe.preparationTime + recipe.cookingTime} min
//                               </div>
//                               <div>
//                                 <FaFire className="me-1" />
//                                 {recipe.nutrition?.calories || 0} cal
//                               </div>
//                               <div>
//                                 {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}
//                               </div>
//                             </div>

//                             <div className="d-flex justify-content-between mt-auto">
//                               <Button
//                                 variant="link"
//                                 className="p-0"
//                                 onClick={() => handleLike(recipe._id)}
//                               >
//                                 <FaHeart className={recipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
//                                 <small className="ms-1">{recipe.likes?.length || 0}</small>
//                               </Button>

//                               <div className="d-flex gap-2">
//                                 <Button
//                                   variant="outline-primary"
//                                   size="sm"
//                                   onClick={() => handleViewRecipe(recipe)}
//                                 >
//                                   View
//                                 </Button>
//                                 <Button
//                                   variant={recipe.saves?.includes(user?._id) ? "success" : "outline-success"}
//                                   size="sm"
//                                   onClick={() => handleSave(recipe._id)}
//                                 >
//                                   {recipe.saves?.includes(user?._id) ? 'Saved' : 'Save'}
//                                 </Button>
//                               </div>
//                             </div>
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
                  
//                   {renderPagination()}
//                 </>
//               ) : (
//                 <Alert variant="info" className="text-center py-5">
//                   <FaUtensils size={48} className="mb-3" />
//                   <h4>No recipes found</h4>
//                   <p className="text-muted mb-3">
//                     {activeTab === 'my'
//                       ? "You haven't created any recipes yet"
//                       : activeTab === 'saved'
//                       ? "You haven't saved any recipes yet"
//                       : "Try adjusting your filters or create a new recipe"
//                     }
//                   </p>
//                   <Button variant="primary" onClick={() => setShowAddModal(true)}>
//                     <FaPlus className="me-2" /> Create Your First Recipe
//                   </Button>
//                 </Alert>
//               )}
//             </>
//           )}
//         </Col>
//       </Row>

//       {renderAddRecipeModal()}
//       {renderViewRecipeModal()}
//     </Container>
//   );
// };

// export default Recipes;

// new2
import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button, Form,
  Badge, ListGroup, Alert, Modal, InputGroup,
  Spinner, Tab, Tabs, Dropdown, Pagination
} from 'react-bootstrap';
import {
  FaUtensils, FaHeart, FaClock, FaFire, FaFilter,
  FaPlus, FaStar, FaSearch, FaTrash, FaEdit,
  FaTimes, FaCheck, FaUser, FaList, FaAppleAlt,
  FaExclamationTriangle, FaInfoCircle, FaExternalLinkAlt
} from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Recipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [foodSearch, setFoodSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;
  
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    category: 'breakfast',
    difficulty: 'easy',
    preparationTime: 15,
    cookingTime: 20,
    servings: 1,
    ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
    instructions: [''],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  });
  const [formErrors, setFormErrors] = useState({});

  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    maxTime: '',
    search: '',
    tag: 'all'
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchRecipes();
    fetchAvailableTags();
    fetchSuggestions();
  }, []);

  // Fetch recipes when filters or page changes
  useEffect(() => {
    fetchRecipes();
  }, [filters, currentPage, activeTab]);

  // Fetch all recipes from backend API
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let endpoint = '/recipes';
      let params = {
        page: currentPage,
        limit: itemsPerPage,
        ...filters
      };

      // Adjust endpoint based on active tab
      if (activeTab === 'my') {
        endpoint = '/recipes/user/created';
        // Remove pagination for user recipes to show all
        delete params.page;
        delete params.limit;
      } else if (activeTab === 'saved') {
        endpoint = '/recipes/user/saved';
        // Remove pagination for saved recipes to show all
        delete params.page;
        delete params.limit;
      }

      const response = await api.get(endpoint, { params });
      const data = response.data;
      
      if (activeTab === 'browse') {
        // For browse tab, we get paginated response
        setRecipes(data.recipes || []);
        setTotalRecipes(data.total || 0);
        setTotalPages(data.pages || 1);
      } else {
        // For my/saved tabs, we get array directly
        setRecipes(data || []);
        setTotalRecipes(data?.length || 0);
        setTotalPages(1);
      }
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to load recipes');
      // Load demo data if API fails
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipe suggestions
  const fetchSuggestions = async () => {
    try {
      const response = await api.get('/recipes/suggestions');
      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Fetch available tags from backend
  const fetchAvailableTags = async () => {
    try {
      const response = await api.get('/recipes/tags');
      setAvailableTags(response.data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      // Fallback to default tags
      setAvailableTags([
        'vegetarian', 'healthy', 'dessert', 'dinner', 
        'lunch', 'breakfast', 'snack', 'protein', 'pasta'
      ]);
    }
  };

  // Demo data fallback
  const loadDemoData = () => {
    const demoRecipes = [
      {
        _id: '1',
        title: "Greek Yogurt Breakfast Bowl",
        description: "Protein-packed breakfast with fresh fruits and nuts",
        preparationTime: 5,
        cookingTime: 0,
        servings: 1,
        nutrition: { calories: 320, protein: 20, carbs: 35, fat: 12 },
        difficulty: "easy",
        category: "breakfast",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        tags: ['healthy', 'breakfast', 'protein'],
        likes: [],
        saves: [],
        createdBy: { _id: 'demo', username: 'DemoUser' },
        ingredients: [
          { food: { _id: '1', name: 'Greek Yogurt' }, amount: 200, unit: 'grams' },
          { food: { _id: '2', name: 'Banana' }, amount: 1, unit: 'piece' }
        ],
        instructions: ['Mix yogurt with fruits', 'Add nuts on top']
      }
    ];
    setRecipes(demoRecipes);
    setSuggestions(demoRecipes.slice(0, 3));
  };

  // Validate recipe form
  const validateRecipeForm = () => {
    const errors = {};

    // Validate title
    if (!newRecipe.title.trim()) {
      errors.title = 'Recipe title is required';
    }

    // Validate ingredients
    const ingredientErrors = [];
    newRecipe.ingredients.forEach((ingredient, index) => {
      if (!ingredient.foodId) {
        ingredientErrors[index] = { ...ingredientErrors[index], food: 'Please select a food' };
      }
      if (!ingredient.amount || parseFloat(ingredient.amount) <= 0) {
        ingredientErrors[index] = {
          ...ingredientErrors[index],
          amount: 'Please enter a valid amount'
        };
      }
    });

    if (ingredientErrors.length > 0) {
      errors.ingredients = ingredientErrors;
    }

    // Validate instructions
    const validInstructions = newRecipe.instructions.filter(inst => inst.trim() !== '');
    if (validInstructions.length === 0) {
      errors.instructions = 'At least one instruction is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle like/unlike recipe using backend API
  const handleLike = async (recipeId) => {
    try {
      // Call backend API
      const response = await api.post(`/recipes/${recipeId}/like`);
      
      // Update local state
      const updatedRecipes = recipes.map(recipe => {
        if (recipe._id === recipeId) {
          return {
            ...recipe,
            likes: response.data.liked 
              ? [...(recipe.likes || []), user?._id]
              : recipe.likes?.filter(id => id !== user?._id) || [],
            likesCount: response.data.likes || recipe.likes?.length || 0
          };
        }
        return recipe;
      });
      
      setRecipes(updatedRecipes);
      toast.success(response.data.liked ? 'Recipe liked!' : 'Recipe unliked!');
    } catch (error) {
      console.error('Error liking recipe:', error);
      toast.error('Failed to like recipe');
    }
  };

  // Handle save/unsave recipe using backend API
  const handleSave = async (recipeId) => {
    try {
      // Call backend API
      const response = await api.post(`/recipes/${recipeId}/save`);
      
      // Update local state
      const updatedRecipes = recipes.map(recipe => {
        if (recipe._id === recipeId) {
          return {
            ...recipe,
            saves: response.data.saved 
              ? [...(recipe.saves || []), user?._id]
              : recipe.saves?.filter(id => id !== user?._id) || []
          };
        }
        return recipe;
      });
      
      setRecipes(updatedRecipes);
      toast.success(response.data.saved ? 'Recipe saved to meal plan!' : 'Recipe removed from meal plan!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Failed to save recipe');
    }
  };

  // Handle add new recipe using backend API
  const handleAddRecipe = async () => {
    // Validate form
    if (!validateRecipeForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      // Prepare recipe data for backend
      const recipeData = {
        title: newRecipe.title,
        description: newRecipe.description,
        category: newRecipe.category,
        difficulty: newRecipe.difficulty,
        preparationTime: parseInt(newRecipe.preparationTime) || 0,
        cookingTime: parseInt(newRecipe.cookingTime) || 0,
        servings: parseInt(newRecipe.servings) || 1,
        nutrition: newRecipe.nutrition,
        tags: ['custom', newRecipe.category],
        instructions: newRecipe.instructions.filter(inst => inst.trim() !== ''),
        isPublic: true,
        image: 'https://via.placeholder.com/400x300?text=Custom+Recipe'
      };

      // Send to backend
      const response = await api.post('/recipes', recipeData);
      
      // Add new recipe to state
      const newRecipeFromServer = response.data;
      const updatedRecipes = [newRecipeFromServer, ...recipes];
      setRecipes(updatedRecipes);
      
      toast.success('Recipe added successfully!');
      setShowAddModal(false);
      resetRecipeForm();
      
      // Refresh the list
      fetchRecipes();
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to add recipe');
    } finally {
      setLoading(false);
    }
  };

  // Reset recipe form
  const resetRecipeForm = () => {
    setNewRecipe({
      title: '',
      description: '',
      category: 'breakfast',
      difficulty: 'easy',
      preparationTime: 15,
      cookingTime: 20,
      servings: 1,
      ingredients: [{ foodId: '', foodName: '', amount: '', unit: 'grams' }],
      instructions: [''],
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    });
    setFormErrors({});
    setFoodSearch('');
  };

  // Handle delete recipe using backend API
  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      // Call backend API
      await api.delete(`/recipes/${recipeId}`);
      
      // Remove from local state
      const updatedRecipes = recipes.filter(recipe => recipe._id !== recipeId);
      setRecipes(updatedRecipes);
      
      toast.success('Recipe deleted!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to delete recipe');
    }
  };

  // Handle view recipe details with full data from backend
  const handleViewRecipe = async (recipe) => {
    try {
      // Fetch full recipe details from backend
      const response = await api.get(`/recipes/${recipe._id}`);
      setSelectedRecipe(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      toast.error('Failed to load recipe details');
      // Fallback to basic recipe data
      setSelectedRecipe(recipe);
      setShowViewModal(true);
    }
  };

  // Filter recipes based on active tab and filters (client-side for my/saved tabs)
  const getFilteredRecipes = () => {
    let filtered = recipes;

    // For browse tab, filtering is done server-side
    if (activeTab === 'browse') {
      return filtered;
    }

    // Client-side filtering for my/saved tabs
    if (filters.search) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        recipe.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.maxTime) {
      const maxTime = parseInt(filters.maxTime);
      filtered = filtered.filter(recipe =>
        (recipe.preparationTime + recipe.cookingTime) <= maxTime
      );
    }

    if (filters.tag !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.tags?.some(tag => tag.toLowerCase() === filters.tag.toLowerCase())
      );
    }

    return filtered;
  };

  // Get current page recipes
  const filteredRecipes = getFilteredRecipes();
  const clientSideTotalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // For browse tab, use server-side pagination, for others use client-side
  const currentRecipes = activeTab === 'browse' 
    ? recipes 
    : filteredRecipes.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeTab]);

  const renderPagination = () => {
    const pages = activeTab === 'browse' ? totalPages : clientSideTotalPages;
    
    if (pages <= 1) return null;

    let items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      items.push(
        <Pagination.First key="first" onClick={() => setCurrentPage(1)} />
      );
      items.push(
        <Pagination.Prev key="prev" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (endPage < pages) {
      items.push(
        <Pagination.Next key="next" onClick={() => setCurrentPage(Math.min(pages, currentPage + 1))} />
      );
      items.push(
        <Pagination.Last key="last" onClick={() => setCurrentPage(pages)} />
      );
    }

    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {activeTab === 'browse' 
            ? `${Math.min((currentPage - 1) * itemsPerPage + 1, totalRecipes)} to ${Math.min(currentPage * itemsPerPage, totalRecipes)} of ${totalRecipes}`
            : `${startIndex + 1} to ${Math.min(endIndex, filteredRecipes.length)} of ${filteredRecipes.length}`
          } recipes
        </div>
        <Pagination className="mb-0">{items}</Pagination>
      </div>
    );
  };

  // Helper functions
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'secondary';
    const diff = difficulty.toLowerCase();
    switch(diff) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  };

  const displayDifficulty = (difficulty) => {
    if (!difficulty) return 'Medium';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  };

  const getCategoryIcon = (category) => {
    if (!category) return '🍴';
    const cat = category.toLowerCase();
    switch(cat) {
      case 'breakfast': return '🥞';
      case 'lunch': return '🍱';
      case 'dinner': return '🍛';
      case 'snack': return '🍎';
      case 'dessert': return '🍰';
      default: return '🍴';
    }
  };

  const myRecipes = recipes.filter(recipe => 
    recipe.createdBy?._id === user?._id && !recipe.isExternal
  );
  const savedRecipes = recipes.filter(recipe => 
    recipe.saves?.includes(user?._id)
  );

  // Render Add Recipe Modal
  const renderAddRecipeModal = () => (
    <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetRecipeForm(); }} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Title *</Form.Label>
            <Form.Control
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
              placeholder="Enter recipe title"
              required
              isInvalid={!!formErrors.title}
            />
            {formErrors.title && (
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
              placeholder="Brief description of the recipe"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={newRecipe.difficulty}
                  onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.servings}
                  onChange={(e) => setNewRecipe({...newRecipe, servings: e.target.value})}
                  min="1"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Prep Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.preparationTime}
                  onChange={(e) => setNewRecipe({...newRecipe, preparationTime: e.target.value})}
                  min="0"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Cook Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.cookingTime}
                  onChange={(e) => setNewRecipe({...newRecipe, cookingTime: e.target.value})}
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mt-4 mb-3">Instructions *</h6>
          {newRecipe.instructions.map((instruction, index) => (
            <Form.Group key={index} className="mb-2">
              <InputGroup>
                <InputGroup.Text>{index + 1}</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={`Step ${index + 1}`}
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...newRecipe.instructions];
                    newInstructions[index] = e.target.value;
                    setNewRecipe({...newRecipe, instructions: newInstructions});
                  }}
                  isInvalid={!!formErrors.instructions && instruction.trim() === ''}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    if (newRecipe.instructions.length <= 1) {
                      toast.error('Recipe must have at least one instruction');
                      return;
                    }
                    const newInstructions = [...newRecipe.instructions];
                    newInstructions.splice(index, 1);
                    setNewRecipe({...newRecipe, instructions: newInstructions});
                  }}
                  disabled={newRecipe.instructions.length === 1}
                >
                  <FaTimes />
                </Button>
              </InputGroup>
            </Form.Group>
          ))}
          {formErrors.instructions && (
            <Form.Text className="text-danger">
              {formErrors.instructions}
            </Form.Text>
          )}
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, '']})} 
            className="mb-3"
          >
            <FaPlus className="me-1" /> Add Step
          </Button>

          <h6 className="mt-4 mb-3">Nutrition Information (per serving)</h6>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Calories</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.nutrition.calories}
                  onChange={(e) => setNewRecipe({
                    ...newRecipe,
                    nutrition: {...newRecipe.nutrition, calories: e.target.value}
                  })}
                  min="0"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Protein (g)</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.nutrition.protein}
                  onChange={(e) => setNewRecipe({
                    ...newRecipe,
                    nutrition: {...newRecipe.nutrition, protein: e.target.value}
                  })}
                  min="0"
                  step="0.1"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Carbs (g)</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.nutrition.carbs}
                  onChange={(e) => setNewRecipe({
                    ...newRecipe,
                    nutrition: {...newRecipe.nutrition, carbs: e.target.value}
                  })}
                  min="0"
                  step="0.1"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Fat (g)</Form.Label>
                <Form.Control
                  type="number"
                  value={newRecipe.nutrition.fat}
                  onChange={(e) => setNewRecipe({
                    ...newRecipe,
                    nutrition: {...newRecipe.nutrition, fat: e.target.value}
                  })}
                  min="0"
                  step="0.1"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setShowAddModal(false); resetRecipeForm(); }}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAddRecipe}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Saving...
            </>
          ) : (
            'Save Recipe'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // Render View Recipe Modal
  const renderViewRecipeModal = () => (
    <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
      {selectedRecipe && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRecipe.title}</Modal.Title>
            {selectedRecipe.isExternal && (
              <Badge bg="info" className="ms-2">
                <FaExternalLinkAlt className="me-1" /> External
              </Badge>
            )}
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <img
                  src={selectedRecipe.image || 'https://via.placeholder.com/400x300?text=Recipe+Image'}
                  alt={selectedRecipe.title}
                  className="img-fluid rounded mb-3"
                  style={{ height: '250px', width: '100%', objectFit: 'cover' }}
                />
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-2">
                    {getCategoryIcon(selectedRecipe.category)} {selectedRecipe.category}
                  </Badge>
                  <Badge bg={getDifficultyColor(selectedRecipe.difficulty)}>
                    {displayDifficulty(selectedRecipe.difficulty)}
                  </Badge>
                  {selectedRecipe.rating && (
                    <Badge bg="warning" text="dark" className="ms-2">
                      ⭐ {selectedRecipe.rating}/5 ({selectedRecipe.reviewCount || 0} reviews)
                    </Badge>
                  )}
                </div>

                {selectedRecipe.description && (
                  <p className="mb-3">{selectedRecipe.description}</p>
                )}

                <div className="mb-3">
                  <div><FaClock className="me-2" /> Prep: {selectedRecipe.preparationTime} min</div>
                  <div><FaFire className="me-2" /> Cook: {selectedRecipe.cookingTime} min</div>
                  <div>🍽️ Servings: {selectedRecipe.servings}</div>
                </div>

                <div className="mb-3">
                  <h6>Nutrition (per serving)</h6>
                  <Row>
                    <Col>
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold">{selectedRecipe.nutrition?.calories || 0}</div>
                        <small className="text-muted">Calories</small>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold">{selectedRecipe.nutrition?.protein || 0}g</div>
                        <small className="text-muted">Protein</small>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold">{selectedRecipe.nutrition?.carbs || 0}g</div>
                        <small className="text-muted">Carbs</small>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold">{selectedRecipe.nutrition?.fat || 0}g</div>
                        <small className="text-muted">Fat</small>
                      </div>
                    </Col>
                  </Row>
                </div>

                {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                  <div className="mb-3">
                    <h6>Tags</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedRecipe.tags.map((tag, index) => (
                        <Badge key={index} bg="light" text="dark">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Col>
            </Row>

            {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
              <div className="mt-4">
                <h6>Ingredients</h6>
                <ul className="list-group">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                      {ingredient.name || ingredient.food?.name || 'Unknown ingredient'} - {ingredient.amount} {ingredient.unit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 && (
              <div className="mt-4">
                <h6>Instructions</h6>
                <ol>
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">{instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-4">
              <h6>Created by: {selectedRecipe.createdBy?.username || 'System'}</h6>
              {selectedRecipe.createdBy?._id === user?._id && (
                <Badge bg="primary" className="ms-2">Your Recipe</Badge>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={() => handleLike(selectedRecipe._id)}>
              <FaHeart className={selectedRecipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
              Like ({selectedRecipe.likes?.length || 0})
            </Button>
            <Button
              variant={selectedRecipe.saves?.includes(user?._id) ? "success" : "outline-success"}
              onClick={() => handleSave(selectedRecipe._id)}
            >
              {selectedRecipe.saves?.includes(user?._id) ? 'Saved' : 'Save to Meal Plan'}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      maxTime: '',
      search: '',
      tag: 'all'
    });
    setCurrentPage(1);
  };

  // Calculate display counts
  const displayCount = activeTab === 'browse' 
    ? totalRecipes 
    : activeTab === 'my' 
      ? myRecipes.length 
      : savedRecipes.length;

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2><FaUtensils className="me-2" />Recipes</h2>
          <p className="text-muted">Discover, create, and share healthy recipes</p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="browse" title={<><FaList className="me-1" /> Browse Recipes ({displayCount})</>} />
        <Tab eventKey="my" title={<><FaUser className="me-1" /> My Recipes ({myRecipes.length})</>} />
        <Tab eventKey="saved" title={<><FaStar className="me-1" /> Saved Recipes ({savedRecipes.length})</>} />
      </Tabs>

      <Row>
        <Col lg={3}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0"><FaFilter className="me-2" />Filters</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search recipes..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Max Preparation Time (min)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g., 30"
                  value={filters.maxTime}
                  onChange={(e) => setFilters({...filters, maxTime: e.target.value})}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Filter by Tag</Form.Label>
                <Form.Select
                  value={filters.tag}
                  onChange={(e) => setFilters({...filters, tag: e.target.value})}
                >
                  <option value="all">All Tags</option>
                  {availableTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={clearAllFilters}
                disabled={filters.category === 'all' && filters.difficulty === 'all' && !filters.maxTime && !filters.search && filters.tag === 'all'}
              >
                Clear Filters
              </Button>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="me-2" /> Add New Recipe
              </Button>
              <Button
                variant="outline-primary"
                className="w-100 mb-2"
                onClick={() => {
                  setCurrentPage(1);
                  fetchRecipes();
                  fetchSuggestions();
                }}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : 'Refresh Recipes'}
              </Button>
            </Card.Body>
          </Card>

          {suggestions && suggestions.length > 0 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Suggested for You</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {suggestions.slice(0, 5).map(recipe => (
                    <ListGroup.Item
                      key={recipe._id}
                      className="d-flex align-items-center py-2 cursor-pointer"
                      onClick={() => handleViewRecipe(recipe)}
                    >
                      <span className="me-2">{getCategoryIcon(recipe.category)}</span>
                      <div className="flex-grow-1">
                        <div className="small">{recipe.title}</div>
                        <div className="d-flex gap-1">
                          <Badge bg={getDifficultyColor(recipe.difficulty)} size="sm">
                            {displayDifficulty(recipe.difficulty)}
                          </Badge>
                          {recipe.rating && (
                            <Badge bg="light" text="dark" size="sm">
                              ⭐ {recipe.rating}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading recipes...</p>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">
                  {activeTab === 'browse' && `Showing ${currentRecipes.length} of ${totalRecipes} recipes`}
                  {activeTab === 'my' && `My Recipes (${myRecipes.length})`}
                  {activeTab === 'saved' && `Saved Recipes (${savedRecipes.length})`}
                </h5>
                <div className="d-flex gap-2">
                  <Badge bg="info">
                    {availableTags.length} tags available
                  </Badge>
                </div>
              </div>

              {currentRecipes.length > 0 ? (
                <>
                  <Row>
                    {currentRecipes.map(recipe => (
                      <Col md={6} lg={4} key={recipe._id} className="mb-4">
                        <Card className="h-100 shadow-sm hover-shadow">
                          <Card.Img
                            variant="top"
                            src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe+Image'}
                            style={{ height: '150px', objectFit: 'cover' }}
                            onClick={() => handleViewRecipe(recipe)}
                            className="cursor-pointer"
                          />
                          <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <Badge bg="light" text="dark" className="me-1">
                                  {getCategoryIcon(recipe.category)} {recipe.category}
                                </Badge>
                                <Badge bg={getDifficultyColor(recipe.difficulty)}>
                                  {displayDifficulty(recipe.difficulty)}
                                </Badge>
                                {/* {recipe.isExternal && (
                                  <Badge bg="info" className="ms-1">
                                    <FaExternalLinkAlt size={10} />
                                  </Badge>
                                )} */}
                              </div>
                              {recipe.createdBy?._id === user?._id && !recipe.isExternal && (
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleDeleteRecipe(recipe._id)}
                                  title="Delete recipe"
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </div>

                            <Card.Title
                              className="mb-2 cursor-pointer flex-grow-1"
                              onClick={() => handleViewRecipe(recipe)}
                            >
                              {recipe.title}
                            </Card.Title>

                            {recipe.description && (
                              <Card.Text className="small text-muted mb-3">
                                {recipe.description.length > 100
                                  ? `${recipe.description.substring(0, 100)}...`
                                  : recipe.description}
                              </Card.Text>
                            )}

                            {recipe.tags && recipe.tags.length > 0 && (
                              <div className="mb-2">
                                <div className="d-flex flex-wrap gap-1">
                                  {recipe.tags.slice(0, 3).map((tag, index) => (
                                    <Badge key={index} bg="light" text="dark" style={{fontSize: '0.7rem'}}>
                                      {tag}
                                    </Badge>
                                  ))}
                                  {recipe.tags.length > 3 && (
                                    <Badge bg="light" text="dark" style={{fontSize: '0.7rem'}}>
                                      +{recipe.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="d-flex justify-content-between small mb-3">
                              <div>
                                <FaClock className="me-1" />
                                {recipe.preparationTime + recipe.cookingTime} min
                              </div>
                              <div>
                                <FaFire className="me-1" />
                                {recipe.nutrition?.calories || 0} cal
                              </div>
                              <div>
                                {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}
                              </div>
                            </div>

                            <div className="d-flex justify-content-between mt-auto">
                              <Button
                                variant="link"
                                className="p-0"
                                onClick={() => handleLike(recipe._id)}
                              >
                                <FaHeart className={recipe.likes?.includes(user?._id) ? 'text-danger' : 'text-muted'} />
                                <small className="ms-1">{recipe.likes?.length || 0}</small>
                              </Button>

                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleViewRecipe(recipe)}
                                >
                                  View
                                </Button>
                                <Button
                                  variant={recipe.saves?.includes(user?._id) ? "success" : "outline-success"}
                                  size="sm"
                                  onClick={() => handleSave(recipe._id)}
                                >
                                  {recipe.saves?.includes(user?._id) ? 'Saved' : 'Save'}
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  
                  {renderPagination()}
                </>
              ) : (
                <Alert variant="info" className="text-center py-5">
                  <FaUtensils size={48} className="mb-3" />
                  <h4>No recipes found</h4>
                  <p className="text-muted mb-3">
                    {activeTab === 'my'
                      ? "You haven't created any recipes yet"
                      : activeTab === 'saved'
                      ? "You haven't saved any recipes yet"
                      : "Try adjusting your filters or create a new recipe"
                    }
                  </p>
                  {activeTab !== 'my' && (
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                      <FaPlus className="me-2" /> Create Your First Recipe
                    </Button>
                  )}
                </Alert>
              )}
            </>
          )}
        </Col>
      </Row>

      {renderAddRecipeModal()}
      {renderViewRecipeModal()}
    </Container>
  );
};

export default Recipes;