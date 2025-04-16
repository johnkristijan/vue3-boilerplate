import axios from 'axios';

// Create a reusable axios instance with default config
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Popular mock API service
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Example function to fetch posts
export const fetchPosts = async (limit = 10) => {
  try {
    const response = await apiClient.get(`/posts`, {
      params: { _limit: limit }
    });
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('Server Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
    }
    throw error; // Re-throw to allow caller to handle it
  }
};

// Example function to fetch a single post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Example function to fetch user data by ID
export const fetchUser = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  } finally {
    // This block will execute regardless of try/catch result
    console.log('User fetch operation completed');
  }
};

// Example POST request to create a resource
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Example usage in a Vue component:
/*
import { ref, onMounted } from 'vue';
import { fetchPosts, fetchUser } from '@/services/api';

const posts = ref([]);
const user = ref(null);
const loading = ref(false);
const error = ref(null);

const loadData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Fetch 5 posts and user with ID 1
    const [postsData, userData] = await Promise.all([
      fetchPosts(5),
      fetchUser(1)
    ]);
    
    posts.value = postsData;
    user.value = userData;
  } catch (err) {
    error.value = 'Failed to load data. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
*/