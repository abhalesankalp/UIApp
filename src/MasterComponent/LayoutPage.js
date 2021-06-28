import React from 'react'
import FooterPage from './FooterPage';
import HeaderPage from './HeaderPage';
import UserList from '../adminComponents/UserList';

function LayoutPage() {
    
    return (
        <div>
            <HeaderPage />
            <UserList/>
            <FooterPage />
        </div>
    );
}

export default LayoutPage;