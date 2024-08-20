using Data.Interfaces.IRepository;
using Models.Entities;
using System.Diagnostics.Metrics;

namespace Data.Repository
{
    public class MedicRepository : RepositoryGeneric<Medic>, IMedicRepository
    {
        private readonly DataContext _context;
        public MedicRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public void Update(Medic medic)
        {
            var medicDb = _context.Medics.FirstOrDefault(m => m.Id == medic.Id);

            if (medicDb != null)
            {
                medicDb.AddresId = medic.AddresId;
                medicDb.FirstName = medic.FirstName;
                medicDb.Gender = medic.Gender;
                medicDb.LastName = medic.LastName;
                medicDb.MiddleName = medic.MiddleName;
                medicDb.Phone = medic.Phone;
                medicDb.SpecialityId = medic.SpecialityId;
                medicDb.Status = medic.Status;
                medicDb.Updated = DateTime.Now;
                _context.SaveChanges();
            }
        }
    }
}
