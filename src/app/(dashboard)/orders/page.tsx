'use client'

import { DataTable } from "@/components/custom/DataTable"
import Loader from "@/components/custom/Loader"
import { columns } from "@/components/orders/OrderColumns"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

const Orders = () => {
    const [loading, setLoading] = useState(true)
    const [orders, serOrders] = useState([])

    const getOrders = async () => {
        try {
            const res = await fetch(`/api/orders`)
            const data = await res.json()
            serOrders(data)
            setLoading(false)
        } catch (error) {
            console.log('order dash page problem', error);
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <p className="font-semibold">Order</p>
            <Separator className="bg-gray-600 my-5" />
            <DataTable
                columns={columns}
                data={orders}
                searchKey="_id"
            />
        </div>
    )
}
export const dynamic = 'force-dynamic'
export default Orders