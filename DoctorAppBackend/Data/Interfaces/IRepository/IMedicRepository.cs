using Models.Entities;

namespace Data.Interfaces.IRepository
{
    public interface IMedicRepository : IRepositoryGeneric<Medic>
    {
        void Update(Medic medic);
    }
}
