import {
    AreaChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Chart({ data, title, focusX, focusY }: any) {
    return (
        <div className=" justify-center mx-auto">
            <h1 className="text-black font-medium lg:text-xl text-base text-center mb-4">{title}</h1>
            <ResponsiveContainer width="100%" height={280} >
                <AreaChart
                    width={500}
                            
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
             
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0%" y1="10%" x2="0%" y2="100%">
                            <stop offset="3%" stopColor="#571EF5" stopOpacity={1} />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity={0.9} />
                            {/* <stop offset="80%" stopColor="#571EF5" stopOpacity={1} /> */}
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={focusY} tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }}  />
                    {/* <YAxis label={{ value: 'test', fill: '#571EF5', angle:'90', position:"insideLeft" }} tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }} /> */}
                    <YAxis tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }} />

                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey={focusX} strokeWidth={3} stroke="#174AFF" fill="url(#colorUv)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}