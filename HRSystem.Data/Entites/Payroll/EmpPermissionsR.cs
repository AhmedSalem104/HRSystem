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
    
    public partial class EmpPermissionsR
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EmpPermissionsR()
        {
            this.EmpPermissionsRDays = new HashSet<EmpPermissionsRDay>();
        }
    
        public int Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public int EmpId { get; set; }
        public int PermissionTypeId { get; set; }
        public string Notes { get; set; }
        public bool Su { get; set; }
        public bool Mo { get; set; }
        public bool Tu { get; set; }
        public bool We { get; set; }
        public bool Th { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual PermissionsType PermissionsType { get; set; }
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmpPermissionsRDay> EmpPermissionsRDays { get; set; }
    }
}
