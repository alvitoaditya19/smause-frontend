import { useCallback } from "react";
import { GetControl } from "./dashboard";


export const getStatusLamp1 =(setDataLamp1)=> useCallback(async () => {
    const data = await GetControl();

    if (data.data.lamp1 == "ON") {
        setDataLamp1(true);
    } else {
        setDataLamp1(false);
    }
}, [GetControl]);