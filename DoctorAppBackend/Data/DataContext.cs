using Microsoft.EntityFrameworkCore;
using Models.Entities;
using System.Reflection;

namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        //DbSets
        public DbSet<Address> Address { get; set; }
        public DbSet<Medic> Medics { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
