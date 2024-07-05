'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import Loader from "@/components/custom/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/custom/DataTable"
import { columns } from "@/components/products/ProductColumns"

const Products = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductType[]>([])

    const getProduct = async () => {
        try {
            const res = await fetch('/api/products', {
                method: "GET"
            })
            const data = await res.json()
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.log('products dash page problem', error);
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold">Products</p>
                <Button
                    className="bg-blue-600 text-white"
                    onClick={() => router.push('/products/new')}
                >
                    <Plus className="h-4 w-4" />
                    Create Product
                </Button>
            </div>
            <Separator className="bg-gray-700 my-4" />
            <DataTable
                columns={columns}
                data={products}
                searchKey="title"
            />
        </div>
    )
}

export default Products