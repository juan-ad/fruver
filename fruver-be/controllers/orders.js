import { Order } from "../models/order.js";
import { Customer } from "../models/customer.js";
import { ProductOrder } from "../models/product_order.js";
import { Product } from "../models/product.js";
import { transporter } from "../mailer/mailer.js";

export const getAll = async (req, res)=>{
    try{
        const orders = await Order.findAll({
            attributes: ['id', 'total', 'shoppingAddress', 'date', 'status'],
            where: {status: false},
            include: [
                {
                    model: Customer,
                    required: true,
                },
                {
                    model: ProductOrder,
                    attributes: ['id', 'amount'],
                    required: true,
                    include: [{
                        model: Product,
                        required: true
                    }]
                }
            ]
        });
        return res.status(200).json(orders);
    }catch (err){
        return res.status(400).json({message: err});
    }
}

export const add = async(req, res) => {
    const order = req.body;
    try{
        const customerCreated = await Customer.create({
            name: order.customer.name,
            identificationNumber: order.customer.identificationNumber,
            email: order.customer.email,
            phone: order.customer.phone
        });
        const orderCreated = await Order.create({
            customerId: customerCreated.id,
            total: order.total,
            shoppingAddress: order.shoppingAddress,
            date: Date.now(), 
            status: false
        });
        order.productList.forEach(async(product) => {
            await ProductOrder.create({
                productId: product.id,
                orderId: orderCreated.id,
                amount: product.amount
            });               
        });
        return res.status(200).json({message: "Solicitud de pedido satisfactoria"});
    }catch(err){
        console.log(err);
        return res.status(400).json({message: "No se pudo registrar el pedido"});
    }
}

export const dispatchOrder = async(req, res)=>{
    const id = req.body.id;
    try{
        const order = await Order.findOne({
            attributes: ['id','total', 'shoppingAddress', 'date'],
            where: {
                id: id
            },
            include: [
                {
                    model: Customer,
                    required: true,
                },
                {
                    model: ProductOrder,
                    attributes: ['id', 'amount'],
                    required: true,
                    include: [{
                        model: Product,
                        required: true
                    }]
                }
            ]
        });
        await Order.update({
            status: true
        },{
            where: {
                id: id
            }
        });
        let products = "";

        order.product_orders.forEach((productOrder) => {
            products += ` <tr>
                <td style="padding:2px; text-align:center; border: 1px solid #000;">${productOrder.product.name}</td>
                <td style="padding:2px; text-align:center; border: 1px solid #000;">${productOrder.amount}</td>
                <td style="padding:2px; text-align:center; border: 1px solid #000;">$${productOrder.product.price}</td>
                <td style="padding:2px; text-align:center; border: 1px solid #000;">$${productOrder.amount * productOrder.product.price}</td>
            </tr>`
        });
        

        await transporter.sendMail({
            from: '"Pedido Enviado"<fruverSanMarco@gmail.com>',
            to: 'revelojuan88@gmail.com',
            subject: 'Pedido Enviado',
            html: `            
            <div style="width:100%; margin-bottom: 10px;">
                <h3 style="margin-bottom: 5px; color: black;">Detalles del pedido</h3>
            </div>
            <table style="width:100%; color: black; margin-bottom: 10px; border-collapse: collapse">
                <tr>
                    <td style="width: 300px;">
                        <strong style="margin-right: 4px">Cliente:</strong>${order.customer.name}
                    </td>
                    <td>
                        <strong style="margin-right: 4px">Número de identificaciòn:</strong>${order.customer.identificationNumber}
                    </td>
                </tr>
                <tr>
                    <td style="width: 300px;">
                        <strong style="margin-right: 4px">Email:</strong>${order.customer.email}
                    </td>
                    <td> 
                        <strong style="margin-right: 4px">Número de celular:</strong>${order.customer.phone}
                    </td>
                </tr>
                <tr>
                    <td style="width: 300px;">
                        <strong style="margin-right: 4px">Fecha de solicitud:</strong>${order.date}
                    </td>
                    <td>
                        <strong>Dirección de envío:</strong> ${order.shoppingAddress}
                    </td>
                </tr>
            </table>
            <table style="width:60%; border-collapse: collapse; border: 1px solid #000; color: black; text-align:center">
                <thead>
                    <tr>
                        <th style="padding:2px; text-align:center; border: 1px solid #000;">Producto</th>
                        <th style="padding:2px; text-align:center; border: 1px solid #000;">Cantidad</th>
                        <th style="padding:2px; text-align:center; border: 1px solid #000;">Precio unitario</th>
                        <th style="padding:2px; text-align:center; border: 1px solid #000;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${products}
                </tbody>
            </table>
            <div style="color: black;">
                <p><strong>Total Compra:</strong> $${order.total}</p>
            </div>
            <div style="color: black;">
                <p>Muchas Gracias por confiar en <strong>FRUVER SAN MARCO</strong></p>
            </div>
            `
        });
        return res.status(200).json({message: "Pedido consolidado y enviado exitosamente: Se notificò al cliente el envío de su pedido"});
    }catch(err){
        return res.status(400).json({message: "Pedido no se pudo despachar"});
    }
}

