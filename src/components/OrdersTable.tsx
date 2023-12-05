import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useCurrentContainer } from "@/store/currentContainer";
import axios from "axios";
import { Coffee, Loader2, Shirt, Sticker, X } from "lucide-react";
import { useEffect, useState } from "react";

type CustomSheetItem = {
  x: number;
  y: number;
  width: string;
  height: string;
  image: string;
  _id: string;
};

type CustomSheetSchema = {
  data: {
    items: CustomSheetItem[];
  };
  _id: string;
};

type CartItem = {
  _id: string;
  state: string;
  orderId: string;
  image: string;
  type: string;
  customSheetSchema?: CustomSheetSchema;
  cupSchema?: {
    data: {
      image: string;
      type: string;
    };
    quantity: number;
    _id: string;
  };
  tShirtSchema?: {
    data: {
      image: string;
      type: string;
    };
    quantity: number;
    _id: string;
  };
  stickerSheetSchema?: {
    data: {
      sheetId: string;
    };
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Order = {
  _id: string;
  customerId: string;
  closed: boolean;
  number: string;
  firstName: string;
  lastName: string;
  price: number;
  address: string;
  state: string;
  cart: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export function OrdersTable() {
  const { reload, setReload } = useCurrentContainer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get<Order[]>("http://localhost:3001/orders/all").then((res) => {
      setOrders(res.data);
      console.log(res.data);
      setSelected(res.data.find((item) => item._id == selectedId) ?? null);
    });
  }, [reload]);

  const confirmAll = async () => {
    if (!selected) return;
    setLoading(true);
    await axios.post("http://localhost:3001/orders/confirm/" + selected._id);

    for (const item of selected.cart) {
      await axios.post("http://localhost:3001/containers/add-to-container", {
        id: item._id,
      });
    }

    setReload(Math.random());
    setLoading(false)
  };

  return (
    <div>
      <h1 className="text-4xl py-6">Orders</h1>
      <div className="flex gap-3">
        <div className="flex-1">
          <Card className="py-4 px-2 sticky top-0 ">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">State</TableHead>
                  <TableHead className="">FirstName</TableHead>
                  <TableHead className="">LastName</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Cart Items</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, i) => {
                  //  const service = order.serviceType
                  return (
                    <TableRow
                      className={
                        "cursor-pointer " +
                        (order == selected
                          ? "bg-slate-200 hover:bg-slate-300"
                          : "")
                      }
                      key={i}
                      onClick={() => {
                        setSelected(order);
                        setSelectedId(order._id);
                      }}
                    >
                      <TableCell>
                        <StateComp state={order?.state ?? ""} />
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.firstName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.lastName}
                      </TableCell>
                      <TableCell>{order.number}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>
                        {order.cart.length} item{order.cart.length > 1 && "s"}
                      </TableCell>
                      <TableCell className="text-right text-md font-medium">{(order?.price)?.toFixed(2)} Dh</TableCell>
                      <TableCell className="text-right">
                      {order?.createdAt ? new Intl.DateTimeFormat('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(order.createdAt)) : ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
        {selected && (
          <Card className="w-[600px] bg-white sticky top-0">
            <Button onClick={() => setSelected(null)} className="absolute top-2 right-2"><X/></Button>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>
                State : <StateComp state={selected?.state ?? ""} />
              </h1>
              <h1 className="text-lg">Time : {
                      selected?.createdAt ? new Intl.DateTimeFormat('en-US', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(selected?.createdAt)) : ''
              }</h1>
              <h1 className="text-lg">firstName : {selected?.firstName}</h1>
              <h1 className="text-lg">lastName : {selected?.lastName}</h1>
              <h1 className="text-lg">number : {selected?.number}</h1>
              <h1 className="text-lg">address : {selected?.address}</h1>
              <h1 className="text-lg">Price : {selected?.price.toFixed(2)} Dh</h1>
              <hr className="my-2" />
              <div className="flex justify-between">
                <h1 className="text-xl">Cart Items</h1>
                {
                  selected?.state == "pending" &&
                  <Button onClick={confirmAll} disabled={loading}>
                    {
                      loading ?
                        <>
                        Loading
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                        :
                        "Confirm All"
                    }
                  </Button>
                }
              </div>
              <div className="grid grid-cols-3 gap-2">
                {selected?.cart.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="p-2 bg-white relative flex flex-col rounded-xl border my-2"
                    >
                      <div className="text-xs p-1 bg-white border shadow w-fit rounded-sm px-3 absolute top-1 left-1">{item.state}</div>
                      <img
                        src={item.image}
                        className="w-full flex-1 object-contain rounded-xl"
                        alt=""
                      />
                      <div className="p-2 flex justify-between font-medium">
                        <span className="text-lg font-medium inline-block">
                          {item.type.replace(/-/g, " ")}
                        </span>
                        {item.type == "cup" ? (
                          <h1>{item.cupSchema?.quantity}</h1>
                        ) : item.type == "t-shirt" ? (
                          <h1>{item.tShirtSchema?.quantity}</h1>
                        ) : (
                          <h1>1</h1>
                        )}
                      </div>
                      <div>
                        {/* <Button  className="w-full">Confirm</Button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

const StateComp = ({ state }: { state: string }) => {
  return state === "pending" ? (
    <span className="px-2 rounded-xl mx-2 text-white bg-green-500">
      {state}
    </span>
  ) : state === "confirmed" ? (
    <span className="px-2 rounded-xl mx-2 text-white bg-blue-500">{state}</span>
  ) : (
    ""
  );
};
