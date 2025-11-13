
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavbarComponent: React.FC = () => {

    const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    
        const baseClasses = "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out";
        
        if (isActive) {
        
            return `${baseClasses} bg-blue-600 text-white shadow-md`;
        }
    
        return `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    };

    return (
        <nav className="bg-gray-800 shadow-xl">
            
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row items-center justify-between min-h-16 py-3 md:py-0">
                    
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                            Atlantis
                        </Link>
                    </div>
                    
                    
                    <div className="flex flex-wrap justify-center md:justify-end items-baseline space-x-2 sm:space-x-4 mt-3 md:mt-0">
                        <NavLink to="/" className={getLinkClass} end>
                            Clientes
                        </NavLink>
                        <NavLink to="/hospedagem" className={getLinkClass}>
                            Hospedagem
                        </NavLink>
                        <NavLink to="/acomodacoes" className={getLinkClass}>
                            Acomodações
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;