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
    
    public partial class DecisionsList
    {
        public short Year { get; set; }
        public short Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public int EmpId { get; set; }
        public string Subject { get; set; }
        public string Notes { get; set; }
        public byte[] DecImage { get; set; }
        public Nullable<int> DecNo { get; set; }
        public string DocNoOut { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
