import React, {createContext, useEffect, useState} from "react";
import qs from "qs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(false);
    const [accessToken,setAccessToken]=useState(null);

    const login=async (username,password) => {
        setIsLoading(true);
        try {
            const requestData = qs.stringify({username, password});
            const response = await axios.post('http://192.168.248.230:8006/token', requestData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = response.data;

            if (data.access_token && data.refresh_token) {
                console.log('Access Token:', data.access_token);
                console.log('Refresh Token:', data.refresh_token);
                setAccessToken(data.access_token);
                await AsyncStorage.setItem('accessToken', data.access_token);
                await AsyncStorage.setItem('refreshToken', data.refresh_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                // getUserData();
            } else {
                throw new Error('Tokens not found');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Failed to log in. Please check your username and password and try again.');
        }
        setIsLoading(false);
    }

    // const getUserData = async () => {
    //     try {
    //         let response = await axios.get('https://a269-2a09-bac5-4867-18be-00-277-38.ngrok-free.app/me');
    //         await AsyncStorage.setItem('userID', response.data._id);
    //         // let x = await asyncStorage.getItem('userID');
    //         // console.log(x);
    //     } catch (error) {
    //         console.error('Error getting user ID:', error);
    //     }
    // }

    const isLoggedIn=async ()=> {
        try {
            setIsLoading(true);
            await refreshAccessToken();
            let accessToken = await AsyncStorage.getItem('accessToken');

            //if there is an access token already in the AsyncStorage use that for login
            if (accessToken) {
                setAccessToken(accessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

 const refreshAccessToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const response = await axios.post('http://192.168.248.230:8006/refresh-token', {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            const newAccessToken = response.data.access_token;

            await AsyncStorage.setItem('accessToken', newAccessToken);

            // Update the default headers with the new access token
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

            console.log('Access token has been refreshed.');
        } catch (error) {
            console.error('Error refreshing access token:', error);
            // If the refresh token is expired, log the user out
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    }


    useEffect(()=>{
        isLoggedIn();

        // Set up the interval to refresh the access token every 9 minutes
        const intervalId = setInterval(() => {
            refreshAccessToken();
        }, 9.58 * 60 * 1000); // 9 minutes in milliseconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    },[]);

    const logout=async () => {
        setAccessToken(null);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsLoading(false);
    }

    return(
        <AuthContext.Provider value={{login,logout,refreshAccessToken,isLoading,accessToken}}>
            {children}
        </AuthContext.Provider>
    );
}
