using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace CarMgmt {
    public class GenericRepository<TEntity> where TEntity : class
    {

        internal CarManagementContext context;
        internal DbSet<TEntity> dbSet;
        public GenericRepository(CarManagementContext dbContext)
        {
            this.context = dbContext;
            this.dbSet = context.Set<TEntity>();
        }
        public virtual IQueryable<TEntity> Get(
             Expression<Func<TEntity, bool>>? filter = null,
             Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
             string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query);
            }
            else
            {
                return query;
            }
        }

        public virtual TEntity GetByID(object id)
        {
            return dbSet.Find(id)!;
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            TEntity? entityToDelete = dbSet.Find(id);
            if (entityToDelete != null)
                Delete(entityToDelete!);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}

