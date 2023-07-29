import { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

function MusicPlayer({ src }) {
    const audioRef = useRef(null);
    const tooltipRef = useRef(null);
    const [volume, setVolume] = useState(50); 
    const [isAdjustingVolume, setIsAdjustingVolume] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        
        const tooltip = tooltipRef.current;
        tooltip.style.left = `calc(${volume}%)`;
        
        if (isAdjustingVolume) {
            tooltip.classList.add(styles.show);
        } else {
            tooltip.classList.remove(styles.show);
        }
    }, [volume, isAdjustingVolume]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
        <div className={styles['music-player']}>
            <audio src={src} autoPlay loop ref={audioRef} />
            <div className={styles['volume-control']}>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className={styles['slider']} 
                    onMouseDown={() => setIsAdjustingVolume(true)}
                    onMouseUp={() => setIsAdjustingVolume(false)}
                    onMouseOut={() => setIsAdjustingVolume(false)}
                />
                <div className={styles['tooltip']} ref={tooltipRef}>{volume}</div>
            </div>
        </div>
    );
}

export default MusicPlayer;
