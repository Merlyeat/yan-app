import { useEffect, useRef, useState } from 'react';
import styles from './MusicPlayer.module.css';

function MusicPlayer({ src }) {
    const audioRef = useRef(null);
    const tooltipRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioAnalyserRef = useRef(null);
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

        // Audio Visualizer Setup
        if (!audioContextRef.current) {
            setupAudioProcessing();
            createVisualizer();
        }

    }, [volume, isAdjustingVolume]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const setupAudioProcessing = () => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        audioAnalyserRef.current = audioContextRef.current.createAnalyser();
        const audioSrc = audioContextRef.current.createMediaElementSource(audioRef.current);
        audioSrc.connect(audioAnalyserRef.current);
        audioAnalyserRef.current.connect(audioContextRef.current.destination);
    };

    const createVisualizer = () => {
        const bufferSize = 128; // Lower this number for fewer bars
        audioAnalyserRef.current.fftSize = bufferSize;
        const bufferLength = audioAnalyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvasContext = canvasRef.current.getContext('2d');

        const draw = () => {
            if (!canvasRef.current) {
                return;
            }
        
            requestAnimationFrame(draw);
            audioAnalyserRef.current.getByteFrequencyData(dataArray);
        
            const canvasContext = canvasRef.current.getContext('2d');
        
            canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            const barWidth = (canvasRef.current.width / bufferLength) * 1; // Increase this number for wider bars
            let barHeight;
            let x = 0;
            
            const gradient = canvasContext.createLinearGradient(0, 0, 0, canvasRef.current.height);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1, 'blue');
        
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 1; // Lower the reaction
        
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(x, canvasRef.current.height - barHeight / 2, barWidth, barHeight);
        
                x += barWidth + 2;
            }
        };
        

        draw();
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
            <canvas ref={canvasRef} className={styles['audio-visualizer']} />
        </div>
    );
}

export default MusicPlayer;
