"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom/Loader";

const Collections = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);
    const getCollections = async () => {
        try {
            const res = await fetch("/api/collections", {
                method: "GET",
            });
            const data = await res.json();
            setCollections(data);
            setLoading(false);
        } catch (error) {
            console.log("collections Get dash problem", error);
        }
    };
    useEffect(() => {
        getCollections();
    }, []);
    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <div className=" flex items-center justify-between">
                <p className="font-semibold">
                    collections
                </p>
                <Button
                    className="bg-blue-600 text-white"
                    onClick={() => router.push('/collections/new')} >
                    <Plus className="h-4 w-4" />
                    Create collection
                </Button>
            </div>
            <Separator className="bg-gray-700 my-4" />
            <DataTable
                columns={columns}
                data={collections}
                searchKey="title"
            />
        </div>
    )
};
