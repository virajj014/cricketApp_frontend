"use client"
import Link from 'next/link'
import React from 'react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import './Navbar.css'


const Navbar = () => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)


    const checkLogin = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    setLoggedIn(true)
                }
                else {
                    setLoggedIn(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setLoggedIn(false)
            })
    }
    const handleLogout = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log(response)
            if (response.ok) {
                window.location.href = "/auth/signin"
            }

        })
        .catch((error) => {
            console.log(error)
            window.location.href = "/auth/signin"

        })
    }

    React.useEffect(() => {
        checkLogin()
    }, [])
    return (
        <nav>
            <div className='left'>
                <h1>Cricket Rank</h1>
            </div>

            <div className='right'>
                {
                    loggedIn ?
                        <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                        :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>

                }

                <Link href="/profile" className='linkstylenone'>
                    <BiUserCircle className='theme_icon1' />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar