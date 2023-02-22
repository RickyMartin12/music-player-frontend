import { useEffect, useState } from "react";
import { baseURL } from "../../config";
import './style.css';

const Tabs = ({tabData, onItemSelect}) => {
    console.log({tabData});

    const [touched, setTouched] = useState(false);
    const [active, setActive] = useState('');

    const getActiveClass = (tab) => {
        return touched ? 
        active === tab ? 'active' : '' 
        : tabData[tab].isActive ? 'active' : '';
    }


    return(
        <div className='tab-container'>

            <div className='tab-header flex'>
            {tabData && Object.keys(tabData).map((tab, index) => (
            <a
              key={index}
              className={`${getActiveClass(tab)}`}
              href={`#${tab}`}
              onClick={() => {
                setTouched(true);
                setActive(tab);
              }}
            >
              {tabData[tab].label}
            </a>
          ))}
            </div>

            <div className='tab-contents'>

            {tabData && Object.keys(tabData).map((tab, index) => (
                <div key={index} className={`tab-content ${getActiveClass(tab)}`} id={`${tab}`}>
                    <div className='content-wrapper flex justify-sb m-20'>

                        {
                            tabData[tab].items.map((item, _index) => (
                                <>
                                <div key={_index} onClick={() => onItemSelect(tab, item.key)} className='content-item m-10'>
                                    <div className="d-visibility z-0"></div>
                                    <img src={`${baseURL}/music/${item.key}/${item.key}.jpg`}/>
                                    <div className="content-label flex justify-center align-center">
                                        {item.label}
                                    </div>
                                </div>
                                </>
                            ))
                        }
                        
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Tabs;