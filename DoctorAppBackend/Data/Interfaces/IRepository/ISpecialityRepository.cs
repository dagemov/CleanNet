using Models.Entities;

namespace Data.Interfaces.IRepository
{
    public interface ISpecialityRepository : IRepositoryGeneric<Speciality>
    {
        void Update(Speciality speciality);

    }
}
