import React, { useState, useEffect } from 'react';
import './App.css';
import { Flipper, Flipped } from 'react-flip-toolkit';
import alSeedData from '../data/allongseeddata.json';
import nlSeedData from '../data/nllongseeddata.json';
import images from '../images';

const Seed = ({id, team}) => (
    <div className="seed">
        <p>{id === 1 ? "1st" : id === 2 ? "2nd" : id === 3 ? "3rd" 
            : id === 4 ? "WC" : id === 5 ? "WC" 
            : id === 6 ? "Out" : id === 7 ? "Out" : null}</p>
        <Flipped key={id} flipId={team} stagger={false}>
            <img src={images[team]} title={team} alt={team} />
        </Flipped>
    </div>
);

function App() {
    const [day, setDay] = useState(0);
    const [alSeeds, setAlSeeds] = useState(alSeedData[day].seeds);
    const [nlSeeds, setNlSeeds] = useState(nlSeedData[day].seeds);
    const [playing, setPlaying] = useState(false);
    const [animate, setAnimate] = useState(null);
    // const [delay, setDelay] = useState(550);

    useEffect(() => {
        setAlSeeds(alSeedData[day].seeds);
        setNlSeeds(nlSeedData[day].seeds);
    }, [day]);

    useEffect(() => {
        if(day < alSeedData.length-1 && playing) {
            const animate = setTimeout(() => {
                setAlSeeds(alSeedData[day].seeds);
                setNlSeeds(nlSeedData[day].seeds);
                setDay(day+1);
            }, 600-450*(day/alSeedData.length));
            setAnimate(animate);
        } else {
            setPlaying(false);
        }

        return () => {
            if(animate) clearTimeout(animate);
        }
    }, [day, playing]);

    useEffect(() => {
        if(!playing) clearTimeout(animate);
    }, [playing]);

    return (
        <div id="main-container">
            <h1>2021 Post-Season Seeds</h1>
            <h2>{alSeedData[day].date}</h2>
            <div>
                <div className="league-column">
                    <h3>A.L.</h3>
                    <Flipper flipKey={alSeeds.join('')} spring="stiff">
                        {alSeeds.map((team, i) =>
                            <Seed key={i} id={i+1} team={team} />
                        )}
                    </Flipper>
                </div>
                <div className="league-column">
                    <h3>N.L.</h3>
                    <Flipper flipKey={nlSeeds.join('')} spring="stiff">
                        {nlSeeds.map((team, i) =>
                            <Seed key={i} id={i+1} team={team} />
                        )}
                    </Flipper>
                </div>
            </div>
            <div id="source">
                <a href="https://kroljs.com" target="_blank" rel="noreferrer noopener">kroljs.com/mlb-seeds-2021</a>
            </div>
            <div id="control-panel">
                <input type="button" onClick={() => {setPlaying(false); setDay(0);}} value="FIRST" />
                <input type="button" onClick={() => day > 0 ? setDay(day-1) : null} value="PREV" />
                <input type="button" onClick={() => setPlaying(!playing)} value={playing ? "PAUSE" : "PLAY"} />
                <input type="button" onClick={() => day < alSeedData.length-1 ? setDay(day+1) : null} value="NEXT" />
                <input type="button" onClick={() => {setPlaying(false); setDay(alSeedData.length-1);}} value="LAST" />
            </div>
            <div id="references">
                <span><p>[1]</p><a href="https://www.baseball-reference.com/" target="_blank" rel="noreferrer noopener">baseball-reference.com</a></span>
                <span><p>[2]</p><a href="https://www.mlb.com/news/mlb-2020-postseason-tiebreaker-scenarios" target="_blank" rel="noreferrer noopener">mlb.com</a></span>
            </div>
        </div>
    );
}

export default App;
