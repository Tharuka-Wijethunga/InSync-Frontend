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
            const response = await axios.post('https://1289-2402-4000-2180-9088-9d7d-eff-75a1-eb2e.ngrok-free.app/token', requestData, {
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
            } else {
                throw new Error('Tokens not found');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Failed to log in. Please check your username and password and try again.');
        }
        setIsLoading(false);
    }


    const isLoggedIn=async ()=> {
        try {
            setIsLoading(true);
            let accessToken = await AsyncStorage.getItem('accessToken');
            await refreshAccessToken();
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
            const response = await axios.post('https://1289-2402-4000-2180-9088-9d7d-eff-75a1-eb2e.ngrok-free.app/refresh-token', {}, {
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
        }, 9 * 60 * 1000); // 9 minutes in milliseconds

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
