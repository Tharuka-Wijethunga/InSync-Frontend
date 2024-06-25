

import { Alert } from 'react-native';

//password validation
export const is_valid_password = (password) => {
    if (password.length < 8) {
        Alert.alert('Validation Error', 'Password must be at least 8 characters long');
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        Alert.alert('Validation Error', 'Password must contain at least one uppercase letter');
        return false;
    }

    if (!/[a-z]/.test(password)) {
        Alert.alert('Validation Error', 'Password must contain at least one lowercase letter');
        return false;
    }

    if (!/[0-9]/.test(password)) {
        Alert.alert('Validation Error', 'Password must contain at least one digit');
        return false;
    }

    if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
        Alert.alert('Validation Error', 'Password must contain at least one special character');
        return false;
    }

    return true;
};


// Full name validation
export const is_valid_fullName = (fullName) => {
    const fullNameLetters = fullName.replace(/[.\s]/g, '');
    if (fullNameLetters.length < 4) {
        Alert.alert('Validation Error', 'Full name must have at least 4 letters');
        return false;
    }

    const fullNameRegex = /^[a-zA-Z\s.]+$/;
    if (!fullNameRegex.test(fullName)) {
        Alert.alert('Validation Error', 'Full name must contain only alphabetic characters, spaces, and dots');
        return false;
    }

    return true;
};


// Email validation

export const is_valid_email = (email) => {
    // Define a list of valid top-level domains including
    const validTLDs = ['com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'lk'];


    const emailRegex = /^[^\s@]+@[^\s@]+\.(\w+)$/;
    const match = email.match(emailRegex);

    if (!match) {
        Alert.alert('Validation Error', 'Please enter a valid email address');
        return false;
    }

    const domainExtension = match[1].toLowerCase();

    if (!validTLDs.includes(domainExtension)) {
        Alert.alert('Validation Error', `Domain extension .${domainExtension} is not allowed`);
        return false;
    }

    return true;
};
