//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRSystem.Data.Entites.Payroll
{
    using global::System;  using global::System.Diagnostics.CodeAnalysis;
    using global::System.Collections.Generic;
    
    public partial class TravelType
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TravelType()
        {
            this.LegationApplications = new HashSet<LegationApplication>();
            this.Legations = new HashSet<Legation>();
            this.LegationSpends = new HashSet<LegationSpend>();
            this.LegationSpendF2 = new HashSet<LegationSpendF2>();
        }
    
        public byte TravelTypeId { get; set; }
        public string TravelTypeName { get; set; }
    
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LegationApplication> LegationApplications { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Legation> Legations { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LegationSpend> LegationSpends { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LegationSpendF2> LegationSpendF2 { get; set; }
    }
}
