import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';



function SidebarComp({ name, options, selectedOption, onChange }) {

    const [visible, setVisible] = useState(false);

    const handleOptionChange = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
    };

    return (
        
        <div className="card d-flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h1 style={{ fontSize: '1.5rem' }}>Welcome to Analytify,</h1>
            <h2 style={{ fontSize: '1.1rem' }}>{name}</h2>
            
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Owned Pages
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div>
                                    {options.map((option) => (
                                        <div>
                                            <img style={{height: "50px", width: "auto"}} src={`https://graph.facebook.com/v17.0/${option.id}/picture?access_token=${option.access_token}`} />
                                            <label key={option.name}>
                                                <input
                                                    type="radio"
                                                    value={option.name}
                                                    checked={selectedOption === option.name}
                                                    onChange={handleOptionChange}
                                                />
                                                {option.name}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            Public Pages
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div>
                                    {options.map((option) => (
                                        <div>
                                            <img style={{height: "50px", width: "auto"}} src={`https://graph.facebook.com/v17.0/${option.id}/picture?access_token=${option.accessToken}`} />
                                            <label key={option.label}>
                                                <input
                                                    type="radio"
                                                    value={option.label}
                                                    checked={selectedOption === option.label}
                                                    onChange={handleOptionChange}
                                                />
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                    <div>
                                        <label key="PLUS">
                                                <input
                                                    type="radio"
                                                    value="PLUS"
                                                    checked={selectedOption === "PLUS"}
                                                    onChange={handleOptionChange}
                                                />
                                                PLUS
                                        </label>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                </div>
                
            <button type="button" className="btn btn-danger btn-sm">Disconnect</button>
            </Sidebar>

            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} style={{
            display: "absolute",
            position: "fixed",
            zIndex: "2",
            bottom: '15%',
            left: '0'
            }} />
        </div>

    )
}



export default SidebarComp;