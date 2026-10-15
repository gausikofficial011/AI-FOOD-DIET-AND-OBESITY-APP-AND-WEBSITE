// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Badge, InputGroup } from 'react-bootstrap';
// import { FaSearch, FaPlus, FaAppleAlt } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const FoodDatabase = () => {
//   const { user } = useAuth();
//   const [foods, setFoods] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('all');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newFood, setNewFood] = useState({
//     name: '',
//     category: 'other',
//     servingSize: { amount: 100, unit: 'grams' },
//     nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//   });

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   const fetchFoods = async () => {
//     try {
//       const response = await api.get('/foods');
//       setFoods(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleAddFood = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/foods', newFood);
//       toast.success('Food added to database!');
//       setShowAddForm(false);
//       setNewFood({
//         name: '',
//         category: 'other',
//         servingSize: { amount: 100, unit: 'grams' },
//         nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//       });
//       fetchFoods();
//     } catch (error) {
//       toast.error('Failed to add food');
//     }
//   };

//   const categories = ['all', 'fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other'];

//   const filteredFoods = foods.filter(food => {
//     const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = category === 'all' || food.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   const getCategoryColor = (cat) => {
//     switch(cat) {
//       case 'fruit': return 'success';
//       case 'vegetable': return 'success';
//       case 'protein': return 'danger';
//       case 'grains': return 'warning';
//       case 'dairy': return 'info';
//       case 'fats': return 'secondary';
//       default: return 'primary';
//     }
//   };

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaAppleAlt className="me-2" />Food Database</h2>
//           <p className="text-muted">Browse and search nutrition information for foods</p>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search foods..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </InputGroup>

//               <div className="d-flex flex-wrap gap-2 mb-3">
//                 {categories?.map(cat => (
//                   <Button
//                     key={cat}
//                     variant={category === cat ? getCategoryColor(cat) : `outline-${getCategoryColor(cat)}`}
//                     size="sm"
//                     onClick={() => setCategory(cat)}
//                   >
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </Button>
//                 ))}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={6}>
//           <Card>
//             <Card.Body className="text-center">
//               <Button variant="success" className="w-100" onClick={() => setShowAddForm(!showAddForm)}>
//                 <FaPlus className="me-2" /> {showAddForm ? 'Cancel' : 'Add Custom Food'}
//               </Button>
//               <p className="text-muted mt-2 mb-0">
//                 {foods.length} foods in database
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Add Food Form */}
//       {showAddForm && (
//         <Row className="mb-4">
//           <Col>
//             <Card>
//               <Card.Header><h5>Add Custom Food</h5></Card.Header>
//               <Card.Body>
//                 <Form onSubmit={handleAddFood}>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Food Name *</Form.Label>
//                         <Form.Control
//                           value={newFood.name}
//                           onChange={(e) => setNewFood({...newFood, name: e.target.value})}
//                           required
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Category</Form.Label>
//                         <Form.Select
//                           value={newFood.category}
//                           onChange={(e) => setNewFood({...newFood, category: e.target.value})}
//                         >
//                           {categories.filter(c => c !== 'all')?.map(cat => (
//                             <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Serving Size</Form.Label>
//                         <Row>
//                           <Col>
//                             <Form.Control
//                               type="number"
//                               placeholder="Amount"
//                               value={newFood.servingSize.amount}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 servingSize: {...newFood.servingSize, amount: e.target.value}
//                               })}
//                             />
//                           </Col>
//                           <Col>
//                             <Form.Select
//                               value={newFood.servingSize.unit}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 servingSize: {...newFood.servingSize, unit: e.target.value}
//                               })}
//                             >
//                               <option value="grams">Grams (g)</option>
//                               <option value="ml">Milliliters (ml)</option>
//                               <option value="pieces">Pieces</option>
//                               <option value="cups">Cups</option>
//                             </Form.Select>
//                           </Col>
//                         </Row>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <h6>Nutrition Facts (per serving)</h6>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Calories</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={newFood.nutrition.calories}
//                           onChange={(e) => setNewFood({
//                             ...newFood,
//                             nutrition: {...newFood.nutrition, calories: e.target.value}
//                           })}
//                         />
//                       </Form.Group>

//                       <Row>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Protein (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.protein}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, protein: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Carbs (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.carbs}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, carbs: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Fat (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.fat}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, fat: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>

//                   <Button variant="primary" type="submit">
//                     Save Food
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Food List */}
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">Foods ({filteredFoods.length})</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>Food Name</th>
//                     <th>Category</th>
//                     <th>Serving Size</th>
//                     <th>Calories</th>
//                     <th>Protein (g)</th>
//                     <th>Carbs (g)</th>
//                     <th>Fat (g)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredFoods?.map(food => (
//                     <tr key={food._id}>
//                       <td>
//                         <strong>{food.name}</strong>
//                         {food.isCustom && <Badge bg="info" className="ms-2">Custom</Badge>}
//                       </td>
//                       <td>
//                         <Badge bg={getCategoryColor(food.category)}>
//                           {food.category}
//                         </Badge>
//                       </td>
//                       <td>{food.servingSize.amount} {food.servingSize.unit}</td>
//                       <td>{food.nutrition.calories}</td>
//                       <td>{food.nutrition.protein}</td>
//                       <td>{food.nutrition.carbs}</td>
//                       <td>{food.nutrition.fat}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               {filteredFoods.length === 0 && (
//                 <div className="text-center py-5">
//                   <FaSearch size={48} className="text-muted mb-3" />
//                   <h5>No foods found</h5>
//                   <p className="text-muted">Try a different search or category</p>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default FoodDatabase;

