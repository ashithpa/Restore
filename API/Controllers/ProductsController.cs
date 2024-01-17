using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext context;
        public ProductsController(StoreContext context)
        {
            this.context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]
        ProductParams productParams)
        {
            //    return await context.Products.ToListAsync();
            var query = context.Products
            .Sort(productParams.OrderBy).AsQueryable()
            .Filter(productParams.Brands, productParams.Types)
            .Search(productParams.searchTerm);
            // query = orderBy switch
            // {
            //     "price" => query.OrderBy(p => p.Price),
            //     "priceDesc" => query.OrderByDescending(p => p.Price),
            //     _ => query.OrderBy(p => p.Name),
            // };
            // return await query.ToListAsync();

            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);

            // Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));
            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return product;

        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

    }
}