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
    
    public partial class ViewVacationApplication
    {
        public short Year { get; set; }
        public int VacationApplicationSerial { get; set; }
        public string EmpName { get; set; }
        public byte PaySlipID { get; set; }
        public string VacationName { get; set; }
        public string FromDateH { get; set; }
        public short VacationPeriod { get; set; }
        public int EmpID { get; set; }
        public byte VacationID { get; set; }
        public DateTime FromDate { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
        public string ToDateH { get; set; }
        public bool CheckApproved { get; set; }
        public Nullable<bool> Deserved { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
    }
}
