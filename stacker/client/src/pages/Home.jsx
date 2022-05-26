import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import User from "../components/User";
import Following from "../components/Following";
import '../components/styles/Home.css';
import Sidebar from "../components/sidebar/Siderbar";
import RecentlyPlayed from "../components/RecentlyPlayed";
import UsersTopArtist from "../components/UsersTopArtist";
import { userDataRequest, userGetFollowing, getRecentlyPlayed, getUserTopArtists, getUserTopSongs } from "../app/thunk";
import { Routes, Route } from "react-router-dom";
import UsersTopSongs from "../components/UsersTopSongs";

const Home = ({ auth }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsersData = () => {
            dispatch(userDataRequest());
            dispatch(userGetFollowing());
            dispatch(getRecentlyPlayed());
            dispatch(getUserTopArtists());
            dispatch(getUserTopSongs());
        }
        getUsersData();
    }, [auth]);

    return (
        <div className="home-grid">
            <Sidebar />
            {/* <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}> */}
                <div className='main'>
                        <Routes>
                            <Route exact path="/" element={<><User /><RecentlyPlayed /></>} />
                            <Route exact path="/following" element={<Following />} />
                            <Route exact path="/topArtist" element={<UsersTopArtist />} />
                            <Route exact path="/topSongs" element={<UsersTopSongs />} />
                        </Routes>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Home;