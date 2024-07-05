
import { DataTable } from "@/components/custom/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColumns"

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    const res = await fetch(`${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`)
    const { OrderDetails, customer } = await res.json()

    const { street, city, state, postalCode, country } = OrderDetails.shippingAddress

    return (
        <div className="flex flex-col p-10 gap-5">
            <p className="font-semibold">
                orderId: <span className="font-medium">
                    {OrderDetails._id}
                </span>
            </p>
            <p className="font-semibold">
                Customer name: <span className="font-medium">
                    {customer.name}
                </span>
            </p>
            <p className="font-semibold">
                Shipping address: <span className="font-medium">
                    {street}, {city}, {state}, {postalCode}, {country}
                </span>
            </p>
            <p className="font-semibold">
                Total paid: <span className="font-medium">
                    {OrderDetails.totalAmount}
                </span>
            </p>
            <p className="font-semibold">
                Shipping Rate Id: <span className="font-medium">
                    {OrderDetails.shippingRate}
                </span>
            </p>
            <DataTable
            columns={columns}
            data={OrderDetails.products}
            searchKey="product"
            />
        </div>
    )
}

export default OrderDetails