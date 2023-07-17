import { LoginSocialFacebook } from 'reactjs-social-login';
import { Button } from 'primereact/button';
import React, { Component } from "react";
import { createUser, getUser } from '../../endpoints';
import axios from 'axios';


export default class Facebook extends Component {
    state = {
        auth: false,
        name: '',
    }
    
    render() {
        let facebookData;
        
        this.state.auth ?
            facebookData = (
                <div>
                    <h2>{this.state.name}</h2>
                </div>
            ) :
            
            facebookData = (
                <LoginSocialFacebook
                    appId="568191972146292"
                    onResolve={(response) => {
                        console.log(response.data)
                        this.state.auth = true;
                        this.state.name = response.data.name;
                        // axios.get("https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=568191972146292&client_secret=aa2c7370464d30f3bb070a6863235716&fb_exchange_token=${response.data.accessToken}")
                        createUser(response.data.userID, response.data.name, response.data.accessToken)
                        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                >
                    <Button label="Log in to Facebook" />
                </LoginSocialFacebook>
//                 <LoginSocialFacebook
//   appId="568191972146292"
//   onResolve={async (response) => {
//     try {
//       const exchangeTokenResponse = await axios.get(
//         `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=568191972146292&client_secret=aa2c7370464d30f3bb070a6863235716&fb_exchange_token=${response.data.accessToken}`
//       );

//       const longLivedAccessToken = exchangeTokenResponse.data.access_token;

//       console.log('Long-lived access token:', longLivedAccessToken);

//       // Continue with your code using the long-lived access token
//       this.state.auth = true;
//       this.state.name = response.data.name;
//       createUser(response.data.userID, response.data.name, await longLivedAccessToken);
//       localStorage.setItem('loggedInUser', JSON.stringify(response.data));
//     } catch (error) {
//       console.log('Error exchanging short-lived access token:', error);
//     }
//   }}
//   onReject={(error) => {
//     console.log(error);
//   }}
// >
//   <Button label="Log in to Facebook" />
//                 </LoginSocialFacebook>
            );
        return (
            <>
                {facebookData}
            </>
        )
    }
    
}
