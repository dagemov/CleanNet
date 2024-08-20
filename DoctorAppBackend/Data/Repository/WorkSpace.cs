﻿using Data.Interfaces.IRepository;
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

        public IAddressRepository AddressRepository { get; set; }
        public IMedicRepository MedicRepository { get; set; }
        public ISpecialityRepository SpecialityRepository { get;set; }       

        public WorkSpace(DataContext context)
        {
            _context = context;
            SpecialityRepository = new SpecialityRepository(_context);
            AddressRepository = new AddressRepository(_context);
            MedicRepository = new MedicRepository(_context);
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
