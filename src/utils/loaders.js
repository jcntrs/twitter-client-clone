import React from 'react';
import ContentLoader from 'react-content-loader';

export const ProfileTitleLoader = () => (
    <ContentLoader
        height={19}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 33"
    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="4" ry="4" width="300" height="13" />
        <rect x="0" y="23" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
);

export const ProfileInfoLoader = () => (
    <ContentLoader
        height={140}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 70"
    >
        {/* Only SVG shapes */}
        <rect x="10" y="3" rx="4" ry="4" width="150" height="7" />
        <rect x="10" y="15" rx="3" ry="3" width="75" height="5" />
        <rect x="10" y="30" rx="3" ry="3" width="200" height="6" />
        <rect x="10" y="45" rx="4" ry="4" width="300" height="7" />
    </ContentLoader>
);