// new
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Badge, InputGroup, Spinner, Pagination } from 'react-bootstrap';
// import { FaSearch, FaPlus, FaAppleAlt, FaTimes, FaFilter } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const FoodDatabase = () => {
//   const [foods, setFoods] = useState([]);
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [availableTags, setAvailableTags] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('all');
//   const [mealType, setMealType] = useState('all');
//   const [selectedTag, setSelectedTag] = useState('all');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalRecipes, setTotalRecipes] = useState(0);
//   const itemsPerPage = 10;
  
//   const [newFood, setNewFood] = useState({
//     name: '',
//     category: 'other',
//     servingSize: { amount: 100, unit: 'grams' },
//     nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//   });

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch tags
//       const tagsResponse = await fetch('https://dummyjson.com/recipes/tags');
//       const tagsData = await tagsResponse.json();
//       setAvailableTags(tagsData);
      
//       // First, get the total count
//       const initialResponse = await fetch('https://dummyjson.com/recipes?limit=0');
//       const initialData = await initialResponse.json();
//       const total = initialData.total;
//       setTotalRecipes(total);
      
//       // Fetch all recipes
//       const response = await fetch(`https://dummyjson.com/recipes?limit=${total}`);
//       const data = await response.json();
      
//       // Map recipes to food items with appropriate categories
//       const mappedFoods = data.recipes?.map(recipe => ({
//         _id: `recipe-${recipe.id}`,
//         name: recipe.name,
//         category: mapCuisineToCategory(recipe.cuisine, recipe.tags, recipe.mealType),
//         servingSize: { amount: 1, unit: 'serving' },
//         nutrition: {
//           calories: recipe.caloriesPerServing,
//           protein: estimateProtein(recipe.tags),
//           carbs: estimateCarbs(recipe.tags),
//           fat: estimateFat(recipe.tags),
//           fiber: 0,
//           sugar: 0
//         },
//         isCustom: false,
//         isRecipe: true,
//         image: recipe.image,
//         difficulty: recipe.difficulty,
//         prepTime: recipe.prepTimeMinutes,
//         cookTime: recipe.cookTimeMinutes,
//         servings: recipe.servings,
//         mealType: recipe.mealType,
//         tags: recipe.tags
//       }));
      
//       setAllRecipes(mappedFoods);
//       setFoods(mappedFoods);
//       setLoading(false);
//         toast.success(`Food Loaded successfully!`);
//       // toast.success(`Loaded ${mappedFoods.length} recipes successfully!`);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to load recipes');
//       setLoading(false);
//     }
//   };

//   // Map recipe cuisine/tags to food categories
//   const mapCuisineToCategory = (cuisine, tags, mealType) => {
//     const lowerTags = tags?.map(t => t.toLowerCase());
//     const lowerMealType = mealType?.map(m => m.toLowerCase());
    
//     if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//     if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//     if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//     if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//     if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
//     if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
    
//     return 'other';
//   };

//   // Estimate macros based on tags
//   const estimateProtein = (tags) => {
//     const lowerTags = tags?.map(t => t.toLowerCase());
//     if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//     if (lowerTags.includes('vegetarian')) return 8;
//     return 15;
//   };

//   const estimateCarbs = (tags) => {
//     const lowerTags = tags?.map(t => t.toLowerCase());
//     if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//     if (lowerTags.includes('dessert')) return 35;
//     return 20;
//   };

//   const estimateFat = (tags) => {
//     const lowerTags = tags?.map(t => t.toLowerCase());
//     if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//     return 12;
//   };

//   const handleAddFood = (e) => {
//     e.preventDefault();
//     const customFood = {
//       ...newFood,
//       _id: `custom-${Date.now()}`,
//       isCustom: true,
//       isRecipe: false
//     };
//     setFoods([customFood, ...foods]);
//     setAllRecipes([customFood, ...allRecipes]);
//     toast.success('Food added to database!');
//     setShowAddForm(false);
//     setCurrentPage(1);
//     setNewFood({
//       name: '',
//       category: 'other',
//       servingSize: { amount: 100, unit: 'grams' },
//       nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//     });
//   };

//   const categories = ['all', 'fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other'];
//   const mealTypes = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'beverage', 'appetizer', 'side dish'];

//   const filteredFoods = foods.filter(food => {
//     const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = category === 'all' || food.category === category;
//     const matchesMealType = mealType === 'all' || 
//       (food.mealType && food.mealType.some(mt => mt.toLowerCase() === mealType.toLowerCase()));
//     const matchesTag = selectedTag === 'all' || 
//       (food.tags && food.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));
//     return matchesSearch && matchesCategory && matchesMealType && matchesTag;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentFoods = filteredFoods.slice(startIndex, endIndex);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, category, mealType, selectedTag]);

//   const getCategoryColor = (cat) => {
//     switch(cat) {
//       case 'fruit': return 'success';
//       case 'vegetable': return 'success';
//       case 'protein': return 'danger';
//       case 'grains': return 'warning';
//       case 'dairy': return 'info';
//       case 'fats': return 'secondary';
//       case 'beverage': return 'dark';
//       default: return 'primary';
//     }
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setCategory('all');
//     setMealType('all');
//     setSelectedTag('all');
//     setCurrentPage(1);
//   };

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
//           Showing {startIndex + 1} to {Math.min(endIndex, filteredFoods.length)} of {filteredFoods.length} foods
//         </div>
//         <Pagination className="mb-0">{items}</Pagination>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3 text-muted">Loading recipes...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaAppleAlt className="me-2" />Food Database</h2>
//           <p className="text-muted">Browse and search nutrition information for foods and recipes</p>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search foods..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </InputGroup>

