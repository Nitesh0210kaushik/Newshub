import React from 'react';
import Cookies from 'js-cookie';

const Logout = () => {
    const handleLogout = () => {
        // Clear the cookie to log out the user
        Cookies.remove('isLoggedIn');

        // Redirect the user to the login page or homepage after logging out
        window.location.href = '/login'; // Replace '/login' with your desired destination
    };

    return ( <
        button onClick = { handleLogout } > Logout < /button>
    );
};

export default Logout;