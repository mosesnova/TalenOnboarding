using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalenOnboarding.Models;

namespace TalenOnboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly Talent_DatabaseContext _context;

        public SalesController(Talent_DatabaseContext context)
        {
            _context = context;
        }

        public class SalesVm
        {
            public int Id { get; set; }
            public string ProductName { get; set; }
            public string CustomerName { get; set; }

            public string StoreName { get; set; }

            public DateTime? DateSold { get; set; }

            
           

         }

        // GET: api/Sales
        [HttpGet]
        public  List<SalesVm> GetSales()
        {
            var result = from s in _context.Sales
                         join p in _context.Product on s.ProductId equals p.Id
                         join c in _context.Customer on s.CustomerId equals c.Id
                         join st in _context.Store on s.StoreId equals st.Id
                         select new SalesVm()
                         {
                             Id = s.Id,
                             ProductName = p.Name.Trim(),
                             CustomerName = c.Name.Trim(),
                             StoreName = st.Name.Trim(),
                             DateSold = s.DateSold
                         };
            
           

            return result.ToList();
            //return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, SalesVm salesvm)
        {
            Sales sales = new Sales();
            sales.Id = id;
            sales.ProductId = (from p in  _context.Product where p.Name == salesvm.ProductName select p.Id).FirstOrDefault() ;
            sales.CustomerId = (from c in _context.Customer where c.Name == salesvm.CustomerName select c.Id).FirstOrDefault();
            sales.StoreId = (from s in _context.Store where s.Name == salesvm.StoreName select s.Id).FirstOrDefault();
            sales.DateSold = salesvm.DateSold;
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
