import Loader from '../../components/Loader/Index';
import Main from '../../components/Main/Index';
import Hero from '../../components/Hero/Index';
import Music from '../../components/Music/Index';
import { useState } from 'react';

function HomePage() {

    const [isLoading, setIsLoading] = useState(
        localStorage.getItem("hasLoaded") !== "true" // 检查是否已加载过
    );

    const handleLoadComplete = () => {
        localStorage.setItem("hasLoaded", "true");
        setIsLoading(false);
    };

    return (
        <div className="home-page">
            <Hero />
            <Main />
            <Music />

            {/* 覆盖在顶部的 Loader */}
            {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
        </div>
    );
}

export default HomePage;