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
  
  const invoices = [
    {
        image: "https://storage.googleapis.com/stickify-storage/uploads/8x1oppywrts-3hfofna68ga-mba44fkfjcn.png",
        quantity: 1,
        number: "0689978614",
        serviceType:"Sticker",
        state:"current",
        user:"abdessamade zalmadi",
    },
  ]
  
  export function OrdersTable() {
    return (
    <>
        <h1 className='text-4xl py-6'>Orders</h1>
        <Card className="py-4 px-2">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sticker</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>service</TableHead>
                    <TableHead>quantity</TableHead>
                    <TableHead className="text-right">state</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice,i) => (
                    <TableRow key={i}>
                    <TableCell className="font-medium">
                        <img src={invoice.image} width={50} alt="" />
                    </TableCell>
                    <TableCell>{invoice.user}</TableCell>
                    <TableCell>{invoice.number}</TableCell>
                    <TableCell>{invoice.serviceType}</TableCell>
                    <TableCell>{invoice.quantity}</TableCell>
                    <TableCell className="text-right">{invoice.state}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Card>
    </>
    )
  }
  