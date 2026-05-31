import { Link } from 'react-router';

function Header({title}) {
    return (
        <header className='header'>
            <div className='header-wrap'>
                <h1>{title}</h1>
                <nav className='navbar'>
                    <Link to="/">Home</Link>
                    <Link to="/summary">Summary</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;