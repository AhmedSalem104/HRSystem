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
    
    public partial class DecisionViolation
    {
        public int DecisionViolationsSerial { get; set; }
        public string DecisionViolationsID { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public int OwnerId { get; set; }
        public int EmpId { get; set; }
        public byte MonthCount { get; set; }
        public byte FromMonth { get; set; }
        public byte ToMonth { get; set; }
        public string MonthCountText { get; set; }
        public decimal Transport { get; set; }
        public string Notes { get; set; }
        public Nullable<short> Year { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Owner Owner { get; set; }
    }
}
