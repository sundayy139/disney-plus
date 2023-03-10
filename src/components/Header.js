import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { useHistory } from 'react-router-dom';
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            }
        })
    }, [userName])

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut());
                history.push("/login")
            })
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Nav>
            <Humberger onClick={() => setIsOpen(true)}>
                <span></span>
                <span></span>
                <span></span>
            </Humberger>
            <LogoLink href='/home'>
                <Logo src="/images/logo.svg" />
            </LogoLink>
            {
                !userName ?
                    <Login onClick={signIn}>Login</Login> :
                    <>
                        <NavMenu>
                            <NavLink href='/home'>
                                <img src='/images/home-icon.svg' />
                                <span>home</span>
                            </NavLink>
                            <NavLink>
                                <img src='/images/search-icon.svg' />
                                <span>search</span>
                            </NavLink>
                            <NavLink>
                                <img src='/images/watchlist-icon.svg' />
                                <span>watchlists</span>
                            </NavLink>
                            <NavLink>
                                <img src='/images/original-icon.svg' />
                                <span>originals</span>
                            </NavLink>
                            <NavLink>
                                <img src='/images/movie-icon.svg' />
                                <span>movies</span>
                            </NavLink>
                            <NavLink>
                                <img src='/images/series-icon.svg' />
                                <span>series</span>
                            </NavLink>
                        </NavMenu>

                        {
                            isOpen && (
                                <>
                                    <NavMenuExtended>
                                        <Time onClick={() => setIsOpen(false)}>
                                            &times;
                                        </Time>
                                        <NavLinkExtended href='/home'>
                                            <img src='/images/home-icon.svg' />
                                            <span>home</span>
                                        </NavLinkExtended>
                                        <NavLinkExtended>
                                            <img src='/images/search-icon.svg' />
                                            <span>search</span>
                                        </NavLinkExtended>
                                        <NavLinkExtended>
                                            <img src='/images/watchlist-icon.svg' />
                                            <span>watchlists</span>
                                        </NavLinkExtended>
                                        <NavLinkExtended>
                                            <img src='/images/original-icon.svg' />
                                            <span>originals</span>
                                        </NavLinkExtended>
                                        <NavLinkExtended>
                                            <img src='/images/movie-icon.svg' />
                                            <span>movies</span>
                                        </NavLinkExtended>
                                        <NavLinkExtended>
                                            <img src='/images/series-icon.svg' />
                                            <span>series</span>
                                        </NavLinkExtended>
                                    </NavMenuExtended>
                                </>
                            )
                        }

                        <SignOut>
                            <UserImg src={userPhoto} />
                            <DropDown onClick={signOut}>
                                Sign Out
                            </DropDown>
                        </SignOut>

                    </>
            }
        </Nav>
    )
}

export default Header


const Nav = styled.nav`
    height: 70px;
    width: 100%;
    background: #090b13;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    position: fixed;
    z-index: 2;

    @keyframes showSidebar {
        0% {
            transform: translateX(-300px);
  }
  100% {
            transform: translateX(0);
  }
    }

    @keyframes hideSidebar {
        0% {
            transform: translateX(0);
  }
  100% {
            transform: translateX(-300px);
  }
    }

    @media (max-width: 890px) {
        padding: 0;
    }
`

const NavLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: #f9f9f9;
    
    &:hover {
        span:after {
            transform: scaleX(1);
            opacity: 1;
        }
    }

    @media (max-width: 890px) {
        margin: 20px 50px;
    }
`

const LogoLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
`

const Logo = styled.img`
    width: 80px;
    cursor: pointer;
`

const NavMenu = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 20px;
    }

    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        text-transform: uppercase;
        position: relative;

        &:after {
            content: "";
            height: 2px;
            background: white;
            position: absolute;
            right: 0;
            left: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
    }
    
    @media (max-width: 890px) {
        display: none;
    }
`

const NavMenuExtended = styled.div`
    z-index: 1000;
    display: flex;
    align-items: center;
    height: 100vh;

    img {
        height: 20px;
        margin-right: 5px;
    }

    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        text-transform: uppercase;
        position: relative;

        &:after {
            content: "";
            height: 2px;
            background: white;
            position: absolute;
            right: 0;
            left: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
    }

    @media (min-width: 891px) {
        display: none;
    }

    @media (max-width: 890px) {
        flex-direction: column;
        position: absolute;
        align-items: flex-start;
        background-color: #090b13;
        top: 0;
        left: 0px;
        animation: showSidebar .4s;
    }
`

const Time = styled.div`
    align-self: flex-end;
    padding: 8px 10px;
    font-size: 40px;
    cursor: pointer;
`

const NavLinkExtended = styled(NavLink)`
    
`

const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    cursor: pointer;

    
`
const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    text-transform: uppercase;
    border-radius: 4px;
    letter-spacing: 1.5px;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 0.2s ease 0s;
    float: right;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const DropDown = styled.div`
    position: absolute;
    top: 54px;
    right: 0;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.3);
    border-radius: 4px;
    box-shadow: rgb(0, 0, 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    letter-spacing: 2px;
    width: 100px;
    opacity: 0;
    z-index: 1;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &::before {
        content: '';
        width: 100px;
        height: 10px;
        position: absolute;
        bottom: -10px;
        right: 0;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
    
    @media (max-width: 890px) {
        padding: 0 36px 0 0;
        width: 84px;
    }
`

const Humberger = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 1;
    padding: 0 0 0 36px;

    span {
        width: 25px;
        height: 2px;
        margin-bottom: 4px;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    @media (min-width: 891px) {
        display: none;
    }
`


