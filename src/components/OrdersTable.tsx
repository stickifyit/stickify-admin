import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/src/components/ui/table"
import { useCurrentContainer } from "@/store/currentContainer"
import axios from "axios"
import { Coffee, Shirt, Sticker } from "lucide-react"
import { useEffect, useState } from "react"





  type Order = {
    _id: string;
    customerId: string;
    closed: boolean;
    number: string;
    fullName: string;
    address: string;
    state: string;
    cart: any[]; // You might want to replace 'any[]' with a more specific type for the 'cart' property
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
   
  export function OrdersTable() {
    const {reload} = useCurrentContainer()
    const [orders,setOrders] = useState<Order[]>([])
    const [selected,setSelected] = useState<Order|null>(null)

    useEffect(()=>{
        axios.get<Order[]>("http://localhost:3001/orders/all").then(res=>{
            setOrders(res.data)
            console.log(res.data)
        })
    },[reload])

    return (
    <div className="flex gap-3">
      <div className="flex-1">
        <h1 className='text-4xl py-6'>Orders</h1>
        <Card className="py-4 px-2">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="">FullName</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Cart Items</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {orders.map((order,i) => {
                  //  const service = order.serviceType 
                    return(
                    <TableRow key={i} onClick={()=>setSelected(order)}>
                    <TableCell className="font-medium">
                      {order.fullName}
                    </TableCell>
                    <TableCell>{order.number}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.cart.length} item{order.cart.length>1 && "s"}</TableCell>
                    <TableCell className="text-right">0Dh</TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
        </Card>
      </div>
      <Card className="w-[600px] bg-white ">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
            <h1 className="text-xl">name : {selected?.fullName}</h1>
            <h1 className="text-xl">number : {selected?.number}</h1>
            <h1 className="text-xl">address : {selected?.address}</h1>
            <hr className="my-2"/>
            <h1 className="text-xl">Cart Items</h1>
            <div>
                {
                    selected?.cart.map((item,i)=>{
                        return (
                            <div key={i}>
                                <h1 className="text-lg">{item.data.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </CardContent>
      </Card>
    </div>
    )
  }
  