import "./SearchContainer.css"
import { useEffect, useState } from "react";
import * as endpoints from "../../endpoints";
import LoadingIf from "../ui/LoadingIf";

function SearchContainer({ loggedInUser }) {

    let [searchInput, setSearchInput] = useState('');
    let [searchPages, setSearchPages] = useState([]);
    let [publicFeed, setPublicFeed] = useState([]);
    let [uploading, setUploading] = useState(false)
    let [selectedPage, setSelectedPage] = useState("")
    
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };
    const handleButtonClick = async () => {
        let data = await endpoints.searchPage(searchInput);
        console.log(data);
        
        setSearchPages(data);
    };
    
    const handlePageSelection = async (page) => {
        endpoints.publicFeed(page.PageID).then((response) => { setPublicFeed(response) })
        setSelectedPage(page)
    }

    useEffect(() => {

        const fetchData = async () => {
            setUploading(true);
            console.log('TRUE');
            await endpoints.createPageUser(publicFeed.PageId, selectedPage.PageName,"-",0,loggedInUser,"PUBLIC")
                .then(() => { endpoints.deepAddPosts(publicFeed).then(() => {setUploading(false);}); })
            // console.log("TEST", publicFeed.PageId, selectedPage.PageName, loggedInUser, publicFeed);
            
            console.log('FALSE');
            setUploading(false);
            
        }

        fetchData()
    }, [publicFeed]);



    return (
        <div className="d-flex justify-content-center align-items-center flex-column elevated-container">
            <label>
              <h2>Search for a public page on Facebook</h2>
              <input
                type="text"
                onChange={handleSearchInput}
                placeholder="Facebook page name. e.g., 'Manchester United'"
                className="search-input"
              />
            </label>
            <button type="button" onClick={handleButtonClick} className="rounded-button">
              Search
            </button>
            {searchPages && (
              <div className="d-flex flex-column justify-content-between page-items">
                {searchPages.map((e) => (
                  <div className="d-flex page-item flex-grow-1" key={e.PageID}>
                    <img src={e.page_picture} className="page-image" alt="Page" />
                    <p className="m-0">{e.PageName}</p>
                    <button onClick={() => handlePageSelection(e)} className="plus-button">
                      <i className="pi pi-plus"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {uploading && <LoadingIf bool={uploading} />}
          </div>
    )
}


export default SearchContainer;