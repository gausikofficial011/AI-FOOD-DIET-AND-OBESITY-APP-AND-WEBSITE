// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form, ListGroup, Badge, Tab, Tabs } from 'react-bootstrap';
// import { FaUsers, FaUserPlus, FaShareAlt, FaTrophy } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const Social = () => {
//   const { user } = useAuth();
//   const [friends, setFriends] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [searchUser, setSearchUser] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     fetchFriends();
//   }, []);

//   const fetchFriends = async () => {
//     try {
//       const response = await api.get('/social/friends');
//       setFriends(response.data.friends || []);
//       setPendingRequests(response.data.pendingRequests || []);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const sendFriendRequest = async (userId) => {
//     try {
//       await api.post('/social/friends/request', { userId });
//       alert('Friend request sent');
//     } catch (error) {
//       alert('Failed to send request');
//     }
//   };

//   const shareProgress = async () => {
//     try {
//       const response = await api.post('/social/share', {
//         type: 'daily_progress',
//         data: { message: 'Check out my progress!' }
//       });
//       alert(`Share URL: ${response.data.url}`);
//     } catch (error) {
//       alert('Share failed');
//     }
//   };

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col><h2><FaUsers className="me-2" />Social Features</h2></Col>
//       </Row>
//       <Row>
//         <Col lg={8}>
//           <Card className="mb-4">
//             <Card.Header>
//               <Tabs defaultActiveKey="friends">
//                 <Tab eventKey="friends" title={`Friends (${friends.length})`} />
//                 <Tab eventKey="requests" title={`Requests (${pendingRequests.length})`} />
//                 <Tab eventKey="find" title="Find Friends" />
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               <Tabs.Content>
//                 <Tab.Pane eventKey="friends">
//                   {friends.length > 0 ? (
//                     <ListGroup>
//                       {friends.map(friend => (
//                         <ListGroup.Item key={friend._id} className="d-flex justify-content-between align-items-center">
//                           <div>
//                             <strong>{friend.username}</strong>
//                             <div className="text-muted">{friend.profile?.name}</div>
//                           </div>
//                           <Button size="sm" variant="outline-primary">View Progress</Button>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : <p className="text-muted text-center">No friends yet</p>}
//                 </Tab.Pane>
//                 <Tab.Pane eventKey="requests">
//                   {pendingRequests.length > 0 ? (
//                     <ListGroup>
//                       {pendingRequests.map(req => (
//                         <ListGroup.Item key={req._id} className="d-flex justify-content-between align-items-center">
//                           <div>
//                             <strong>{req.from?.username}</strong>
//                             <div className="text-muted">Sent {new Date(req.timestamp).toLocaleDateString()}</div>
//                           </div>
//                           <div>
//                             <Button size="sm" variant="success" className="me-2">Accept</Button>
//                             <Button size="sm" variant="danger">Decline</Button>
//                           </div>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : <p className="text-muted text-center">No pending requests</p>}
//                 </Tab.Pane>
//                 <Tab.Pane eventKey="find">
//                   <Form.Group className="mb-3">
//                     <Form.Label>Search Users</Form.Label>
//                     <Form.Control type="text" placeholder="Enter username" value={searchUser}
//                       onChange={(e) => setSearchUser(e.target.value)} />
//                   </Form.Group>
//                   <Button variant="primary"><FaUserPlus className="me-2" />Search</Button>
//                 </Tab.Pane>
//               </Tabs.Content>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={4}>
//           <Card className="mb-4">
//             <Card.Header><h5>Share Your Progress</h5></Card.Header>
//             <Card.Body className="text-center">
//               <FaTrophy size={48} className="text-warning mb-3" />
//               <p>Share your nutrition achievements with friends</p>
//               <Button variant="info" className="w-100" onClick={shareProgress}>
//                 <FaShareAlt className="me-2" />Share Progress
//               </Button>
//             </Card.Body>
//           </Card>
//           <Card>
//             <Card.Header><h5>Social Stats</h5></Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Friends</span>
//                   <Badge bg="primary">{friends.length}</Badge>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Pending Requests</span>
//                   <Badge bg="warning">{pendingRequests.length}</Badge>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Profile Views</span>
//                   <Badge bg="info">0</Badge>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Social;

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form, ListGroup, Badge, Tab, Tabs } from 'react-bootstrap';
// import { FaUsers, FaUserPlus, FaShareAlt, FaTrophy, FaSearch } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const Social = () => {
//   const { user } = useAuth();
//   const [friends, setFriends] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [searchUser, setSearchUser] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [activeTab, setActiveTab] = useState('friends'); // Add state for active tab

