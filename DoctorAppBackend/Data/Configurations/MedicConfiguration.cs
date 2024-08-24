using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Configurations
{
    public class MedicConfiguration : IEntityTypeConfiguration<Medic>
    {
        public void Configure(EntityTypeBuilder<Medic> builder)
        {
            builder.Property(x => x.AddresId).IsRequired();
            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(120);
            builder.Property(x => x.Gender).IsRequired();
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(120);
            builder.Property(x => x.MiddleName).IsRequired(false).HasMaxLength(50);
            builder.Property(x => x.SpecialityId).IsRequired();
            builder.Property(x => x.Status).IsRequired();

            // Relaciones
            builder.HasOne(x => x.Address)
                   .WithMany(a=> a.Medics)
                   .HasForeignKey(x => x.AddresId)
                   .OnDelete(DeleteBehavior.Cascade); // Eliminar en cascada

            builder.HasOne(x => x.Speciality)
                   .WithMany()
                   .HasForeignKey(x => x.SpecialityId);
        }
    }
}
