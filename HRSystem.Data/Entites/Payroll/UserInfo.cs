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
    
    public partial class UserInfo
    {
        public int User_Id { get; set; }
        public string Badgenumber { get; set; }
        public string Name { get; set; }
        public Nullable<int> EmpID { get; set; }
        public Nullable<int> FPLocationId { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual FPLocation FPLocation { get; set; }
    }
}