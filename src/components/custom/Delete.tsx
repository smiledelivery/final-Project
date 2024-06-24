'use client'

import React, { useState } from 'react'
import { Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
import toast from 'react-hot-toast'

interface DeleteProps {
    item: string;
    id: string;
}


const Delete: React.FC<DeleteProps> = ({ item, id }) => {
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            const itemType = item === "product" ? "products" : "collections"
            const res = await fetch(`/api/${itemType}/${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                setLoading(false)
                window.location.href = (`/${itemType}`)
                toast.success(`${item} deleted`)
            }
        } catch (error) {
            console.log("delete custom ui page error", error)
            toast.error("Something went wrong! please try again")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-red-600 text-white'>
                    <Trash className='h-4 w-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white text-gray-600'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-500'>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account {item}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-600 text-white'>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Delete
