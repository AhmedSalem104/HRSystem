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
    
    public partial class DecisionReplacementVacationView
    {
        public short Year { get; set; }
        public int ReplacementVacationId { get; set; }
        public string DateH { get; set; }
        public Nullable<byte> EnclosureCount { get; set; }
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public short VacationPeriod { get; set; }
        public string FromDateH { get; set; }
        public string ToDateH { get; set; }
        public string StartServiceH { get; set; }
        public string EndServiceH { get; set; }
        public string Notes { get; set; }
        public Nullable<short> VacationApplicationYear { get; set; }
        public Nullable<int> VacationApplicationSerial { get; set; }
        public Nullable<short> VacationYear { get; set; }
        public Nullable<int> VacationSerial { get; set; }
    }
}
