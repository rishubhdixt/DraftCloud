import React, { useState, useEffect } from 'react';
import { Container, LogOutBtn, Logo } from "../index";
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [isFixed, setIsFixed] = useState(false);

   
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header
            className={`${
                isFixed
                    ? 'fixed top-0 left-0 w-full z-50 shadow-md'
                    : 'relative top-0 left-0 w-full'
            } bg-gradient-to-r from-gray-800 via-gray-900 to-black`}
        >
            <Container>
                <nav className='flex items-center justify-between py-4'>
                    <div className='flex items-center'>
                        <Link to='/'>
                            <Logo className="w-16 h-auto text-white" />
                        </Link>
                        <h1 className="text-white text-3xl font-bold ml-2">DraftCloud</h1>
                    </div>
                    <ul className='flex space-x-6'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogOutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;

