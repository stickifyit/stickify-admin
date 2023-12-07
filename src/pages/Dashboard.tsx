import Navbar from "@/components/Navbar";
import { BackendHost } from "@/constants/backend";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import axios from "axios";
import React, { useEffect , useState} from "react";

type Props = {};


type Data = {
  orders: number
  totalPrice: number
  delivered: number
  confirmed: number
}

const Dashboard = (props: Props) => {
  const [data,setData] = useState<Data>({
    orders: 0,
    totalPrice: 0,
    delivered: 0,
    confirmed: 0
  })
  useEffect(() => {
    axios.get<Data>(BackendHost+"/orders/dashboard").then((res) => {
      setData(res.data)
    })
  },[])
  return (
    <div className="h-screen container ">
      <Card className="max-w-md mt-8">
        <CardHeader>
          <CardTitle>Last Week Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <h1 className="text-5xl font-medium flex justify-between">
            <span className="text-2xl">Profit</span>{" "}
            <span>{(data.totalPrice).toFixed(2)}Dh</span>
          </h1>
          <hr />
          <h1 className="text-3xl font-medium flex justify-between">
            <span className="text-2xl">Orders</span> <span>{data.orders}</span>
          </h1>
          <hr />
          <h1 className="text-3xl font-medium flex justify-between">
            <span className="text-2xl">Confirmed</span> <span>{data.confirmed}</span>
          </h1>
          <hr />
          <h1 className="text-3xl font-medium flex justify-between">
            <span className="text-2xl">Delivered</span> <span>{data.delivered}</span>
          </h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
