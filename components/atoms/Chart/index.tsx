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

export default function Chart({ data, title }: any) {
    return (
        <div className=" justify-center mx-auto">
            <h1 className="text-black font-medium text-2xl text-center">{title}</h1>
            <ResponsiveContainer width="100%" height={400} >
                <AreaChart

                    width={500}
                    height={400}
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
                    <XAxis dataKey="name" tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }}  />
                    {/* <YAxis label={{ value: 'test', fill: '#571EF5', angle:'90', position:"insideLeft" }} tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }} /> */}
                    <YAxis tick={{ fill: '#571EF5' }} tickLine={{ stroke: '#571EF5' }} />

                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="priceUsd" strokeWidth={3} stroke="#4D17E2" fill="url(#colorUv)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}