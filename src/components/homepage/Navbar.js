
function Navbar({onClick, activeTab}) {

  
    
    const handleActiveTab = (event) => {
      const value = event.target.textContent;
    if (onClick) {
      onClick(value);
    }
    };
    return (
    <div>
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <div className="container row">
          <div className="col-8 d-flex">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="feed-tab" data-bs-toggle="tab" data-bs-target="#feed-tab-pane" type="button" role="tab" aria-controls="feed-tab-pane" aria-selected="true" onClick={handleActiveTab}>Feed</button>
            </li>
              {activeTab !== false &&
                (<li className="nav-item" role="presentation">
                  <button className="nav-link" id="dashboard-tab" data-bs-toggle="tab" data-bs-target="#dashboard-tab-pane" type="button" role="tab" aria-controls="dashboard-tab-pane" aria-selected="false" onClick={handleActiveTab}>Dashboard</button>
                </li>)
              }
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <li className="nav-item" role="presentation">
              <button type="button" className="btn btn-danger btn-sm">Disconnect</button>
            </li>
          </div>
        </div>
      </ul>
      <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="feed-tab-pane" role="tabpanel" aria-labelledby="feed-tab" tabIndex="0"></div>
        <div className="tab-pane fade" id="dashboard-tab-pane" role="tabpanel" aria-labelledby="dashboard-tab" tabIndex="0"></div>
      </div>
        

    </div>
    )
}


export default Navbar;