import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Container, Row, Col, Card, ProgressBar, Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
// Rename recharts Tooltip to avoid conflict
// FIXED: Add missing Recharts imports
import { 
  PieChart, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend as RechartsLegend, 
  ResponsiveContainer, 
  Cell,
  Pie,
  Bar
} from 'recharts';
import { FaFire, FaAppleAlt, FaChartLine, FaCalendarAlt, FaUtensils, FaChartPie, FaPlus, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import api from '../services/api';
// Chart.js imports - FIXED: Rename Tooltip to avoid conflict
import { Bar as ChartBar, Pie as ChartPie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartJSTooltip, // Renamed
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  ChartJSTooltip, // Use renamed
  Legend
);
function Chatbot() {
  const [msg, setMsg] = useState("");
    const [nutritionData, setNutritionData] = useState(null);
      const [foodInput, setFoodInput] = useState('');
      const [processingFood, setProcessingFood] = useState(false);
        const [mealType, setMealType] = useState('breakfast');
  const [chat, setChat] = useState([
    { 
      user: "bot", 
      text: "Hello! I'm NutriBot, your AI nutrition assistant. 🥗\n\nI can help you with:\n• Calorie and nutrient information\n• Meal planning and recipes\n• Dietary advice and restrictions\n• Healthy eating habits\n• Weight management tips\n\nWhat would you like to know today?" 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Checking connection...");
  const [activeTab, setActiveTab] = useState("chat"); // "chat" or "image"
  const [file, setFile] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const chatEndRef = useRef(null);
  const cameraVideoRef = useRef(null);
  const cameraCanvasRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
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


// jan18940pm
const analyzeFood = async () => {
  if (!foodInput.trim()) {
    alert('Please enter food description');
    return;
  }

  setProcessingFood(true);
  try {
    // 1. Fetch from CalorieNinjas
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodInput)}`, 
      {
        headers: {
          'X-Api-Key': 'QoMyRTp5iThrCA1lK5JxQA==9qY9LyZsd0WiNkXu'
        }
      }
    );
    
    const data = await response.json();
    console.log("CalorieNinjas data:", data);
    
    if (!data.items || data.items.length === 0) {
      alert('No food items found. Please try a different description.');
      return;
    }
    
    // 2. Prepare chart data for display
    const chartData = prepareNutritionChartData(data);
    setNutritionData(chartData);
    
    // 3. Calculate total calories
    const totalCalories = data.items.reduce((sum, item) => sum + (item.calories || 0), 0);
    
    // 4. Get user info
    const userdata = localStorage.getItem("user");
    const userObj = userdata ? JSON.parse(userdata) : null;
    const userID = userObj?._id;
    
    if (!userID) {
      alert('User not logged in. Please log in to save analysis.');
      setProcessingFood(false);
      return;
    }
    
    // 5. Save to backend Chat collection
    console.log("📝 Saving text food analysis to database...");
    
    const analysisData = {
      userId: userID,
      foodInput: foodInput,
      items: data.items,
      mealType: mealType,
      date: new Date().toISOString(),
      nutritionData: chartData,
      totalCalories: totalCalories
    };
    
    const saveResponse = await fetch('http://localhost:5000/api/text-analysis/save-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analysisData)
    });
    
    const saveResult = await saveResponse.json();
    
    if (saveResult.success) {
      console.log("✅ Text analysis saved to database:", saveResult.data);
      
      // 6. Update chat interface with the saved analysis
      const chatMessage = {
        user: "bot", 
        text: generateNutritionMessage(data.items, foodInput, totalCalories, mealType),
        source: 'Text Food Analysis',
        isImageAnalysis: false,
        isTextAnalysis: true,
        analysisId: saveResult.data.chatId,
        nutritionData: chartData,
        foodItems: data.items,
        timestamp: new Date().toISOString()
      };
      
      // Add user message (what they searched)
      setChat(prev => [...prev, { 
        user: "user", 
        text: `🔍 Food Analysis: "${foodInput}"`,
        timestamp: new Date().toISOString()
      }]);
      
      // Add bot response with analysis
      setChat(prev => [...prev, chatMessage]);
      
      alert(`✅ Analysis saved! ${data.items.length} food items analyzed with ${totalCalories.toFixed(0)} total calories.`);
    } else {
      console.error("❌ Failed to save analysis:", saveResult.message);
      alert('Analysis completed but failed to save to database. You can still see the results.');
    }
    
    // 7. Clear input
    setFoodInput('');
    
    // 8. Switch to chat tab to show results
    // setActiveTab("chat");
    
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

// Helper function to generate nutrition message
const generateNutritionMessage = (items, foodInput, totalCalories, mealType) => {
  let message = `📊 **Text Food Analysis Results**\n\n`;
  message += `**Food Description:** ${foodInput}\n`;
  message += `**Meal Type:** ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}\n`;
  message += `**Analysis Date:** ${new Date().toLocaleDateString()}\n\n`;
  
  message += `**Detected Food Items:**\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. **${item.name}**\n`;
    message += `   • Calories: ${item.calories?.toFixed(0) || 0} kcal\n`;
    message += `   • Protein: ${item.protein_g?.toFixed(1) || 0}g\n`;
    message += `   • Carbs: ${item.carbohydrates_total_g?.toFixed(1) || 0}g\n`;
    message += `   • Fat: ${item.fat_total_g?.toFixed(1) || 0}g\n`;
    if (item.fiber_g) message += `   • Fiber: ${item.fiber_g.toFixed(1)}g\n`;
    if (item.sugar_g) message += `   • Sugar: ${item.sugar_g.toFixed(1)}g\n`;
    message += `\n`;
  });
  
  message += `**Total Nutrition Summary:**\n`;
  const totalProtein = items.reduce((sum, item) => sum + (item.protein_g || 0), 0);
  const totalCarbs = items.reduce((sum, item) => sum + (item.carbohydrates_total_g || 0), 0);
  const totalFat = items.reduce((sum, item) => sum + (item.fat_total_g || 0), 0);
  
  message += `• **Total Calories:** ${totalCalories.toFixed(0)} kcal\n`;
  message += `• **Total Protein:** ${totalProtein.toFixed(1)}g\n`;
  message += `• **Total Carbs:** ${totalCarbs.toFixed(1)}g\n`;
  message += `• **Total Fat:** ${totalFat.toFixed(1)}g\n`;
  
  message += `\n**Macronutrient Distribution:**\n`;
  const proteinCal = totalProtein * 4;
  const carbsCal = totalCarbs * 4;
  const fatCal = totalFat * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;
  
  if (totalMacroCal > 0) {
    message += `• Protein: ${((proteinCal / totalMacroCal) * 100).toFixed(1)}%\n`;
    message += `• Carbs: ${((carbsCal / totalMacroCal) * 100).toFixed(1)}%\n`;
    message += `• Fat: ${((fatCal / totalMacroCal) * 100).toFixed(1)}%\n`;
  }
  
  message += `\n✅ Analysis saved to your chat history!`;
  
  return message;
};
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Test connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await fetch("/api/chat/health");
        if (res.ok) {
          const data = await res.json();
          setConnectionStatus(`Connected (${data.ai || 'AI Assistant'}) ✓`);
        } else {
          setConnectionStatus("Connection issue");
        }
      } catch (error) {
        setConnectionStatus("Not connected");
        console.log("Connection test failed, backend may be starting...");
      }
    };
    testConnection();
  }, []);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const sendMessage = async () => {
    if (!msg.trim() || loading) return;
    
    const userMessage = msg.trim();
    setChat(prev => [...prev, { user: "user", text: userMessage }]);
    setMsg("");
    setLoading(true);
    const userdata = localStorage.getItem("user");
    const userObj = userdata ? JSON.parse(userdata) : null;
    const userID = userObj?._id;
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ message: userMessage, userid: userID }),
      });

      const data = await res.json();
      
      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      let cleanReply = data.reply || "I apologize, but I couldn't generate a response.";
      cleanReply = cleanReply
        .replace(/<[^>]*>/g, '')
        .replace(/\\n/g, '\n');
      
      setChat(prev => [...prev, { 
        user: "bot", 
        text: cleanReply,
        source: data.aiSource || 'AI',
        timestamp: new Date().toISOString()
      }]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      let errorMessage = "⚠️ I'm having trouble connecting to the AI service. ";
      errorMessage += "\n\nIn the meantime, here are some nutrition tips:\n";
      errorMessage += "• Drink 8-10 glasses of water daily\n";
      errorMessage += "• Include protein in every meal\n";
      errorMessage += "• Eat a variety of colorful vegetables\n";
      errorMessage += "• Choose whole grains over refined grains\n";
      errorMessage += "• Practice mindful eating\n\n";
      errorMessage += "Try asking again in a moment!";
      
      setChat(prev => [...prev, { 
        user: "bot", 
        text: errorMessage,
        error: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
      
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageData(reader.result);
      };
      reader.readAsDataURL(selectedFile);
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
  // Start camera

// Update startCamera function
const startCamera = async () => {
  try {
    setCameraError(null);
    setShowCamera(true);
    
    // Add a small delay to ensure modal is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access is not supported in this browser.");
      return;
    }
    
    // Clear any existing stream
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    
    // Reset video ref if needed
    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }
    
    // Try with specific constraints
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' }, // Prefer rear camera
        width: { ideal: 1280, min: 640 },
        height: { ideal: 720, min: 480 },
        frameRate: { ideal: 30, min: 15 }
      },
      audio: false
    };
    
    console.log("Requesting camera with constraints:", constraints);
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setCameraStream(stream);
    
    // Wait for video element to be available
    if (cameraVideoRef.current) {
      const video = cameraVideoRef.current;
      video.srcObject = stream;
      
      // Set up event listeners for video
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          video.play().then(() => {
            console.log("Video playing, dimensions:", video.videoWidth, "x", video.videoHeight);
            resolve();
          }).catch(err => {
            console.error("Error playing video:", err);
            setCameraError("Failed to start camera preview. Please try again.");
            resolve();
          });
        };
        
        video.onerror = (err) => {
          console.error("Video error:", err);
          setCameraError("Camera error occurred. Please try again.");
          resolve();
        };
        
        // Timeout in case video doesn't load
        setTimeout(() => {
          if (video.videoWidth === 0) {
            console.warn("Video loading timeout, trying to play anyway");
            video.play().catch(e => console.error("Play after timeout failed:", e));
          }
          resolve();
        }, 3000);
      });
    }
    
  } catch (error) {
    console.error("Error accessing camera:", error);
    
    // Try with simpler constraints
    try {
      console.log("Trying simpler constraints...");
      const simpleConstraints = { 
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(simpleConstraints);
      setCameraStream(stream);
      
      if (cameraVideoRef.current) {
        const video = cameraVideoRef.current;
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
          video.play().catch(e => console.error("Simple constraint play error:", e));
        };
      }
      
    } catch (fallbackError) {
      console.error("All camera access failed:", fallbackError);
      let errorMsg = "Camera access failed. ";
      
      if (fallbackError.name === 'NotFoundError') {
        errorMsg += "No camera found on this device.";
      } else if (fallbackError.name === 'NotAllowedError') {
        errorMsg += "Camera permission denied. Please allow camera access in browser settings.";
      } else if (fallbackError.name === 'NotReadableError') {
        errorMsg += "Camera is already in use by another application.";
      } else {
        errorMsg += `Error: ${fallbackError.message}`;
      }
      
      setCameraError(errorMsg);
      setShowCamera(false);
    }
  }
};
  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };


// Updated capturePhoto function with better timing
const capturePhoto = async () => {
  // Get the video element from ref
  const video = cameraVideoRef.current;
  const canvas = cameraCanvasRef.current;
  
  if (!video || !canvas) {
    console.error("Camera elements not found");
    alert("Camera is not ready. Please wait a moment.");
    return;
  }
  
  // Check if video is actually playing and has dimensions
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    console.error("Video not ready - no dimensions");
    alert("Camera is still initializing. Please wait a moment.");
    return;
  }
  
  console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight);
  
  // Pause briefly to capture a stable frame
  video.pause();
  
  // Set canvas dimensions to match video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  const context = canvas.getContext('2d');
  
  // Determine if we should flip the image (for front camera)
  let flipHorizontal = false;
  if (cameraStream) {
    const tracks = cameraStream.getVideoTracks();
    if (tracks.length > 0) {
      const settings = tracks[0].getSettings();
      flipHorizontal = settings.facingMode === 'user';
    }
  }
  
  // Draw the current video frame to canvas
  if (flipHorizontal) {
    // Flip horizontally for front camera
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Restore context if flipped
  if (flipHorizontal) {
    context.setTransform(1, 0, 0, 1, 0, 0);
  }
  
  // Resume video
  video.play();
  
  // Convert canvas to data URL (base64)
  const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
  
  // Convert data URL to Blob
  const response = await fetch(imageDataUrl);
  const blob = await response.blob();
  
  if (!blob || blob.size === 0) {
    console.error("Failed to create image blob");
    alert("Failed to capture photo. Please try again.");
    return;
  }
  
  console.log("Photo captured, size:", blob.size, "bytes");
  
  // Create file from blob
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = new File([blob], `food_photo_${timestamp}.jpg`, {
    type: 'image/jpeg',
    lastModified: Date.now()
  });
  
  // Set the file
  setFile(file);
  
  // Create preview
  setImagePreview(imageDataUrl);
  setUploadedImageData(imageDataUrl);
  
  // Stop camera
  stopCamera();
  
  // Switch to image tab
  setActiveTab("image");
  
  // Add user message
  setChat(prev => [...prev, { 
    user: "user", 
    text: "📸 Captured photo from camera",
    timestamp: new Date().toISOString()
  }]);
  
  console.log("✅ Photo captured successfully!");
  
  // Show success message
  setTimeout(() => {
    alert("✅ Photo captured! Switch to Image Analysis tab to see it.");
  }, 300);
};
  const [foodname, setfoodname] = useState();

//   const handleUpload = async () => {
//     if (!file) return alert('Please select an image');
    
//     setUploadLoading(true);

//     try {
//       // ========== STEP 1: FIRST UPLOAD IMAGE FOR STORAGE ==========
//       console.log('📸 Step 1: Uploading image for storage...');
//       const storageFormData = new FormData();
//       storageFormData.append('image', file);
      
//       const storageRes = await axios.post('http://localhost:5000/api/upload/analyze', storageFormData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000
//       });
      
//       console.log('✅ Image storage response:', storageRes.data);
      
//       if (!storageRes.data.success) {
//         throw new Error(storageRes.data.error || 'Failed to save image');
//       }
      
//       const fileInfo = storageRes.data.fileInfo;
//       console.log('📁 Image saved at:', fileInfo.path);
      
//       // ========== STEP 2: ANALYZE WITH LOGMEAL ==========
//       console.log('🔍 Step 2: Analyzing image with LogMeal API...');
//       const analyzeFormData = new FormData();
//       analyzeFormData.append('image', file);
      
//       const analyzeRes = await axios.post('http://localhost:5000/api/upload', analyzeFormData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 30000
//       });
      
//       console.log('✅ Analysis response:', analyzeRes.data);
      
//       if (!analyzeRes.data.success) {
//         throw new Error(analyzeRes.data.error || 'Failed to analyze image');
//       }
      
//       const nutritionData = analyzeRes.data.nutrition;
//       setNutrition(nutritionData);
      
//       // Get food names and other data
//       const foodNames = analyzeRes.data.rawData?.nutrition?.foodName || [];
//       setfoodname(analyzeRes.data.rawData?.nutrition?.foodName)
//       const detectedItems = nutritionData.detectedItems || [];
//       const summary = nutritionData.nutritionSummary || {};
      
//       // ========== STEP 3: CREATE NUTRITION MESSAGE ==========
//       let nutritionMessage = `📸 **Food Image Analysis Results**\n\n`;
      
//       if (foodNames && foodNames.length > 0) {
//         nutritionMessage += `**Detected Foods:**\n`;
//         foodNames.forEach((food, index) => {
//           if (food && food.trim() !== "" && food !== "water") {
//             const item = detectedItems[index];
//             const foodName = food.charAt(0).toUpperCase() + food.slice(1);
//             nutritionMessage += `• **${foodName}**`;
//             if (item?.servingSize) nutritionMessage += ` (${item.servingSize})`;
//             if (item?.nutrition?.calories) nutritionMessage += ` - ${item.nutrition.calories.toFixed(1)} kcal`;
//             nutritionMessage += '\n';
//           }
//         });
//       }
      
//       nutritionMessage += `\n**Total Nutrition Summary:**\n`;
//       nutritionMessage += `• **Calories:** ${summary.calories?.toFixed(1) || 'N/A'} kcal\n`;
//       nutritionMessage += `• **Protein:** ${summary.protein?.value?.toFixed(1) || 'N/A'}g\n`;
//       nutritionMessage += `• **Carbs:** ${summary.carbs?.value?.toFixed(1) || 'N/A'}g\n`;
//       nutritionMessage += `• **Fat:** ${summary.fat?.value?.toFixed(1) || 'N/A'}g\n`;
//       nutritionMessage += `• **Fiber:** ${summary.fiber?.value?.toFixed(1) || 'N/A'}g\n`;
//       nutritionMessage += `• **Sugar:** ${summary.sugar?.value?.toFixed(1) || 'N/A'}g\n`;
      
//       if (nutritionData.overallNutriScore) {
//         nutritionMessage += `\n**Overall NutriScore:** ${nutritionData.overallNutriScore.category || 'N/A'} (Score: ${nutritionData.overallNutriScore.standardized || 'N/A'})`;
//       }
      
//       // ========== STEP 4: UPDATE FRONTEND CHAT ==========
//       // Add user message (upload action)
//       setChat(prev => [...prev, { 
//         user: "user", 
//         text: file.name.includes('camera_') ? '📸 Captured photo from camera' : `📸 Uploaded image: ${file.name}`,
//         timestamp: new Date().toISOString()
//       }]);
      
//       // Create the SERVER image URL
//       const serverImageUrl = `http://localhost:5000${fileInfo.url}`;
      
//       // Add bot response with analysis
//     // In your analyzeFood function, update the chat message creation:
// const chatMessage = {
//   user: "bot", 
//   text: generateNutritionMessage(data?.items, foodInput, totalCalories, mealType),
//   source: 'Text Food Analysis',
//   isImageAnalysis: false,
//   isTextAnalysis: true,
//   role: 'text_analysis', // Add this line
//   analysisId: saveResult.data.chatId,
//   nutritionData: chartData,
//   foodItems: data.items,
//   timestamp: new Date().toISOString()
// };
      
//       setChat(prev => [...prev, chatMessage]);
      
//       // ========== STEP 5: SAVE TO BACKEND DATABASE ==========
//       try {
//         const userdata = localStorage.getItem("user");
//         const userObj = userdata ? JSON.parse(userdata) : null;
//         const userIDD = userObj?._id;
        
//         await axios.post('http://localhost:5000/api/chat/image-analysis', {
//           userId: userIDD,
//           message: nutritionMessage,
//           imageData: uploadedImageData, // Optional: base64 for backup
//           imagePreview: serverImageUrl, // Use SERVER URL
//           nutritionData: nutritionData,
//           foodNames: foodNames,
//           detectedItems: detectedItems,
//           nutritionSummary: summary,
//           filePath: fileInfo.path, // This is the important part
//           fileName: fileInfo.filename,
//           originalFileName: fileInfo.originalName,
//           imageUrl: fileInfo.url // For easy access
//         }, {
//           headers: { 'Content-Type': 'application/json' }
//         });
        
//         console.log('✅ Image analysis saved to backend database');
//         console.log('📁 File path stored:', fileInfo.path);
//         console.log('🌐 Image URL:', serverImageUrl);
        
//       } catch (backendError) {
//         console.error('❌ Failed to save to backend:', backendError.message);
//         console.error('Backend error details:', backendError.response?.data);
//         // Continue even if backend save fails
//         alert('Analysis complete but failed to save to history. The image was still analyzed.');
//       }
      
//       // ========== STEP 6: CLEAN UP ==========
//       // Clear file and preview
//       setFile(null);
//       setImagePreview(null);
//       setUploadedImageData(null);
//       document.querySelector('input[type="file"]').value = '';
      
//       // Switch back to chat tab
//       setActiveTab("chat");
      
//       console.log('🎉 Image analysis workflow completed successfully!');
      
//     } catch (err) {
//       console.error('❌ Upload/analysis error:', err);
//       console.error('Error details:', err.response?.data || err.message);
      
//       let errorMessage = '❌ Failed to process image. ';
//       if (err.response?.data?.help) {
//         errorMessage += err.response.data.help;
//       } else {
//         errorMessage += 'Please try again.';
//       }
      
//       alert(errorMessage);
//     } finally {
//       setUploadLoading(false);
//     }
//   };
const handleUpload = async () => {
  if (!file) return alert('Please select an image');
  
  setUploadLoading(true);

  try {
    // ========== STEP 1: FIRST UPLOAD IMAGE FOR STORAGE ==========
    console.log('📸 Step 1: Uploading image for storage...');
    const storageFormData = new FormData();
    storageFormData.append('image', file);
    
    const storageRes = await axios.post('http://localhost:5000/api/upload/analyze', storageFormData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000
    });
    
    console.log('✅ Image storage response:', storageRes.data);
    
    if (!storageRes.data.success) {
      throw new Error(storageRes.data.error || 'Failed to save image');
    }
    
    const fileInfo = storageRes.data.fileInfo;
    console.log('📁 Image saved at:', fileInfo.path);
    
    // ========== STEP 2: ANALYZE WITH LOGMEAL ==========
    console.log('🔍 Step 2: Analyzing image with LogMeal API...');
    const analyzeFormData = new FormData();
    analyzeFormData.append('image', file);
    
    const analyzeRes = await axios.post('http://localhost:5000/api/upload', analyzeFormData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000
    });
    
    console.log('✅ Analysis response:', analyzeRes.data);
    
    if (!analyzeRes.data.success) {
      throw new Error(analyzeRes.data.error || 'Failed to analyze image');
    }
    
    const nutritionData = analyzeRes.data.nutrition;
    setNutrition(nutritionData);
    
    // Get food names and other data
    const foodNames = analyzeRes.data.rawData?.nutrition?.foodName || [];
    setfoodname(foodNames[0]); // FIXED: Pass string instead of array
    const detectedItems = nutritionData.detectedItems || [];
    const summary = nutritionData.nutritionSummary || {};
    
    // ========== STEP 3: CREATE NUTRITION MESSAGE ==========
    let nutritionMessage = `📸 **Food Image Analysis Results**\n\n`;
    
    if (foodNames && foodNames.length > 0) {
      nutritionMessage += `**Detected Foods:**\n`;
      foodNames.forEach((food, index) => {
        if (food && food.trim() !== "" && food !== "water") {
          const item = detectedItems[index];
          const foodName = food.charAt(0).toUpperCase() + food.slice(1);
          nutritionMessage += `• **${foodName}**`;
          if (item?.servingSize) nutritionMessage += ` (${item.servingSize})`;
          if (item?.nutrition?.calories) nutritionMessage += ` - ${item.nutrition.calories.toFixed(1)} kcal`;
          nutritionMessage += '\n';
        }
      });
    }
    
    nutritionMessage += `\n**Total Nutrition Summary:**\n`;
    nutritionMessage += `• **Calories:** ${summary.calories?.toFixed(1) || 'N/A'} kcal\n`;
    nutritionMessage += `• **Protein:** ${summary.protein?.value?.toFixed(1) || 'N/A'}g\n`;
    nutritionMessage += `• **Carbs:** ${summary.carbs?.value?.toFixed(1) || 'N/A'}g\n`;
    nutritionMessage += `• **Fat:** ${summary.fat?.value?.toFixed(1) || 'N/A'}g\n`;
    nutritionMessage += `• **Fiber:** ${summary.fiber?.value?.toFixed(1) || 'N/A'}g\n`;
    nutritionMessage += `• **Sugar:** ${summary.sugar?.value?.toFixed(1) || 'N/A'}g\n`;
    
    if (nutritionData.overallNutriScore) {
      nutritionMessage += `\n**Overall NutriScore:** ${nutritionData.overallNutriScore.category || 'N/A'} (Score: ${nutritionData.overallNutriScore.standardized || 'N/A'})`;
    }
    
    // ========== STEP 4: UPDATE FRONTEND CHAT ==========
    // Add user message (upload action)
    setChat(prev => [...prev, { 
      user: "user", 
      text: file.name.includes('camera_') ? '📸 Captured photo from camera' : `📸 Uploaded image: ${file.name}`,
      timestamp: new Date().toISOString()
    }]);
    
    // Create the SERVER image URL
    const serverImageUrl = `http://localhost:5000${fileInfo.url}`;
    
    // Create the chat message object for the bot
    const chatMessage = {
      user: "bot", 
      text: nutritionMessage,
      source: 'Image Analysis AI',
      isImageAnalysis: true,
      isTextAnalysis: false,
      role: 'image_analysis',
      imagePreview: serverImageUrl,
      imageData: uploadedImageData, // base64 for fallback
      nutritionData: nutritionData,
      foodNames: foodNames,
      detectedItems: detectedItems,
      nutritionSummary: summary,
      filePath: fileInfo.path,
      fileName: fileInfo.filename,
      originalFileName: fileInfo.originalName,
      imageUrl: fileInfo.url,
      timestamp: new Date().toISOString()
    };
    
    // Add bot response with analysis
    setChat(prev => [...prev, chatMessage]);
    
    // ========== STEP 5: SAVE TO BACKEND DATABASE ==========
    console.log("📝 Saving image analysis to database...");
    
    const userdata = localStorage.getItem("user");
    const userObj = userdata ? JSON.parse(userdata) : null;
    const userIDD = userObj?._id;
    
    if (!userIDD) {
      alert('User not logged in. Please log in to save analysis.');
      setUploadLoading(false);
      return;
    }
    
    // Save to backend Chat collection
    const saveResponse = await fetch('http://localhost:5000/api/chat/image-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userIDD,
        message: nutritionMessage,
        imageData: uploadedImageData,
        imagePreview: serverImageUrl,
        nutritionData: nutritionData,
        foodNames: foodNames,
        detectedItems: detectedItems,
        nutritionSummary: summary,
        filePath: fileInfo.path,
        fileName: fileInfo.filename,
        originalFileName: fileInfo.originalName,
        imageUrl: fileInfo.url,
        role: 'image_analysis',
        timestamp: new Date().toISOString()
      })
    });
    
    const saveResult = await saveResponse.json();
    
    if (saveResult.success) {
      console.log("✅ Image analysis saved to database:", saveResult.data);
      
      // Update the chat message with the saved ID
      const updatedChatMessage = {
        ...chatMessage,
        analysisId: saveResult.data.chatId
      };
      
      // Update the last message in chat with the ID
      setChat(prev => {
        const newChat = [...prev];
        newChat[newChat.length - 1] = updatedChatMessage;
        return newChat;
      });
      
      alert(`✅ Image analysis saved to your history!`);
    } else {
      console.error("❌ Failed to save image analysis:", saveResult.message);
      alert('Analysis completed but failed to save to database. You can still see the results.');
    }
    
    // ========== STEP 6: CLEAN UP ==========
    // Clear file and preview
    setFile(null);
    setImagePreview(null);
    setUploadedImageData(null);
    
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    
    // Switch back to chat tab to show results
    setActiveTab("chat");
    
    console.log('🎉 Image analysis workflow completed successfully!');
    
  } catch (err) {
    console.error('❌ Upload/analysis error:', err);
    
    let errorMessage = '❌ Failed to process image. ';
    if (err.response?.data?.help) {
      errorMessage += err.response.data.help;
    } else if (err.response?.data?.message) {
      errorMessage += err.response.data.message;
    } else {
      errorMessage += 'Please try again.';
    }
    
    // alert(errorMessage);
  } finally {
    setUploadLoading(false);
  }
};
  const prepareChartData = () => {
    if (!nutrition) return null;
    
    const summary = nutrition.nutritionSummary;
    if (!summary) return null;
    
    // Get food names from rawData (FIXED)
    const foodNames = nutrition.rawData?.nutrition?.foodName || [];
    
    // Macronutrients pie chart data
    const macroData = [
      { name: 'Protein', value: summary.protein?.value || 0, color: '#4CAF50' },
      { name: 'Carbs', value: summary.carbs?.value || 0, color: '#FF9800' },
      { name: 'Fat', value: summary.fat?.value || 0, color: '#F44336' }
    ];
    
    // Daily intake bar chart data
    const dailyIntakeData = nutrition.dailyIntake ? Object.entries(nutrition.dailyIntake).map(([key, value]) => ({
      name: value.label,
      value: value.percent,
      level: value.level
    })).filter(item => item.name !== 'Added sugars') : [];
    
    // Individual food items data - FIXED: Use foodNames from rawData
    const foodItemsData = nutrition.detectedItems?.map((item, index) => {
      // Get food name from rawData, fallback to dish name or generic name
      const foodName = foodNames[index] || 
                      item.dish || 
                      `Food Item ${index + 1}`;
      
      return {
        name: foodName.charAt(0).toUpperCase() + foodName.slice(1),
        calories: item.nutrition?.calories || 0,
        servingSize: item.servingSize || 'N/A',
        nutriScore: item.nutriScore?.category || 'N/A'
      };
    }) || [];
    
    // Detailed nutrients data
    const detailedNutrients = nutrition.rawData?.nutrition?.nutritional_info?.totalNutrients;
    const nutrientData = detailedNutrients ? Object.entries(detailedNutrients)
      .filter(([key, value]) => {
        const includeKeys = ['CA', 'FE', 'K', 'MG', 'VITC', 'VITD', 'VITB12'];
        return includeKeys.includes(key) && value.quantity > 0;
      })
      .map(([key, value]) => ({
        name: value.label,
        value: value.quantity,
        unit: value.unit
      })) : [];
    
    return {
      macroData,
      dailyIntakeData,
      foodItemsData,
      nutrientData,
      foodNames // Include for debugging
    };
  };

  const chartData = prepareChartData();

  const quickQuestions = [
    "How many calories in an apple?",
    "What's a healthy breakfast?",
    "How to read nutrition labels?",
    "Best protein sources for vegetarians?",
    "Meal prep for weight loss"
  ];

  // Format message text with image preview support
  const formatMessageText = (message) => {
    if (!message) return null;
    
    // If it's an image analysis message
    if (message.isImageAnalysis) {
      return (
        <div className="image-analysis-message">
          {/* Try server URL first, then fallback to base64 */}
          {message.imagePreview ? (
            <img 
              src={message.imagePreview} 
              alt="Analyzed Food" 
              className="chat-image-preview"
              onError={(e) => {
                console.log('Server image failed, trying base64...');
                // Fallback to base64 if server image fails
                if (message.imageData) {
                  e.target.src = message.imageData;
                }
              }}
            />
          ) : message.imageData ? (
            <img 
              src={message.imageData} 
              alt="Analyzed Food" 
              className="chat-image-preview"
            />
          ) : null}
          
          <div className="analysis-text">
            {formatMessageTextContent(message.text)}
            {message.filePath && (
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                marginTop: '10px',
                fontStyle: 'italic'
              }}>
                📁 Image saved: {message.filePath}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return formatMessageTextContent(message.text);
  };

  const formatMessageTextContent = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, idx) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.match(/^[•\-*]\s/) || trimmedLine.match(/^\d+\.\s/)) {
        return (
          <div key={idx} className="bullet-point">
            <span className="bullet-icon">
              {trimmedLine.match(/^\d+\.\s/) ? trimmedLine.match(/^\d+/)[0] + '.' : '•'}
            </span>
            <span>{formatInlineMarkdown(trimmedLine.replace(/^[•\-*]\s|^\d+\.\s/, ''))}</span>
          </div>
        );
      }
      
      if (trimmedLine.endsWith(':')) {
        return (
          <div key={idx} className="message-header">
            <strong>{formatInlineMarkdown(trimmedLine)}</strong>
          </div>
        );
      }
      
      return (
        <div key={idx} className="message-line">
          {formatInlineMarkdown(line)}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const parts = [];
    let remaining = text;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.substring(lastIndex, match.index));
      }
      parts.push(<strong key={parts.length}>{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    
    if (lastIndex < remaining.length) {
      parts.push(remaining.substring(lastIndex));
    }
    
    if (parts.length === 0) {
      return text;
    }
    
    return parts;
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="header-content">
          <h3>🥗 NutriBot - AI Nutrition Assistant</h3>
          <div className="connection-status">
            <span className={`status-dot ${connectionStatus.includes("✓") ? "connected" : "disconnected"}`}></span>
            {connectionStatus}
          </div>
        </div>
        <p>Ask me anything about food, nutrition, or healthy living!</p>
      </div>
      
      {/* Camera Modal */}
   
      {/* jan18839pm */}
{showCamera && (
  <div className="camera-modal">
    <div className="camera-modal-content">
      <div className="camera-header">
        <h4>📸 Take Food Photo</h4>
        <button onClick={stopCamera} className="close-camera-btn">✕</button>
      </div>
      
      <div className="camera-preview">
        <video 
          ref={cameraVideoRef}
          autoPlay
          playsInline
          muted
          className="camera-video"
        />
        <canvas ref={cameraCanvasRef} style={{ display: 'none' }} />
        
        {/* Only show loading when there's no error AND video hasn't loaded yet */}
        {!cameraError && cameraStream && cameraVideoRef.current && cameraVideoRef.current.videoWidth === 0 && (
          <div className="camera-loading">
            <div className="loading-spinner"></div>
            <div>Camera warming up...</div>
          </div>
        )}
        
        {/* Show initial loading before stream starts */}
        {!cameraError && !cameraStream && (
          <div className="camera-loading">
            <div className="loading-spinner"></div>
            <div>Starting camera...</div>
          </div>
        )}
        
        {cameraError && (
          <div className="camera-error">
            <div className="error-icon">⚠️</div>
            <div className="error-message">{cameraError}</div>
            <div className="error-actions">
              <button onClick={startCamera} className="retry-btn">
                Retry Camera
              </button>
              <button onClick={stopCamera} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Flash effect for capture */}
        <div className="camera-flash" style={{ display: 'none' }} />
      </div>
      
      <div className="camera-controls">
        <button 
          onClick={capturePhoto} 
          className="capture-btn"
          disabled={!cameraStream || !cameraVideoRef.current || cameraVideoRef.current.videoWidth === 0}
        >
          📸 Capture Photo
        </button>
        <button onClick={stopCamera} className="cancel-btn">
          Cancel
        </button>
      </div>
      
      <div className="camera-tips">
        <p>💡 Tips for better food recognition:</p>
        <ul>
          <li>Wait for camera preview to appear</li>
          <li>Ensure good lighting</li>
          <li>Hold camera steady</li>
          <li>Center the food in frame</li>
          <li>Tap "Capture Photo" when ready</li>
        </ul>
      </div>
      
      {cameraStream && cameraVideoRef.current && cameraVideoRef.current.videoWidth > 0 && (
        <div className="camera-status">
          <small>
            ✅ Camera ready
          </small>
        </div>
      )}
    </div>
  </div>
)}
      {/* Tab Navigation */}
      <div className="chat-tabs">
        <button 
          className={`tab-btn ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          💬 General Chat
        </button>
        <button 
          className={`tab-btn ${activeTab === "image" ? "active" : ""}`}
          onClick={() => setActiveTab("image")}
        >
          📸 Food Image Analysis AI
        </button>
          <button 
          className={`tab-btn ${activeTab === "foodanalyze" ? "active" : ""}`}
          onClick={() => setActiveTab("foodanalyze")}
        >
         &#127843; Text Food Analysis AI
        </button>
      </div>
      
      {/* Chat Tab Content */}
      {activeTab === "chat" ? (
        <>
          <div className="chat-messages">
            {chat.map((c, i) => (
              <div 
                key={i} 
                className={`message ${c.user === "user" ? "user-message" : "bot-message"} ${c.error ? 'error-message' : ''} ${c.isImageAnalysis ? 'image-analysis-message-wrapper' : ''}`}
              >
                <div className="message-content">
                  <div className="message-sender">
                    {c.user === "user" ? "You" : "NutriBot"}
                    {c.source && c.user === "bot" && !c.error && (
                      <span className="message-source"> ({c.source})</span>
                    )}
                    {c.timestamp && (
                      <span className="message-time">
                        {new Date(c.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    )}
                  </div>
                  <div className="message-text">
                    {formatMessageText(c)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="message-sender">NutriBot</div>
                  <div className="message-text typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="quick-questions">
            <p className="quick-title">Quick questions:</p>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMsg(question);
                    setTimeout(() => {
                      sendMessage();
                    }, 10);
                  }}
                  disabled={loading}
                  className="quick-btn"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          <div className="chat-input">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your nutrition question here..."
              disabled={loading}
              rows="2"
            />
            <div className="chat-input-buttons">
              <button 
                onClick={sendMessage} 
                disabled={loading || !msg.trim()}
                className="send-btn"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span style={{ marginLeft: '8px' }}>Thinking...</span>
                  </>
                ) : (
                  'Send'
                )}
              </button>
              
            </div>
          </div>
        </>
      ) : (
        ""
      
      )}

      {activeTab === "image" ?
      (
        <>
       
        <div className="image-upload-section">
          <div className="upload-instructions">
            <h4>📸 Food Image Analysis AI</h4>
            <p>Upload a photo of your food to get instant nutrition information!</p>
            <div className="upload-options">
              <button onClick={startCamera} className="camera-option-btn">
                <span>📷</span>
                <span>Take Photo</span>
              </button>
              <label htmlFor="file-upload" className="upload-option-btn">
                <span>📁</span>
                <span>Choose File</span>
              </label>
            </div>
          </div>
          
          <div className="upload-area">
            <input 
              type="file" 
              id="file-upload"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input"
            />
            <label htmlFor="file-upload" className="upload-label">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <span className="change-text">Click to change image</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <strong>Click to select or capture a food image</strong>
                    <small>JPG,JPEG • Max 5MB</small>
                  </div>
                </div>
              )}
            </label>
            
            {file && (
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            )}
          </div>
          
          <div className="upload-actions">
            <button 
              onClick={handleUpload}
              disabled={!file || uploadLoading}
              className="analyze-btn"
            >
              {uploadLoading ? (
                <>
                  <div className="spinner-small"></div>
                  Analyzing...
                </>
              ) : (
                '🔍 Analyze Nutrition'
              )}
            </button>
            
            {file && (
              <button 
                onClick={() => {
                  setFile(null);
                  setImagePreview(null);
                  setUploadedImageData(null);
                  document.querySelector('input[type="file"]').value = '';
                }}
                className="clear-btn"
              >
                Clear
              </button>
            )}
          </div>
          
          {nutrition && (
            <div className="nutrition-results">
              {/* Food Items Detected */}
              <div className="nutrition-section">
                <h5>🍽️ Detected Food Items</h5>
                <div className="food-items-grid">
                  {foodname && (
                    <div className="food-item-card">
                      <div className="food-item-name">
                        {foodname?.charAt(0).toUpperCase() + foodname.slice(1)}
                      </div>
                      {nutrition?.detectedItems?.[0]?.servingSize && (
                        <div className="food-item-details">
                          <div className="food-item-serving">
                            Serving: {nutrition.detectedItems[0].servingSize}
                          </div>
                          {nutrition.detectedItems[0]?.nutrition?.calories && (
                            <div className="food-item-calories">
                              Calories: {nutrition.detectedItems[0].nutrition.calories.toFixed(1)} kcal
                            </div>
                          )}
                          {nutrition.detectedItems[0]?.nutriScore?.category && (
                            <div className="food-item-score">
                              NutriScore: <span className={`score-${nutrition.detectedItems[0].nutriScore.category}`}>
                                {nutrition.detectedItems[0].nutriScore.category}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Total Nutrition Summary */}
              <div className="nutrition-section">
                <h5>📊 Total Nutrition Summary</h5>
                <div className="summary-grid">
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.calories?.toFixed(0) || '0'}</div>
                    <div className="summary-label">Calories (kcal)</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.protein?.value?.toFixed(1) || '0'}</div>
                    <div className="summary-label">Protein (g)</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.carbs?.value?.toFixed(1) || '0'}</div>
                    <div className="summary-label">Carbs (g)</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.fat?.value?.toFixed(1) || '0'}</div>
                    <div className="summary-label">Fat (g)</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.fiber?.value?.toFixed(1) || '0'}</div>
                    <div className="summary-label">Fiber (g)</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-value">{nutrition.nutritionSummary?.sugar?.value?.toFixed(1) || '0'}</div>
                    <div className="summary-label">Sugar (g)</div>
                  </div>
                </div>
              </div>
              
              {/* Overall NutriScore */}
              {nutrition.overallNutriScore && (
                <div className="nutrition-section">
                  <h5>🏆 Overall NutriScore</h5>
                  <div className="nutriscore-display">
                    <div className={`nutriscore-circle score-${nutrition.overallNutriScore.category}`}>
                      {nutrition.overallNutriScore.category}
                    </div>
                    <div className="nutriscore-info">
                      <div className="nutriscore-label">Quality Rating</div>
                      <div className="nutriscore-value">Score: {nutrition.overallNutriScore.standardized}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Charts Section */}
              {chartData && (
                <div className="charts-section">
                  <h5>📈 Nutritional Charts</h5>
                  
                  {/* Macronutrients Pie Chart */}
                  <div className="chart-container">
                    <h6>Macronutrient Distribution</h6>
                    <div className="chart-wrapper">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData.macroData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.macroData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          {/* <Tooltip formatter={(value) => [`${value}g`, 'Amount']} /> */}
                            <RechartsTooltip formatter={(value) => [`${value}g`, 'Amount']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Daily Intake Bar Chart */}
                  {chartData.dailyIntakeData.length > 0 && (
                    <div className="chart-container">
                      <h6>Daily Intake Percentage</h6>
                      <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData.dailyIntakeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: '% of Daily Value', angle: -90, position: 'insideLeft' }} />
                            {/* <Tooltip formatter={(value) => [`${value}%`, 'Daily Value']} /> */}
                             <RechartsTooltip formatter={(value) => [`${value}%`, 'Daily Value']} />
                            <Legend />
                            <Bar dataKey="value" fill="#4CAF50" name="Daily Value %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                  
                  {/* Food Items Calories Bar Chart */}
                  {chartData.foodItemsData.length > 0 && (
                    <div className="chart-container">
                      <h6>Calories per Food Item</h6>
                      <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData.foodItemsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Calories', angle: -90, position: 'insideLeft' }} />
                            {/* <Tooltip formatter={(value) => [`${value} kcal`, 'Calories']} /> */}
                             <RechartsTooltip formatter={(value) => [`${value} kcal`, 'Calories']} />
                            <Legend />
                            <Bar dataKey="calories" fill="#FF9800" name="Calories (kcal)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Detailed Nutrients */}
              {chartData?.nutrientData.length > 0 && (
                <div className="nutrition-section">
                  <h5>🔬 Key Nutrients</h5>
                  <div className="nutrients-grid">
                    {chartData.nutrientData.map((nutrient, index) => (
                      <div key={index} className="nutrient-card">
                        <div className="nutrient-name">{nutrient.name}</div>
                        <div className="nutrient-value">
                          {nutrient.value.toFixed(1)} {nutrient.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        </>
      ):""

      }
      {activeTab === "foodanalyze" ?
      (
<>
 <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Food Analysis AI</h5>
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
                  
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
</>
      ):
      ""

      }
      
      <style jsx>{`
        .chatbot-container {
          max-width: 1200px;
          margin: 20px auto;
          border: 2px solid #4CAF50;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 25px rgba(76, 175, 80, 0.15);
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }
        
        /* Camera Modal Styles */
        .camera-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .camera-modal-content {
          background: white;
          border-radius: 16px;
          padding: 20px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .camera-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .camera-header h4 {
          margin: 0;
          color: #2E7D32;
        }
        
        .close-camera-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          padding: 5px 10px;
          border-radius: 4px;
        }
        
        .close-camera-btn:hover {
          background: #f0f0f0;
        }
        
        .camera-preview {
          position: relative;
          width: 100%;
          height: 300px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .camera-error {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 20px;
          text-align: center;
        }
        
        .camera-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .capture-btn {
          flex: 1;
          padding: 15px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .capture-btn:hover {
          background: #388E3C;
        }
        
        .cancel-btn {
          padding: 15px 20px;
          background: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .cancel-btn:hover {
          background: #e0e0e0;
        }
        
        .camera-tips {
          background: #F8FFF8;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #E8F5E9;
        }
        
        .camera-tips p {
          margin: 0 0 10px 0;
          font-weight: 600;
          color: #2E7D32;
        }
        
        .camera-tips ul {
          margin: 0;
          padding-left: 20px;
          color: #666;
        }
        
        .camera-tips li {
          margin-bottom: 5px;
        }
        
        /* Camera Button in Chat Input */
        .chat-input-buttons {
          display: flex;
          gap: 10px;
        }
        
        .camera-btn {
          padding: 14px 20px;
          background: #FF9800;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s;
          min-width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .camera-btn:hover {
          background: #F57C00;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 124, 0, 0.3);
        }
        
        /* Upload Options */
        .upload-options {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          justify-content: center;
        }
        
        .camera-option-btn,
        .upload-option-btn {
          flex: 1;
          padding: 15px;
          border: 2px dashed #81C784;
          border-radius: 8px;
          background: #F8FFF8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .camera-option-btn:hover,
        .upload-option-btn:hover {
          border-color: #4CAF50;
          background: #F1F8E9;
        }
        
        .camera-option-btn span:first-child,
        .upload-option-btn span:first-child {
          font-size: 2rem;
        }
        
        .upload-option-btn span:last-child,
        .camera-option-btn span:last-child {
          font-weight: 600;
          color: #2E7D32;
        }
        
        /* Rest of the existing styles remain the same */
        .chat-header {
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          color: white;
          padding: 15px 20px;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        
        /* Tabs Styles */
        .chat-tabs {
          display: flex;
          background: #F1F8E9;
          border-bottom: 1px solid #E0E0E0;
        }
        
        .tab-btn {
          flex: 1;
          padding: 15px 20px;
          border: none;
          background: none;
          font-size: 1rem;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .tab-btn:hover {
          background: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
        }
        
        .tab-btn.active {
          background: white;
          color: #4CAF50;
          border-bottom: 3px solid #4CAF50;
        }
        
        /* Image Upload Section Styles */
        .image-upload-section {
          padding: 20px;
          min-height: 500px;
          max-height: 800px;
          overflow-y: auto;
        }
        
        /* Chat Messages with Image Support */
        .chat-messages {
          height: 450px;
          overflow-y: auto;
          padding: 20px;
          background: #f8fff8;
          scroll-behavior: smooth;
        }
        
        .image-analysis-message-wrapper {
          border: 2px solid #4CAF50;
          background: linear-gradient(to right, #F8FFF8, #FFFFFF);
        }
        
        .image-analysis-message {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .chat-image-preview {
          max-width: 200px;
          max-height: 150px;
          border-radius: 10px;
          border: 2px solid #E8F5E9;
          object-fit: cover;
          align-self: flex-start;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        
        .analysis-text {
          margin-top: 10px;
        }
        
        .message-time {
          font-size: 0.7rem;
          margin-left: 10px;
          opacity: 0.7;
          font-weight: normal;
        }
        
        /* Keep all other existing styles */
        .upload-instructions {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .upload-instructions h4 {
          color: #2E7D32;
          margin-bottom: 10px;
        }
        
        .upload-instructions p {
          color: #666;
          margin-bottom: 10px;
        }
        
        .upload-area {
          margin: 20px 0;
        }
        
        .file-input {
          display: none;
        }
        
        .upload-label {
          display: block;
          border: 2px dashed #81C784;
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #F8FFF8;
        }
        
        .upload-label:hover {
          border-color: #4CAF50;
          background: #F1F8E9;
        }
        
        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        
        .upload-icon {
          font-size: 2.5rem;
        }
        
        .upload-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .upload-text small {
          color: #888;
        }
        
        .image-preview {
          position: relative;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .image-preview img {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .change-text {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 5px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        
        .file-info {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
          color: #666;
          font-size: 0.9rem;
        }
        
        .upload-actions {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        
        .analyze-btn {
          padding: 12px 24px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        
        .analyze-btn:hover:not(:disabled) {
          background: #388E3C;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(56, 142, 60, 0.3);
        }
        
        .analyze-btn:disabled {
          background: #C8E6C9;
          cursor: not-allowed;
        }
        
        .clear-btn {
          padding: 12px 24px;
          background: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .clear-btn:hover {
          background: #e0e0e0;
        }
        
        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        /* Nutrition Results */
        .nutrition-results {
          margin-top: 30px;
        }
        
        .nutrition-section {
          margin-bottom: 30px;
          padding: 20px;
          background: #F8FFF8;
          border-radius: 12px;
          border: 1px solid #E8F5E9;
        }
        
        .nutrition-section h5 {
          color: #2E7D32;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1.2rem;
        }
        
        /* Food Items Grid */
        .food-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .food-item-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .food-item-name {
          font-weight: bold;
          color: #2E7D32;
          margin-bottom: 8px;
          font-size: 1.1rem;
          text-align: center;
        }
        
        .food-item-details {
          font-size: 0.9rem;
          color: #666;
        }
        
        .food-item-serving {
          margin-bottom: 5px;
        }
        
        .food-item-calories {
          margin-bottom: 5px;
          color: #FF9800;
          font-weight: 500;
        }
        
        .food-item-score .score-A {
          color: #4CAF50;
          font-weight: bold;
        }
        
        .food-item-score .score-B {
          color: #8BC34A;
          font-weight: bold;
        }
        
        .food-item-score .score-C {
          color: #FFC107;
          font-weight: bold;
        }
        
        .food-item-score .score-D {
          color: #FF9800;
          font-weight: bold;
        }
        
        .food-item-score .score-E {
          color: #F44336;
          font-weight: bold;
        }
        
        /* Summary Grid */
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }
        
        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .summary-card:hover {
          transform: translateY(-5px);
        }
        
        .summary-value {
          font-size: 2rem;
          font-weight: bold;
          color: #4CAF50;
          margin-bottom: 5px;
        }
        
        .summary-label {
          font-size: 0.9rem;
          color: #666;
        }
        
        /* NutriScore Display */
        .nutriscore-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        
        .nutriscore-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
        }
        
        .nutriscore-circle.score-A { background: #4CAF50; }
        .nutriscore-circle.score-B { background: #8BC34A; }
        .nutriscore-circle.score-C { background: #FFC107; }
        .nutriscore-circle.score-D { background: #FF9800; }
        .nutriscore-circle.score-E { background: #F44336; }
        
        .nutriscore-info {
          text-align: left;
        }
        
        .nutriscore-label {
          font-weight: bold;
          color: #666;
        }
        
        .nutriscore-value {
          color: #888;
          font-size: 0.9rem;
        }
        
        /* Charts Section */
        .charts-section {
          margin-top: 30px;
        }
        
        .chart-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .chart-container h6 {
          color: #2E7D32;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .chart-wrapper {
          height: 300px;
        }
        
        /* Nutrients Grid */
        .nutrients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }
        
        .nutrient-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #E8F5E9;
        }
        
        .nutrient-name {
          font-weight: bold;
          color: #2E7D32;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }
        
        .nutrient-value {
          color: #666;
          font-size: 1.1rem;
        }
        
        /* Existing chat styles */
        .chat-header h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 600;
        }
        
        .connection-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          opacity: 0.9;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }
        
        .status-dot.connected {
          background: #C8E6C9;
          box-shadow: 0 0 8px #C8E6C9;
        }
        
        .status-dot.disconnected {
          background: #FFCDD2;
          box-shadow: 0 0 8px #FFCDD2;
        }
        
        .chat-header p {
          margin: 0;
          opacity: 0.95;
          font-size: 0.95rem;
        }
        
        .message {
          margin-bottom: 15px;
          padding: 14px 18px;
          border-radius: 18px;
          max-width: 85%;
          animation: fadeIn 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .user-message {
          background: linear-gradient(135deg, #4CAF50, #66BB6A);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }
        
        .bot-message {
          background: white;
          color: #333;
          margin-right: auto;
          border: 1px solid #E8F5E9;
          border-bottom-left-radius: 5px;
        }
        
        .error-message {
          background: #FFF3E0;
          border: 1px solid #FFB74D;
        }
        
        .message-sender {
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
        }
        
        .message-source {
          font-size: 0.7rem;
          text-transform: none;
          margin-left: 6px;
          opacity: 0.7;
          font-weight: normal;
        }
        
        .user-message .message-sender {
          color: rgba(255,255,255,0.9);
        }
        
        .bot-message .message-sender {
          color: #4CAF50;
        }
        
        .message-content {
          line-height: 1.6;
        }
        
        .message-text {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .message-line {
          margin-bottom: 8px;
        }
        
        .message-line:last-child {
          margin-bottom: 0;
        }
        
        .message-header {
          margin-bottom: 12px;
          padding-bottom: 4px;
          border-bottom: 2px solid #E8F5E9;
        }
        
        .bullet-point {
          margin-bottom: 6px;
          display: flex;
          align-items: flex-start;
        }
        
        .bullet-icon {
          margin-right: 8px;
          color: #4CAF50;
          font-weight: bold;
        }
        
        .quick-questions {
          padding: 15px;
          background: #F1F8E9;
          border-top: 1px solid #E8F5E9;
        }
        
        .quick-title {
          margin: 0 0 10px 0;
          color: #388E3C;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .quick-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .quick-btn {
          padding: 8px 14px;
          background: white;
          border: 1px solid #81C784;
          border-radius: 20px;
          color: #2E7D32;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex: 1;
          min-width: 120px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        
        .quick-btn:hover:not(:disabled) {
          background: #4CAF50;
          color: white;
          transform: translateY(-1px);
        }
        
        .quick-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .chat-input {
          display: flex;
          padding: 15px;
          background: white;
          border-top: 1px solid #E0E0E0;
          gap: 12px;
        }
        
        .chat-input textarea {
          flex: 1;
          padding: 14px;
          border: 2px solid #E0E0E0;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          line-height: 1.5;
          resize: none;
          transition: border-color 0.2s;
        }
        
        .chat-input textarea:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        .chat-input textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .typing-indicator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #81C784;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        strong {
          font-weight: 600;
          color: #2E7D32;
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: #81C784;
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #4CAF50;
        }
        
        .image-upload-section::-webkit-scrollbar {
          width: 6px;
        }
        
        .image-upload-section::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .image-upload-section::-webkit-scrollbar-thumb {
          background: #81C784;
          border-radius: 3px;
        }
        
        .image-upload-section::-webkit-scrollbar-thumb:hover {
          background: #4CAF50;
        }
          /* Add to existing styles */
.camera-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.error-message {
  margin-bottom: 10px;
  text-align: center;
}

.retry-btn {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #388E3C;
}

.capture-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.capture-btn:disabled:hover {
  background: #4CAF50;
  transform: none;
  box-shadow: none;
}

/* Add visual feedback for capture */
@keyframes flash {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.camera-flash {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  animation: flash 0.3s ease-out;
  pointer-events: none;
}
  /* Add these styles to your existing CSS */
.camera-status {
  text-align: center;
  margin-top: 10px;
  color: #666;
  font-size: 0.8rem;
}

.error-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}

.capture-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #8BC34A;
}

.capture-btn:disabled:hover {
  background: #8BC34A;
  transform: none;
  box-shadow: none;
}

.camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); /* Mirror for front camera */
  background: #000;
}

/* Flash animation for capture feedback */
@keyframes flash {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.camera-flash {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  animation: flash 0.3s ease-out;
  pointer-events: none;
}
      `}</style>
    </div>
  );
}

export default Chatbot;