//               <div className="mb-3">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <small className="text-muted fw-bold">Food Categories</small>
//                   {(category !== 'all' || mealType !== 'all' || selectedTag !== 'all') && (
//                     <Button variant="link" size="sm" onClick={clearAllFilters}>
//                       Clear All Filters
//                     </Button>
//                   )}
//                 </div>
//                 <div className="d-flex flex-wrap gap-2">
//                   {categories?.map(cat => (
//                     <Button
//                       key={cat}
//                       variant={category === cat ? getCategoryColor(cat) : `outline-${getCategoryColor(cat)}`}
//                       size="sm"
//                       onClick={() => setCategory(cat)}
//                     >
//                       {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <small className="text-muted fw-bold d-block mb-2">Meal Types</small>
//                 <div className="d-flex flex-wrap gap-2">
//                   {mealTypes?.map(mt => (
//                     <Button
//                       key={mt}
//                       variant={mealType === mt ? 'info' : 'outline-info'}
//                       size="sm"
//                       onClick={() => setMealType(mt)}
//                     >
//                       {mt.charAt(0).toUpperCase() + mt.slice(1)}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <small className="text-muted fw-bold d-block mb-2">
//                   <FaFilter className="me-1" />
//                   Filter by Tags ({availableTags.length} tags available)
//                 </small>
//                 <Form.Select 
//                   size="sm" 
//                   value={selectedTag}
//                   onChange={(e) => setSelectedTag(e.target.value)}
//                   className="w-auto"
//                 >
//                   <option value="all">All Tags</option>
//                   {availableTags?.map(tag => (
//                     <option key={tag} value={tag}>{tag}</option>
//                   ))}
//                 </Form.Select>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card>
//             <Card.Body className="text-center">
//               <Button variant="success" className="w-100" onClick={() => setShowAddForm(!showAddForm)}>
//                 {showAddForm ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />}
//                 {showAddForm ? 'Cancel' : 'Add Custom Food'}
//               </Button>
//               <p className="text-muted mt-2 mb-0">
//                 {allRecipes.length} foods in database
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Add Food Form */}
//       {showAddForm && (
//         <Row className="mb-4">
//           <Col>
//             <Card>
//               <Card.Header><h5>Add Custom Food</h5></Card.Header>
//               <Card.Body>
//                 <Form onSubmit={handleAddFood}>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Food Name *</Form.Label>
//                         <Form.Control
//                           value={newFood.name}
//                           onChange={(e) => setNewFood({...newFood, name: e.target.value})}
//                           required
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Category</Form.Label>
//                         <Form.Select
//                           value={newFood.category}
//                           onChange={(e) => setNewFood({...newFood, category: e.target.value})}
//                         >
//                           {categories.filter(c => c !== 'all')?.map(cat => (
//                             <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Serving Size</Form.Label>
//                         <Row>
//                           <Col>
//                             <Form.Control
//                               type="number"
//                               placeholder="Amount"
//                               value={newFood.servingSize.amount}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 servingSize: {...newFood.servingSize, amount: e.target.value}
//                               })}
//                             />
//                           </Col>
//                           <Col>
//                             <Form.Select
//                               value={newFood.servingSize.unit}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 servingSize: {...newFood.servingSize, unit: e.target.value}
//                               })}
//                             >
//                               <option value="grams">Grams (g)</option>
//                               <option value="ml">Milliliters (ml)</option>
//                               <option value="pieces">Pieces</option>
//                               <option value="cups">Cups</option>
//                             </Form.Select>
//                           </Col>
//                         </Row>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <h6>Nutrition Facts (per serving)</h6>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Calories</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={newFood.nutrition.calories}
//                           onChange={(e) => setNewFood({
//                             ...newFood,
//                             nutrition: {...newFood.nutrition, calories: e.target.value}
//                           })}
//                         />
//                       </Form.Group>

//                       <Row>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Protein (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.protein}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, protein: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Carbs (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.carbs}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, carbs: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Fat (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={newFood.nutrition.fat}
//                               onChange={(e) => setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, fat: e.target.value}
//                               })}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>

//                   <Button variant="primary" type="submit">
//                     Save Food
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Food List */}
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">Foods ({filteredFoods.length})</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>Food Name</th>
//                     <th>Category</th>
//                     <th>Serving Size</th>
//                     <th>Calories</th>
//                     <th>Protein (g)</th>
//                     <th>Carbs (g)</th>
//                     <th>Fat (g)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentFoods?.map(food => (
//                     <tr key={food._id}>
//                       <td>
//                         <div className="d-flex align-items-center gap-2">
//                           {food.image && (
//                             <img 
//                               src={food.image} 
//                               alt={food.name}
//                               style={{
//                                 width: '48px',
//                                 height: '48px',
//                                 objectFit: 'cover',
//                                 borderRadius: '8px',
//                                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                               }}
//                             />
//                           )}
//                           <div>
//                             <strong>{food.name}</strong>
//                             <div className="d-flex gap-1 mt-1 flex-wrap">
//                               {food.isCustom && <Badge bg="info">Custom</Badge>}
//                               {food.isRecipe && food.difficulty && (
//                                 <Badge bg="secondary">{food.difficulty}</Badge>
//                               )}
//                               {food.mealType && food.mealType.length > 0 && (
//                                 <Badge bg="success" className="text-capitalize">
//                                   {food.mealType[0]}
//                                 </Badge>
//                               )}
//                               {food.tags && food.tags.slice(0, 2)?.map((tag, idx) => (
//                                 <Badge key={idx} bg="light" text="dark" style={{fontSize: '0.7rem'}}>
//                                   {tag}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <Badge bg={getCategoryColor(food.category)}>
//                           {food.category}
//                         </Badge>
//                       </td>
//                       <td>{food.servingSize.amount} {food.servingSize.unit}</td>
//                       <td>{food.nutrition.calories}</td>
//                       <td>{food.nutrition.protein}</td>
//                       <td>{food.nutrition.carbs}</td>
//                       <td>{food.nutrition.fat}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               {filteredFoods.length === 0 && (
//                 <div className="text-center py-5">
//                   <FaSearch size={48} className="text-muted mb-3" />
//                   <h5>No foods found</h5>
//                   <p className="text-muted">Try adjusting your filters or search term</p>
//                   <Button variant="outline-primary" onClick={clearAllFilters}>
//                     Clear All Filters
//                   </Button>
//                 </div>
//               )}

