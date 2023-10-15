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
    
    public partial class DecisionOutOfDutySpend2
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DecisionOutOfDutySpend2()
        {
            this.DecisionOutOfDutySpendF2 = new HashSet<DecisionOutOfDutySpendF2>();
            this.OutOfDuties = new HashSet<OutOfDuty>();
        }
    
        public int OutOfDutySpendSerial { get; set; }
        public string OutOfDutySpendNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public short Year { get; set; }
        public byte Month { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public string Notes { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public Nullable<int> OutOfDutyGroupSerial { get; set; }
    
        public virtual DecisionOutOfDutyGroup2 DecisionOutOfDutyGroup2 { get; set; }
        public virtual Owner Owner { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutySpendF2> DecisionOutOfDutySpendF2 { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutOfDuty> OutOfDuties { get; set; }
    }
}
