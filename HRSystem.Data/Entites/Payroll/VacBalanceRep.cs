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
    
    public partial class VacBalanceRep
    {
        public int EmpID { get; set; }
        public Nullable<decimal> ReplacementVacDeserved { get; set; }
        public Nullable<decimal> ReplacementVacTaken { get; set; }
        public Nullable<decimal> ReplacementVacBalance { get; set; }
    }
}