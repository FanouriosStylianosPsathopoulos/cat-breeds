import React from 'react';

interface BodyProps {
    children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
    return <main className="flex-grow p-4">{children}</main>;
};

export default Body;
