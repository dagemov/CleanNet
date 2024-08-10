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
    public class SpecialityConfiguration : IEntityTypeConfiguration<Speciality>
    { 
        public void Configure(EntityTypeBuilder<Speciality> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x=>x.Name).IsRequired().HasMaxLength(250);
            builder.Property(x=>x.Description).IsRequired(false).HasMaxLength(250);
            builder.Property(x => x.Status).IsRequired();
        }
    }
}
