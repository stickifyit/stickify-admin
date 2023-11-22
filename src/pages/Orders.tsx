import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import CurrentContainer from '@/components/CurrentContainer'
import { OrdersTable } from '@/components/OrdersTable'
import Containers from '@/components/Containers'

type Props = {}

const Orders = (props: Props) => {
  return (
    <div className='flex-1 p-4 space-y-4 overflow-auto'>




        <Tabs defaultValue="current-container" className="w-full">
        <TabsList>
            <TabsTrigger value="current-container">Current container</TabsTrigger>
            <TabsTrigger value="containers">Containers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="current-container">
            <CurrentContainer/>
        </TabsContent>
        <TabsContent value="containers">
            <Containers/>
        </TabsContent>
        <TabsContent value="orders">
            <OrdersTable/>
        </TabsContent>
        </Tabs>

    </div>
  )
}

export default Orders