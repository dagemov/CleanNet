using Data.Interfaces.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class WorkSpace : IWorkSpace
    {
        private readonly DataContext _context;

        public ISpecialityRepository SpecialityRepository { get;private set; }

        public WorkSpace(DataContext context)
        {
            _context = context;
            SpecialityRepository = new SpecialityRepository(_context);
        }
       

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task Save()
        {
           await  _context.SaveChangesAsync();
        }
    }
}
