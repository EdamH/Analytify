import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';  
import '../../App.css';

import SidebarComp from "../../components/homepage/SidebarComp";
import Navbar from "../../components/homepage/Navbar";
import PostCard from "../../components/homepage/PostCard";
import PieChart from "../../components/homepage/PieChart";
import HorizontalBar from "../../components/homepage/HorizontalBar";
import LineChart from "../../components/homepage/LineChart";
import DoughnutChart from "../../components/homepage/DoughnutChart";
import * as endpoints from "../../endpoints";
        
import React, { useEffect, useState } from 'react';
import axios from 'axios';





function Home() {
  // FETCH USER INFO FROM LOCAL STORAGE
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  

  // PAGES ASSOCIATED WITH USER
  const [accounts, setAccounts] = useState([]);
  let query = 'https://graph.facebook.com/' + loggedInUser.id + '/accounts?fields=access_token,name,id,fan_count&access_token=' + loggedInUser.accessToken;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(query, {});
        setAccounts(response.data.data);
        response.data.data.forEach(async (e) => {
          const page = await endpoints.getPage(e.id);
          !page && endpoints.createPageUser(e.id, e.name, e.access_token, e.fan_count, loggedInUser.id, "PRIVATE")
        });
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    
    fetchData();
  },[]);
  console.log(accounts);

  // FETCH FEEDS =============================================================================================================
  const [feed, setFeed] = useState([]);
  
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const feedPromises = accounts.map(async (item) => {
          const feedQuery = `https://graph.facebook.com/${item.id}/feed?access_token=${item.access_token}&fields=full_picture,created_time,message,shares,comments.summary(total_count).limit(50){created_time,message,reactions.type(LIKE).limit(0).summary(total_count).as(like),reactions.type(LOVE).limit(0).summary(total_count).as(love),reactions.type(WOW).limit(0).summary(total_count).as(wow),reactions.type(SAD).limit(0).summary(total_count).as(sad),reactions.type(ANGRY).limit(0).summary(total_count).as(angry),reactions.type(HAHA).limit(0).summary(total_count).as(haha)},reactions.type(LIKE).limit(0).summary(total_count).as(like),reactions.type(LOVE).limit(0).summary(total_count).as(love),reactions.type(WOW).limit(0).summary(total_count).as(wow),reactions.type(SAD).limit(0).summary(total_count).as(sad),reactions.type(ANGRY).limit(0).summary(total_count).as(angry),reactions.type(HAHA).limit(0).summary(total_count).as(haha)`;
          
          const response = await axios.get(feedQuery);
          response.data.PageId = item.id;
          return response.data;
        });


        const resolvedFeeds = await Promise.all(feedPromises);

        setFeed(resolvedFeeds);
        
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchFeeds();
    
  }, [accounts]);


  useEffect(() => {
    const FeedData = async () => {
      for (const feedItem of feed) {
        endpoints.deepAddPosts(feedItem);
      }
    };

    FeedData();
    
  }, [feed])


  console.log('newfeed', feed);
  // FIGURE OUT SELECTED PAGE AND TAB
  const [selectedOption, setSelectedOption] = useState('');
  const [activeTab, setActiveTab] = useState("Feed");

  const handleOptionChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    console.log('Selected option:', selectedValue);
  };

  const handleActiveTab = (selectedValue) => {
    setActiveTab(selectedValue);
    console.log('Active tab:', selectedValue);
  };

  // FIGURE OUT CURRENT FEED =================================================================================================

  let [currentFeed, setCurrentFeed] = useState([]);
  let [currentPage, setCurrentPage] = useState([]);
  useEffect(() => {
    for (var i in accounts) {
      if (accounts[i].name === selectedOption) {
        break;
      }
    }
    if (feed[i] && feed[i].data) {
      // setCurrentFeed(feed[i]);
      
      const fetchData = async () => {
        setCurrentPage(accounts[i]);
        let dummy = await endpoints.getFeed(accounts[i].id, 10, 0);
        setCurrentFeed(dummy);
      }
      fetchData();
    }
    
    
    console.log('page:', currentPage)
  }, [selectedOption]);

  // FEED PAGINATION =======================================================================================================
  function nextFeed() {
    console.log("nextClicked")
    
    const fetchData = async () => {
      try {
        const index = currentFeed.paging.next;
        
        const response = await endpoints.getFeed(currentPage.id, 10, index);
        setCurrentFeed(response);
      } catch (error) {
        console.error('Error fetching next feed:', error);
      }
    };
    
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
  }

  function prevFeed() {
    console.log("prevClicked")
    const fetchData = async () => {
      try {
        const index = currentFeed.paging.previous;

        const response = await endpoints.getFeed(currentPage.id, 10, index);
        setCurrentFeed(response);
      } catch (error) {
        console.error('Error fetching previous feed:', error);
      }
    };
    
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================================================================================

  let [searchInput, setSearchInput] = useState('');
  let [searchPages, setSearchPages] = useState([]);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  const handleButtonClick = async () => {
    let data = await endpoints.searchPage(searchInput);
    setSearchPages(data);
  };
  
  const handlePageSelection = async (pageID) => {
    endpoints.createPage(pageID, "React Did This", "-", 12)
  }


  const testFunc = async () => {
    let x = await endpoints.getFeed(currentPage.id, 10, 0);
    // console.log("returned value: ",await endpoints.getFeed(currentPage.id, 10, 0)
  }

  return (
    
  
    <div className="App">
      
      {/* SIDEBAR */}
      <SidebarComp
        name= {loggedInUser.name}
        options={accounts}
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />

      {/* NAVBAR */}
      {selectedOption !== "PLUS" ? (
          <Navbar activeTab={activeTab} onClick={handleActiveTab} />
        ) : (
          <Navbar activeTab={false} onClick={handleActiveTab} />
        )
      }

      <button type="button" onClick={testFunc}>TEST!</button>
      

      {/* FEED */}
      {selectedOption !== "PLUS" &&
        (
          <div className="mt-4">
          {
            // activeTab === 'Feed' && currentFeed.data && (
            //   currentFeed.data.map((post) => (
            //       <PostCard
            //         imgAdd={post.full_picture || false}
            //         message={post.message || "No message"}
            //         createdAt={post.created_time}
            //         likes={post.like.summary.total_count || 0}
            //         comments={post.comments.summary.total_count || 0}
            //         shares={post.shares?.count || 0}

            //       />
            //       )
            //   )
            
            // )
            activeTab === 'Feed' && currentFeed.data && (
              currentFeed.data.map((post) => (
                  <div>
                  <PostCard
                    imgAdd={decodeURIComponent(post.imgAdd) || false}
                    message={decodeURIComponent(post.message) || "No message"}
                    createdAt={post.createdAt}
                    likes={post.likesNum || 0}
                    comments={post.commentsNum || 0}
                    shares={post.sharesNum?.count || 0}

                  />
                  <h1>post.message</h1>
                  </div>
                  )
              )
            
            )
          }
          {activeTab === 'Feed' && currentFeed.paging && (
            <div className="d-flex justify-content-center">
              {currentFeed.paging.previous != null ? (<button className="btn btn-primary m-2" style={{background: "#6366F1"}} onClick={prevFeed}><i className="pi pi-arrow-left"></i></button>) :
              (<button className="btn btn-secondary m-2"><i className="pi pi-arrow-left"></i></button>)}
              {currentFeed.paging.next !=null ? (<button className="btn btn-primary m-2" style={{background: "#6366F1"}} onClick={nextFeed}><i className="pi pi-arrow-right"></i></button>) :
              (<button className="btn btn-secondary m-2" ><i className="pi pi-arrow-right"></i></button>)}
            </div>
          )}
          </div>
        )
      }

      {selectedOption === 'PLUS' &&
        (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <label>
              Search for a public page on Facebook:
              <input
                type="text"
                onChange= {handleSearchInput}
                
              />
              <button type="button" onClick={handleButtonClick}>Search</button>
            </label>
            {searchPages && 
              (
              <div className="d-flex flex-column">
                {searchPages.map((e) => (
                  <div className="d-flex">
                    <img src={e.page_picture} style={{height: "50px", width: "auto"}} />
                    <p>{e.PageName}</p>
                    <button onClick={() => handlePageSelection(e.PageID)}>Select</button>
                  </div>
                  ))
                }
              </div>
              )  
            }
          </div>
        ) 
      }
        {/* DASHBOARD */}
        

      {activeTab === 'Dashboard' && (
        <div className="p-5">
          <div className="row">
            <div className="col-6">
              <PieChart
                currentPage= {currentPage}
              />
            </div>
            <div className="col-6"><DoughnutChart /></div>
          </div>
          <div className="row">
            <div className="col-6">
              <LineChart
                currentPage= {currentPage}
              />
            </div>
            <div className="col-6"><HorizontalBar /></div>
            
          </div>
        </div>
        )
      }
      

    
    </div>
    


    
  );
}

export default Home;

