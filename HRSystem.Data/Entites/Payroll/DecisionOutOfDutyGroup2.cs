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
    
    public partial class DecisionOutOfDutyGroup2
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DecisionOutOfDutyGroup2()
        {
            this.DecisionOutOfDutyGroupF2 = new HashSet<DecisionOutOfDutyGroupF2>();
            this.DecisionOutOfDutySpend2 = new HashSet<DecisionOutOfDutySpend2>();
        }
    
        public int OutOfDutyGroupSerial { get; set; }
        public string OutOfDutyGroupNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public short Year { get; set; }
        public byte Month { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public string Notes { get; set; }
        public Nullable<int> OwnerId { get; set; }
    
        public virtual Owner Owner { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutyGroupF2> DecisionOutOfDutyGroupF2 { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutySpend2> DecisionOutOfDutySpend2 { get; set; }
    }
}
