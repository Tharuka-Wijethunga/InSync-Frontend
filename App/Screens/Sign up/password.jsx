

import { Alert } from 'react-native';

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
