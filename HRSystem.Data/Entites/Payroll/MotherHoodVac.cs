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
    
    public partial class MotherHoodVac
    {
        public int MotherHoodVacID { get; set; }
        public string DecisionNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public int OwnerId { get; set; }
        public decimal MinSalary { get; set; }
        public int EmpId { get; set; }
        public byte Period { get; set; }
        public string DependOn { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Notes { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Owner Owner { get; set; }
    }
}
