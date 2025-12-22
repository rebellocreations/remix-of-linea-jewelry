import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getCustomerOrders, ShopifyOrder } from "@/lib/shopify-customer";
import { Loader2, Package } from "lucide-react";
import { format } from "date-fns";

const formatCurrency = (amount: string, currency: string) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(parseFloat(amount));
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-amber-600 bg-amber-50';
    case 'refunded':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-muted-foreground bg-secondary';
  }
};

const getFulfillmentStatus = (status: string | null) => {
  if (!status) return 'Unfulfilled';
  return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
};

const Orders = () => {
  const { accessToken } = useAuthStore();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!accessToken) return;
      
      try {
        const data = await getCustomerOrders(accessToken);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-1">Orders</h2>
        <p className="text-sm text-muted-foreground">View your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-secondary/20 border border-border/30 rounded-sm">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" strokeWidth={1} />
          <p className="text-muted-foreground mb-2">No orders yet</p>
          <p className="text-sm text-muted-foreground/70">
            When you place an order, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-secondary/20 border border-border/30 rounded-sm p-5 hover:border-border/50 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium text-foreground">Order #{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(order.processedAt), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-sm capitalize ${getStatusColor(order.financialStatus)}`}>
                    {order.financialStatus?.toLowerCase() || 'pending'}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-sm bg-secondary text-muted-foreground">
                    {getFulfillmentStatus(order.fulfillmentStatus)}
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 border-t border-border/30 pt-4">
                {order.lineItems.edges.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {item.node.variant?.image ? (
                      <img
                        src={item.node.variant.image.url}
                        alt={item.node.variant.image.altText || item.node.title}
                        className="w-14 h-14 object-cover rounded-sm bg-secondary"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" strokeWidth={1} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.node.title}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.node.quantity}</p>
                    </div>
                    {item.node.variant?.price && (
                      <p className="text-sm text-foreground">
                        {formatCurrency(item.node.variant.price.amount, item.node.variant.price.currencyCode)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-border/30 pt-4 mt-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(order.totalPrice.amount, order.totalPrice.currencyCode)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
