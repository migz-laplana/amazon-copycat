import React, { useEffect, useState } from 'react'
import "./Orders.css"
import { db } from "./firebase"
import { useStateValue } from './StateProvider';
import Order from "./Order"

function Orders() {

    const [state, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (state.user) {
            console.log("user found", state.user);
            db
                .collection("users")
                .doc(state.user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot(snapshot => { //realtime ss on db changes
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                    console.log("setOrders fired! ", orders);
                })
        } else {
            setOrders([]);
        }
        console.log(orders);
    }, [state.user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
