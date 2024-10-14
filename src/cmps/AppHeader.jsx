import { NavLink } from 'react-router-dom'

export function AppHeader() {

	return <header className="app-header full main-layout">
        <div className="header-contents">
            <h1>Bugs are Forever</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/bug">Bugs</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
        </div>
    </header>
}
