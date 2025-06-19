import React, { useRef, useState } from 'react';

function CustomAudioPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // 更新播放进度
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button onClick={handlePlayPause}>
                {isPlaying ? '暂停音乐' : '播放音乐'}
            </button>

            <audio
                ref={audioRef}
                src="/music/whatif.flac"
                onTimeUpdate={handleTimeUpdate} // 每次播放进度更新时触发
            />

            {/* 自定义进度条 */}
            <div>
                <div style={{ width: `${progress}%`, backgroundColor: 'green', height: '5px' }} />
            </div>
        </div>
    );
}

export default CustomAudioPlayer;
