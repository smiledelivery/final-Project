'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Delete from "../custom/Delete"

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
            return (
                <Link
                    href={`/products/${row.original._id}`}
                    className="hover:text-red-500"
                >
                    {row.original.title}
                </Link>
            )
        }
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },
    {
        accessorKey: 'collections',
        header: 'Collections'
    },
    {
        accessorKey: 'price',
        header: 'Price'
    },
    {
        accessorKey: 'expense',
        header: 'Expense'
    },
    {
        id: 'actions',
        cell: ({ row }) => <Delete item="product" id={row.original._id} />
    }
]