//               {renderPagination()}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default FoodDatabase;
// new3
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Badge, InputGroup, Spinner, Pagination } from 'react-bootstrap';
// import { FaSearch, FaPlus, FaAppleAlt, FaTimes, FaFilter, FaTrash, FaEdit } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import api from '../utils/api'; // Your API setup

// const FoodDatabase = () => {
//   const [foods, setFoods] = useState([]);
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [availableTags, setAvailableTags] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [mealTypes, setMealTypes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('all');
//   const [mealType, setMealType] = useState('all');
//   const [selectedTag, setSelectedTag] = useState('all');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalFoods, setTotalFoods] = useState(0);
//   const itemsPerPage = 10;
  
//   const [newFood, setNewFood] = useState({
//     name: '',
//     category: 'other',
//     servingSize: { amount: 100, unit: 'grams' },
//     nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//   });

//   const [editingFood, setEditingFood] = useState(null);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   useEffect(() => {
//     fetchFoods();
//   }, [currentPage, searchTerm, category, mealType, selectedTag]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch categories, tags, and meal types
//       const [tagsRes, categoriesRes, mealTypesRes] = await Promise.all([
//         api.get('/foods/tags'),
//         api.get('/foods/categories'),
//         api.get('/foods/meal-types')
//       ]);
      
//       setAvailableTags(tagsRes.data);
//       setCategories(categoriesRes.data);
//       setMealTypes(mealTypesRes.data);
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to load data');
//       setLoading(false);
//     }
//   };

//   const fetchFoods = async () => {
//     try {
//       setLoading(true);
      
//       const params = {
//         page: currentPage,
//         limit: itemsPerPage,
//         ...(searchTerm && { search: searchTerm }),
//         ...(category !== 'all' && { category }),
//         ...(mealType !== 'all' && { mealType }),
//         ...(selectedTag !== 'all' && { tag: selectedTag })
//       };
      
//       const response = await api.get('/foods', { params });
//       const { foods, pagination } = response.data;
      
//       setFoods(foods);
//       setTotalFoods(pagination.total);
//       setTotalPages(pagination.pages);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching foods:', error);
//       toast.error('Failed to load foods');
//       setLoading(false);
//     }
//   };

//   const handleAddFood = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/foods', newFood);
//       toast.success('Food added to database!');
//       setShowAddForm(false);
//       setCurrentPage(1);
//       setNewFood({
//         name: '',
//         category: 'other',
//         servingSize: { amount: 100, unit: 'grams' },
//         nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
//       });
//       fetchFoods(); // Refresh the list
//     } catch (error) {
//       console.error('Error adding food:', error);
//       toast.error(error.response?.data?.message || 'Failed to add food');
//     }
//   };

//   const handleUpdateFood = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/foods/${editingFood._id}`, editingFood);
//       toast.success('Food updated successfully!');
//       setEditingFood(null);
//       fetchFoods(); // Refresh the list
//     } catch (error) {
//       console.error('Error updating food:', error);
//       toast.error(error.response?.data?.message || 'Failed to update food');
//     }
//   };

//   const handleDeleteFood = async (foodId) => {
//     if (window.confirm('Are you sure you want to delete this food?')) {
//       try {
//         await api.delete(`/foods/${foodId}`);
//         toast.success('Food deleted successfully!');
//         fetchFoods(); // Refresh the list
//       } catch (error) {
//         console.error('Error deleting food:', error);
//         toast.error(error.response?.data?.message || 'Failed to delete food');
//       }
//     }
//   };

//   const initializeRecipes = async () => {
//     if (window.confirm('Initialize recipes from external API? This may take a moment.')) {
//       try {
//         setLoading(true);
//         const response = await api.get('/foods/initialize-recipes?limit=50');
//         toast.success(`Added ${response.data.added} new recipes!`);
//         fetchFoods(); // Refresh the list
//       } catch (error) {
//         console.error('Error initializing recipes:', error);
//         toast.error(error.response?.data?.message || 'Failed to initialize recipes');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const getCategoryColor = (cat) => {
//     switch(cat) {
//       case 'fruit': return 'success';
//       case 'vegetable': return 'success';
//       case 'protein': return 'danger';
//       case 'grains': return 'warning';
//       case 'dairy': return 'info';
//       case 'fats': return 'secondary';
//       case 'beverage': return 'dark';
//       default: return 'primary';
//     }
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setCategory('all');
//     setMealType('all');
//     setSelectedTag('all');
//     setCurrentPage(1);
//   };

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     let items = [];
//     const maxVisible = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisible - 1);

//     if (endPage - startPage < maxVisible - 1) {
//       startPage = Math.max(1, endPage - maxVisible + 1);
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

//     return (
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <div className="text-muted">
//           Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFoods)} of {totalFoods} foods
//         </div>
//         <Pagination className="mb-0">
//           <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
//           <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
//           {items}
//           <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
//           <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
//         </Pagination>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3 text-muted">Loading foods...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col>
//           <h2><FaAppleAlt className="me-2" />Food Database</h2>
//           <p className="text-muted">Browse and search nutrition information for foods and recipes</p>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search foods..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </InputGroup>

//               <div className="mb-3">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <small className="text-muted fw-bold">Food Categories</small>
//                   {(category !== 'all' || mealType !== 'all' || selectedTag !== 'all') && (
//                     <Button variant="link" size="sm" onClick={clearAllFilters}>
//                       Clear All Filters
//                     </Button>
//                   )}
//                 </div>
//                 <div className="d-flex flex-wrap gap-2">
//                   <Button
//                     variant={category === 'all' ? 'primary' : 'outline-primary'}
//                     size="sm"
//                     onClick={() => setCategory('all')}
//                   >
//                     All
//                   </Button>
//                   {categories?.map(cat => (
//                     <Button
//                       key={cat}
//                       variant={category === cat ? getCategoryColor(cat) : `outline-${getCategoryColor(cat)}`}
//                       size="sm"
//                       onClick={() => setCategory(cat)}
//                     >
//                       {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <small className="text-muted fw-bold d-block mb-2">Meal Types</small>
//                 <div className="d-flex flex-wrap gap-2">
//                   <Button
//                     variant={mealType === 'all' ? 'info' : 'outline-info'}
//                     size="sm"
//                     onClick={() => setMealType('all')}
//                   >
//                     All
//                   </Button>
//                   {mealTypes?.filter(mt => mt)?.map(mt => (
//                     <Button
//                       key={mt}
//                       variant={mealType === mt ? 'info' : 'outline-info'}
//                       size="sm"
//                       onClick={() => setMealType(mt)}
//                     >
//                       {mt?.charAt(0).toUpperCase() + mt?.slice(1)}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <small className="text-muted fw-bold d-block mb-2">
//                   <FaFilter className="me-1" />
//                   Filter by Tags ({availableTags.length} tags available)
//                 </small>
//                 <Form.Select 
//                   size="sm" 
//                   value={selectedTag}
//                   onChange={(e) => setSelectedTag(e.target.value)}
//                   className="w-auto"
//                 >
//                   <option value="all">All Tags</option>
//                   {availableTags?.map(tag => (
//                     <option key={tag} value={tag}>{tag}</option>
//                   ))}
//                 </Form.Select>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card>
//             <Card.Body className="text-center">
//               <Button variant="success" className="w-100 mb-2" onClick={() => setShowAddForm(!showAddForm)}>
//                 {showAddForm ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />}
//                 {showAddForm ? 'Cancel' : 'Add Custom Food'}
//               </Button>
//               <Button variant="warning" className="w-100" onClick={initializeRecipes}>
//                 Initialize Recipes
//               </Button>
//               <p className="text-muted mt-2 mb-0">
//                 {totalFoods} foods in database
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Add/Edit Food Form */}
//       {(showAddForm || editingFood) && (
//         <Row className="mb-4">
//           <Col>
//             <Card>
//               <Card.Header>
//                 <h5>{editingFood ? 'Edit Food' : 'Add Custom Food'}</h5>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={editingFood ? handleUpdateFood : handleAddFood}>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Food Name *</Form.Label>
//                         <Form.Control
//                           value={editingFood ? editingFood.name : newFood.name}
//                           onChange={(e) => editingFood 
//                             ? setEditingFood({...editingFood, name: e.target.value})
//                             : setNewFood({...newFood, name: e.target.value})
//                           }
//                           required
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Category</Form.Label>
//                         <Form.Select
//                           value={editingFood ? editingFood.category : newFood.category}
//                           onChange={(e) => editingFood
//                             ? setEditingFood({...editingFood, category: e.target.value})
//                             : setNewFood({...newFood, category: e.target.value})
//                           }
//                         >
//                           {categories?.map(cat => (
//                             <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>Serving Size</Form.Label>
//                         <Row>
//                           <Col>
//                             <Form.Control
//                               type="number"
//                               placeholder="Amount"
//                               value={editingFood ? editingFood.servingSize.amount : newFood.servingSize.amount}
//                               onChange={(e) => editingFood
//                                 ? setEditingFood({
//                                     ...editingFood,
//                                     servingSize: {...editingFood.servingSize, amount: e.target.value}
//                                   })
//                                 : setNewFood({
//                                     ...newFood,
//                                     servingSize: {...newFood.servingSize, amount: e.target.value}
//                                   })
//                               }
//                             />
//                           </Col>
//                           <Col>
//                             <Form.Select
//                               value={editingFood ? editingFood.servingSize.unit : newFood.servingSize.unit}
//                               onChange={(e) => editingFood
//                                 ? setEditingFood({
//                                     ...editingFood,
//                                     servingSize: {...editingFood.servingSize, unit: e.target.value}
//                                   })
//                                 : setNewFood({
//                                     ...newFood,
//                                     servingSize: {...newFood.servingSize, unit: e.target.value}
//                                   })
//                               }
//                             >
//                               <option value="grams">Grams (g)</option>
//                               <option value="ml">Milliliters (ml)</option>
//                               <option value="pieces">Pieces</option>
//                               <option value="cups">Cups</option>
//                               <option value="serving">Serving</option>
//                             </Form.Select>
//                           </Col>
//                         </Row>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <h6>Nutrition Facts (per serving)</h6>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Calories</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={editingFood ? editingFood.nutrition.calories : newFood.nutrition.calories}
//                           onChange={(e) => editingFood
//                             ? setEditingFood({
//                                 ...editingFood,
//                                 nutrition: {...editingFood.nutrition, calories: e.target.value}
//                               })
//                             : setNewFood({
//                                 ...newFood,
//                                 nutrition: {...newFood.nutrition, calories: e.target.value}
//                               })
//                           }
//                         />
//                       </Form.Group>

