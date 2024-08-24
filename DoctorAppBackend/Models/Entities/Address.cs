﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string NameStreet { get; set; }
        public string Number { get; set; }
        public string Description {  get; set; }
        public string ZipCode { get; set; }
        public string FullAdress => Number +" "+NameStreet+" "+ZipCode; 

        public ICollection<Medic> Medics { get; set; }

    }
}
