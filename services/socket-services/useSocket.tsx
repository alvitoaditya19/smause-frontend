// import {useContext, createContext, useState, useEffect} from "react";
// import {io, Socket} from "socket.io-client";
// import {SoilDataTypes} from "../data-types";

// type Context = {
//     chartData: Array<SoilDataTypes>;
// }

// const SocketContext = createContext<Context>({
//     chartData: [],
// });

// const SocketsProvider = (props: any) => {

//     const [chartData, setChartData] = useState();

//     useEffect( () => {
//         const socket: Socket = io("http://***.***.***.***");

//         socket.on('initial_data', (data) => {
//             console.log(data);
//             setChartData(data);
//         });

//         socket.on('new_data', (data) => {
//             console.log(data);
//         });

//         return () => { socket.disconnect() };
//     },[]);

//     return (
//         <SocketContext.Provider value={{chartData}} {...props} />
//     );
// }

// const useSocket = () => useContext(SocketContext);

// export { SocketsProvider, useSocket };

// // how to use in client page

// // return ( 
// //     {CharData ? <Heading /> ... : null }
// //  )

import React from 'react'

export default function useSocket() {
  return (
    <div>useSocket</div>
  )
}
