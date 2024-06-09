import React, { useEffect, useState } from 'react';
import './Home.css';
import chefHat from '../../assets/chefHat.jpeg';

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/posts');
//         const posts = await response.json();
//         console.log('Response Data:', posts);
//         console.log("Number of posts:", posts.length);
//         setPosts(posts);
//       } catch (err) {
//         console.error('Error fetching posts:', err);
//       }
//     };
//     fetchPosts();
//   }, []);

  // const handlePostCreated = (newPost) => {
  //   setPosts(prevPosts => [newPost, ...prevPosts]);
  // };


  // return (
  //   <div>
  //     {/* <PostForm authToken={ pass authToken here} onPostCreated={handlePostCreated} /> */}
  //     {posts.map((post) => (
        
  //       <div key={post._id} className="post">

  //         <div className="element">
  //           <div className = "top-bar">

  //             <div><img src={chefHat} className="chefHat"/></div>
  //             <div><h3>{post.userName}</h3></div>
  //             <div><p>{post.createdAt}</p></div>
  //           </div>
  //         </div>

  //         <div className="element">
  //           <img src={post.image} alt="chk pot pie" className="post-img"/>
  //         </div>

  //         <div className="element">
  //           <div className ="bottom-box">
  //             <p>{post.caption}</p>
  //             <p>{post.content}</p>
  //           </div>
  //         </div>

  //       </div>
  //     ))}
  //   </div>
  // );
  const Home = () => {
    const [posts, setPosts] = useState([]);
  
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        const posts = await response.json();
        console.log('Response Data:', posts);
        console.log("Number of posts:", posts.length);
        setPosts(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    
  
    useEffect(() => {
      fetchPosts();
      //const intervalId = setInterval(fetchPosts, 5000); // Fetch posts every 5 seconds
  
      //return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
  

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="element">
            <div className="top-bar">
              <div>
                <img src={chefHat} className="chefHat" alt="Chef Hat" />
              </div>
              <div>
                <h3>{post.userName ?? 'Unknown User'}</h3>
              </div>
              <div>
                <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
              </div>
            </div>
          </div>
          <div className="element">
            {post.image ? (
              <img src={post.image} alt="Post" className="post-img" />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
          <div className="element">
            <div className="bottom-box">
              <p>{post.caption ?? 'No Caption'}</p>
              <p>{post.content ?? 'No Content'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
