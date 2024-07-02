import React from 'react';
import {Text, Box, VStack, View} from "native-base";
import {Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { decode as atob, encode as btoa } from 'base-64'
if (!global.btoa) { global.btoa = btoa }
if (!global.atob) { global.atob = atob }

export default function Helptoken(){
    const getTokens = async () => {
        try {
            // Get the tokens from AsyncStorage
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            // Print the tokens in the console
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
        } catch (error) {
            console.error('Error getting tokens:', error);
        }
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage has been cleared!');
        } catch (error) {
            console.error('Failed to clear the async storage.');
        }
    }

    const refreshAccessToken = async () => {
        try {
            // Get the refresh token from AsyncStorage
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            // Make a POST request to the /refresh-token endpoint
            const response = await axios.post('https://7113-104-28-210-102.ngrok-free.app/refresh-token', {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            // Get the new access token from the response
            const newAccessToken = response.data.access_token;

            // Update the access token in AsyncStorage
            await AsyncStorage.setItem('accessToken', newAccessToken);

            // Print a success message in the console
            console.log('Access token has been refreshed.');
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    }

    const checkTokenValidity = async () => {
        try {
            // Get the access token from AsyncStorage
            const accessToken = await AsyncStorage.getItem('accessToken');

            // Decode the token
            const decodedToken = jwtDecode(accessToken);

            // Check the token's expiration time
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp > currentTime) {
                console.log('The access token is still valid.');
            } else {
                console.log('The access token has expired.');
            }
        } catch (error) {
            console.error('Error checking token validity:', error);
        }
    }

    const getUserData = async () => {
        try {
            // Get the access token from AsyncStorage
            let accessToken = await AsyncStorage.getItem('accessToken');

            // Make a GET request to the /me endpoint
            let response = await axios.get('https://7113-104-28-210-102.ngrok-free.app/me', {

            });

            // If the request fails because the token is expired, refresh the token
            if (response.status === 401) {
                await refreshAccessToken();
                accessToken = await AsyncStorage.getItem('accessToken');
                response = await axios.get('https://7113-104-28-210-102.ngrok-free.app/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }

            // Print the returned data in the console
            console.log('User Data:', response.data);
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    }

    return(
        <View paddingY={3} flex={1}>
            <Box backgroundColor={"white"} h={"97%"} w="94%" overflow={"hidden"} rounded="2xl" alignSelf="center" shadow={3} flex={1}  >
                <Button title="Get Tokens" onPress={getTokens} />
                <Button title="Clear Storage" onPress={clearStorage} />
                <Button title="Check Token Validity" onPress={checkTokenValidity} />
                <Button title="Get User Data" onPress={getUserData} />
                <Button title="Refresh Access Token" onPress={refreshAccessToken} />
            </Box>
        </View>
    )
}

