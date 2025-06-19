import Hero from '../../components/Hero/Index';
import Main from '../../components/Main/Index';
import CardContent from '../../components/CardContent/Index';
import { Outlet } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-page">
            <Hero />
            <Main />
            <CardContent />
            <Outlet />
        </div>
    );
}

export default HomePage;