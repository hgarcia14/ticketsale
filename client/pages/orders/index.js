const OrderIndex = ({ orders }) => {
  return (
    <div>
      <div><h4>My orders</h4></div>
      <div>
        <ul>
          {orders.map(order => {
            return <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          })}
        </ul>
      </div>
    </div>

  );
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};
 
export default OrderIndex;