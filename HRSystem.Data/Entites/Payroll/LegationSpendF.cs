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
    
    public partial class LegationSpendF
    {
        public int LegationSpendSerial { get; set; }
        public int EmpID { get; set; }
        public decimal NightsRatio { get; set; }
        public decimal TotalNights { get; set; }
        public decimal TransportAllow { get; set; }
        public decimal Tickets { get; set; }
        public decimal TotalLegation { get; set; }
        public int SerialNo { get; set; }
        public Nullable<short> carfees { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual LegationSpend LegationSpend { get; set; }
    }
}
