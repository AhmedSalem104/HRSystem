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
    
    public partial class CalcAttendanceF
    {
        public short Year { get; set; }
        public byte Month { get; set; }
        public int EmpId { get; set; }
        public byte SumAbsence { get; set; }
        public decimal InTimeDiff { get; set; }
        public decimal OutTimeDiff { get; set; }
    
        public virtual CalcAttendanceH CalcAttendanceH { get; set; }
    }
}