//                       <Row>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Protein (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={editingFood ? editingFood.nutrition.protein : newFood.nutrition.protein}
//                               onChange={(e) => editingFood
//                                 ? setEditingFood({
//                                     ...editingFood,
//                                     nutrition: {...editingFood.nutrition, protein: e.target.value}
//                                   })
//                                 : setNewFood({
//                                     ...newFood,
//                                     nutrition: {...newFood.nutrition, protein: e.target.value}
//                                   })
//                               }
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Carbs (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={editingFood ? editingFood.nutrition.carbs : newFood.nutrition.carbs}
//                               onChange={(e) => editingFood
//                                 ? setEditingFood({
//                                     ...editingFood,
//                                     nutrition: {...editingFood.nutrition, carbs: e.target.value}
//                                   })
//                                 : setNewFood({
//                                     ...newFood,
//                                     nutrition: {...newFood.nutrition, carbs: e.target.value}
//                                   })
//                               }
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group className="mb-3">
//                             <Form.Label>Fat (g)</Form.Label>
//                             <Form.Control
//                               type="number"
//                               step="0.1"
//                               value={editingFood ? editingFood.nutrition.fat : newFood.nutrition.fat}
//                               onChange={(e) => editingFood
//                                 ? setEditingFood({
//                                     ...editingFood,
//                                     nutrition: {...editingFood.nutrition, fat: e.target.value}
//                                   })
//                                 : setNewFood({
//                                     ...newFood,
//                                     nutrition: {...newFood.nutrition, fat: e.target.value}
//                                   })
//                               }
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>

//                   <div className="d-flex gap-2">
//                     <Button variant="primary" type="submit">
//                       {editingFood ? 'Update Food' : 'Save Food'}
//                     </Button>
//                     <Button variant="secondary" onClick={() => {
//                       if (editingFood) {
//                         setEditingFood(null);
//                       } else {
//                         setShowAddForm(false);
//                       }
//                     }}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Food List */}
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">Foods ({totalFoods})</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>Food Name</th>
//                     <th>Category</th>
//                     <th>Serving Size</th>
//                     <th>Calories</th>
//                     <th>Protein (g)</th>
//                     <th>Carbs (g)</th>
//                     <th>Fat (g)</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {foods?.map(food => (
//                     <tr key={food._id}>
//                       <td>
//                         <div className="d-flex align-items-center gap-2">
//                           {food.image && (
//                             <img 
//                               src={food.image} 
//                               alt={food.name}
//                               style={{
//                                 width: '48px',
//                                 height: '48px',
//                                 objectFit: 'cover',
//                                 borderRadius: '8px',
//                                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                               }}
//                             />
//                           )}
//                           <div>
//                             <strong>{food.name}</strong>
//                             <div className="d-flex gap-1 mt-1 flex-wrap">
//                               {food.isCustom && <Badge bg="info">Custom</Badge>}
//                               {food.isRecipe && (
//                                 <>
//                                   <Badge bg="warning">Recipe</Badge>
//                                   {food.difficulty && (
//                                     <Badge bg="secondary">{food.difficulty}</Badge>
//                                   )}
//                                 </>
//                               )}
//                               {food.mealType && food.mealType.length > 0 && (
//                                 <Badge bg="success" className="text-capitalize">
//                                   {food.mealType[0]}
//                                 </Badge>
//                               )}
//                               {food.tags && food.tags.slice(0, 2)?.map((tag, idx) => (
//                                 <Badge key={idx} bg="light" text="dark" style={{fontSize: '0.7rem'}}>
//                                   {tag}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <Badge bg={getCategoryColor(food.category)}>
//                           {food.category}
//                         </Badge>
//                       </td>
//                       <td>{food.servingSize.amount} {food.servingSize.unit}</td>
//                       <td>{food.nutrition.calories}</td>
//                       <td>{food.nutrition.protein}</td>
//                       <td>{food.nutrition.carbs}</td>
//                       <td>{food.nutrition.fat}</td>
//                       <td>
//                         {food.isCustom && (
//                           <div className="d-flex gap-2">
//                             <Button
//                               variant="outline-primary"
//                               size="sm"
//                               onClick={() => setEditingFood(food)}
//                             >
//                               <FaEdit />
//                             </Button>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => handleDeleteFood(food._id)}
//                             >
//                               <FaTrash />
//                             </Button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               {foods.length === 0 && (
//                 <div className="text-center py-5">
//                   <FaSearch size={48} className="text-muted mb-3" />
//                   <h5>No foods found</h5>
//                   <p className="text-muted">Try adjusting your filters or search term</p>
//                   <Button variant="outline-primary" onClick={clearAllFilters}>
//                     Clear All Filters
//                   </Button>
//                 </div>
//               )}

//               {renderPagination()}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default FoodDatabase;

// new4
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, InputGroup, Spinner, Pagination } from 'react-bootstrap';
import { FaSearch, FaPlus, FaAppleAlt, FaTimes, FaFilter, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../utils/api';

const FoodDatabase = () => {
  const [foods, setFoods] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [mealType, setMealType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFoods, setTotalFoods] = useState(0);
  const itemsPerPage = 10;
  
  const [newFood, setNewFood] = useState({
    name: '',
    category: 'other',
    servingSize: { amount: 100, unit: 'grams' },
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  });

  const [editingFood, setEditingFood] = useState(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  // Debounce search term
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500); // 500ms delay
    
    // Cleanup
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Fetch foods when filters change (including debounced search)
  useEffect(() => {
    fetchFoods();
  }, [currentPage, debouncedSearchTerm, category, mealType, selectedTag]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [tagsRes, categoriesRes, mealTypesRes] = await Promise.all([
        api.get('/foods/tags'),
        api.get('/foods/categories'),
        api.get('/foods/meal-types')
      ]);
      
      setAvailableTags(tagsRes.data);
      setCategories(categoriesRes.data);
      setMealTypes(mealTypesRes.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        ...(category !== 'all' && { category }),
        ...(mealType !== 'all' && { mealType }),
        ...(selectedTag !== 'all' && { tag: selectedTag })
      };
      
      const response = await api.get('/foods', { params });
      const { foods, pagination } = response.data;
      
      setFoods(foods);
      setTotalFoods(pagination.total);
      setTotalPages(pagination.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching foods:', error);
      toast.error('Failed to load foods');
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Don't reset page here - it will be reset by the debounce effect
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/foods', newFood);
      toast.success('Food added to database!');
      setShowAddForm(false);
      setCurrentPage(1);
      setNewFood({
        name: '',
        category: 'other',
        servingSize: { amount: 100, unit: 'grams' },
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
      });
      fetchFoods(); // Refresh the list
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error(error.response?.data?.message || 'Failed to add food');
    }
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/foods/${editingFood._id}`, editingFood);
      toast.success('Food updated successfully!');
      setEditingFood(null);
      fetchFoods(); // Refresh the list
    } catch (error) {
      console.error('Error updating food:', error);
      toast.error(error.response?.data?.message || 'Failed to update food');
    }
  };

  const handleDeleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await api.delete(`/foods/${foodId}`);
        toast.success('Food deleted successfully!');
        fetchFoods(); // Refresh the list
      } catch (error) {
        console.error('Error deleting food:', error);
        toast.error(error.response?.data?.message || 'Failed to delete food');
      }
    }
  };

  const initializeRecipes = async () => {
    if (window.confirm('Initialize recipes from external API? This may take a moment.')) {
      try {
        setLoading(true);
        const response = await api.get('/foods/initialize-recipes?limit=50');
        toast.success(`Added ${response.data.added} new recipes!`);
        fetchFoods(); // Refresh the list
      } catch (error) {
        console.error('Error initializing recipes:', error);
        toast.error(error.response?.data?.message || 'Failed to initialize recipes');
      } finally {
        setLoading(false);
      }
    }
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

  const clearAllFilters = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setCategory('all');
    setMealType('all');
    setSelectedTag('all');
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
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

    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalFoods)} of {totalFoods} foods
        </div>
        <Pagination className="mb-0">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
          {items}
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    );
  };

  if (loading && foods.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading foods...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2><FaAppleAlt className="me-2" />Food Database</h2>
          <p className="text-muted">Browse and search nutrition information for foods and recipes</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setSearchTerm('');
                      setDebouncedSearchTerm('');
                    }}
                  >
                    <FaTimes />
                  </Button>
                )}
              </InputGroup>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted fw-bold">Food Categories</small>
                  {(category !== 'all' || mealType !== 'all' || selectedTag !== 'all' || searchTerm) && (
                    <Button variant="link" size="sm" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <Button
                    variant={category === 'all' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setCategory('all')}
                  >
                    All
                  </Button>
                  {categories?.map(cat => (
                    <Button
                      key={cat}
                      variant={category === cat ? getCategoryColor(cat) : `outline-${getCategoryColor(cat)}`}
                      size="sm"
                      onClick={() => setCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <small className="text-muted fw-bold d-block mb-2">Meal Types</small>
                <div className="d-flex flex-wrap gap-2">
                  <Button
                    variant={mealType === 'all' ? 'info' : 'outline-info'}
                    size="sm"
                    onClick={() => setMealType('all')}
                  >
                    All
                  </Button>
                  {mealTypes?.filter(mt => mt)?.map(mt => (
                    <Button
                      key={mt}
                      variant={mealType === mt ? 'info' : 'outline-info'}
                      size="sm"
                      onClick={() => setMealType(mt)}
                    >
                      {mt?.charAt(0).toUpperCase() + mt?.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <small className="text-muted fw-bold d-block mb-2">
                  <FaFilter className="me-1" />
                  Filter by Tags ({availableTags.length} tags available)
                </small>
                <Form.Select 
                  size="sm" 
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-auto"
                >
                  <option value="all">All Tags</option>
                  {availableTags?.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </Form.Select>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <Button variant="success" className="w-100 mb-2" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? <FaTimes className="me-2" /> : <FaPlus className="me-2" />}
                {showAddForm ? 'Cancel' : 'Add Custom Food'}
              </Button>
              <Button variant="warning" className="w-100" onClick={initializeRecipes}>
                Initialize Recipes
              </Button>
              <p className="text-muted mt-2 mb-0">
                {totalFoods} foods in database
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Food Form */}
      {(showAddForm || editingFood) && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5>{editingFood ? 'Edit Food' : 'Add Custom Food'}</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={editingFood ? handleUpdateFood : handleAddFood}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Food Name *</Form.Label>
                        <Form.Control
                          value={editingFood ? editingFood.name : newFood.name}
                          onChange={(e) => editingFood 
                            ? setEditingFood({...editingFood, name: e.target.value})
                            : setNewFood({...newFood, name: e.target.value})
                          }
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          value={editingFood ? editingFood.category : newFood.category}
                          onChange={(e) => editingFood
                            ? setEditingFood({...editingFood, category: e.target.value})
                            : setNewFood({...newFood, category: e.target.value})
                          }
                        >
                          {categories?.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Serving Size</Form.Label>
                        <Row>
                          <Col>
                            <Form.Control
                              type="number"
                              placeholder="Amount"
                              value={editingFood ? editingFood.servingSize.amount : newFood.servingSize.amount}
                              onChange={(e) => editingFood
                                ? setEditingFood({
                                    ...editingFood,
                                    servingSize: {...editingFood.servingSize, amount: e.target.value}
                                  })
                                : setNewFood({
                                    ...newFood,
                                    servingSize: {...newFood.servingSize, amount: e.target.value}
                                  })
                              }
                            />
                          </Col>
                          <Col>
                            <Form.Select
                              value={editingFood ? editingFood.servingSize.unit : newFood.servingSize.unit}
                              onChange={(e) => editingFood
                                ? setEditingFood({
                                    ...editingFood,
                                    servingSize: {...editingFood.servingSize, unit: e.target.value}
                                  })
                                : setNewFood({
                                    ...newFood,
                                    servingSize: {...newFood.servingSize, unit: e.target.value}
                                  })
                              }
                            >
                              <option value="grams">Grams (g)</option>
                              <option value="ml">Milliliters (ml)</option>
                              <option value="pieces">Pieces</option>
                              <option value="cups">Cups</option>
                              <option value="serving">Serving</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <h6>Nutrition Facts (per serving)</h6>
                      <Form.Group className="mb-3">
                        <Form.Label>Calories</Form.Label>
                        <Form.Control
                          type="number"
                          value={editingFood ? editingFood.nutrition.calories : newFood.nutrition.calories}
                          onChange={(e) => editingFood
                            ? setEditingFood({
                                ...editingFood,
                                nutrition: {...editingFood.nutrition, calories: e.target.value}
                              })
                            : setNewFood({
                                ...newFood,
                                nutrition: {...newFood.nutrition, calories: e.target.value}
                              })
                          }
                        />
                      </Form.Group>

                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Protein (g)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.1"
                              value={editingFood ? editingFood.nutrition.protein : newFood.nutrition.protein}
                              onChange={(e) => editingFood
                                ? setEditingFood({
                                    ...editingFood,
                                    nutrition: {...editingFood.nutrition, protein: e.target.value}
                                  })
                                : setNewFood({
                                    ...newFood,
                                    nutrition: {...newFood.nutrition, protein: e.target.value}
                                  })
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Carbs (g)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.1"
                              value={editingFood ? editingFood.nutrition.carbs : newFood.nutrition.carbs}
                              onChange={(e) => editingFood
                                ? setEditingFood({
                                    ...editingFood,
                                    nutrition: {...editingFood.nutrition, carbs: e.target.value}
                                  })
                                : setNewFood({
                                    ...newFood,
                                    nutrition: {...newFood.nutrition, carbs: e.target.value}
                                  })
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Fat (g)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.1"
                              value={editingFood ? editingFood.nutrition.fat : newFood.nutrition.fat}
                              onChange={(e) => editingFood
                                ? setEditingFood({
                                    ...editingFood,
                                    nutrition: {...editingFood.nutrition, fat: e.target.value}
                                  })
                                : setNewFood({
                                    ...newFood,
                                    nutrition: {...newFood.nutrition, fat: e.target.value}
                                  })
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      {editingFood ? 'Update Food' : 'Save Food'}
                    </Button>
                    <Button variant="secondary" onClick={() => {
                      if (editingFood) {
                        setEditingFood(null);
                      } else {
                        setShowAddForm(false);
                      }
                    }}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Food List */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Foods ({totalFoods})</h5>
            </Card.Header>
            <Card.Body>
              {loading && foods.length > 0 && (
                <div className="text-center py-2">
                  <Spinner animation="border" size="sm" variant="primary" />
                  <span className="ms-2 text-muted">Loading...</span>
                </div>
              )}
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Category</th>
                    <th>Serving Size</th>
                    <th>Calories</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fat (g)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods?.map(food => (
                    <tr key={food._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {food.image && (
                            <img 
                              src={food.image} 
                              alt={food.name}
                              style={{
                                width: '48px',
                                height: '48px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}
                            />
                          )}
                          <div>
                            <strong>{food.name}</strong>
                            <div className="d-flex gap-1 mt-1 flex-wrap">
                              {food.isCustom && <Badge bg="info">Custom</Badge>}
                              {food.isRecipe && (
                                <>
                                  <Badge bg="warning">Recipe</Badge>
                                  {food.difficulty && (
                                    <Badge bg="secondary">{food.difficulty}</Badge>
                                  )}
                                </>
                              )}
                              {food.mealType && food.mealType.length > 0 && (
                                <Badge bg="success" className="text-capitalize">
                                  {food.mealType[0]}
                                </Badge>
                              )}
                              {food.tags && food.tags.slice(0, 2)?.map((tag, idx) => (
                                <Badge key={idx} bg="light" text="dark" style={{fontSize: '0.7rem'}}>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg={getCategoryColor(food.category)}>
                          {food.category}
                        </Badge>
                      </td>
                      <td>{food.servingSize.amount} {food.servingSize.unit}</td>
                      <td>{food.nutrition.calories}</td>
                      <td>{food.nutrition.protein}</td>
                      <td>{food.nutrition.carbs}</td>
                      <td>{food.nutrition.fat}</td>
                      <td>
                        {food.isCustom && (
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setEditingFood(food)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteFood(food._id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {foods.length === 0 && !loading && (
                <div className="text-center py-5">
                  <FaSearch size={48} className="text-muted mb-3" />
                  <h5>No foods found</h5>
                  <p className="text-muted">Try adjusting your filters or search term</p>
                  <Button variant="outline-primary" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}

              {renderPagination()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDatabase;