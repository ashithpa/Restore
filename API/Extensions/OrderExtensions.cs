using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
            .Select(order => new OrderDto
            {
                Id = order.Id,
                buyerId = order.buyerId,
                OrderDate = order.OrderDate,
                shippingAddress = order.shippingAddress,
                DeliveryFee = order.DeliveryFee,
                SubTotal = order.SubTotal,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(Item => new OrderItemDto
                {
                    ProductId = Item.ItemsOrdered.ProductId,
                    Name = Item.ItemsOrdered.Name,
                    PictureUrl = Item.ItemsOrdered.PictureUrl,
                    Price = Item.Price,
                    Quantity = Item.Quantity
                }).ToList()
            }).AsNoTracking();
        }
    }
}