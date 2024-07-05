'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom/ImageUpload"
import Delete from "../custom/Delete"
import toast from "react-hot-toast"
import React, { useEffect, useState } from 'react'
import MultiSelect from "../custom/MultiSelect"
import MultiText from "../custom/MultiText"
import Loader from "../custom/Loader"

const formSchema = z.object({
    title: z.string().min(2).max(30),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.string(),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.number().min(1),
    expense: z.number().min(1),
})

interface ProductFormProps {
    initialData?: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialData
}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState<CollectionType[]>([])
    const getCollections = async () => {
        try {
            const res = await fetch(`/api/collections`, {
                method: 'GET'
            })
            const data = await res.json()
            setCollections(data)
            setLoading(false)
        } catch (error) {
            console.log("Product form page problem", error)
            toast.error('Something went wrong')
        }
    }
    useEffect(() => {
        getCollections()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                collections: initialData.collections.map(
                    (collection) => collection._id
                ),
            }
            : {
                title: "",
                description: "",
                media: [],
                category: "",
                collections: [],
                tags: [],
                sizes: [],
                colors: [],
                price: 0.1,
                expense: 0.1,
            },
    });
    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const url = initialData ? `/api/products/${initialData._id}` : '/api/products'
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values)
            })
            if (res.ok) {
                setLoading(false)
                toast.success(`Product ${initialData ? "updated" : "Created"}`)
                window.location.href = '/products'
                router.push('/products')
            }
        } catch (error) {
            console.log("Product page submit button problem ", error)
            toast.error("Something went wrong")
        }
    }
    return loading ? (
        <Loader />
    ) : (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="font-semibold">
                        Edit Product
                    </p>
                    <Delete
                        id={initialData._id}
                        item="product"
                    />
                </div>
            ) : (
                <p className="font-semibold">
                    Create Product
                </p>
            )}
            <Separator className="bg-gray-600 mt-4 mb-7" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => field.onChange([...field.value, url])}
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter((image) => image !== url),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            {...field}
                                            onKeyDown={handleKeyPress}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Expense"
                                            {...field}
                                            onKeyDown={handleKeyPress}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category"
                                            {...field}
                                            onKeyDown={handleKeyPress}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Tags"
                                            value={field.value || []}
                                            onChange={(tag) => field.onChange([...field.value, tag])}
                                            onRemove={(tagToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter((tag) => tag !== tagToRemove),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                        {collections.length > 0 && (
                            <FormField
                                control={form.control}
                                name="collections"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collections</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                placeholder="Collections"
                                                collections={collections}
                                                value={field.value || []}
                                                onChange={(_id) =>
                                                    field.onChange([...field.value, _id])
                                                }
                                                onRemove={(idToRemove) =>
                                                    field.onChange([
                                                        ...field.value.filter(
                                                            (collectionId) => collectionId !== idToRemove
                                                        ),
                                                    ])
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-1" />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Colors"
                                            value={field.value}
                                            onChange={(color) =>
                                                field.onChange([...field.value, color])
                                            }
                                            onRemove={(colorToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (color) => color !== colorToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Sizes"
                                            value={field.value}
                                            onChange={(size) =>
                                                field.onChange([...field.value, size])
                                            }
                                            onRemove={(sizeToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (size) => size !== sizeToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-10">
                        <Button type="submit" className="bg-blue-1 text-white">
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/products")}
                            className="bg-blue-1 text-white"
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm
