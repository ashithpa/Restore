using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x => x.buyerId == User.Identity.Name)
            .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
             .ProjectOrderToOrderDto()
            .Where(x => x.buyerId == User.Identity.Name && x.Id == id)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate Basket." });

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemsOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ItemsOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;

            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var DeliveryFee = subtotal > 10000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                buyerId = User.Identity.Name,
                shippingAddress = orderDto.shippingAddress,
                SubTotal = subtotal,
                DeliveryFee = DeliveryFee
            };

            _context.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                user.Address = new UserAddress
                {
                    FullName = orderDto.shippingAddress.FullName,
                    Address1 = orderDto.shippingAddress.Address1,
                    Address2 = orderDto.shippingAddress.Address2,
                    City = orderDto.shippingAddress.City,
                    Zip = orderDto.shippingAddress.Zip,
                    State = orderDto.shippingAddress.State,
                    Country = orderDto.shippingAddress.Country,
                };

                _context.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem creating order");
        }
    }
}