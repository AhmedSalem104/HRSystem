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
    
    public partial class DecisionOutOfDutyGroup
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DecisionOutOfDutyGroup()
        {
            this.DecisionOutOfDutyGroupFs = new HashSet<DecisionOutOfDutyGroupF>();
            this.DecisionOutOfDutySpends = new HashSet<DecisionOutOfDutySpend>();
        }
    
        public int OutOfDutyGroupSerial { get; set; }
        public string OutOfDutyGroupNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        public Nullable<short> Period { get; set; }
        public decimal HoursRatio { get; set; }
        public string WorkDaysNotes { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Location { get; set; }
        public string Notes { get; set; }
        public string Description { get; set; }
        public Nullable<byte> NormalDays { get; set; }
        public Nullable<byte> Hours { get; set; }
        public Nullable<byte> Minutes { get; set; }
        public Nullable<byte> VacDays { get; set; }
        public Nullable<byte> VacHours { get; set; }
        public Nullable<byte> VacMinutes { get; set; }
        public Nullable<bool> IncludeSatAndFri { get; set; }
        public Nullable<short> Year { get; set; }
        public Nullable<byte> Month { get; set; }
        public bool Committee { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string LinkNo { get; set; }
        public string OutDecisionsNo { get; set; }
    
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutyGroupF> DecisionOutOfDutyGroupFs { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DecisionOutOfDutySpend> DecisionOutOfDutySpends { get; set; }
    }
}