//   useEffect(() => {
//     fetchFriends();
//   }, []);

//   const fetchFriends = async () => {
//     try {
//       const response = await api.get('/social/friends');
//       setFriends(response.data.friends || []);
//       setPendingRequests(response.data.pendingRequests || []);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const sendFriendRequest = async (userId) => {
//     try {
//       await api.post('/social/friends/request', { userId });
//       alert('Friend request sent');
//     } catch (error) {
//       alert('Failed to send request');
//     }
//   };

//   const shareProgress = async () => {
//     try {
//       const response = await api.post('/social/share', {
//         type: 'daily_progress',
//         data: { message: 'Check out my progress!' }
//       });
//       alert(`Share URL: ${response.data.url}`);
//     } catch (error) {
//       alert('Share failed');
//     }
//   };

//   const searchUsers = async () => {
//     if (!searchUser.trim()) return;

//     try {
//       const response = await api.get(`/social/search?username=${searchUser}`);
//       setSearchResults(response.data.users || []);
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//     }
//   };

//   const handleAcceptRequest = async (requestId) => {
//     try {
//       await api.put(`/social/friends/accept/${requestId}`);
//       fetchFriends(); // Refresh the list
//     } catch (error) {
//       alert('Failed to accept request');
//     }
//   };

//   const handleDeclineRequest = async (requestId) => {
//     try {
//       await api.put(`/social/friends/decline/${requestId}`);
//       fetchFriends(); // Refresh the list
//     } catch (error) {
//       alert('Failed to decline request');
//     }
//   };

//   return (
//     <Container>
//       <Row className="mb-4">
//         <Col><h2><FaUsers className="me-2" />Social Features</h2></Col>
//       </Row>
//       <Row>
//         <Col lg={8}>
//           <Card className="mb-4">
//             <Card.Header>
//               <Tabs
//                 activeKey={activeTab}
//                 onSelect={(k) => setActiveTab(k)}
//                 id="social-tabs"
//                 className="mb-3"
//               >
//                 <Tab eventKey="friends" title={`Friends (${friends.length})`} />
//                 <Tab eventKey="requests" title={`Requests (${pendingRequests.length})`} />
//                 <Tab eventKey="find" title="Find Friends" />
//               </Tabs>
//             </Card.Header>
//             <Card.Body>
//               {/* Tab content */}
//               {activeTab === 'friends' && (
//                 <div>
//                   {friends.length > 0 ? (
//                     <ListGroup>
//                       {friends.map(friend => (
//                         <ListGroup.Item key={friend._id} className="d-flex justify-content-between align-items-center">
//                           <div>
//                             <strong>{friend.username}</strong>
//                             <div className="text-muted">{friend.profile?.name || 'No name provided'}</div>
//                           </div>
//                           <Button size="sm" variant="outline-primary">View Progress</Button>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : (
//                     <p className="text-muted text-center">No friends yet. Search for friends to connect!</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'requests' && (
//                 <div>
//                   {pendingRequests.length > 0 ? (
//                     <ListGroup>
//                       {pendingRequests.map(req => (
//                         <ListGroup.Item key={req._id} className="d-flex justify-content-between align-items-center">
//                           <div>
//                             <strong>{req.from?.username || 'Unknown user'}</strong>
//                             <div className="text-muted">Sent {new Date(req.timestamp).toLocaleDateString()}</div>
//                           </div>
//                           <div>
//                             <Button
//                               size="sm"
//                               variant="success"
//                               className="me-2"
//                               onClick={() => handleAcceptRequest(req._id)}
//                             >
//                               Accept
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="danger"
//                               onClick={() => handleDeclineRequest(req._id)}
//                             >
//                               Decline
//                             </Button>
//                           </div>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : (
//                     <p className="text-muted text-center">No pending requests</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'find' && (
//                 <div>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Search Users</Form.Label>
//                     <div className="d-flex gap-2">
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter username"
//                         value={searchUser}
//                         onChange={(e) => setSearchUser(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
//                       />
//                       <Button
//                         variant="primary"
//                         onClick={searchUsers}
//                       >
//                         <FaSearch />
//                       </Button>
//                     </div>
//                   </Form.Group>

