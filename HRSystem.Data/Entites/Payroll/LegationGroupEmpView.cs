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
    
    public partial class LegationGroupEmpView
    {
        public int EmpID { get; set; }
        public int LegationGroupSerial { get; set; }
        public string LegationGroupNo { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public short LegationPeriod { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string LegationLocation { get; set; }
        public string Mission { get; set; }
        public string Notes { get; set; }
    }
}
