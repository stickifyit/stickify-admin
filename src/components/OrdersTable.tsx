import { Card } from "@/src/components/ui/card"
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




const servicesIcons = {
    "sticker": <Sticker/>,
    "t-shirt": <Shirt/>,
    "cup": <Coffee/>,
    "label": <Sticker/>
}



type Sticker = {
    design: string;
    type: string;
    size: string;
    _id: string;
  };
  
  type TShirt = {
    design: string;
    type: string;
    size: string;
    _id: string;
  };
  
  type Label = {
    design: string;
    type: string;
    size: string;
    _id: string;
  };
  
  type Cup = {
    design: string;
    type: string;
    size: string;
    _id: string;
  };
  
  type Order = {
    _id: string;
    customerId: string;
    number: string;
    email: string;
    fullName: string;
    address: string;
    quantity: number;
    serviceType: 'sticker' | 't-shirt' | 'label' | 'cup';
    sticker?: Sticker; // optional for serviceType 'sticker'
    "t-shirt"?: TShirt;   // optional for serviceType 't-shirt'
    label?: Label;     // optional for serviceType 'label'
    cup?: Cup;         // optional for serviceType 'cup'
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
   
  export function OrdersTable() {
    const {reload} = useCurrentContainer()
    const [orders,setOrders] = useState<Order[]>([])

    useEffect(()=>{
        axios.get<Order[]>("http://localhost:3001/orders/all").then(res=>{
            setOrders(res.data)
            console.log(res.data)
        })
    },[reload])

    return (
    <>
        <h1 className='text-4xl py-6'>Orders</h1>
        <Card className="py-4 px-2">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sticker</TableHead>
                    <TableHead>service</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>quantity</TableHead>
                    <TableHead className="text-right">state</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {orders.map((order,i) => {
                   const service = order.serviceType 
                    return(
                    <TableRow key={i}>
                    <TableCell className="font-medium">
                        <img src={"https://storage.googleapis.com/stickify-storage/"+order[service as "sticker" | "t-shirt" | "label" | "cup"]?.design ?? ' '} width={50} alt="" />
                    </TableCell>
                    <TableCell>{servicesIcons[order.serviceType]}</TableCell>
                    <TableCell>{order.fullName}</TableCell>
                    <TableCell>{order.number}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.quantity} item{order.quantity>1 && "s"}</TableCell>
                    <TableCell className="text-right">{"ready"}</TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
        </Card>
    </>
    )
  }
  