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
    
    public partial class ApprovedPayrollEmp
    {
        public short Year { get; set; }
        public byte Month { get; set; }
        public int Serial { get; set; }
        public byte PaySlipId { get; set; }
        public int EmpId { get; set; }
        public bool CanEdit { get; set; }
    
        public virtual ApprovedPayroll ApprovedPayroll { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
