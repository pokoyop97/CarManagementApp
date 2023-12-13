using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CarMgmt
{
    public class CarManagementContext : DbContext
    {
        public CarManagementContext(DbContextOptions<CarManagementContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
            new CarMap().Configure(modelBuilder.Entity<Car>());
        }
        public virtual DbSet<Car> Cars { get; set; }
    }
}
