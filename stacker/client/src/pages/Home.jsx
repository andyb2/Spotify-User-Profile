import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/User";
import Following from "../components/Following";
import '../components/styles/Home.css';
import Sidebar from "../components/Sidebar";
import RecentlyPlayed from "../components/RecentlyPlayed";
import UsersTopArtist from "../components/UsersTopArtist";
import { userDataRequest,
         userGetFollowing,
         getRecentlyPlayed,
         getUserTopArtists,
         getUserTopSongs, 
         getUserPlaylists } from "../app/thunk";
import { setDimension } from "../app/reducer/viewport";
import { Routes, Route, useLocation } from "react-router-dom";
import UsersTopSongs from "../components/UsersTopSongs";
import Playlist from "../components/Playlist";
import RecentlyPLayed from "../components/RecentlyPlayed";

const Home = ({ auth }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const main = useRef();
    const viewPort = useSelector((state) => state.dimension)

    useEffect(() => {
        const getUsersData = () => {
            dispatch(userDataRequest());
            dispatch(userGetFollowing());
            dispatch(getRecentlyPlayed());
            dispatch(getUserTopArtists());
            dispatch(getUserTopSongs());
            dispatch(getUserPlaylists());
        }
        getUsersData();
    }, [auth]);

    useEffect(() => {
        main.current.scrollTo(0, 0)
    }, [pathname]);

      
    useEffect(() => {
        const getWidthOfViewPort = () => {
            dispatch(setDimension(window.innerWidth));
        }
        window.addEventListener('resize', getWidthOfViewPort);
        return(() => {
            window.removeEventListener('resize', getWidthOfViewPort);
        })
    }, [viewPort]);

    return (
        <div className="home-grid">
            <Sidebar />
                <div className='main' ref={main}>
                        <Routes>
                            <Route exact path="/" element={
                                <>
                                    <User />
                                    { viewPort.dimension > 696 ?
                                    <div style={{display: 'flex', width: '100%', gap: '1rem', justifyContent: 'center'}}>
                                        <RecentlyPlayed /> 
                                        <UsersTopArtist /> 
                                    </div>
                                    : <RecentlyPlayed />
                                    }
                                </>
                            }/>
                            <Route exact path="/following" element={<Following />} />
                            <Route exact path="/topArtist" element={<UsersTopArtist />} />
                            <Route exact path="/topSongs" element={<UsersTopSongs />} />
                            <Route exact path="/playlists" element={<Playlist />} />
                            <Route exact path="/recent" element={<RecentlyPLayed />} />
                        </Routes>
                </div>
        </div>
    )
}

export default Home;