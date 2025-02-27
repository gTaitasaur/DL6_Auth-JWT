import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

const Profile = () => {
    const navigate = useNavigate();
    const [developer, setDeveloper] = useState(null);

    const getDeveloperData = () => {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            console.error('Token not found in sessionStorage');
            navigate('/');
            return;
        }

        axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                console.log('Data received:', data);
                setDeveloper(data);
            })
            .catch(({ response: { data } }) => {
                console.error('Error fetching developer data:', data);
                window.sessionStorage.removeItem('token');
                navigate('/');
            });
    };

    useEffect(() => {
        getDeveloperData();
    }, []);

    return (
        <div className='py-5'>
            <h1>
                Bienvenido <span className='fw-bold'>{developer?.email}</span>
            </h1>
            <h3>
                {developer?.rol} en {developer?.lenguage}
            </h3>
        </div>
    );
};

export default Profile;