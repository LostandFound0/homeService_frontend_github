import { useState, useEffect } from 'react';
import '../../assets/css/home.css';
import { FaRegMessage } from "react-icons/fa6";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaServicestack, FaHistory } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Servicepage from '../workerpages/Servicepage';
import UserServicepage from './UserserviceSide';
import Workerorder from '../workerpages/Workerorder';
import UserOrder from './UserOrder';
import Subscription from './Subscription';
import { jwtDecode } from 'jwt-decode';

export default function Homepage() {
    const [toogle, settoogle] = useState(1);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log(token)

    if (!token) {
        navigate('/login');
        return null;
    }

    const decodeusertype = jwtDecode(token);
    const { id, usertype, expiresIn } = decodeusertype;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);

    const toogleBtn = (index) => {
        settoogle(index);
    };

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <main className='homepage'>
                <div className="homepageDesign">
                    <div className="firsthomebar">
                        <h1>Service Harbour</h1>
                        <div className={toogle === 1 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(1) }}>
                            <IoHomeOutline /> Home
                        </div>
                        <div className={toogle === 2 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(2) }}>
                            <FaServicestack /> Service
                        </div>
                        {usertype == 0 && (
                        <div className={toogle === 5 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(5) }}>
                                    <MdOutlineSubscriptions /> Subscription
                                </div>
                        )}
                                <div className={toogle === 6 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(6) }}>
                                    <IoSettingsOutline /> Settings
                                </div>
                        {usertype == 1 && (
                            <>
                                <div className={toogle === 4 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(4) }}>
                                    <FaHistory /> Worker History
                                </div>
                                
                                <div className={toogle === 7 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(7) }}>
                                    <IoSettingsOutline /> Add Service
                                </div>
                            </>
                        )}
                        <div className={toogle === 8 ? "bars activetabs" : "bars"} onClick={() => { toogleBtn(8) }}>
                            <IoSettingsOutline /> User History
                        </div>
                        <div className="bars" onClick={Logout}>
                            <CiLogout /> Logout
                        </div>
                    </div>
                    <div className="homepageContent">
                        {usertype == 0 && (
                            <div className={toogle === 1 ? "homeContents active-content" : "homeContents"}>
                                <h1>Hello Success</h1>
                            </div>
                        )}
                        <div className={toogle === 2 ? "homeContents active-content" : "homeContents"}>
                            <UserServicepage />
                        </div>
                        {usertype == 1 && (
                            <div className={toogle === 4 ? "homeContents active-content" : "homeContents"}>
                                <Workerorder />
                            </div>
                        )}
                        {usertype == 0 && (
                            <div className={toogle === 5 ? "homeContents active-content" : "homeContents"}>
                                <Subscription/>
                            </div>
                        )}
                        <div className={toogle === 6 ? "homeContents active-content" : "homeContents"}>
                            <Profile />
                        </div>
                        {usertype == 1 && (
                            <div className={toogle === 7 ? "homeContents active-content" : "homeContents"}>
                                <h1>Add Service</h1>
                                <Servicepage />
                            </div>
                        )}
                        <div className={toogle === 8 ? "homeContents active-content" : "homeContents"}>
                            <UserOrder />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
