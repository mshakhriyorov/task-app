import React from 'react';
import { Typography } from 'antd';
import "antd/dist/antd.css";
import Typical from 'react-typical';
import './App.css';




const { Title } = Typography;

const PreHome = () => {
    return (
        <>
            <Title>
                Welcome
                <Typical
                    loop={Infinity}
                    wrapper="b"
                    steps={[
                        ' Home',
                        2000,
                        ' Task Application',
                        2000,
                        ' React App',
                        2000
                    ]}
                />
            </Title>
            <p className='paragraph'>By Logging in You can see users' information and, at the the same time, you have a profile. Dark and light mode, responsive design, pagination, etc. Have a look at :) <i>P.s: Recommended with your Google account</i> </p>
        </>
    )
}

export default PreHome;
