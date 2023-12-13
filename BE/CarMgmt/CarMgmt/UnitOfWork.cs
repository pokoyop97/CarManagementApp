
namespace CarMgmt
{
    public class UnitOfWork : IDisposable
    {

        public CarManagementContext dbcontext;

        private GenericRepository<Car>? carRepository;


        public UnitOfWork(CarManagementContext cContext)
        {
            dbcontext = cContext;
        }

        public void Save()
        {
            dbcontext.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await dbcontext.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    dbcontext.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public GenericRepository<Car> CarRepository
        {
            get
            {
                if (carRepository == null)
                {
                    carRepository = new GenericRepository<Car>(dbcontext);
                }
                return carRepository;
            }
        }

    }
}