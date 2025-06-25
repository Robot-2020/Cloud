import Loader from '../../components/Loader/Index';
import Main from '../../components/Main/Index';
import Hero from '../../components/Hero/Index';
import Music from '../../components/Music/Index';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 如果是从导航跳转来的，直接进入主页
        if (location.state?.fromNav) {
            setIsLoading(false);
        } else {
            // 否则（刷新或直接访问），检查是否已加载过
            setIsLoading(true);
        }
    }, [location.state]);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (

        <div className="home-page">
            {/* 覆盖在顶部的 Loader */}
            {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
            <Hero />
            <Main />
            <Music />
        </div>
    );
}

export default HomePage;