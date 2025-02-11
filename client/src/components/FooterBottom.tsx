import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-2 fixed-bottom">
            <div className="container d-flex justify-content-end align-items-center">
                <div className="ms-auto d-flex align-items-center">
                    <p className="mb-0 me-2" style={{ fontSize: '0.875rem' }}>Powered by Ticketmaster</p>
                    <a 
                        href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white"
                        style={{ fontSize: '0.875rem' }}
                    >
                        Discover API
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;