//                   {searchResults.length > 0 ? (
//                     <ListGroup>
//                       {searchResults.map(user => (
//                         <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
//                           <div>
//                             <strong>{user.username}</strong>
//                             <div className="text-muted">{user.email}</div>
//                           </div>
//                           <Button
//                             size="sm"
//                             variant="outline-primary"
//                             onClick={() => sendFriendRequest(user._id)}
//                           >
//                             <FaUserPlus className="me-1" /> Add Friend
//                           </Button>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   ) : searchUser && (
//                     <p className="text-muted text-center">No users found. Try a different search.</p>
//                   )}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={4}>
//           <Card className="mb-4">
//             <Card.Header><h5>Share Your Progress</h5></Card.Header>
//             <Card.Body className="text-center">
//               <FaTrophy size={48} className="text-warning mb-3" />
//               <p>Share your nutrition achievements with friends</p>
//               <Button variant="info" className="w-100" onClick={shareProgress}>
//                 <FaShareAlt className="me-2" />Share Progress
//               </Button>
//             </Card.Body>
//           </Card>
//           <Card>
//             <Card.Header><h5>Social Stats</h5></Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Friends</span>
//                   <Badge bg="primary" pill>{friends.length}</Badge>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Pending Requests</span>
//                   <Badge bg="warning" pill>{pendingRequests.length}</Badge>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Profile Views</span>
//                   <Badge bg="info" pill>0</Badge>
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex justify-content-between">
//                   <span>Shares</span>
//                   <Badge bg="success" pill>0</Badge>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Social;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Badge, Tab, Tabs, Spinner } from 'react-bootstrap';
import { FaUsers, FaUserPlus, FaShareAlt, FaTrophy, FaSearch, FaCheck, FaClock } from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Social = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('friends');
  const [loading, setLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState(new Set());

  useEffect(() => {
    fetchFriends();
    fetchSentRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await api.get('/social/friends');
      setFriends(response.data.friends || []);
      setPendingRequests(response.data.pendingRequests || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSentRequests = async () => {
    try {
      const response = await api.get('/social/friends/sent');
      const sentRequestIds = response.data.sentRequests?.map(req => req.to.toString()) || [];
      setSentRequests(new Set(sentRequestIds));
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      setLoading(true);
      await api.post('/social/friends/request', { userId });

      // Update sent requests
      setSentRequests(prev => new Set([...prev, userId]));

      // Remove from search results or update button
      setSearchResults(prev => prev.map(user =>
        user._id === userId ? { ...user, requestSent: true } : user
      ));

      alert('Friend request sent successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  // Add back the shareProgress function
  const shareProgress = async () => {
    try {
      const response = await api.post('/social/share', {
        type: 'daily_progress',
        data: { message: 'Check out my progress!' }
      });
      alert(`Share URL: ${response.data.url}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Share failed');
    }
  };

  const searchUsers = async () => {
    if (!searchUser.trim()) {
      alert('Please enter a username to search');
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/social/search?username=${encodeURIComponent(searchUser)}`);

      // Mark users who already have pending requests
      const markedResults = response.data.users.map(user => ({
        ...user,
        requestSent: sentRequests.has(user._id)
      }));

      setSearchResults(markedResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      alert(error.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.put(`/social/friends/accept/${requestId}`);
      fetchFriends(); // Refresh the list
    } catch (error) {
      alert('Failed to accept request');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await api.put(`/social/friends/decline/${requestId}`);
      fetchFriends(); // Refresh the list
    } catch (error) {
      alert('Failed to decline request');
    }
  };

  // Check if a request was already sent to a user
  const isRequestSent = (userId) => {
    return sentRequests.has(userId);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col><h2><FaUsers className="me-2" />Social Features</h2></Col>
      </Row>

      {loading && (
        <div className="text-center mb-3">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      )}

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                id="social-tabs"
                className="mb-0"
              >
                <Tab eventKey="friends" title={`Friends (${friends.length})`} />
                <Tab eventKey="requests" title={`Requests (${pendingRequests.length})`} />
                <Tab eventKey="find" title="Find Friends" />
              </Tabs>
            </Card.Header>
            <Card.Body>
              {/* Tab content */}
              {activeTab === 'friends' && (
                <div>
                  {friends.length > 0 ? (
                    <ListGroup>
                      {friends.map(friend => (
                        <ListGroup.Item key={friend._id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{friend.username}</strong>
                            <div className="text-muted">{friend.profile?.name || 'No name provided'}</div>
                          </div>
                          <Button size="sm" variant="outline-primary">View Progress</Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <div className="text-center py-4">
                      <FaUsers size={48} className="text-muted mb-3" />
                      <p className="text-muted">No friends yet. Search for friends to connect!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'requests' && (
                <div>
                  {pendingRequests.length > 0 ? (
                    <ListGroup>
                      {pendingRequests.map(req => (
                        <ListGroup.Item key={req._id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{req.from?.username || 'Unknown user'}</strong>
                            <div className="text-muted">
                              <small>Sent {new Date(req.timestamp).toLocaleDateString()}</small>
                            </div>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              variant="success"
                              className="me-2"
                              onClick={() => handleAcceptRequest(req._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeclineRequest(req._id)}
                            >
                              Decline
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <div className="text-center py-4">
                      <FaClock size={48} className="text-muted mb-3" />
                      <p className="text-muted">No pending requests</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'find' && (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Search Users</Form.Label>
                    <div className="d-flex gap-2 mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                      />
                      <Button
                        variant="primary"
                        onClick={searchUsers}
                        disabled={!searchUser.trim() || loading}
                      >
                        {loading ? <Spinner size="sm" /> : <FaSearch />}
                      </Button>
                    </div>
                  </Form.Group>

                  {searchResults.length > 0 ? (
                    <ListGroup>
                      {searchResults.map(user => (
                        <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{user.username}</strong>
                            <div className="text-muted small">{user.email}</div>
                            {user.profile?.name && (
                              <div className="text-muted small">{user.profile.name}</div>
                            )}
                          </div>
                          <div>
                            {isRequestSent(user._id) || user.requestSent ? (
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled
                                className="d-flex align-items-center"
                              >
                                <FaClock className="me-1" /> Request Sent
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => sendFriendRequest(user._id)}
                                disabled={loading}
                                className="d-flex align-items-center"
                              >
                                <FaUserPlus className="me-1" /> Add Friend
                              </Button>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : searchUser ? (
                    <div className="text-center py-4">
                      <FaSearch size={48} className="text-muted mb-3" />
                      <p className="text-muted">No users found. Try a different search.</p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">Enter a username to search for friends</p>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0"><FaTrophy className="me-2" />Share Your Progress</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <FaTrophy size={48} className="text-warning mb-3" />
              <p className="text-muted mb-4">Share your nutrition achievements with friends</p>
              <Button variant="info" className="w-100" onClick={shareProgress}>
                <FaShareAlt className="me-2" />Share Progress
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0"><FaUsers className="me-2" />Social Stats</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="d-flex align-items-center">
                    <FaUsers className="me-2 text-primary" />
                    Friends
                  </span>
                  <Badge bg="primary" pill>{friends.length}</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span className="d-flex align-items-center">
                    <FaClock className="me-2 text-warning" />
                    Pending Requests
                  </span>
                  <Badge bg="warning" pill>{pendingRequests.length}</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Sent Requests</span>
                  <Badge bg="secondary" pill>{sentRequests.size}</Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Profile Views</span>
                  <Badge bg="info" pill>0</Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Social;