'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const columns: ColumnDef<OrderColumnType>[] = [
    {
        accessorKey: '_id',
        header: 'Order',
        cell: ({ row }) => {
            return (
                <Link
                    href={`/order/${row.original._id}`}
                    className="hover:text-red-500"
                >
                    {row.original._id}
                </Link>
            )
        }
    },
    {
        accessorKey: 'customer',
        header: 'Customer'
    },
    {
        accessorKey: 'products',
        header: 'Products'
    },
    {
        accessorKey: 'totalAmount',
        header: 'Total ($)'
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At'
    }
]