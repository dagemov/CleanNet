using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces.IRepository
{
    public interface IRepositoryGeneric<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(
                Expression<Func<T,bool>> filter = null,
                Func<IQueryable<T>,IOrderedQueryable<T>> orderBy=null,
                string includeProperties = null  //Include
            );
        Task<T> GetAsync(
                 Expression<Func<T, bool>> filter = null,
                 string includeProperties = null
            );
        Task Add(T entity);
        void Delete(T entity);
    }
}
