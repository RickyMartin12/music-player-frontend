import { backIcon } from '../../assets';
import { baseURL } from '../../config';
import './style.css';

const AudioList = ({
    onBackButtonPress, audioList, onTrackSelect
}) => {

    //console.log({ audioList });

    
    return(
        <div className='audio-ls p-20'>
            <div onClick={onBackButtonPress} className='audio-ls-header'>
                <img src={backIcon} />
            </div>


            <ul>
                {
                    audioList.length ? audioList.map((item, index) => (
                        <li onClick={() => onTrackSelect(index)} key={index} className='audio-ls-container'>
                            <div className='audio-ls-item flex align-center ptb-5'>
                                <div className='audio-img'>
                                    <img src={`${baseURL}/${item.avatar}`} />
                                </div>
                                <div className='audio-info mtr-10'>
                                    <p>{item.title}</p>
                                    <p>{item.artist}</p>
                                </div>
                            </div>
                        </li>
                    )) : <p style={{ fontSize: '16px', textAlign: 'center'}}>Não existe musicas disponiveis</p>
                }
                
            </ul>
        </div>
    );
}

export default AudioList;