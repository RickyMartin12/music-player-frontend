import { useState, useEffect, useRef } from 'react';
import { closeIcon, homeIcon, nextIcon, pauseGreyIcon, playBlackIcon, playGreyIcon, prevIcon, userIcon } from '../../assets';
import { baseURL } from '../../config';
import AudioList from '../AudioList';
import AudioPlayer from '../AudioList/AudioPlayer';
import './style.css';

const FixFooter = ({ trackIndex, audioList }) => {

    const [slideUp, setSlideUP] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    const {
        title = "",
        artist = "",
        avatar = "",
        audioFile = "",
      } = currentTrackIndex !== -1 ? audioList[currentTrackIndex] : {};

      const audioSrc = `${baseURL}/${audioFile}`;
      const audioRef = useRef(new Audio(audioSrc));
      const intervalRef = useRef();

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
        setTrackProgress(audioRef.current.currentTime);
        }, 1000);
    };

    const onChangeTrackProgress = (e) => {
        setTrackProgress(e.target.value);
        audioRef.current.currentTime = e.target.value;
      };

      const nextTrack = () => {
        if(currentTrackIndex < audioList.length - 1)
        {
            setCurrentTrackIndex(prevIndex => prevIndex + 1);
        }
        else
        {
            setCurrentTrackIndex(0);
        }
        
      }

      const prevTrack = () => {
        if(currentTrackIndex)
        {
            setCurrentTrackIndex(prevIndex => prevIndex - 1);
        }
        else
        {
            setCurrentTrackIndex(audioList.length - 1);
        }
        
      }



      useEffect(() => {
        console.log({audioFile});
        clearInterval(intervalRef.current);
        setCurrentTrackIndex(trackIndex);
      }, [trackIndex]);

      useEffect(() => {
  
        
           // if a music is already playing then we will stop it and assign currently selected one
          audioRef.current.pause();
          // new audio initialize
          audioRef.current = new Audio(audioSrc);
          //playing initialize audio
          audioRef.current.play();
        
       
            setIsPlaying(true);

            startTimer();


        //setCurrentTrackIndex(trackIndex);
      }, [currentTrackIndex]);

      useEffect(() => {
        if(isPlaying)
        {
            audioRef.current.play();
            startTimer();
        }
        else
        {
            audioRef.current.pause();
            clearTimeout(intervalRef.current);
        }
      }, [isPlaying]);

    //console.log({ currentTrackIndex, audioFile });

    return(
        <div className={`fix-footer ${currentTrackIndex !== -1 ? '_h60' : '_h115 '} ${slideUp ? 'active' : ''}`}>
            <div onClick={() => setSlideUP(!slideUp)} className='slide-up-btn'>

            </div>
            <div className='d-visibility'></div>

            {
                slideUp && <AudioPlayer
                title={title}
                artist={artist}
                avatar={avatar}
                duration={audioRef.current.duration}
                trackProgress={trackProgress}
                onChangeTrackProgress={onChangeTrackProgress}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                isPlaying={isPlaying}
                nextTrack={nextTrack}
                prevTrack={prevTrack}
                 />
            }

            {
                !slideUp && (
                    <>
                    {
                        trackIndex !== -1 && (
                            <div className='mini-player flex justify-sb align-center mtb-10'>
                            <div className='flex'>
                                <div className='artist-cover-img'>
                                    <img src={`${baseURL}/${avatar}`} />
                                </div>
                                <div className='mini-player-info mtr-10'>
                                    <p>{title}</p>
                                    <p>{artist}</p>
                                </div>
                            </div>
                            <div className='mini-player-control flex'>
                                <button onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <img src={pauseGreyIcon} /> : <img src={playGreyIcon} />  }
                                </button>
                                <button>
                                    <img src={closeIcon} />
                                </button>
                            </div>
                        </div>
                        )
                    }
                    <div className='navigation-menu flex justify-evenly'>
                            <a>
                                <div>
                                    <img src={homeIcon} />
                                </div>
                                <div>
                                    <span>Home</span>
                                </div>


                            </a>
                            <a>
                                <div>
                                    <img src={userIcon} />
                                </div>
                                <div>
                                    <span>Perfil</span>
                                </div>
                            </a>
                        </div>
                    </>
                )
            }

                
            
        </div>
    );
}

export default FixFooter;