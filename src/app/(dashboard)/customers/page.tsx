import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectDB } from "@/lib/mongoDB";

const Customers = async () => {
    await connectDB()
    const customers = await Customer.find().sort({ createdAt: 'desc' })

    return (
        <div className="px-10 py-5">
            <p className="font-semibold">Customers</p>
            <Separator className="bg-gray-700 my-5" />
            <DataTable
                columns={columns}
                data={customers}
                searchKey="name"
            />
        </div>
    )
}

export const dynamic = 'force-dynamic'

export default Customers