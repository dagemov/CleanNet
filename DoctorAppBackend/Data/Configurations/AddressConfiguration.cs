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
    internal class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.Property(x=>x.NameStreet).IsRequired().HasMaxLength(100);
            builder.Property(x=>x.Number).IsRequired().HasMaxLength(10);
            builder.Property(x=>x.ZipCode).IsRequired().HasMaxLength(5);
        }
    }
}
