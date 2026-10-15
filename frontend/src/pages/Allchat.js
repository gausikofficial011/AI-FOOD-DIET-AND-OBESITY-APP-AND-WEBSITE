import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Button,
  Divider,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Image as ImageIcon,
  TextFields as TextIcon,
  Chat as ChatIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import axios from 'axios';
import { format } from 'date-fns';

function Allchat() {
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'image', 'text'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const navigate = useNavigate();
  
  // Get user from localStorage
  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          console.log('User found in localStorage:', user);
          if (user._id || user.id) {
            setUserId(user._id || user.id);
          } else {
            setError('User ID not found in user data');
          }
        } else {
          setError('No user data found in localStorage');
          // Redirect to login if no user found
          navigate('/login');
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Error loading user data');
      }
    };
    
    getUserFromStorage();
  }, [navigate]);
  
  // Fetch all chats for the user
  const fetchChats = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching chats for user:', userId);
      const response = await axios.get(`http://localhost:5000/api/chat/user/${userId}`);
      
      if (response.data.success) {
        console.log('Chats fetched successfully:', response.data.count);
        setChats(response.data.chats);
        setFilteredChats(response.data.chats);
      } else {
        setError('Failed to fetch chats: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load chats. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter and sort chats
  useEffect(() => {
    if (chats.length === 0) return;
    
    let result = [...chats];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(chat => 
        chat.title?.toLowerCase().includes(term) ||
        chat.lastMessage?.content?.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (filterType === 'image') {
      result = result.filter(chat => chat.hasImageAnalysis);
    } else if (filterType === 'text') {
      result = result.filter(chat => !chat.hasImageAnalysis);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredChats(result);
  }, [chats, searchTerm, filterType, sortBy]);
  
  // Fetch specific chat details
  const fetchChatDetails = async (chatId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/chat/${chatId}`);
      
      if (response.data.success) {
        setSelectedChat(response.data.chat);
      }
    } catch (err) {
      console.error('Error fetching chat details:', err);
      setError('Failed to load chat details');
    } finally {
      setLoading(false);
    }
  };
  // Add this function in your component
const handleDeleteAllChats = async () => {
  if (!userId) return;
  
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ALL ${chats.length} chats? This action cannot be undone!`
  );
  
  if (!confirmDelete) return;
  
  try {
    setLoading(true);
    const response = await axios.delete(`http://localhost:5000/api/chat/user/${userId}/all`);
    
    if (response.data.success) {
      setChats([]);
      setFilteredChats([]);
      alert(`Successfully deleted ${response.data.deletedCount} chats`);
    }
  } catch (err) {
    console.error('Error deleting all chats:', err);
    setError('Failed to delete all chats');
  } finally {
    setLoading(false);
  }
};
  // Delete a chat
// Update your existing handleDeleteChat function
const handleDeleteChat = async () => {
  if (!chatToDelete) return;
  
  try {
    const response = await axios.delete(`http://localhost:5000/api/chat/${chatToDelete}`);
    
    if (response.data.success) {
      // Update state
      setChats(chats.filter(chat => chat._id !== chatToDelete));
      if (selectedChat && selectedChat._id === chatToDelete) {
        setSelectedChat(null);
      }
      
      setDeleteDialog(false);
      setChatToDelete(null);
      alert('Chat deleted successfully');
    } else {
      setError('Failed to delete chat: ' + response.data.error);
    }
  } catch (err) {
    console.error('Error deleting chat:', err);
    setError('Failed to delete chat: ' + (err.response?.data?.error || err.message));
  }
};
  
  // Open delete confirmation dialog
  const openDeleteDialog = (chatId, e) => {
    e.stopPropagation();
    setChatToDelete(chatId);
    setDeleteDialog(true);
  };
  
  // Export chat data
  const exportChat = (chat) => {
    const dataStr = JSON.stringify(chat, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `chat-${chat._id}-${format(new Date(), 'yyyy-MM-dd')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  useEffect(() => {
    if (userId) {
      fetchChats();
    }
  }, [userId]);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy hh:mm a');
    } catch (err) {
      return dateString;
    }
  };
  
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return format(date, 'MMM dd');
    } catch (err) {
      return '';
    }
  };
  
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Render loading state
  if (loading && chats.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Typography variant="body1" color="textSecondary">
          Loading your chats...
        </Typography>
      </Container>
    );
  }
  
  // Render chat details view
  if (selectedChat) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedChat(null)}
          sx={{ mb: 2 }}
          variant="outlined"
        >
          Back to All Chats
        </Button>
        
        <Card elevation={3}>
          <CardContent>
            {/* Chat Header */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box>
                <Typography variant="h5" component="h1" gutterBottom>
                  {selectedChat.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                  <Chip
                    label={selectedChat.hasImageAnalysis ? 'Image Analysis' : 'Text Chat'}
                    color={selectedChat.hasImageAnalysis ? 'primary' : 'default'}
                    icon={selectedChat.hasImageAnalysis ? <ImageIcon /> : <TextIcon />}
                    size="small"
                  />
                  <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {formatDate(selectedChat.createdAt)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedChat.messages?.length || 0} messages
                  </Typography>
                </Box>
              </Box>
              
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => exportChat(selectedChat)}
                >
                  Export
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => openDeleteDialog(selectedChat._id, { stopPropagation: () => {} })}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Messages */}
            {selectedChat.messages?.length > 0 ? (
              <List>
                {selectedChat.messages.map((message, index) => (
                  <React.Fragment key={message._id || index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        mb: 2,
                        backgroundColor: message.role === 'user' ? '#f0f7ff' : 
                                      message.role === 'assistant' ? '#f8f9fa' :
                                      message.role === 'text_analysis' ? '#e8f5e9' : 'white',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: message.role === 'user' ? '#e3f2fd' : 
                                   message.role === 'assistant' ? '#e0e0e0' :
                                   message.role === 'text_analysis' ? '#c8e6c9' : 'grey.300'
                      }}
                    >
                      <Box display="flex" alignItems="flex-start" mb={2}>
                        <Avatar sx={{ 
                          mr: 2, 
                          mt: 0.5,
                          bgcolor: message.role === 'user' ? 'primary.main' : 
                                   message.role === 'assistant' ? 'success.main' :
                                   message.role === 'text_analysis' ? 'info.main' : 'grey.500',
                          width: 32,
                          height: 32
                        }}>
                          {message.role === 'user' ? 'U' : 
                           message.role === 'assistant' ? 'A' :
                           message.role === 'text_analysis' ? 'T' : '?'}
                        </Avatar>
                        
                        <Box flex={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {message.role === 'user' ? 'You' :
                               message.role === 'assistant' ? 'NutriBot Assistant' :
                               message.role === 'text_analysis' ? 'Food Analysis' : 
                               message.role.charAt(0).toUpperCase() + message.role.slice(1)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatDate(message.timestamp)}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body1" sx={{ 
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.6
                          }}>
                            {message.content}
                          </Typography>
                          
                          {/* Display image if available */}
                          {message.metadata?.imageUrl && (
                            <Box mt={2}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                Analyzed Image:
                              </Typography>
                              <img 
                                src={`http://localhost:5000${message.metadata.imageUrl}`} 
                                alt="Analysis" 
                                style={{ 
                                  maxWidth: '100%', 
                                  maxHeight: '300px', 
                                  borderRadius: '8px',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                }}
                              />
                            </Box>
                          )}
                          
                          {/* Display nutrition summary if available */}
                          {(message.nutritionData || message.metadata?.nutritionSummary) && (
                            <Box mt={2} p={2} bgcolor="white" borderRadius={1} border="1px solid #e0e0e0">
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                                📊 Nutrition Summary:
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" color="textSecondary" display="block">
                                    Calories
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {message.nutritionData?.nutritionSummary?.calories?.toFixed(0) || 
                                     message.nutritionData?.summary?.totalCalories?.toFixed(0) ||
                                     message.metadata?.nutritionSummary?.calories?.toFixed(0) || 0} kcal
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" color="textSecondary" display="block">
                                    Protein
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {message.nutritionData?.nutritionSummary?.protein?.value?.toFixed(1) || 
                                     message.nutritionData?.summary?.totalProtein?.toFixed(1) ||
                                     message.metadata?.nutritionSummary?.protein?.value?.toFixed(1) || 0}g
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" color="textSecondary" display="block">
                                    Carbs
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {message.nutritionData?.nutritionSummary?.carbs?.value?.toFixed(1) || 
                                     message.nutritionData?.summary?.totalCarbs?.toFixed(1) ||
                                     message.metadata?.nutritionSummary?.carbs?.value?.toFixed(1) || 0}g
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                  <Typography variant="caption" color="textSecondary" display="block">
                                    Fat
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {message.nutritionData?.nutritionSummary?.fat?.value?.toFixed(1) || 
                                     message.nutritionData?.summary?.totalFat?.toFixed(1) ||
                                     message.metadata?.nutritionSummary?.fat?.value?.toFixed(1) || 0}g
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                          
                          {/* Display detected items if available */}
                          {message.metadata?.detectedItems && message.metadata.detectedItems.length > 0 && (
                            <Box mt={2}>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                Detected Food Items:
                              </Typography>
                              <Grid container spacing={1}>
                                {message.metadata.detectedItems.map((item, idx) => (
                                  <Grid item xs={12} key={idx}>
                                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                                      <Typography variant="body2">
                                        <strong>{item.dish || `Item ${item.position}`}</strong>
                                        {item.servingSize && ` (${item.servingSize})`}
                                        {item.nutrition?.calories && ` - ${item.nutrition.calories.toFixed(0)} kcal`}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box textAlign="center" py={4}>
                <Typography variant="h6" color="textSecondary">
                  No messages in this chat
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }
  
  // Render main chat list view
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Chat History
          </Typography>
          <Typography variant="body1" color="textSecondary">
            View and manage your chat conversations
          </Typography>
          <Button
  startIcon={<DeleteSweepIcon />}
  onClick={handleDeleteAllChats}
  variant="outlined"
  color="error"
  disabled={chats.length === 0 || loading}
  sx={{ ml: 1 }}
>
  Delete All
</Button>
        </Box>
        
        <Box display="flex" gap={1}>
          <Button
            startIcon={<RefreshIcon />}
            onClick={fetchChats}
            variant="outlined"
            disabled={loading}
          >
            Refresh
          </Button>
          
          <Button
            variant="contained"
            component={Link}
            to="/chat"
            startIcon={<ChatIcon />}
          >
            New Chat
          </Button>
        </Box>
      </Box>
      
      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }} 
          onClose={() => setError(null)}
          action={
            <Button color="inherit" size="small" onClick={fetchChats}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      
      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              size="small"
            />
          </Grid>
          
          <Grid item xs={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
                startAdornment={<FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="image">Image Analysis</MenuItem>
                <MenuItem value="text">Text Chat</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="textSecondary" align="right">
              {filteredChats.length} of {chats.length} chats
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Chat List */}
      {filteredChats.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <ChatIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {searchTerm || filterType !== 'all' ? 'No matching chats found' : 'No chats yet'}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start a new chat to begin your nutrition journey'}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/chat"
            startIcon={<ChatIcon />}
            sx={{ mt: 2 }}
          >
            Start Your First Chat
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filteredChats.map((chat) => (
            <Grid item xs={12} key={chat._id}>
              <Paper 
                elevation={1}
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  '&:hover': {
                    elevation: 3,
                    transform: 'translateY(-2px)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => fetchChatDetails(chat._id)}
              >
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: chat.hasImageAnalysis ? 'primary.main' : 'grey.500'
                    }}>
                      {chat.hasImageAnalysis ? <ImageIcon /> : <TextIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" component="div">
                          {chat.title}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={chat.hasImageAnalysis ? 'Image' : 'Text'}
                            size="small"
                            color={chat.hasImageAnalysis ? 'primary' : 'default'}
                            variant="outlined"
                          />
                          <Typography variant="caption" color="textSecondary">
                            {getRelativeTime(chat.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mb: 1, mt: 0.5 }}
                        >
                          {truncateText(chat.lastMessage?.content || 'No messages', 120)}
                        </Typography>
                        
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="textSecondary">
                            {chat.messageCount} message{chat.messageCount !== 1 ? 's' : ''}
                            {chat.metadata?.foodNames?.length > 0 && 
                              ` • ${chat.metadata.foodNames.length} food${chat.metadata.foodNames.length !== 1 ? 's' : ''} analyzed`
                            }
                          </Typography>
                          
                          <Box display="flex" alignItems="center">
                            {chat.lastMessage?.isImageAnalysis && chat.imageUrl && (
                              <Chip
                                label="Has Image"
                                size="small"
                                variant="outlined"
                                icon={<ImageIcon />}
                                sx={{ mr: 1 }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="delete"
                              onClick={(e) => openDeleteDialog(chat._id, e)}
                              sx={{ color: 'error.main' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Delete Chat</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this chat? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteChat} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Allchat;