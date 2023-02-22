import { nextIcon, pauseBlackIcon, playBlackIcon, prevIcon } from '../../assets';
import { baseURL } from '../../config';

const AudioPlayer = ({
    title,
    artist,
    avatar,
    duration,
    trackProgress,
    onChangeTrackProgress,
    onPlayPause,
    isPlaying,
    nextTrack,
    prevTrack,
}) => {

    const currentProgess = (trackProgress / duration) * 100;
    console.log({ currentProgess }); 

    const trackProgressStyling = `linear-gradient(to right, #ffffff ${currentProgess}%, grey ${currentProgess}% )`;

    return (
        <div className='audio-player-lg'>
                        <div className='audio-cover-lg-img'>
                            <img src={`${baseURL}/${avatar}`}/>
                        </div>

                        <div>
                            <p>{title} </p>
                            <p>{artist}</p>
                        </div>

                        <div className='audio-player-progress'> 
                            <input 
                                type="range"
                                min={'0'}
                                max={duration}
                                value={trackProgress}
                                onChange={onChangeTrackProgress}
                                style={{background:trackProgressStyling}}
                            />    
                        </div>
                        <div className='audio-controls flex justify-sb'> 
                            <button onClick={prevTrack}>
                                <img src={prevIcon} />
                            </button>

                            <div className='play-pause-btn'>
                                <button onClick={onPlayPause}>
                                    {isPlaying ? (
                                    <img style={{ marginTop: "5px" }} src={pauseBlackIcon} />
                                    ) : (
                                    <img
                                        style={{ marginLeft: "5px", marginTop: "5px" }}
                                        src={playBlackIcon}
                                    />
                                    )}
                                </button>
                            </div>

                            <button onClick={nextTrack}>
                                <img src={nextIcon} />
                            </button>
                        </div>
                    </div>
    );

} 

export default AudioPlayer;