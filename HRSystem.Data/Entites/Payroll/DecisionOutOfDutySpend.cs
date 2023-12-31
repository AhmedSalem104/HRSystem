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
    
    public partial class DecisionOutOfDutySpend
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DecisionOutOfDutySpend()
        {
            this.DecisionOutOfDutySpendFs = new HashSet<DecisionOutOfDutySpendF>();
            this.OutOfDuties = new HashSet<OutOfDuty>();
        }
    
        public int OutOfDutySpendSerial { get; set; }
        public string OutOfDutySpendNo { get; set; }
        public int OutOfDutyGroupSerial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public short Year { get; set; }
        public byte Month { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public byte NormalDays { get; set; }
        public byte Hours { get; set; }
        public byte Minutes { get; set; }
        public byte VacDays { get; set; }
        public byte VacHours { get; set; }
        public byte VacMinutes { get; set; }
        public string Notes { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public string FromDateH { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Task { get; set; }
        public bool SentFinance { get; set; }
    
        public virtual DecisionOutOfDutyGroup DecisionOutOfDutyGroup { get; set; }
        public virtual Owner Owner { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutySpendF> DecisionOutOfDutySpendFs { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutOfDuty> OutOfDuties { get; set; }
    }
}
