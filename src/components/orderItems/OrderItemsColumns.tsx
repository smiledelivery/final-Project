'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const columns: ColumnDef<OrderItemType>[] = [
    {
        accessorKey: 'product',
        header: "product",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/products/${row.original.product._id}`}
                    className='hover:text-red-500'
                >
                    {row.original.product.title}
                </Link>
            )
        }
    },
    {
        accessorKey: 'color',
        header: 'Color'
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity'
    }
]